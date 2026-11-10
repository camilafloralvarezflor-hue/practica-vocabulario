/* Exam mode + home screen end-to-end test with Playwright.
   Run: node tests/e2e-exam.js index.html <screenshot dir> */
const { chromium } = require("playwright");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const URL = "file://" + path.resolve(ROOT, process.argv[2] || "index.html");
const BACKUP = "file://" + path.resolve(ROOT, "practica-vocabulario.backup.html");
const OUT = process.argv[3] || path.join(ROOT, "tests", "shots");
const KEY = "practica-vocabulario-v1";
let fails = 0, n = 0;
const ok = (c, m) => { n++; console.log((c ? "PASS " : "FAIL ") + m); if (!c) fails++; };

(async () => {
  require("fs").mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1100, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", e => errors.push(e.message));
  page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });

  /* 1) progress made with the old file survives (same localStorage key) */
  await page.goto(BACKUP);
  await page.uncheck("#fShuffle");
  await page.click("#bReveal"); await page.click("#bNext");
  await page.click("#boxes .box"); await page.keyboard.type("x"); await page.click("#bReveal"); await page.click("#bNext");
  const before = await page.evaluate(k => localStorage.getItem(k), KEY);
  const oldPoints = await page.textContent("#sPoints");
  await page.goto(URL);
  ok(await page.isVisible("#homeView") && await page.isHidden("#vocabView") && await page.isHidden("#examView"), "al abrir se ve la pantalla de inicio");
  ok((await page.title()) === "Práctica de inglés — 5to", "título nuevo: " + await page.title());
  ok((await page.$$(".home-card")).length === 2, "dos tarjetas grandes: Vocabulario y Examen");
  ok((await page.evaluate(k => localStorage.getItem(k), KEY)) === before, "el progreso de Vocabulario sigue igual (misma KEY)");
  ok((await page.textContent("#homeVocabMeta")).includes("/ 2"), "la tarjeta de Vocabulario muestra el puntaje guardado");
  await page.click('[data-go="vocab"]');
  ok((await page.textContent("#sPoints")) === oldPoints, "en el modo Vocabulario se ve el mismo puntaje: " + oldPoints);
  ok(await page.isVisible("#boxes .box"), "el juego de vocabulario funciona igual");
  await page.click('#vocabView [data-go="home"]');
  ok(await page.isVisible("#homeView"), "el botón Inicio vuelve a la pantalla de inicio");

  /* 2) practice mode on SET 1 */
  await page.click('[data-go="exam"]');
  ok(await page.isVisible("#mStartExam") && await page.isVisible("#mStartPractice"), "menú del examen con examen completo y práctica");
  await page.selectOption("#mSetPractice", "1");
  await page.click("#mStartPractice");
  ok((await page.$$(".gap-in")).length === 10 && (await page.$$(".rw-in")).length === 7, "el examen tiene 10 huecos dentro del texto y 7 oraciones");
  ok(await page.$eval(".gap-in", el => el.closest(".ex-text") !== null), "los huecos están dentro del párrafo, como en el examen");
  await page.fill('.gap-in[data-n="1"]', "Turns");
  await page.press('.gap-in[data-n="1"]', "Enter");
  ok((await page.getAttribute('.gap-in[data-n="1"]', "class")).includes("ok"), "hueco 1 correcto con Enter (sin distinguir mayúsculas)");
  await page.click('.gap-in[data-n="2"]');
  await page.fill('.gap-in[data-n="2"]', "always hated");
  await page.press('.gap-in[data-n="2"]', "Enter");
  ok((await page.getAttribute('.gap-in[data-n="2"]', "class")).includes("bad"), "hueco 2 incorrecto queda en rojo");
  await page.click("#gpH1");
  ok(await page.isVisible(".cue.on") && (await page.textContent(".cue.on")) === "ever since", "Pista 1 resalta «ever since» en el texto");
  await page.click("#gpH2");
  ok((await page.textContent("#gpFb")).includes("Present Perfect Simple"), "Pista 2 dice el tiempo verbal");
  await page.fill('.gap-in[data-n="2"]', "have always hated");
  await page.press('.gap-in[data-n="2"]', "Enter");
  ok((await page.getAttribute('.gap-in[data-n="2"]', "class")).includes("ok"), "después de la pista, el hueco 2 se acepta");
  await page.click('.gap-in[data-n="7"]');
  await page.click("#gpRev");
  ok((await page.inputValue('.gap-in[data-n="7"]')) === "were ordered" && (await page.getAttribute('.gap-in[data-n="7"]', "class")).includes("rev"), "Revelar muestra la respuesta en otro color");
  ok((await page.textContent("#gpFb")).includes("pasiva"), "la explicación menciona la voz pasiva");
  await page.fill('.rw-in[data-n="3"]', "I wish I didn't shout at you.");
  await page.click('.rw[data-n="3"] [data-act="check"]');
  ok((await page.textContent('[data-fb="3"]')).includes("arrepentimiento del pasado"), "rewrite 3: la trampa de wish explica el error");
  ok((await page.textContent('[data-fb="3"]')).includes("wish + past perfect"), "rewrite 3: se ve la tarjeta con la regla");
  await page.click('.rw[data-n="3"] [data-act="h1"]');
  await page.click('.rw[data-n="3"] [data-act="h2"]');
  ok((await page.textContent('.rw[data-n="3"] .hint-line')).includes("I wish I"), "pistas del rewrite: fórmula y comienzo de la oración");
  await page.fill('.rw-in[data-n="3"]', "i wish i hadn't shouted at you");
  await page.press('.rw-in[data-n="3"]', "Enter");
  ok((await page.textContent('[data-fb="3"]')).includes("Correcta"), "rewrite 3 corregido con Enter (sin punto ni mayúsculas)");
  await page.fill('.rw-in[data-n="1"]', "It was such a successful festival that they decided to have one more.");
  await page.press('.rw-in[data-n="1"]', "Enter");
  ok((await page.textContent('[data-fb="1"]')).includes("Puede que esté bien"), "variante no prevista: «puede que esté bien» con diff");
  ok(await page.isVisible('[data-fb="1"] del') && await page.isVisible('[data-fb="1"] ins'), "el diff marca lo que sobra y lo que falta");
  await page.click('[data-mine="1"]');
  ok((await page.textContent('[data-fb="1"]')).includes("la marcaste como válida"), "«La mía también vale» la cuenta como correcta");

  /* resume after reload */
  await page.fill('.rw-in[data-n="5"]', "borrador");
  await page.reload();
  await page.click('[data-go="exam"]');
  ok((await page.textContent(".banner")).includes("sin terminar"), "al recargar, el menú ofrece continuar la práctica");
  await page.click("#mResume");
  ok((await page.inputValue('.rw-in[data-n="5"]')) === "borrador" && (await page.getAttribute('.gap-in[data-n="1"]', "class")).includes("ok"), "al recargar, la práctica sigue donde estaba");
  await page.click("#pFinish");
  await page.click("#mOk");
  const pr = await page.textContent("#pResult");
  ok(pr.includes("/ 6,5"), "la práctica termina con nota sobre 6,5: " + pr.match(/[\d,]+ \/ 6,5/));
  ok(pr.includes("Pistas usadas: 4"), "el resumen registra las pistas usadas");

  /* 3) full exam with all the right answers */
  await page.click("#pOther");
  await page.selectOption("#mSetExam", "4");
  await page.check("#mTimer");
  await page.click("#mStartExam");
  ok(await page.isVisible("#pTimer"), "cronómetro visible cuando se activa");
  ok(!(await page.isVisible("#gapPanel")) && (await page.$$('.rw [data-act]')).length === 0, "en modo examen no hay pistas ni corrección inmediata");
  const answers = await page.evaluate(() => { const e = window.EXAMS[3]; return { a: e.blanks.map(b => b.answer), b: e.rewrites.map(r => r.answer) }; });
  for (let i = 0; i < 10; i++) await page.fill(`.gap-in[data-n="${i + 1}"]`, answers.a[i]);
  for (let i = 0; i < 7; i++) await page.fill(`.rw-in[data-n="${i + 1}"]`, answers.b[i]);
  await page.screenshot({ path: OUT + "/desktop-light-exam-half.png" });
  await page.click("#pSubmit");
  let grade = await page.textContent("#pResult .grade");
  ok(grade.startsWith("6,5") && grade.includes("100%"), "todo bien = 6,5 / 6,5 (100%): " + grade);
  ok((await page.textContent("#pResult")).includes("Tiempo:"), "el resultado muestra el tiempo");
  ok((await page.$$("#gapReview li")).length === 11, "corrección de la parte A con explicación por hueco");

  /* 4) full exam with mistakes and «la mía también vale» */
  await page.click("#pAgain");
  await page.fill('.gap-in[data-n="1"]', "didn't expect");
  await page.fill('.gap-in[data-n="2"]', "lay");
  await page.fill('.rw-in[data-n="1"]', "Do you know where is the orchestra playing tonight?");
  await page.fill('.rw-in[data-n="2"]', "I wish I had phoned her for her birthday.");
  await page.click("#pSubmit");
  ok(await page.isVisible("#modal"), "con respuestas vacías pide confirmación dentro de la página");
  await page.click("#mOk");
  grade = await page.textContent("#pResult .grade");
  ok(grade.startsWith("0,3 "), "1 hueco bien y 0 rewrites = 0,3: " + grade);
  ok((await page.textContent('[data-fb="1"]')).includes("No inviertas"), "la pregunta indirecta mal armada muestra la trampa");
  await page.click('[data-mine="2"]');
  grade = await page.textContent("#pResult .grade");
  ok(grade.startsWith("0,8 "), "«La mía también vale» suma 0,5 a la nota: " + grade);
  await page.screenshot({ path: OUT + "/desktop-light-exam-result.png", fullPage: true });

  /* 5) drills */
  await page.click("#pOther");
  await page.selectOption("#mSize", "10");
  await page.click("#mRewrite");
  ok((await page.textContent(".drill-score")).includes("1 de 10"), "Solo Rewrite arma una ronda de 10");
  ok(await page.isVisible(".rw-orig .kw"), "se ve la oración original con la palabra clave");
  await page.click("#dRev");
  ok((await page.textContent("#dFb")).includes("Respuesta modelo"), "Revelar en ejercicios sueltos muestra el modelo y la regla");
  await page.click("#dNext");
  ok((await page.textContent(".drill-score")).includes("2 de 10"), "Siguiente pasa al próximo ítem");
  await page.click("#dQuit");
  ok(await page.isVisible(".result .grade"), "terminar la ronda muestra el resumen");
  await page.click("#dMenu");
  await page.click("#mTenses");
  const ctxText = await page.textContent(".drill-ctx");
  ok(ctxText.length > 30 && await page.isVisible("#dIn"), "Solo Tenses muestra el hueco con su contexto");
  await page.click("#exToMenu");
  ok(await page.isVisible(".banner"), "una ronda a medias se puede continuar desde el menú");
  await page.click("#mDiscardDrill");
  await page.click('#mChipsS label:has(input[value="s:wish"])');
  await page.click("#mChipsGo");
  const kws = [];
  for (let i = 0; i < 10; i++) { kws.push(await page.textContent(".rw-orig .kw")); await page.click("#dNext"); }
  ok(kws.every(k => k === "(WISH)"), "el filtro por estructura trae solo ítems de WISH");
  await page.click("#dMenu");
  await page.click('#mChipsS label:has(input[value="s:wish"])');
  await page.click('#mChipsT label:has(input[value="t:FP"])');
  await page.click("#mChipsGo");
  const fp = await page.evaluate(() => { const s = window.ExamUI.state(); return s.drill.ids.every(id => /-A/.test(id)); });
  ok(fp, "el filtro por tiempo verbal trae solo huecos de la parte A");
  await page.click("#exToMenu");
  await page.click("#mDiscardDrill");

  /* review until right twice in a row */
  const rvBefore = +(await page.textContent("#mReview")).match(/\d+/)[0];
  ok(rvBefore > 0, "«Repasar mis errores» tiene ítems: " + rvBefore);
  await page.click("#mReview");
  const firstId = await page.evaluate(() => window.ExamUI.state().drill.ids[0]);
  const ans = await page.evaluate(id => { const e = window.EXAMS; for (const x of e) for (const it of x.blanks.concat(x.rewrites)) if (it.id === id) return it.answer; }, firstId);
  await page.fill("#dIn", ans); await page.press("#dIn", "Enter");
  const again = await page.evaluate(id => window.ExamUI.state().drill.ids.filter(x => x === id).length, firstId);
  ok(again === 2, "en el repaso, un acierto lo vuelve a preguntar (tiene que acertar 2 veces seguidas)");
  ok(await page.evaluate(id => window.ExamUI.state().items[id].review, firstId), "después de 1 acierto todavía queda para repasar");
  await page.evaluate(id => { const s = window.ExamUI.state(); s.drill.i = s.drill.ids.lastIndexOf(id); s.drill.cur = null; }, firstId);
  await page.click("#exToMenu"); await page.click("#mResumeDrill");
  await page.fill("#dIn", ans); await page.press("#dIn", "Enter");
  ok(!(await page.evaluate(id => window.ExamUI.state().items[id].review, firstId)), "con 2 aciertos seguidos sale del repaso");

  /* 6) stats and reset */
  await page.click("#exToMenu");
  await page.click("#mStats");
  ok((await page.$$(".tbl tbody tr")).length === 20, "la tabla tiene los 20 sets");
  ok((await page.textContent(".tbl tbody tr:nth-child(4)")).includes("6,5"), "SET 4 muestra la mejor nota 6,5");
  ok((await page.$$(".bar")).length === 13 + 10, "barras por tiempo verbal y por estructura");
  await page.screenshot({ path: OUT + "/desktop-light-stats.png", fullPage: true });
  await page.click("#sReset");
  ok(await page.isVisible("#modal") && (await page.textContent("#mTitle")).includes("modo examen"), "reiniciar pide confirmación con el modal de la página");
  await page.click("#mCancel");
  ok((await page.textContent(".tbl tbody tr:nth-child(4)")).includes("6,5"), "Cancelar no borra nada");
  await page.click("#sReset"); await page.click("#mOk");
  ok(!(await page.textContent(".tbl tbody")).includes("6,5"), "el modo examen queda en cero");
  ok((await page.evaluate(k => localStorage.getItem(k), KEY)) === before, "reiniciar el examen no toca el progreso de Vocabulario");
  ok(await page.evaluate(k => !!localStorage.getItem(k + "-exam"), KEY), "el modo examen usa su propia clave (KEY + '-exam')");

  ok(errors.length === 0, "sin errores en la consola " + errors.join(" | "));

  /* 7) screenshots + no horizontal scroll, phone and desktop, light and dark */
  for (const [label, opts] of [
    ["mobile-light", { viewport: { width: 360, height: 780 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, colorScheme: "light" }],
    ["mobile-dark", { viewport: { width: 360, height: 780 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, colorScheme: "dark" }],
    ["desktop-dark", { viewport: { width: 1100, height: 860 }, colorScheme: "dark" }]
  ]) {
    const c = await browser.newContext(opts), p = await c.newPage(), errs = [];
    p.on("pageerror", e => errs.push(e.message));
    await p.goto(URL);
    const over = [];
    const check = async () => over.push(await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth));
    await p.screenshot({ path: `${OUT}/${label}-home.png` }); await check();
    await p.click('[data-go="vocab"]'); await p.screenshot({ path: `${OUT}/${label}-vocab.png` }); await check();
    await p.click('#vocabView [data-go="home"]');
    await p.click('[data-go="exam"]'); await check();
    await p.selectOption("#mSetPractice", "2"); await p.click("#mStartPractice");
    await p.fill('.gap-in[data-n="1"]', "hasn't done"); await p.press('.gap-in[data-n="1"]', "Enter");
    await p.click('.gap-in[data-n="2"]'); await p.fill('.gap-in[data-n="2"]', "worked"); await p.press('.gap-in[data-n="2"]', "Enter"); await p.click("#gpH1");
    await p.fill('.rw-in[data-n="2"]', "If I was you, I wouldn't use my phone so much."); await p.press('.rw-in[data-n="2"]', "Enter");
    await check();
    await p.screenshot({ path: `${OUT}/${label}-exam-half.png`, fullPage: true });
    await p.click("#pFinish"); await p.click("#mOk"); await check();
    await p.evaluate(() => window.scrollTo(0, 0));
    await p.screenshot({ path: `${OUT}/${label}-exam-result.png` });
    await p.click("#exToMenu"); await p.click("#mRewrite"); await check();
    await p.click("#exToMenu"); await p.click("#mStats"); await check();
    ok(Math.max(...over) <= 0, `${label}: sin scroll horizontal en ninguna pantalla (${over.join(",")})`);
    ok(errs.length === 0, `${label}: sin errores de JavaScript`);
    await c.close();
  }

  await browser.close();
  console.log(fails ? `\n${fails} FALLAS de ${n}` : `\nTODO OK (${n} comprobaciones)`);
  process.exit(fails ? 1 : 0);
})();
