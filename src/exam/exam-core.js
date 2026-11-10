/* Exam mode core: rules, data helpers and the answer checker.
   Shared by the page (inlined at build time) and by the Node tests in tests/. */
(function (root) {
  "use strict";

  /* ---------- verb tenses (names as in English File) ---------- */
  var TENSES = {
    PS:   { name: "Present Simple", form: "verbo base / -s (pasiva: am/is/are + participio)", use: "Hábitos, rutinas, verdades generales y cosas que pasan siempre. También después de when, if, as soon as, in case cuando hablamos del futuro." },
    PC:   { name: "Present Continuous", form: "am/is/are + -ing (pasiva: am/is/are being + participio)", use: "Algo que está pasando ahora o en este período (right now, at the moment, these days). También planes ya arreglados para el futuro." },
    PaS:  { name: "Past Simple", form: "verbo en pasado (pasiva: was/were + participio)", use: "Acciones terminadas en un momento concreto del pasado (yesterday, last year, in 2019, ago)." },
    PaC:  { name: "Past Continuous", form: "was/were + -ing (pasiva: was/were being + participio)", use: "Una acción en progreso en el pasado, muchas veces interrumpida por otra (while, when, as)." },
    PP:   { name: "Present Perfect Simple", form: "have/has + participio (pasiva: have/has been + participio)", use: "Pasado sin momento concreto o con conexión con el presente: experiencias, resultados, so far, since then, ever, never, already, yet." },
    PPC:  { name: "Present Perfect Continuous", form: "have/has been + -ing", use: "Una acción que empezó en el pasado y sigue (o acaba de terminar), con énfasis en la duración: for, since, lately, all day." },
    PaP:  { name: "Past Perfect Simple", form: "had + participio (pasiva: had been + participio)", use: "Algo que pasó antes de otro momento del pasado (by the time, before, already, never… before)." },
    PaPC: { name: "Past Perfect Continuous", form: "had been + -ing", use: "Una acción que venía durando hasta un momento del pasado (for months when…, for years before…)." },
    GT:   { name: "Be going to", form: "am/is/are going to + infinitivo", use: "Planes e intenciones ya decididos, o predicciones con evidencia." },
    WF:   { name: "Future Simple (will)", form: "will + infinitivo (pasiva: will be + participio)", use: "Predicciones, promesas, decisiones del momento y hechos futuros." },
    FC:   { name: "Future Continuous", form: "will be + -ing", use: "Algo que va a estar en progreso en un momento del futuro (this time next week…)." },
    FP:   { name: "Future Perfect", form: "will have + participio", use: "Algo que va a estar terminado antes de un momento del futuro (by the end of…, by the time…)." }
  };

  /* ---------- rewrite structures ---------- */
  var STRUCTURES = {
    "such":       { group: "SUCH / SO", name: "so … that / such … that", formula: "so + adjetivo + that · such + a/an + adjetivo + sustantivo + that",
                    rule: "So va con el adjetivo solo: so successful that. Such va con un sustantivo: such a successful festival that. Con sustantivo contable en singular lleva a/an; con plurales o incontables va sin artículo (such difficult questions, such bad weather).",
                    example: "The festival was so successful that… → It was such a successful festival that…" },
    "indirect":   { group: "Preguntas indirectas", name: "Indirect questions", formula: "Can you tell me / Could you tell me / Do you know + palabra interrogativa (o if) + sujeto + verbo",
                    rule: "Después de la frase de cortesía, la pregunta va con el orden de una afirmación: sujeto + verbo. No se invierte el auxiliar y no se usa do/does/did (el verbo toma el tiempo: starts, bought). Para preguntas de sí/no se usa if o whether.",
                    example: "When does the match start? → Can you tell me when the match starts?" },
    "wish-past":  { group: "WISH", name: "wish + past simple", formula: "I wish + sujeto + past simple",
                    rule: "Para una situación del presente que querés que sea distinta. El verbo va un tiempo para atrás: I don't speak → I wish I spoke. Con be se usa were (también se acepta was).",
                    example: "I'm quite short. → I wish I were taller." },
    "wish-could": { group: "WISH", name: "wish + could", formula: "I wish + sujeto + could + infinitivo",
                    rule: "Para algo que no podés hacer ahora y te gustaría poder: I can't → I wish I could.",
                    example: "I'm sorry I can't go to Australia. → I wish I could go to Australia." },
    "wish-pp":    { group: "WISH", name: "wish + past perfect", formula: "I wish + sujeto + had (not) + participio",
                    rule: "Para arrepentimientos del pasado. Si algo pasó, va en negativo (I shouted → I wish I hadn't shouted); si no pasó, en afirmativo (I didn't call → I wish I had called).",
                    example: "I'm sorry I shouted at you. → I wish I hadn't shouted at you." },
    "time":       { group: "WHEN / AS SOON AS", name: "Future time clauses", formula: "when / as soon as + present simple (o present perfect), will / going to / imperativo",
                    rule: "Después de when, as soon as, before, after o until se usa present simple (o present perfect) aunque se hable del futuro. El will o going to va en la otra cláusula. Si la cláusula de tiempo va primero, se separa con coma.",
                    example: "Taylor will be seventeen soon… → When Taylor is seventeen, she's going to take driving lessons." },
    "relative":   { group: "WHICH / WHO", name: "Non-defining relative clauses", formula: "sustantivo, who / which + información extra, resto de la oración",
                    rule: "Agregan información extra. Van siempre entre comas, con who para personas y which para cosas. Nunca se usa that y no se repite el pronombre (no: which Ann recommended it).",
                    example: "We stayed at the Grand Hotel. Ann recommended it. → We stayed at the Grand Hotel, which Ann recommended to us." },
    "cond2":      { group: "IF (2nd conditional)", name: "Second conditional", formula: "If + past simple, would / could + infinitivo",
                    rule: "Situaciones irreales o hipotéticas del presente o del futuro. En la cláusula con if nunca va would ni will. Lo que es afirmativo en la realidad pasa a negativo en la condicional, y al revés.",
                    example: "I don't visit you because you live far away. → If you didn't live so far away, I would visit you more often." },
    "cond3":      { group: "IF (3rd conditional)", name: "Third conditional", formula: "If + past perfect, would have + participio",
                    rule: "Situaciones imaginarias del pasado. El if va con had + participio y el resultado con would have + participio. Lo que pasó en la realidad se da vuelta: went → if … hadn't …, wouldn't have gone.",
                    example: "I went to the concert because my friend gave me a ticket. → If my friend hadn't given me a ticket, I wouldn't have gone to the concert." },
    "in-case":    { group: "IN CASE", name: "in case", formula: "acción de precaución + in case + sujeto + present simple",
                    rule: "Indica una precaución: hacés algo porque puede llegar a pasar otra cosa. Después de in case va present simple, nunca will.",
                    example: "Mary will probably need to contact you… → Give Mary your mobile number in case she needs to contact you." },
    "were":       { group: "WERE", name: "If I were you", formula: "If I were you, I would / wouldn't + infinitivo",
                    rule: "Se usa para dar consejos. Va siempre were (no was) y el resultado con would o wouldn't + infinitivo, sin should.",
                    example: "You shouldn't use your phone so much. → If I were you, I wouldn't use my phone so much." },
    "the-the":    { group: "THE … THE …", name: "Double comparatives", formula: "The + comparativo (+ sujeto + verbo), the + comparativo (+ sujeto + verbo)",
                    rule: "Dos cosas que cambian juntas. Adjetivos cortos con -er (the harder, the better, the earlier); largos con more (the more expensive). Con un verbo solo: the more / the less (the more you read). Hacen falta los dos comparativos.",
                    example: "If you use a lot of electricity, your bill will be high. → The more electricity you use, the higher your bill will be." }
  };

  var KEY_RE = {
    "SUCH … THAT": /\bsuch\b[\s\S]*\bthat\b/, "SUCH": /\bsuch\b/, "SO": /\bso\b/,
    "CAN YOU TELL ME": /\bcan you tell me\b/, "COULD YOU TELL ME": /\bcould you tell me\b/, "DO YOU KNOW": /\bdo you know\b/,
    "WISH": /\bwish(es|ed)?\b/, "WHEN": /\bwhen\b/, "AS SOON AS": /\bas soon as\b/,
    "WHICH": /\bwhich\b/, "WHO": /\bwho\b/, "IF": /\bif\b/, "IN CASE": /\bin case\b/, "WERE": /\bwere\b/,
    "THE … THE …": /\bthe\b[\s\S]*\bthe\b/
  };

  /* ---------- normalization ---------- */
  var SPELL = {
    travelled: "traveled", travelling: "traveling", traveller: "traveler", cancelled: "canceled", cancelling: "canceling",
    labelled: "labeled", modelled: "modeled", colour: "color", colours: "colors", favourite: "favorite",
    neighbour: "neighbor", neighbours: "neighbors", neighbourhood: "neighborhood", grey: "gray", centre: "center",
    theatre: "theater", programme: "program", jewellery: "jewelry", practise: "practice", practised: "practiced",
    practising: "practicing", learnt: "learned", dreamt: "dreamed", spelt: "spelled", burnt: "burned",
    gotten: "got", lain: "lain", organiser: "organizer", organisers: "organizers", okay: "ok", whilst: "while"
  };
  var IZE = /^(real|recogn|organ|apolog|critic|memor|special|summar|emphas|priorit|categor|minim|maxim|modern|sympath|visual|final|util|civil|global|harmon|custom|stabil|standard|symbol|author|character|familiar|fantas|hospital|immun|industrial|legal|local|natural|normal|personal|popular|public|revolution|social|computer|energ|agon|tranquil)is(e|ed|es|ing|ation|ations|er|ers)$/;

  function spell(w) {
    if (SPELL[w]) return SPELL[w];
    var m = w.match(IZE);
    return m ? m[1] + "iz" + m[2] : w;
  }

  function norm(s, keepCommas) {
    s = String(s == null ? "" : s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
      .replace(/[‘’ʼ`´]/g, "'")
      .replace(/[“”"«»]/g, " ")
      .replace(/\s+[-–—]+\s+|[–—]/g, ", ")
      .replace(/[;:]/g, ", ")
      .replace(/[.!?]+(\s|$)/g, " ")
      .replace(/\s*,\s*/g, ", ")
      .replace(/(,\s*)+/g, ", ")
      .replace(/\s+/g, " ").trim()
      .replace(/^,\s*|,\s*$/g, "")
      .replace(/\b(do|does|did|is|are|was|were|has|have|had|could|would|should|must|need)nt\b/g, "$1n't")
      .replace(/\b(wo|ca)nt\b/g, "$1n't").replace(/\bim\b/g, "i'm").replace(/\bive\b/g, "i've");
    if (!keepCommas) s = s.replace(/,/g, "").replace(/\s+/g, " ").trim();
    return s;
  }

  /* expand contractions; 's and 'd are ambiguous, so every reading is kept */
  function contractionVariants(s) {
    s = " " + s + " ";
    s = s.replace(/\bwon't\b/g, "will not").replace(/\bcan't\b/g, "cannot").replace(/\bshan't\b/g, "shall not")
      .replace(/\bain't\b/g, "is not").replace(/(\w)n't\b/g, "$1 not").replace(/\bcan not\b/g, "cannot")
      .replace(/(\w)'m\b/g, "$1 am").replace(/(\w)'re\b/g, "$1 are").replace(/(\w)'ve\b/g, "$1 have")
      .replace(/(\w)'ll\b/g, "$1 will");
    var parts = s.split(/(\w'[sd])\b/);
    var out = [""];
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i], alts;
      if (i % 2 === 1) {
        var w = p.slice(0, -2), c = p.slice(-1);
        alts = c === "d" ? [w + " had", w + " would"] : [w + "'s", w + " is", w + " has"];
      } else alts = [p];
      var next = [];
      for (var a = 0; a < out.length && next.length < 200; a++)
        for (var b = 0; b < alts.length; b++) next.push(out[a] + alts[b]);
      out = next;
    }
    return out.map(function (v) {
      return v.replace(/\s+/g, " ").trim().split(" ").map(function (w) {
        var m = w.match(/^([a-z']+)(,?)$/);
        return m ? spell(m[1]) + m[2] : w;
      }).join(" ");
    });
  }

  function variants(s, keepCommas) { return contractionVariants(norm(s, keepCommas)); }

  /* "If I [were|was] rich" -> every combination */
  function expandPattern(p) {
    var m = p.match(/\[([^\[\]]*)\]/);
    if (!m) return [p.replace(/\s+/g, " ").replace(/\s+([,.?!])/g, "$1").trim()];
    var out = [];
    m[1].split("|").forEach(function (alt) {
      expandPattern(p.slice(0, m.index) + alt + p.slice(m.index + m[0].length)).forEach(function (x) { out.push(x); });
    });
    return out;
  }

  function variantSet(list, keepCommas) {
    var set = {};
    list.forEach(function (pat) {
      expandPattern(pat).forEach(function (s) { variants(s, keepCommas).forEach(function (v) { set[v] = 1; }); });
    });
    return set;
  }
  function hits(input, set, keepCommas) {
    var vs = variants(input, keepCommas);
    for (var i = 0; i < vs.length; i++) if (set[vs[i]]) return true;
    return false;
  }

  /* ---------- traps ---------- */
  function keyTrap(key) {
    var re = KEY_RE[key];
    return { re: new RegExp("^(?![\\s\\S]*" + re.source + ")"), msg: "Tenés que usar " + key + " sin cambiarla.", kind: "key" };
  }

  var STRUCT_TRAPS = {
    "indirect": [
      { re: /\b(tell me|know)\s+(what|where|when|why|how|who|which)(\s+(time|long|much|many|platform|day|often))?\s+(do|does|did)\s+(?!not\b)\w+/,
        msg: "En una pregunta indirecta no se usa do / does / did: el verbo va directo y en su tiempo (…when the match starts, …where Mike bought…)." },
      { re: /\b(tell me|know)\s+(what|where|when|why|how|who|which)(\s+(time|long|much|many|platform|day|often))?\s+(is|are|was|were|will|can|has|have|should|would|could)\s+(the|a|an|i|you|he|she|it|we|they|my|your|his|her|our|their|this|that|these|those)\b/,
        msg: "No inviertas sujeto y verbo: en la pregunta indirecta va sujeto + verbo (…where the orchestra is playing, no where is the orchestra playing)." },
      { re: /\bknow\s+(has|have|is|are|did|does|do|will|can|was|were)\s+\w+/,
        msg: "Si la pregunta original es de sí/no, la indirecta va con if o whether: Do you know if Lucy has finished…?" }
    ],
    "wish": [
      { re: /\bwish(es)?\s+(i|we|he|she|they|you|my|our|it)\b[^,]*?\bwould\b/,
        msg: "No uses would después de wish para hablar de vos mismo o de una situación: usá past simple, could o past perfect." },
      { re: /\bwish(es)?\s+\w+(\s+\w+)?\s+(will|can|am|is|are|do not|does not|has|have)\b/,
        msg: "Después de wish el verbo va un tiempo para atrás: past simple, could o past perfect (nunca presente ni will)." }
    ],
    "wish-pp": [
      { re: /\bwish(es)?\s+(i|he|she|we|they|you)\s+(did not|did|\w+ed|went|bought|spent|sold|took|forgot|got|made|was|were|could|spoke|wrote|knew)\b/,
        msg: "Es un arrepentimiento del pasado: va wish + past perfect (had / hadn't + participio)." }
    ],
    "wish-past": [
      { re: /\bwish(es)?\s+\w+(\s+\w+)?\s+had\s+(been|\w+ed|gone|known|seen|had|lived|spoken)\b/,
        msg: "Es una situación del presente: va wish + past simple (I wish I spoke / were…), no past perfect." }
    ],
    "time": [
      { re: /\b(when|as soon as)\s+(\w+\s+){1,3}?(will|am going to|is going to|are going to)\b/,
        msg: "Después de when / as soon as va present simple (o present perfect), nunca will ni going to." }
    ],
    "in-case": [
      { re: /\bin case\s+(\w+\s+){1,4}?(will|would|am going to|is going to|are going to)\b/,
        msg: "Después de in case va present simple, no will: …in case it rains." },
      { re: /\bin case of\b/, msg: "Acá no sirve in case of + sustantivo: usá in case + sujeto + present simple." }
    ],
    "cond2": [
      { re: /\bif\s+(\w+\s+){1,3}?(would|will)\b/,
        msg: "En el 2nd conditional la cláusula con if va con past simple: nunca would ni will después de if." },
      { re: /\bif\b[^,]*,\s*\w+(\s+\w+)?\s+will\b/,
        msg: "En el resultado del 2nd conditional va would / could + infinitivo, no will." }
    ],
    "cond3": [
      { re: /\bif\s+(\w+\s+){1,3}?(would|will)\b/,
        msg: "En el 3rd conditional la cláusula con if va con had + participio: nunca would después de if." },
      { re: /\bif\s+(\w+\s+){1,3}?(did not|did|was not|were not|was|were)\b/,
        msg: "En el 3rd conditional el if va con past perfect (had / hadn't + participio), no con past simple." },
      { re: /\b(would|could)(?:\s+not)?\s+(?!have\b|not\b)[a-z]+/,
        msg: "En el 3rd conditional el resultado es would have / wouldn't have + participio." }
    ],
    "were": [
      { re: /\bif i was you\b/, msg: "La estructura es If I WERE you (no was)." },
      { re: /\bif i were you,?\s+(i\s+)?(will|should|must)\b/, msg: "Después de If I were you va I would / I wouldn't + infinitivo (sin should ni will)." },
      { re: /\bif i were you,?\s+you\b/, msg: "El consejo va en primera persona: If I were you, I would…" }
    ],
    "such": [
      { re: /\bso\s+(a|an)\b/, msg: "So va con el adjetivo solo (so + adjetivo + that). Si hay sustantivo, usá such." },
      { re: /\bsuch\s+(a\s+|an\s+)?(very\s+)?\w+\s+that\b/, msg: "Después de such va un sustantivo: such + a/an + adjetivo + sustantivo + that." }
    ],
    "the-the": [
      { re: /\bthe more\s+(good|bad|well|hard|easy|fast|long|short|old|young|big|small|cheap|early|late|cold|hot|dark|high|low|rich|wise|near|close)\b/,
        msg: "Los adjetivos cortos forman el comparativo con -er: the better, the harder, the earlier (no the more good)." },
      { re: /^(?![\s\S]*\bthe\s+(more|less|fewer|better|worse|[a-z]+er)\b[\s\S]*\bthe\s+(more|less|fewer|better|worse|[a-z]+er)\b)/,
        msg: "Faltan los dos comparativos: The + comparativo …, the + comparativo …" }
    ],
    "relative": [
      { re: /,\s*that\b/, msg: "En las non-defining relative clauses no se usa that: va who (personas) o which (cosas)." },
      { re: /[a-z0-9]\s+(which|who)\b/, msg: "Las non-defining relative clauses van entre comas: …the Grand Hotel, which…" },
      { re: /\b(which|who)\s+(\w+\s+){1,3}?(it|him|her|them)\b(\s+(to|for|in|at)\b|\s*,|$)/, msg: "No repitas el pronombre: which ya reemplaza a it (…which Ann recommended to us)." }
    ]
  };
  STRUCT_TRAPS["wish-could"] = [{ re: /\bwish(es)?\s+\w+\s+can\b/, msg: "Para algo que no podés hacer: I wish I could…, no can." }];

  function trapsFor(item) {
    var list = [keyTrap(item.key)];
    var s = item.structure;
    if (s.indexOf("wish") === 0) list = list.concat(STRUCT_TRAPS.wish);
    list = list.concat(STRUCT_TRAPS[s] || []);
    if (s === "such" && item.countable) list.push({ re: /\bsuch\s+(?!a\b|an\b)\w+\s+\w+/, msg: "Con un sustantivo contable en singular va such + a/an: such a successful festival." });
    return list.concat(item.traps || []);
  }

  function firedTraps(item, input) {
    var vs = variants(input, true);
    var msgs = [];
    trapsFor(item).forEach(function (t) {
      if (vs.every(function (v) { return t.re.test(v); }) && msgs.indexOf(t.msg) < 0) msgs.push(t.msg);
    });
    return msgs;
  }

  /* ---------- word diff ---------- */
  function diffWords(student, model) {
    function toks(x) {
      return String(x || "").replace(/[\u2018\u2019]/g, "'").replace(/\s+([,.?!])/g, "$1").split(/\s+/).filter(Boolean)
        .map(function (w) { return { w: w, k: norm(w, false) }; }).filter(function (t) { return t.k; });
    }
    var a = toks(student), b = toks(model), n = a.length, m = b.length, L = [], i, j;
    for (i = 0; i <= n; i++) { L.push([]); for (j = 0; j <= m; j++) L[i].push(0); }
    for (i = n - 1; i >= 0; i--) for (j = m - 1; j >= 0; j--)
      L[i][j] = a[i].k === b[j].k ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    var out = []; i = 0; j = 0;
    while (i < n && j < m) {
      if (a[i].k === b[j].k) { out.push({ t: "same", w: a[i].w }); i++; j++; }
      else if (L[i + 1][j] >= L[i][j + 1]) { out.push({ t: "extra", w: a[i].w }); i++; }
      else { out.push({ t: "missing", w: b[j].w }); j++; }
    }
    while (i < n) out.push({ t: "extra", w: a[i++].w });
    while (j < m) out.push({ t: "missing", w: b[j++].w });
    return out;
  }

  /* ---------- graders ---------- */
  function prepBlank(b) {
    if (!b._set) b._set = variantSet(b.accept, false);
    return b;
  }
  function gradeBlank(b, input) {
    if (!String(input || "").trim()) return { ok: false, empty: true };
    return { ok: hits(input, prepBlank(b)._set, false) };
  }

  function prepRewrite(r) {
    if (!r._set) r._set = variantSet(r.accept, r.structure === "relative");
    return r;
  }
  function gradeRewrite(r, input, custom) {
    if (!String(input || "").trim()) return { level: "empty", msgs: [] };
    prepRewrite(r);
    var keep = r.structure === "relative";
    if (hits(input, r._set, keep)) return { level: "ok", msgs: [] };
    if (custom && custom.length) {
      var cs = {}; custom.forEach(function (c) { cs[c] = 1; });
      if (hits(input, cs, keep)) return { level: "ok", custom: true, msgs: [] };
    }
    var msgs = firedTraps(r, input);
    return { level: msgs.length ? "trap" : "maybe", msgs: msgs, diff: diffWords(input, r.answer) };
  }
  function customKey(r, input) { return variants(input, r.structure === "relative")[0]; }

  /* ---------- data helpers ---------- */
  function hint2(answer) {
    var w = answer.split(" ");
    var n = Math.max(2, Math.min(4, Math.ceil(w.length / 3)));
    return w.slice(0, n).join(" ") + " …";
  }

  var exams = [];
  function exam(def) {
    var id = def.id;
    def.blanks.forEach(function (b, i) {
      b.n = i + 1;
      b.id = "S" + id + "-A" + b.n;
      b.setId = id;
      b.voice = b.voice || "active";
      b.tense = TENSES[b.t].name;
    });
    def.rewrites.forEach(function (r, i) {
      r.n = i + 1;
      r.id = "S" + id + "-B" + r.n;
      r.setId = id;
      var st = STRUCTURES[r.structure];
      r.hint1 = r.hint1 || st.formula;
      r.hint2 = r.hint2 || hint2(r.answer);
      r.rule = r.rule || st.rule;
      r.accept = [r.answer].concat(r.accept || []);
      r.traps = r.traps || [];
    });
    exams.push(def);
    return def;
  }
  /* blank: verb in brackets, main answer, tense code, cue (exact words from the text), why, options */
  function B(verb, answer, t, cue, why, o) {
    o = o || {};
    return { verb: verb, answer: answer, accept: [answer].concat(o.acc || []), t: t, voice: o.pass ? "passive" : "active", cue: cue, why: why };
  }
  /* rewrite: key, structure, original, answer, extra accepted patterns, options */
  function R(key, structure, original, answer, acc, o) {
    o = o || {};
    return { key: key, structure: structure, original: original, answer: answer, accept: acc || [], countable: !!o.countable, traps: o.traps };
  }

  /* sentence(s) around a gap, for the drills */
  function contextFor(ex, n) {
    var flat = ex.text.replace(/\n+/g, " ");
    var sents = flat.match(/[^.!?]+[.!?]+["”’)]*\s*|[^.!?]+$/g) || [flat];
    var idx = -1;
    for (var i = 0; i < sents.length; i++) if (sents[i].indexOf("{{" + n + "}}") >= 0) { idx = i; break; }
    if (idx < 0) return flat;
    var start = idx > 0 ? idx - 1 : idx;
    return sents.slice(start, idx + 1).join("").trim();
  }

  var api = {
    TENSES: TENSES, STRUCTURES: STRUCTURES, KEY_RE: KEY_RE,
    norm: norm, variants: variants, expandPattern: expandPattern,
    gradeBlank: gradeBlank, gradeRewrite: gradeRewrite, firedTraps: firedTraps, trapsFor: trapsFor,
    diffWords: diffWords, customKey: customKey, contextFor: contextFor,
    exam: exam, B: B, R: R, exams: exams
  };
  root.ExamCore = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
