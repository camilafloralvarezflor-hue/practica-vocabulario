/* Home screen + exam mode UI. Runs after the vocabulary script (uses its $, esc, KEY, openConfirm). */
(function () {
  "use strict";
  var C = window.ExamCore, EXAMS = window.EXAMS;
  var T = C.TENSES, S = C.STRUCTURES;
  var EKEY = KEY + "-exam";
  var A_PTS = 0.3, B_PTS = 0.5, MAX = 6.5;

  /* ---------- index ---------- */
  var ITEMS = {};
  EXAMS.forEach(function (e) {
    e.blanks.forEach(function (b) { ITEMS[b.id] = { kind: "A", item: b, exam: e }; });
    e.rewrites.forEach(function (r) { ITEMS[r.id] = { kind: "B", item: r, exam: e }; });
  });
  var BY_SET = {}; EXAMS.forEach(function (e) { BY_SET[e.id] = e; });
  var GROUP_OF = { "such": "such", "indirect": "indirect", "wish-past": "wish", "wish-could": "wish", "wish-pp": "wish", "time": "time", "relative": "relative", "cond2": "cond2", "cond3": "cond3", "in-case": "in-case", "were": "were", "the-the": "the-the" };
  var GROUPS = [
    ["such", "SUCH / SO"], ["indirect", "Preguntas indirectas"], ["wish", "WISH"], ["time", "WHEN / AS SOON AS"],
    ["relative", "WHICH / WHO"], ["cond2", "IF · 2nd conditional"], ["cond3", "IF · 3rd conditional"],
    ["in-case", "IN CASE"], ["were", "WERE (If I were you)"], ["the-the", "THE … THE …"]
  ];
  var TENSE_ORDER = ["PS", "PC", "PaS", "PaC", "PP", "PPC", "PaP", "PaPC", "GT", "WF", "FC", "FP"];

  /* ---------- state ---------- */
  function fresh() { return { items: {}, sets: {}, custom: {}, paper: null, drill: null, prefs: { timer: false, size: 20, chips: [] } }; }
  function load() {
    var s = null;
    try { s = JSON.parse(localStorage.getItem(EKEY)); } catch (e) { s = null; }
    var d = fresh();
    if (!s || typeof s !== "object") return d;
    ["items", "sets", "custom"].forEach(function (k) { if (s[k] && typeof s[k] === "object") d[k] = s[k]; });
    if (s.prefs) d.prefs = Object.assign(d.prefs, s.prefs);
    if (s.paper && BY_SET[s.paper.setId]) d.paper = s.paper;
    if (s.drill && Array.isArray(s.drill.ids) && s.drill.ids.every(function (id) { return ITEMS[id]; })) d.drill = s.drill;
    return d;
  }
  function saveEx() { try { localStorage.setItem(EKEY, JSON.stringify(st)); } catch (e) { /* sin almacenamiento */ } }
  var st = load();

  /* ---------- helpers ---------- */
  var main = $("exMain");
  function h(s) { return esc(String(s == null ? "" : s)); }
  function grade(n) { return (Math.round(n * 100) / 100).toString().replace(".", ","); }
  function pct(n, d) { return d ? Math.round(n / d * 100) : 0; }
  function shuffleA(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function setLabel(e) { return "SET " + e.id + (e.code ? " · " + e.code : ""); }
  function sourceChip(e) { return e.source === "real" ? '<span class="chip pv">Examen real ' + h(e.code) + '</span>' : '<span class="chip vb">Generado</span>'; }
  function record(id, ok) {
    var it = st.items[id] || (st.items[id] = { ok: 0, bad: 0, streak: 0, review: false });
    if (ok) { it.ok++; it.streak++; if (it.review && it.streak >= 2) it.review = false; }
    else { it.bad++; it.streak = 0; it.review = true; }
  }
  function unrecordBad(id) {
    var it = st.items[id]; if (!it) return;
    if (it.bad > 0) it.bad--;
    it.ok++; it.streak = Math.max(it.streak, 1);
    if (it.bad === 0) it.review = false;
  }
  function reviewIds() { return Object.keys(st.items).filter(function (id) { return st.items[id].review && ITEMS[id]; }); }
  function ruleCardStructure(r) {
    var x = S[r.structure];
    return '<div class="rule"><span class="rn">' + h(x.name) + '</span><br><code>' + h(x.formula) + '</code><p>' + h(x.rule) + '</p><p class="eg">' + h(x.example) + '</p></div>';
  }
  function ruleCardTense(b) {
    var t = T[b.t];
    return '<div class="rule"><span class="rn">' + h(t.name) + (b.voice === "passive" ? " · voz pasiva" : "") + '</span><br><code>' + h(t.form) + '</code><p>' + h(b.why) + '</p></div>';
  }
  function diffHtml(diff) {
    return '<div class="diff">' + diff.map(function (d) {
      return d.t === "same" ? h(d.w) : d.t === "extra" ? "<del>" + h(d.w) + "</del>" : "<ins>" + h(d.w) + "</ins>";
    }).join(" ") + '</div><div class="legend">Tachado: sobra en tu respuesta · Subrayado: falta respecto del modelo.</div>';
  }
  var INPUT_ATTRS = 'autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false"';

  /* ---------- navigation between modes ---------- */
  function showView(v) {
    $("homeView").hidden = v !== "home";
    $("vocabView").hidden = v !== "vocab";
    $("examView").hidden = v !== "exam";
    window.scrollTo(0, 0);
    if (v === "home") renderHome();
    if (v === "vocab") { render(); }
    if (v === "exam") { if (st.paper && !st.paper.submitted && st._resume) openPaper(); else if (st.drill && st._resumeDrill && st.drill.i < st.drill.ids.length) renderDrill(); else renderMenu(); }
  }
  document.addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-go]");
    if (b) { stopTimer(); showView(b.dataset.go); }
  });
  function renderHome() {
    var s = state.score;
    $("homeVocabMeta").textContent = s.played ? "Tus puntos: " + fmt(s.points) + " / " + s.played + " (" + Math.round(s.points / s.played * 100) + "%)" : "598 palabras";
    var done = Object.keys(st.sets).filter(function (k) { return st.sets[k].bestExam != null || st.sets[k].bestPractice != null; }).length;
    $("homeExamMeta").textContent = done ? done + " de 20 exámenes hechos" + (reviewIds().length ? " · " + reviewIds().length + " para repasar" : "") : "20 exámenes · 4 reales y 16 nuevos";
  }

  /* ---------- exam menu ---------- */
  function setOptions(sel) {
    var o = '<option value="random">Al azar</option>';
    EXAMS.forEach(function (e) {
      var best = st.sets[e.id] && st.sets[e.id].bestExam != null ? " · mejor: " + grade(st.sets[e.id].bestExam) : "";
      o += '<option value="' + e.id + '"' + (String(sel) === String(e.id) ? " selected" : "") + ">" + h(setLabel(e) + " — " + e.title.toLowerCase().replace(/^\w/, function (c) { return c.toUpperCase(); }) + best) + "</option>";
    });
    return o;
  }
  function renderMenu() {
    stopTimer();
    st._resumeDrill = false;
    $("exToMenu").hidden = true;
    $("exTopTitle").textContent = "Examen: Tenses & Rewrite";
    var p = st.paper, d = st.drill, html = "";
    if (p && !p.submitted) {
      var e = BY_SET[p.setId];
      html += '<div class="banner"><span>Tenés <b>' + (p.mode === "exam" ? "un examen" : "una práctica") + '</b> sin terminar: ' + h(setLabel(e)) + '.</span><span class="row"><button class="btn small primary" id="mResume" type="button">Continuar</button><button class="btn small" id="mDiscard" type="button">Descartar</button></span></div>';
    }
    if (d && d.i < d.ids.length) {
      html += '<div class="banner"><span>Tenés una ronda de <b>' + h(d.title) + '</b> a medias (' + d.i + ' de ' + d.ids.length + ').</span><span class="row"><button class="btn small primary" id="mResumeDrill" type="button">Continuar</button><button class="btn small" id="mDiscardDrill" type="button">Descartar</button></span></div>';
    }
    var nTenses = 0, nRw = 0; EXAMS.forEach(function (e) { nTenses += e.blanks.length; nRw += e.rewrites.length; });
    var rv = reviewIds().length;
    var chips = st.prefs.chips || [];
    function chip(id, label, n) {
      return '<label class="tchip"><input type="checkbox" value="' + id + '"' + (chips.indexOf(id) >= 0 ? " checked" : "") + '><span>' + h(label) + '<em>' + n + '</em></span></label>';
    }
    var tenseChips = TENSE_ORDER.map(function (t) {
      var n = 0; EXAMS.forEach(function (e) { e.blanks.forEach(function (b) { if (b.t === t) n++; }); });
      return chip("t:" + t, T[t].name, n);
    }).join("");
    var nPass = 0; EXAMS.forEach(function (e) { e.blanks.forEach(function (b) { if (b.voice === "passive") nPass++; }); });
    tenseChips += chip("t:passive", "Voz pasiva (todas)", nPass);
    var structChips = GROUPS.map(function (g) {
      var n = 0; EXAMS.forEach(function (e) { e.rewrites.forEach(function (r) { if (GROUP_OF[r.structure] === g[0]) n++; }); });
      return chip("s:" + g[0], g[1], n);
    }).join("");
    var size = st.prefs.size;
    html += '<div class="ex-grid">' +
      '<section class="card"><h2>Examen completo</h2><p>Hacés las dos partes y corregís todo junto al final, como en el examen real. Nota sobre 6,5.</p>' +
      '<div class="field-row"><label class="field">Examen<select id="mSetExam">' + setOptions(st.prefs.lastSet || "random") + '</select></label></div>' +
      '<label class="chk"><input type="checkbox" id="mTimer"' + (st.prefs.timer ? " checked" : "") + '> Cronómetro</label>' +
      '<div class="card-actions"><button class="btn primary" id="mStartExam" type="button">Empezar examen</button></div></section>' +
      '<section class="card"><h2>Práctica</h2><p>El mismo examen, pero cada hueco y cada oración se corrigen al apretar Enter, con pistas y explicación.</p>' +
      '<div class="field-row"><label class="field">Examen<select id="mSetPractice">' + setOptions(st.prefs.lastSet || "random") + '</select></label></div>' +
      '<div class="card-actions"><button class="btn primary" id="mStartPractice" type="button">Empezar práctica</button></div></section>' +
      '</div>' +
      '<section class="card"><h2>Ejercicios sueltos</h2><p class="muted" style="margin:0 0 10px">Ítems mezclados de los 20 exámenes, de a uno.</p>' +
      '<div class="field-row"><label class="field">Cantidad por ronda<select id="mSize">' +
      [10, 20, 30, 0].map(function (n) { return '<option value="' + n + '"' + (size === n ? " selected" : "") + ">" + (n ? n : "Todas") + "</option>"; }).join("") +
      '</select></label></div>' +
      '<div class="card-actions" style="margin:12px 0"><button class="btn" id="mTenses" type="button">Solo Tenses (' + nTenses + ')</button><button class="btn" id="mRewrite" type="button">Solo Rewrite (' + nRw + ')</button>' +
      '<button class="btn" id="mReview" type="button"' + (rv ? "" : " disabled") + '>Repasar mis errores (' + rv + ')</button></div>' +
      '<div class="chipset-h">Por tiempo verbal</div><div class="chipset" id="mChipsT">' + tenseChips + '</div>' +
      '<div class="chipset-h" style="margin-top:10px">Por estructura (rewrite)</div><div class="chipset" id="mChipsS">' + structChips + '</div>' +
      '<div class="card-actions" style="margin-top:12px"><button class="btn primary" id="mChipsGo" type="button"' + (chips.length ? "" : " disabled") + '>Practicar lo elegido</button></div></section>' +
      '<section class="card"><h2>Mi progreso</h2><p class="muted" style="margin:0 0 10px">Mejor nota por examen y qué tiempos y estructuras te cuestan más.</p>' +
      '<div class="card-actions"><button class="btn" id="mStats" type="button">Ver estadísticas</button></div></section>';
    main.innerHTML = html;
    function bind(id, fn) { var el = $(id); if (el) el.addEventListener("click", fn); }
    bind("mResume", openPaper);
    bind("mDiscard", function () { st.paper = null; saveEx(); renderMenu(); });
    bind("mResumeDrill", renderDrill);
    bind("mDiscardDrill", function () { st.drill = null; saveEx(); renderMenu(); });
    function pick(selId) { var v = $(selId).value; st.prefs.lastSet = v; return v === "random" ? EXAMS[Math.floor(Math.random() * EXAMS.length)].id : +v; }
    $("mTimer").addEventListener("change", function (e) { st.prefs.timer = e.target.checked; saveEx(); });
    bind("mStartExam", function () { startPaper(pick("mSetExam"), "exam"); });
    bind("mStartPractice", function () { startPaper(pick("mSetPractice"), "practice"); });
    $("mSize").addEventListener("change", function (e) { st.prefs.size = +e.target.value; saveEx(); });
    bind("mTenses", function () { startDrill("Solo Tenses", poolWhere(function (x) { return x.kind === "A"; })); });
    bind("mRewrite", function () { startDrill("Solo Rewrite", poolWhere(function (x) { return x.kind === "B"; })); });
    bind("mReview", function () { startDrill("Repasar mis errores", reviewIds(), true); });
    main.querySelectorAll(".chipset input").forEach(function (cb) {
      cb.addEventListener("change", function () {
        st.prefs.chips = Array.prototype.map.call(main.querySelectorAll(".chipset input:checked"), function (c) { return c.value; });
        $("mChipsGo").disabled = !st.prefs.chips.length; saveEx();
      });
    });
    bind("mChipsGo", function () {
      var ch = st.prefs.chips;
      var ids = poolWhere(function (x) {
        if (x.kind === "A") return ch.indexOf("t:" + x.item.t) >= 0 || (x.item.voice === "passive" && ch.indexOf("t:passive") >= 0);
        return ch.indexOf("s:" + GROUP_OF[x.item.structure]) >= 0;
      });
      startDrill("Por tiempo / estructura", ids);
    });
    bind("mStats", renderStats);
    saveEx();
  }
  function poolWhere(fn) { return Object.keys(ITEMS).filter(function (id) { return fn(ITEMS[id]); }); }

  /* ---------- paper (full exam / practice) ---------- */
  var timerId = null;
  function startPaper(setId, mode) {
    st.paper = { setId: setId, mode: mode, a: {}, b: {}, s: {}, timer: mode === "exam" && !!st.prefs.timer, elapsed: 0, since: Date.now(), submitted: false, result: null };
    saveEx();
    openPaper();
  }
  function itemState(id) { var p = st.paper; return p.s[id] || (p.s[id] = { wrong: 0, hints: 0, h1: false, h2: false, revealed: false, done: false, ok: false, maybe: false }); }
  function elapsed() { var p = st.paper; return p.elapsed + (p.since && !p.submitted ? Date.now() - p.since : 0); }
  function clock(ms) { var s = Math.floor(ms / 1000); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); }
  function stopTimer() {
    if (timerId) { clearInterval(timerId); timerId = null; }
    var p = st.paper;
    if (p && p.since && !p.submitted) { p.elapsed += Date.now() - p.since; p.since = null; saveEx(); }
  }
  function startTimer() {
    var p = st.paper;
    if (!p.since && !p.submitted) p.since = Date.now();
    if (timerId) clearInterval(timerId);
    timerId = setInterval(function () { var el = $("pTimer"); if (el) el.textContent = clock(elapsed()); }, 1000);
  }

  function cueRanges(e) {
    var text = e.text, out = [];
    e.blanks.forEach(function (b) {
      var start = text.indexOf(b.cue);
      if (start < 0) return;
      var end = start + b.cue.length;
      var same = out.filter(function (r) { return r.start === start && r.end === end; })[0];
      if (same) { same.ns.push(b.n); return; }
      if (out.some(function (r) { return start < r.end && end > r.start; })) return;
      out.push({ start: start, end: end, ns: [b.n] });
    });
    return out.sort(function (a, b) { return a.start - b.start; });
  }
  function gapHtml(b, p) {
    var val = (p.a[b.n] || "");
    return '<span class="gap"><span class="gn">' + b.n + ')</span> <span class="gv">(' + h(b.verb) + ')</span> <input class="gap-in" data-n="' + b.n + '" ' + INPUT_ATTRS + ' aria-label="Hueco ' + b.n + ', verbo ' + h(b.verb) + '" value="' + h(val) + '" style="width:' + Math.max(9, val.length + 2) + 'ch"></span>';
  }
  function textHtml(e, p) {
    var text = e.text, ranges = cueRanges(e), html = "", pos = 0;
    function plain(seg) {
      return h(seg).replace(/\{\{(\d+)\}\}/g, function (_, n) { return gapHtml(e.blanks[n - 1], p); });
    }
    ranges.forEach(function (r) {
      html += plain(text.slice(pos, r.start)) + '<span class="cue" data-cues="' + r.ns.join(" ") + '">' + plain(text.slice(r.start, r.end)) + "</span>";
      pos = r.end;
    });
    html += plain(text.slice(pos));
    return html.split(/\n\n/).map(function (par) { return '<p class="ex-text">' + par + "</p>"; }).join("");
  }
  function partAHeading(e) {
    if (e.id <= 2) return '<h2 class="part">A · COMPLETE THE TEXT WITH THE CORRECT TENSE AND VOICE OF THE VERBS IN BRACKETS <span class="marks">10 × 0.30 = 3 marks</span></h2><p class="instr">Use the Present Simple or Continuous, the Past Simple or Continuous, the Present Perfect Simple or Continuous, the Past Perfect, the \'Going to\' or the Simple Future.</p>';
    return '<h2 class="part">A · COMPLETE THE TEXT WITH THE CORRECT TENSE, VOICE OR FORM OF THE VERBS IN BRACKETS <span class="marks">10 × 0.30 = 3 marks</span></h2>';
  }

  function openPaper() {
    var p = st.paper, e = BY_SET[p.setId];
    st._resume = true; st._resumeDrill = false;
    $("exToMenu").hidden = false;
    $("exTopTitle").textContent = (p.mode === "exam" ? "Examen · " : "Práctica · ") + setLabel(e);
    var practice = p.mode === "practice";
    var html = '<div class="ex-head"><span class="set-name">' + h(setLabel(e)) + '</span>' + sourceChip(e) + '<span class="chip">' + (practice ? "Práctica: corrige al apretar Enter" : "Examen: se corrige al final") + '</span>' +
      (p.timer ? '<span class="timer" id="pTimer">' + clock(elapsed()) + '</span>' : "") + '</div>' +
      '<div id="pResult"></div>' +
      '<section class="card">' + partAHeading(e) + '<h3 class="ex-title">' + h(e.title) + '</h3><div id="pText">' + textHtml(e, p) + '</div>' +
      (practice ? '<div class="gap-panel" id="gapPanel"><div class="gp-h" id="gpTitle">Tocá un hueco para empezar.</div><div class="btns"><button class="btn primary" type="button" id="gpCheck">Comprobar</button><button class="btn" type="button" id="gpH1">Pista 1</button><button class="btn" type="button" id="gpH2">Pista 2</button><button class="btn" type="button" id="gpRev">Revelar</button></div><div class="fb" id="gpFb"></div></div>' : "") +
      '<ol class="gap-review" id="gapReview" hidden></ol></section>' +
      '<section class="card"><h2 class="part">B · REWRITE THESE SENTENCES. Use the words in brackets without changing them. <span class="marks">7 × 0.5 = 3.5 marks</span></h2>' +
      e.rewrites.map(function (r) {
        return '<div class="rw" data-n="' + r.n + '"><p class="rw-orig"><b>' + r.n + '.</b> ' + h(r.original) + ' <span class="kw">(' + h(r.key) + ')</span></p>' +
          '<textarea class="rw-in" data-n="' + r.n + '" rows="2" ' + INPUT_ATTRS + ' aria-label="Oración ' + r.n + ' reescrita">' + h(p.b[r.n] || "") + '</textarea>' +
          (practice ? '<div class="btns"><button class="btn primary" type="button" data-act="check">Comprobar</button><button class="btn" type="button" data-act="h1">Pista 1</button><button class="btn" type="button" data-act="h2">Pista 2</button><button class="btn" type="button" data-act="rev">Revelar</button></div>' : "") +
          '<div class="hint-line" data-hint="' + r.n + '"></div><div class="fb" data-fb="' + r.n + '"></div></div>';
      }).join("") + '</section>' +
      '<div class="paper-actions" id="pActions"></div>';
    main.innerHTML = html;
    bindPaper();
    refreshPaper();
    if (p.timer && !p.submitted) startTimer();
    saveEx();
  }

  var activeGap = null;
  function bindPaper() {
    var p = st.paper, e = BY_SET[p.setId];
    main.querySelectorAll(".gap-in").forEach(function (inp) {
      inp.addEventListener("input", function () {
        p.a[inp.dataset.n] = inp.value;
        inp.style.width = Math.max(9, inp.value.length + 2) + "ch";
        inp.classList.remove("bad");
        saveEx();
      });
      inp.addEventListener("focus", function () { setActiveGap(+inp.dataset.n); });
      inp.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter") {
          ev.preventDefault();
          if (p.mode === "practice") checkGap(+inp.dataset.n);
          else focusNextField(inp);
        }
      });
    });
    main.querySelectorAll(".rw-in").forEach(function (ta) {
      ta.addEventListener("input", function () { p.b[ta.dataset.n] = ta.value; ta.classList.remove("bad", "maybe"); saveEx(); });
      ta.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" && !ev.shiftKey) {
          ev.preventDefault();
          if (p.mode === "practice") checkRw(+ta.dataset.n);
          else focusNextField(ta);
        }
      });
    });
    main.querySelectorAll(".rw [data-act]").forEach(function (b) {
      b.addEventListener("click", function () {
        var n = +b.closest(".rw").dataset.n, act = b.dataset.act;
        if (act === "check") checkRw(n); else if (act === "h1" || act === "h2") hintRw(n, act); else if (act === "rev") revealRw(n);
      });
    });
    if (p.mode === "practice") {
      $("gpCheck").addEventListener("click", function () { if (activeGap) checkGap(activeGap); });
      $("gpH1").addEventListener("click", function () { if (activeGap) hintGap(activeGap, 1); });
      $("gpH2").addEventListener("click", function () { if (activeGap) hintGap(activeGap, 2); });
      $("gpRev").addEventListener("click", function () { if (activeGap) revealGap(activeGap); });
    }
  }
  function focusNextField(el) {
    var all = Array.prototype.slice.call(main.querySelectorAll(".gap-in, .rw-in")).filter(function (x) { return !x.readOnly; });
    var i = all.indexOf(el);
    if (i >= 0 && all[i + 1]) all[i + 1].focus();
  }
  function blankById(n) { return BY_SET[st.paper.setId].blanks[n - 1]; }
  function rwById(n) { return BY_SET[st.paper.setId].rewrites[n - 1]; }

  function setActiveGap(n) {
    activeGap = n;
    main.querySelectorAll(".gap-in.active").forEach(function (x) { x.classList.remove("active"); });
    var inp = main.querySelector('.gap-in[data-n="' + n + '"]');
    if (inp) inp.classList.add("active");
    if (st.paper.mode !== "practice") return;
    var b = blankById(n);
    $("gpTitle").textContent = "Hueco " + n + " · (" + b.verb + ")";
    paintGapFb(n);
  }
  function paintGapFb(n) {
    var b = blankById(n), s = itemState(b.id), fb = "";
    var cueOn = main.querySelector('.cue[data-cues~="' + n + '"]');
    main.querySelectorAll(".cue.on").forEach(function (x) { x.classList.remove("on"); });
    if (s.h1 && cueOn) cueOn.classList.add("on");
    if (s.h1) fb += '<div>Pista 1: fijate en <b>«' + h(b.cue) + '»</b>' + (cueOn ? " (resaltado en el texto)" : "") + ".</div>";
    if (s.h2) fb += '<div>Pista 2: <b>' + h(b.tense) + (b.voice === "passive" ? " en voz pasiva" : "") + "</b>.</div>";
    if (s.done && s.ok) fb += '<div class="res ok">✓ Correcto' + (s.wrong ? " (después de " + s.wrong + (s.wrong === 1 ? " intento" : " intentos") + ")" : "") + '</div>' + ruleCardTense(b);
    else if (s.done && s.revealed) fb += '<div class="res rev">Respuesta: ' + h(b.answer) + '</div>' + ruleCardTense(b);
    else if (s.wrong) fb += '<div class="res bad">✗ No es correcto. Probá de nuevo o pedí una pista.</div>';
    $("gpFb").innerHTML = fb;
    var done = s.done;
    $("gpCheck").disabled = done; $("gpH1").disabled = done || s.h1; $("gpH2").disabled = done || s.h2; $("gpRev").disabled = done;
  }
  function checkGap(n) {
    var p = st.paper, b = blankById(n), s = itemState(b.id), inp = main.querySelector('.gap-in[data-n="' + n + '"]');
    if (s.done) return;
    var g = C.gradeBlank(b, inp.value);
    if (g.empty) { $("gpFb").innerHTML = '<div class="res">Escribí el verbo en el hueco.</div>'; return; }
    if (g.ok) {
      s.done = true; s.ok = true;
      record(b.id, s.wrong === 0);
      inp.classList.remove("bad"); inp.classList.add("ok"); inp.readOnly = true;
      paintGapFb(n);
      var nextInp = Array.prototype.filter.call(main.querySelectorAll(".gap-in"), function (x) { return !x.readOnly; })[0];
      saveEx(); refreshPaper();
      if (nextInp) setTimeout(function () { nextInp.focus(); }, 900);
    } else {
      s.wrong++;
      inp.classList.add("bad");
      saveEx(); paintGapFb(n);
    }
  }
  function hintGap(n, which) {
    var s = itemState(blankById(n).id);
    if (s.done) return;
    if (which === 1 && !s.h1) { s.h1 = true; s.hints++; }
    if (which === 2 && !s.h2) { s.h2 = true; s.hints++; }
    saveEx(); paintGapFb(n);
  }
  function revealGap(n) {
    var p = st.paper, b = blankById(n), s = itemState(b.id), inp = main.querySelector('.gap-in[data-n="' + n + '"]');
    if (s.done) return;
    s.done = true; s.revealed = true; s.ok = false;
    record(b.id, false);
    inp.value = b.answer; p.a[n] = b.answer; inp.style.width = Math.max(9, b.answer.length + 2) + "ch";
    inp.classList.remove("bad"); inp.classList.add("rev"); inp.readOnly = true;
    saveEx(); paintGapFb(n); refreshPaper();
  }

  function rwFeedback(r, s, g) {
    var out = "";
    if (s.revealed) out += '<div class="res rev">Respuesta modelo:</div><div class="model"><b>' + h(r.answer) + '</b></div>';
    else if (s.ok) out += '<div class="res ok">✓ Correcta' + (s.custom ? " (la marcaste como válida)" : "") + '</div><div class="model">Modelo: ' + h(r.answer) + '</div>';
    else if (g && g.level === "trap") out += '<div class="res bad">✗ Revisá esto:</div><ul>' + g.msgs.map(function (m) { return "<li>" + h(m) + "</li>"; }).join("") + '</ul><div class="model">Modelo: <b>' + h(r.answer) + '</b></div>';
    else if (g && g.level === "maybe") out += '<div class="res maybe">Puede que esté bien: compará con el modelo.</div>' + diffHtml(g.diff) + '<div class="model">Modelo: <b>' + h(r.answer) + '</b></div><div class="btns"><button class="btn" type="button" data-mine="' + r.n + '">La mía también vale</button></div>';
    else if (g && g.level === "empty") out += '<div class="res bad">Sin responder.</div><div class="model">Modelo: <b>' + h(r.answer) + '</b></div>';
    if (s.ok || s.revealed || (g && g.level !== "empty" && st.paper.submitted) || (g && g.level === "trap") || (g && g.level === "maybe")) out += ruleCardStructure(r);
    return out;
  }
  function paintRw(n, g) {
    var p = st.paper, r = rwById(n), s = itemState(r.id);
    var box = main.querySelector('.rw[data-n="' + n + '"]');
    var ta = box.querySelector(".rw-in");
    var hint = "";
    if (s.h1) hint += '<div>Pista 1: <code>' + h(r.hint1) + '</code></div>';
    if (s.h2) hint += '<div>Pista 2: empezá así: <b>' + h(r.hint2) + '</b></div>';
    box.querySelector(".hint-line").innerHTML = hint;
    ta.classList.remove("ok", "bad", "maybe", "rev");
    if (s.ok) ta.classList.add("ok"); else if (s.revealed) ta.classList.add("rev");
    else if (g && g.level === "trap") ta.classList.add("bad"); else if (g && (g.level === "maybe")) ta.classList.add("maybe");
    else if (g && g.level === "empty" && p.submitted) ta.classList.add("bad");
    if (s.done || p.submitted) ta.readOnly = true;
    box.querySelector('[data-fb="' + n + '"]').innerHTML = (g || s.done) ? rwFeedback(r, s, g) : "";
    box.querySelectorAll("[data-act]").forEach(function (b) {
      b.disabled = s.done || (b.dataset.act === "h1" && s.h1) || (b.dataset.act === "h2" && s.h2);
    });
  }
  function checkRw(n) {
    var p = st.paper, r = rwById(n), s = itemState(r.id);
    if (s.done) return;
    var ta = main.querySelector('.rw-in[data-n="' + n + '"]');
    var g = C.gradeRewrite(r, ta.value, st.custom[r.id]);
    if (g.level === "empty") { main.querySelector('[data-fb="' + n + '"]').innerHTML = '<div class="res">Escribí la oración completa.</div>'; return; }
    if (g.level === "ok") { s.done = true; s.ok = true; s.custom = !!g.custom; record(r.id, s.wrong === 0); }
    else if (g.level === "trap") s.wrong++;
    s.last = g.level;
    saveEx(); paintRw(n, g); refreshPaper();
  }
  function hintRw(n, which) {
    var s = itemState(rwById(n).id);
    if (s.done) return;
    if (which === "h1" && !s.h1) { s.h1 = true; s.hints++; }
    if (which === "h2" && !s.h2) { s.h2 = true; s.hints++; }
    saveEx(); paintRw(n, null);
  }
  function revealRw(n) {
    var p = st.paper, r = rwById(n), s = itemState(r.id);
    if (s.done) return;
    s.done = true; s.revealed = true; s.ok = false;
    record(r.id, false);
    var ta = main.querySelector('.rw-in[data-n="' + n + '"]');
    ta.value = r.answer; p.b[n] = r.answer;
    saveEx(); paintRw(n, null); refreshPaper();
  }
  function acceptMine(n) {
    var p = st.paper, r = rwById(n), s = itemState(r.id);
    var val = p.b[n] || "";
    var list = st.custom[r.id] || (st.custom[r.id] = []);
    var key = C.customKey(r, val);
    if (list.indexOf(key) < 0) list.push(key);
    var wasScored = p.submitted;
    s.done = true; s.ok = true; s.custom = true;
    if (wasScored) unrecordBad(r.id); else record(r.id, s.wrong === 0);
    if (p.submitted) { scorePaper(); saveBest(); }
    saveEx(); paintRw(n, null); refreshPaper();
  }

  /* totals */
  function scorePaper() {
    var p = st.paper, e = BY_SET[p.setId], a = 0, b = 0, hints = 0, okA = 0, okB = 0;
    e.blanks.forEach(function (x) { var s = itemState(x.id); hints += s.hints; if (s.ok) { a += A_PTS; okA++; } });
    e.rewrites.forEach(function (x) { var s = itemState(x.id); hints += s.hints; if (s.ok) { b += B_PTS; okB++; } });
    a = Math.round(a * 100) / 100; b = Math.round(b * 100) / 100;
    p.result = { a: a, b: b, okA: okA, okB: okB, total: Math.round((a + b) * 100) / 100, hints: hints, time: p.timer ? elapsed() : null };
    return p.result;
  }
  function saveBest() {
    var p = st.paper, rec = st.sets[p.setId] || (st.sets[p.setId] = { bestExam: null, bestPractice: null, tries: 0 });
    var k = p.mode === "exam" ? "bestExam" : "bestPractice";
    if (rec[k] == null || p.result.total > rec[k]) rec[k] = p.result.total;
  }
  function submitExam() {
    var p = st.paper, e = BY_SET[p.setId];
    stopTimer();
    p.submitted = true;
    e.blanks.forEach(function (b) {
      var s = itemState(b.id), g = C.gradeBlank(b, p.a[b.n]);
      s.done = true; s.ok = g.ok; record(b.id, g.ok);
    });
    e.rewrites.forEach(function (r) {
      var s = itemState(r.id), g = C.gradeRewrite(r, p.b[r.n], st.custom[r.id]);
      s.done = true; s.ok = g.level === "ok"; s.custom = !!g.custom; s.last = g.level;
      record(r.id, s.ok);
    });
    finishPaper();
  }
  function finishPaper() {
    var p = st.paper;
    if (p.mode === "practice") {
      stopTimer();
      p.submitted = true;
      BY_SET[p.setId].blanks.concat(BY_SET[p.setId].rewrites).forEach(function (x) {
        var s = itemState(x.id); if (!s.done) { s.done = true; s.ok = false; record(x.id, false); }
      });
    }
    var rec = st.sets[p.setId] || (st.sets[p.setId] = { bestExam: null, bestPractice: null, tries: 0 });
    rec.tries++;
    scorePaper(); saveBest(); saveEx();
    openPaper();
    window.scrollTo(0, 0);
  }

  function refreshPaper() {
    var p = st.paper, e = BY_SET[p.setId], practice = p.mode === "practice";
    /* gaps */
    e.blanks.forEach(function (b) {
      var s = p.s[b.id], inp = main.querySelector('.gap-in[data-n="' + b.n + '"]');
      if (!s || !inp) return;
      inp.classList.remove("ok", "bad", "rev");
      if (s.done) { inp.readOnly = true; inp.classList.add(s.revealed ? "rev" : s.ok ? "ok" : "bad"); }
    });
    /* rewrites */
    e.rewrites.forEach(function (r) {
      var s = p.s[r.id];
      if (!s) return;
      var g = null;
      if (!s.ok && !s.revealed && (p.submitted || s.last)) g = C.gradeRewrite(r, p.b[r.n], st.custom[r.id]);
      if (s.done || p.submitted || s.last) paintRw(r.n, g);
    });
    /* review list + result */
    var rv = $("gapReview");
    if (p.submitted) {
      rv.hidden = false;
      rv.innerHTML = '<li><b>Corrección de la parte A</b></li>' + e.blanks.map(function (b) {
        var s = itemState(b.id), yours = (p.a[b.n] || "").trim();
        return '<li><b>' + b.n + ')</b> ' + (s.ok ? '<span class="yours ok">' + h(yours) + ' ✓</span>' : (yours && !s.revealed ? '<span class="yours bad">' + h(yours) + '</span> → ' : '') + (s.ok ? "" : '<b>' + h(b.answer) + '</b>')) +
          ' <span class="t">· ' + h(b.tense) + (b.voice === "passive" ? " (pasiva)" : "") + '</span><br><span class="t">' + h(b.why) + '</span></li>';
      }).join("");
      main.querySelectorAll(".gap-in").forEach(function (x) { x.readOnly = true; });
      var r = p.result || scorePaper();
      $("pResult").innerHTML = '<section class="card result"><h2>' + (p.mode === "exam" ? "Resultado del examen" : "Resultado de la práctica") + '</h2>' +
        '<div class="grade">' + grade(r.total) + ' <small>/ 6,5 · ' + pct(r.total, MAX) + '%</small></div>' +
        '<div class="breakdown"><span>A · Tenses: ' + grade(r.a) + ' / 3 (' + r.okA + ' de 10)</span><span>B · Rewrite: ' + grade(r.b) + ' / 3,5 (' + r.okB + ' de 7)</span>' +
        (r.hints ? '<span>Pistas usadas: ' + r.hints + '</span>' : '') + (r.time != null ? '<span>Tiempo: ' + clock(r.time) + '</span>' : '') + '</div>' +
        '<p class="muted" style="margin:0 0 10px">Abajo tenés cada respuesta corregida con la explicación. Si una oración tuya dice «Puede que esté bien», revisala y tocá «La mía también vale» si corresponde: la nota se actualiza.</p>' +
        '<div class="card-actions"><button class="btn primary" type="button" id="pAgain">Repetir este examen</button><button class="btn" type="button" id="pOther">Otro examen</button></div></section>';
      $("pAgain").onclick = function () { startPaper(p.setId, p.mode); window.scrollTo(0, 0); };
      $("pOther").onclick = function () { st.paper = null; saveEx(); renderMenu(); };
      $("pActions").innerHTML = '<button class="btn" type="button" id="pMenu">Volver al menú</button>';
      $("pMenu").onclick = function () { st.paper = null; saveEx(); renderMenu(); };
      if ($("gapPanel")) $("gapPanel").hidden = true;
      if ($("pTimer")) $("pTimer").textContent = clock(elapsed());
    } else {
      rv.hidden = true;
      var all = e.blanks.concat(e.rewrites), done = all.filter(function (x) { return p.s[x.id] && p.s[x.id].done; }).length;
      if (practice) {
        $("pActions").innerHTML = '<span class="drill-score" style="margin-right:auto;align-self:center">Resueltos: ' + done + ' de 17</span><button class="btn" type="button" id="pSave">Guardar y salir</button><button class="btn primary" type="button" id="pFinish">' + (done === 17 ? "Ver nota" : "Terminar y ver nota") + '</button>';
        $("pFinish").onclick = function () {
          if (done < 17) openConfirm({ title: "¿Terminar la práctica?", text: "Te quedan " + (17 - done) + " ítems sin resolver: cuentan como 0.", ok: "Terminar", danger: false, onOk: finishPaper });
          else finishPaper();
        };
      } else {
        $("pActions").innerHTML = '<button class="btn" type="button" id="pSave">Guardar y salir</button><button class="btn primary" type="button" id="pSubmit">Corregir examen</button>';
        $("pSubmit").onclick = function () {
          var empty = e.blanks.filter(function (b) { return !(p.a[b.n] || "").trim(); }).length + e.rewrites.filter(function (r) { return !(p.b[r.n] || "").trim(); }).length;
          if (empty) openConfirm({ title: "¿Corregir el examen?", text: "Te quedan " + empty + " respuestas vacías: cuentan como 0.", ok: "Corregir igual", danger: false, onOk: submitExam });
          else submitExam();
        };
      }
      $("pSave").onclick = function () { stopTimer(); st._resume = false; renderMenu(); window.scrollTo(0, 0); };
    }
  }
  main.addEventListener("click", function (ev) {
    var ok = ev.target.closest("[data-mine]");
    if (ok && st.paper) acceptMine(+ok.dataset.mine);
  });
  $("exToMenu").addEventListener("click", function () { stopTimer(); st._resume = false; renderMenu(); window.scrollTo(0, 0); });

  /* ---------- drills (one item at a time) ---------- */
  function startDrill(title, ids, review) {
    ids = shuffleA(ids.slice());
    var size = st.prefs.size;
    if (size > 0 && !review) ids = ids.slice(0, size);
    st.drill = { title: title, ids: ids, i: 0, review: !!review, okN: 0, played: 0, failed: [], cur: null, again: {} };
    saveEx();
    renderDrill();
  }
  function curItem() { var d = st.drill; return ITEMS[d.ids[d.i]]; }
  function curState() {
    var d = st.drill, x = curItem();
    if (!d.cur || d.cur.id !== x.item.id) d.cur = { id: x.item.id, wrong: 0, h1: false, h2: false, hints: 0, done: false, ok: false, revealed: false, input: "", last: null };
    return d.cur;
  }
  function renderDrill() {
    var d = st.drill;
    st._resumeDrill = true; st._resume = false;
    $("exToMenu").hidden = false;
    $("exTopTitle").textContent = d.title;
    if (!d.ids.length) {
      main.innerHTML = '<section class="card"><h2>No hay ítems para practicar</h2><p class="muted">' + (d.review ? "Todavía no fallaste ningún ítem (o ya los acertaste dos veces seguidas)." : "Elegí al menos un tiempo verbal o una estructura.") + '</p><div class="card-actions"><button class="btn" type="button" id="dBack">Volver al menú</button></div></section>';
      $("dBack").onclick = function () { st.drill = null; saveEx(); renderMenu(); };
      return;
    }
    if (d.i >= d.ids.length) return renderDrillSummary();
    var x = curItem(), s = curState(), e = x.exam, it = x.item;
    var head = '<div class="ex-head"><span class="set-name">' + h(d.title) + '</span><span class="drill-score">' + (d.i + 1) + ' de ' + d.ids.length + ' · aciertos: ' + d.okN + ' de ' + d.played + '</span></div>';
    var body;
    if (x.kind === "A") {
      var ctx = C.contextFor(e, it.n);
      var shown = h(ctx).replace(/\{\{(\d+)\}\}/g, function (_, n) {
        n = +n;
        if (n === it.n) return '<span class="gap"><span class="gv">(' + h(it.verb) + ')</span> <input class="gap-in" id="dIn" ' + INPUT_ATTRS + ' aria-label="Respuesta" value="' + h(s.input) + '" style="width:' + Math.max(10, s.input.length + 2) + 'ch"></span>';
        return '<span class="filled">' + h(e.blanks[n - 1].answer) + '</span>';
      });
      if (s.h1) {
        var cueH = h(it.cue);
        if (shown.indexOf(cueH) >= 0) shown = shown.replace(cueH, '<span class="cue on">' + cueH + '</span>');
      }
      body = '<p class="muted" style="margin:0">Completá con el tiempo y la voz correctos · ' + h(setLabel(e)) + '</p><p class="drill-ctx">' + shown + '</p>';
    } else {
      body = '<p class="muted" style="margin:0 0 6px">Reescribí la oración usando la palabra entre paréntesis sin cambiarla · ' + h(setLabel(e)) + '</p><p class="rw-orig" style="font-size:17px">' + h(it.original) + ' <span class="kw">(' + h(it.key) + ')</span></p>' +
        '<textarea class="rw-in" id="dIn" rows="2" ' + INPUT_ATTRS + ' aria-label="Oración reescrita">' + h(s.input) + '</textarea>';
    }
    var hint = "";
    if (x.kind === "A") {
      if (s.h1) hint += '<div>Pista 1: fijate en <b>«' + h(it.cue) + '»</b>.</div>';
      if (s.h2) hint += '<div>Pista 2: <b>' + h(it.tense) + (it.voice === "passive" ? " en voz pasiva" : "") + '</b>.</div>';
    } else {
      if (s.h1) hint += '<div>Pista 1: <code>' + h(it.hint1) + '</code></div>';
      if (s.h2) hint += '<div>Pista 2: empezá así: <b>' + h(it.hint2) + '</b></div>';
    }
    main.innerHTML = head + '<section class="card">' + body + '<div class="hint-line">' + hint + '</div><div class="fb" id="dFb"></div>' +
      '<div class="btns" style="margin-top:12px"><button class="btn primary" type="button" id="dCheck">Comprobar</button><button class="btn" type="button" id="dH1">Pista 1</button><button class="btn" type="button" id="dH2">Pista 2</button><button class="btn" type="button" id="dRev">Revelar</button><button class="btn" type="button" id="dNext">Siguiente</button></div></section>' +
      '<div class="paper-actions"><button class="btn" type="button" id="dQuit">Terminar la ronda</button></div>';
    var inp = $("dIn");
    inp.addEventListener("input", function () { s.input = inp.value; if (x.kind === "A") inp.style.width = Math.max(10, inp.value.length + 2) + "ch"; inp.classList.remove("bad", "maybe"); saveEx(); });
    inp.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter" && !ev.shiftKey) { ev.preventDefault(); if (s.done) nextDrill(); else checkDrill(); }
    });
    $("dCheck").onclick = checkDrill;
    $("dH1").onclick = function () { if (!s.h1) { s.h1 = true; s.hints++; saveEx(); renderDrill(); } };
    $("dH2").onclick = function () { if (!s.h2) { s.h2 = true; s.hints++; saveEx(); renderDrill(); } };
    $("dRev").onclick = revealDrill;
    $("dNext").onclick = nextDrill;
    $("dQuit").onclick = function () { d.ids = d.ids.slice(0, d.i + (s.done ? 1 : 0)); if (!s.done) d.cur = null; d.i = d.ids.length; saveEx(); renderDrill(); };
    paintDrill();
    if (!s.done) inp.focus({ preventScroll: true });
    saveEx();
  }
  function paintDrill(g) {
    var d = st.drill, x = curItem(), s = curState(), it = x.item, inp = $("dIn"), fb = "";
    inp.classList.remove("ok", "bad", "maybe", "rev");
    if (s.done) { inp.readOnly = true; inp.classList.add(s.ok ? "ok" : "rev"); }
    if (x.kind === "A") {
      if (s.done && s.ok) fb = '<div class="res ok">✓ Correcto</div>' + ruleCardTense(it);
      else if (s.done) fb = '<div class="res rev">Respuesta: ' + h(it.answer) + '</div>' + ruleCardTense(it);
      else if (s.wrong) { fb = '<div class="res bad">✗ No es correcto. Probá de nuevo o pedí una pista.</div>'; inp.classList.add("bad"); }
    } else {
      if (s.done && s.ok) fb = '<div class="res ok">✓ Correcta' + (s.custom ? " (la marcaste como válida)" : "") + '</div><div class="model">Modelo: ' + h(it.answer) + '</div>' + ruleCardStructure(it);
      else if (s.done) fb = '<div class="res rev">Respuesta modelo:</div><div class="model"><b>' + h(it.answer) + '</b></div>' + ruleCardStructure(it);
      else {
        g = g || (s.last && s.last !== "empty" ? C.gradeRewrite(it, s.input, st.custom[it.id]) : null);
        if (g && g.level === "trap") { inp.classList.add("bad"); fb = '<div class="res bad">✗ Revisá esto:</div><ul>' + g.msgs.map(function (m) { return "<li>" + h(m) + "</li>"; }).join("") + '</ul>' + ruleCardStructure(it); }
        else if (g && g.level === "maybe") { inp.classList.add("maybe"); fb = '<div class="res maybe">Puede que esté bien: compará con el modelo.</div>' + diffHtml(g.diff) + '<div class="model">Modelo: <b>' + h(it.answer) + '</b></div><div class="btns"><button class="btn" type="button" id="dMine">La mía también vale</button></div>' + ruleCardStructure(it); }
      }
    }
    $("dFb").innerHTML = fb;
    $("dCheck").disabled = s.done; $("dH1").disabled = s.done || s.h1; $("dH2").disabled = s.done || s.h2; $("dRev").disabled = s.done;
    $("dNext").classList.toggle("primary", s.done); $("dCheck").classList.toggle("primary", !s.done);
    var mine = $("dMine");
    if (mine) mine.onclick = function () {
      var list = st.custom[it.id] || (st.custom[it.id] = []);
      var key = C.customKey(it, s.input); if (list.indexOf(key) < 0) list.push(key);
      resolveDrill(true, true);
    };
    if (s.done) $("dNext").focus({ preventScroll: true });
  }
  function resolveDrill(ok, custom) {
    var d = st.drill, x = curItem(), s = curState();
    s.done = true; s.ok = ok; s.custom = !!custom;
    var firstTry = ok && s.wrong === 0 && !s.revealed;
    record(x.item.id, firstTry);
    d.played++; if (ok) d.okN++;
    if (!firstTry) d.failed.push(x.item.id);
    if (d.review && firstTry && st.items[x.item.id].review && !d.again[x.item.id]) { d.again[x.item.id] = 1; d.ids.push(x.item.id); }
    saveEx(); renderDrill();
  }
  function checkDrill() {
    var x = curItem(), s = curState();
    if (s.done) return;
    s.input = $("dIn").value;
    if (!s.input.trim()) { $("dFb").innerHTML = '<div class="res">Escribí tu respuesta.</div>'; return; }
    if (x.kind === "A") {
      if (C.gradeBlank(x.item, s.input).ok) return resolveDrill(true);
      s.wrong++; saveEx(); return paintDrill();
    }
    var g = C.gradeRewrite(x.item, s.input, st.custom[x.item.id]);
    s.last = g.level;
    if (g.level === "ok") return resolveDrill(true, g.custom);
    if (g.level === "trap") s.wrong++;
    saveEx(); paintDrill(g);
  }
  function revealDrill() {
    var x = curItem(), s = curState();
    if (s.done) return;
    s.revealed = true; s.input = x.item.answer;
    $("dIn").value = s.input;
    resolveDrill(false);
  }
  function nextDrill() {
    var d = st.drill, s = curState();
    if (!s.done) { record(curItem().item.id, false); d.played++; d.failed.push(curItem().item.id); }
    d.i++; d.cur = null; saveEx(); renderDrill(); window.scrollTo(0, 0);
  }
  function renderDrillSummary() {
    var d = st.drill, seen = {};
    var failed = d.failed.filter(function (id) { if (seen[id]) return false; seen[id] = 1; return true; });
    main.innerHTML = '<section class="card result"><h2>Terminaste la ronda: ' + h(d.title) + '</h2><div class="grade">' + d.okN + ' <small>/ ' + d.played + ' · ' + pct(d.okN, d.played) + '%</small></div>' +
      (failed.length ? '<h3 style="margin-top:12px">Para repasar</h3><ul class="failed">' + failed.map(function (id) {
        var x = ITEMS[id];
        return '<li><span class="w">' + h(x.item.answer) + '</span><span class="t">' + h(x.kind === "A" ? x.item.tense + " · (" + x.item.verb + ")" : x.item.key) + '</span></li>';
      }).join("") + '</ul>' : '<p class="muted">No fallaste ninguno. ¡Muy bien!</p>') +
      '<div class="card-actions"><button class="btn primary" type="button" id="dAgain">Otra ronda igual</button><button class="btn" type="button" id="dMenu">Volver al menú</button></div></section>';
    $("dMenu").onclick = function () { st.drill = null; saveEx(); renderMenu(); };
    $("dAgain").onclick = function () {
      var t = d.title, rv = d.review;
      var pool = rv ? reviewIds() : d.title === "Solo Tenses" ? poolWhere(function (x) { return x.kind === "A"; }) : d.title === "Solo Rewrite" ? poolWhere(function (x) { return x.kind === "B"; }) : null;
      if (!pool) { st.drill = null; renderMenu(); $("mChipsGo").click(); return; }
      startDrill(t, pool, rv);
    };
  }

  /* ---------- stats ---------- */
  function bar(name, ok, bad) {
    var n = ok + bad, p = pct(ok, n), cls = p < 50 ? "low" : p < 75 ? "mid" : "high";
    return '<div class="bar' + (n ? "" : " none") + '"><div class="bl"><span class="bn">' + h(name) + ' <span class="muted">(' + n + ')</span></span><div class="track"><div class="fill ' + cls + '" style="width:' + (n ? p : 0) + '%"></div></div></div><span class="pc">' + (n ? p + "%" : "–") + '</span></div>';
  }
  function renderStats() {
    $("exToMenu").hidden = false;
    $("exTopTitle").textContent = "Mi progreso";
    var byT = {}, byS = {}, pass = { ok: 0, bad: 0 };
    Object.keys(st.items).forEach(function (id) {
      var x = ITEMS[id], v = st.items[id]; if (!x) return;
      var k = x.kind === "A" ? x.item.t : GROUP_OF[x.item.structure], m = x.kind === "A" ? byT : byS;
      m[k] = m[k] || { ok: 0, bad: 0 }; m[k].ok += v.ok; m[k].bad += v.bad;
      if (x.kind === "A" && x.item.voice === "passive") { pass.ok += v.ok; pass.bad += v.bad; }
    });
    var rows = EXAMS.map(function (e) {
      var r = st.sets[e.id] || {};
      return '<tr><td>' + h("SET " + e.id) + '</td><td class="ttl">' + h(e.title.toLowerCase().replace(/^\w/, function (c) { return c.toUpperCase(); })) + '</td><td>' + (e.source === "real" ? "Real " + h(e.code) : "Generado") + '</td><td class="num">' + (r.bestExam != null ? grade(r.bestExam) : "–") + '</td><td class="num">' + (r.bestPractice != null ? grade(r.bestPractice) : "–") + '</td><td class="num">' + (r.tries || 0) + '</td></tr>';
    }).join("");
    var customN = Object.keys(st.custom).reduce(function (n, k) { return n + st.custom[k].length; }, 0);
    main.innerHTML = '<div class="ex-grid">' +
      '<section class="card"><h2>Tiempos verbales (parte A)</h2><div class="bars">' + TENSE_ORDER.map(function (t) { var v = byT[t] || { ok: 0, bad: 0 }; return bar(T[t].name, v.ok, v.bad); }).join("") + bar("Voz pasiva (todas)", pass.ok, pass.bad) + '</div></section>' +
      '<section class="card"><h2>Estructuras (parte B)</h2><div class="bars">' + GROUPS.map(function (g) { var v = byS[g[0]] || { ok: 0, bad: 0 }; return bar(g[1], v.ok, v.bad); }).join("") + '</div>' +
      '<p>Para repasar: <b>' + reviewIds().length + '</b> ítems · Respuestas tuyas marcadas como válidas: <b>' + customN + '</b></p></section></div>' +
      '<section class="card"><h2>Exámenes</h2><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Set</th><th>Título</th><th>Tipo</th><th class="num">Mejor nota examen</th><th class="num">Mejor nota práctica</th><th class="num">Veces</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<p class="muted" style="margin:10px 0 0">El porcentaje cuenta solo los aciertos al primer intento y sin revelar la respuesta. Las notas son sobre 6,5.</p></section>' +
      '<div class="paper-actions"><button class="btn" type="button" id="sBack">Volver al menú</button><button class="btn danger" type="button" id="sReset">Reiniciar progreso del modo examen</button></div>';
    $("sBack").onclick = renderMenu;
    $("sReset").onclick = function () {
      openConfirm({ title: "¿Reiniciar el modo examen?", text: "Se borran las notas, las estadísticas, los ítems para repasar y las respuestas que marcaste como válidas. Tu progreso de Vocabulario no se toca.", ok: "Sí, reiniciar", onOk: function () {
        var prefs = st.prefs; st = fresh(); st.prefs = prefs; saveEx(); renderStats();
      } });
    };
    window.scrollTo(0, 0);
  }

  /* ---------- start ---------- */
  window.ExamUI = { showView: showView, state: function () { return st; } };
  showView("home");
})();
