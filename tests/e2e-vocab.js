/* Vocabulary mode end-to-end test. Run: node tests/e2e-vocab.js index.html <screenshot dir> */
const { chromium } = require('playwright');
const path = require('path');
const URL = 'file://' + path.resolve(process.argv[2]);
const OUT = process.argv[3];
let fails = 0;
async function pickTopic(p, u){
  await p.evaluate(() => { document.getElementById('topicsBox').open = true; });
  if (!(await p.isDisabled('#tClear'))) await p.click('#tClear');
  if (u !== 'all') await p.click(`.tchip[data-unit="${u}"]`);
}
const ok = (cond, msg) => { console.log((cond ? 'PASS ' : 'FAIL ') + msg); if (!cond) fails++; };

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 900, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(URL); await page.click('[data-go="vocab"]');

  const stats = () => page.evaluate(() => ({
    points: document.getElementById('sPoints').textContent.replace(/\s+/g, ' ').trim(),
    pct: document.getElementById('sPct').textContent, streak: document.getElementById('sStreak').textContent,
    best: document.getElementById('sBest').textContent, left: document.getElementById('sLeft').textContent,
    missed: document.getElementById('missedCount').textContent }));
  const def = () => page.textContent('#cDef');
  const boxes = () => page.$$eval('#boxes .box', els => els.map(e => ({ v: e.value, c: e.className, ro: e.readOnly })));
  const typeStr = async s => { for (const ch of s) await page.keyboard.type(ch); };

  ok((await page.$$eval('#boxes .box', e => e.length)) > 0, 'carga inicial muestra cuadraditos');
  const attrs = await page.$eval('#boxes .box', e => [e.getAttribute('autocapitalize'), e.getAttribute('autocorrect'), e.getAttribute('spellcheck')]);
  ok(attrs.join() === 'none,off,false', 'inputs sin mayúscula/autocorrección automática: ' + attrs);

  // Filtros: sin aleatorio, Vocabulary Bank, unidad 154
  await page.uncheck('#fShuffle');
  await page.selectOption('#fSource', 'vb');
  await pickTopic(page, '154 · Air travel');
  ok((await def()).includes('building where passengers arrive'), 'filtro 154 sin aleatorio arranca en "terminal"');
  ok((await stats()).left === '48', 'faltan 48 en el mazo de la 154: ' + (await stats()).left);

  // 1) error + reintento + acierto
  await page.click('#boxes .box');
  await typeStr('terminax');
  await page.keyboard.press('Enter');
  let b = await boxes();
  ok(b.filter(x => x.c.includes('bad')).length === 1 && b[7].c.includes('bad'), 'Comprobar marca en rojo solo la letra mal');
  ok((await stats()).points === '0 / 0', 'un error no suma jugada todavía');
  await page.keyboard.type('l');            // el foco quedó en la letra mal
  await page.click('#bCheck');
  b = await boxes();
  ok(b.every(x => x.c.includes('ok')), 'al corregir, todos verdes');
  let s = await stats();
  ok(s.points === '1 / 1' && s.streak === '1' && s.pct === '100%', 'acierto sin ayuda = 1 punto: ' + JSON.stringify(s));
  ok(s.missed === '1', 'como hubo un error, queda para repasar');
  await page.waitForTimeout(1300);
  ok((await def()).includes('leave your suitcase'), 'pasa sola a la siguiente después de 1 s (bag drop)');

  // 2) pista
  await page.click('#bHint');
  ok(await page.isVisible('#cHint'), 'la pista se muestra');
  ok((await page.textContent('#cHint')).includes('despacho de equipaje'), 'la pista muestra la traducción');
  b = await boxes();
  ok(b[0].v === 'b' && b[0].ro && b[0].c.includes('hinted'), 'la pista pone la primera letra fija');
  await typeStr('agdrop');
  await page.keyboard.press('Enter');
  s = await stats();
  ok(s.points === '1,5 / 2' && s.streak === '2', 'acierto con pista = 0,5: ' + s.points);
  await page.waitForTimeout(1200);

  // 3) mostrar respuesta
  ok((await def()).includes('collect your suitcases'), 'tercera tarjeta: baggage reclaim');
  await page.click('#bReveal');
  b = await boxes();
  ok(b.map(x => x.v).join('') === 'baggagereclaim' && b.every(x => x.c.includes('rev')), 'Mostrar respuesta completa en otro color');
  s = await stats();
  ok(s.points === '1,5 / 3' && s.streak === '0' && s.best === '2' && s.missed === '2', 'mostrar respuesta = 0 y corta la racha: ' + JSON.stringify(s));
  await page.waitForTimeout(1200);
  ok((await def()).includes('collect your suitcases'), 'mostrar respuesta NO avanza sola');
  await page.click('#bNext');

  // 4) guion fijo, backspace, flechas
  ok((await def()).includes('show your ticket'), 'cuarta tarjeta: check-in desk');
  const fixed = await page.$$eval('#boxes .fixed', e => e.map(x => x.textContent));
  ok(fixed.join() === '-' && (await boxes()).length === 11, 'el guion viene fijo y hay 11 cuadraditos');
  const words = await page.$$eval('#boxes .word', ws => ws.map(w => w.querySelectorAll('.box').length));
  ok(words.join() === '7,4', 'grupos por palabra: ' + words);
  await page.click('#boxes .box');
  await typeStr('checkinx');
  let focusIdx = await page.evaluate(() => +document.activeElement.dataset.i);
  ok(focusIdx === 8, 'el cursor avanza solo y salta el guion (foco en ' + focusIdx + ')');
  await page.keyboard.press('Backspace');
  b = await boxes();
  focusIdx = await page.evaluate(() => +document.activeElement.dataset.i);
  ok(b[7].v === '' && focusIdx === 7, 'Backspace borra y vuelve atrás');
  await page.keyboard.press('ArrowLeft');
  focusIdx = await page.evaluate(() => +document.activeElement.dataset.i);
  ok(focusIdx === 6, 'flecha izquierda mueve el cursor');
  await page.keyboard.press('ArrowRight');
  await typeStr('DESK');
  b = await boxes();
  ok(b.map(x => x.v).join('') === 'checkindesk', 'mayúsculas se guardan como minúsculas');
  await page.keyboard.press('Enter');
  ok((await boxes()).every(x => x.c.includes('ok')) && (await def()).includes('show your ticket'), 'Enter comprueba y acepta (sin distinguir mayúsculas) y espera 1 s antes de pasar');
  await page.waitForTimeout(1200);

  // 5) persistencia
  s = await stats();
  await page.reload(); await page.click('[data-go="vocab"]');
  const s2 = await stats();
  ok(JSON.stringify(s) === JSON.stringify(s2), 'el progreso sobrevive a recargar: ' + JSON.stringify(s2));
  ok((await def()).includes('officials look for illegal goods'), 'después de recargar sigue en la misma tarjeta (customs)');

  // 6) alternativas (diarrhea en 9 cuadraditos)
  await pickTopic(page, '152 · Illnesses and injuries');
  ok((await stats()).points === s2.points, 'cambiar el filtro no toca el score');
  for (let k = 0; k < 60; k++) {
    if ((await def()).includes('solid waste')) break;
    await page.click('#bNext');
  }
  ok((await def()).includes('solid waste'), 'llegué a diarrhoea');
  const before = await stats();
  await page.click('#boxes .box');
  await typeStr('diarrhea');
  await page.keyboard.press('Enter');
  ok((await boxes()).every(x => x.c.includes('ok')), 'acepta la alternativa americana "diarrhea"');
  const after = await stats();
  ok(parseFloat(after.points.replace(',', '.')) === parseFloat(before.points.replace(',', '.')) + 1, 'y suma 1 punto');
  await page.waitForTimeout(1200);

  // 7) apóstrofo fijo
  await page.selectOption('#fSource', 'all');
  await pickTopic(page, '162 · Business');
  for (let k = 0; k < 60; k++) { if ((await def()).includes('something is private')) break; await page.click('#bNext'); }
  const fx = await page.$$eval('#boxes .fixed', e => e.map(x => x.textContent));
  ok(fx.join() === '’' && (await boxes()).length === 21, "it's none of your business: apóstrofo fijo y 21 cuadraditos");

  // 8) fin de mazo + resumen + repasar falladas
  await page.selectOption('#fSource', 'pv');
  await pickTopic(page, 'A–Z · J');
  ok((await stats()).left === '1', 'mazo de 1 tarjeta (join in)');
  await page.click('#bReveal');
  await page.click('#bNext');
  ok(await page.isVisible('#summary'), 'al terminar el mazo aparece el resumen');
  ok((await page.textContent('#sumScore')).trim() === '0 / 1', 'resumen con el puntaje del mazo');
  ok((await page.textContent('#sumFailed')).includes('join in'), 'resumen lista la fallada');
  await page.click('#bReviewFailed');
  ok(await page.isChecked('#fReview'), 'botón Repasar falladas activa el modo');
  ok((await def()).includes('take part in an activity'), 'el modo repaso trae la fallada');
  await pickTopic(page, 'all');
  await page.selectOption('#fSource', 'all');
  const missedN = +(await stats()).missed;
  ok(+(await stats()).left === missedN, `repaso: el mazo tiene solo las falladas (${missedN})`);

  // 8b) varios temas a la vez + cantidad de palabras
  await page.uncheck('#fReview');
  await pickTopic(page, '156 · Weather');
  await page.click('.tchip[data-unit="157 · Feelings"]');
  ok((await stats()).left === '65', 'dos temas juntos (Weather 34 + Feelings 31) = 65: ' + (await stats()).left);
  ok((await page.textContent('#topicsSummary')).includes('2 temas elegidos'), 'el resumen dice cuántos temas hay elegidos');
  await page.selectOption('#fSize', '10');
  ok((await stats()).left === '10', 'cantidad 10 arma una ronda corta de 10');
  const units10 = await page.evaluate(() => { const s = JSON.parse(localStorage.getItem('practica-vocabulario-v1')); return s.deck.ids; });
  ok(units10.length === 10, 'el mazo guardado tiene 10 ids');
  for (let k = 0; k < 10; k++) {
    const u = await page.textContent('#cMeta');
    if (!/156|157/.test(u)) { ok(false, 'tarjeta fuera de los temas elegidos: ' + u); break; }
    await page.click('#bReveal'); await page.click('#bNext');
  }
  ok(await page.isVisible('#summary'), 'la ronda de 10 termina en el resumen');
  await page.click('#bAgain');
  ok((await stats()).left === '10', 'Otra ronda arma otras 10 con los mismos temas');
  await page.reload(); await page.click('[data-go="vocab"]');
  ok((await page.isChecked('.tchip[data-unit="156 · Weather"] input')) && (await page.inputValue('#fSize')) === '10', 'los temas y la cantidad elegidos se guardan');
  await page.click('.tchip[data-unit="A–Z · B"]');
  ok((await page.textContent('#topicsSummary')).includes('3 temas'), 'se pueden mezclar unidades del VB con letras de phrasal verbs');
  await page.click('.linkbtn[data-group="0"]');
  ok((await page.$$eval('.tgroup:first-child input:checked', e => e.length)) === 12, '"marcar todo" marca las 12 unidades del Vocabulary Bank');
  await page.selectOption('#fSize', '0');
  await pickTopic(page, 'all');

  // 9) reiniciar con confirmación en la página
  await page.click('#btnReset');
  ok(await page.isVisible('#modal'), 'Reiniciar abre la confirmación dentro de la página');
  await page.click('#mCancel');
  ok(!(await page.isVisible('#modal')) && (await stats()).points !== '0 / 0', 'Cancelar no borra nada');
  await page.click('#btnReset');
  await page.click('#mOk');
  s = await stats();
  ok(s.points === '0 / 0' && s.streak === '0' && s.best === '0' && s.missed === '0' && s.pct === '0%', 'Reiniciar pone todo en cero: ' + JSON.stringify(s));
  ok(+s.left === 598, 'y vuelve a armar el mazo completo (' + s.left + ')');
  await page.reload(); await page.click('[data-go="vocab"]');
  ok((await stats()).points === '0 / 0', 'el reinicio también queda guardado');

  // 10) sin localStorage no se rompe
  const p2 = await ctx.newPage();
  await p2.addInitScript(() => { Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } }); });
  const errs2 = []; p2.on('pageerror', e => errs2.push(e.message));
  await p2.goto(URL); await p2.click('[data-go="vocab"]');
  ok(errs2.length === 0 && (await p2.$$eval('#boxes .box', e => e.length)) > 0, 'funciona aunque localStorage tire error');
  await p2.close();

  ok(errors.length === 0, 'sin errores de JavaScript ' + (errors.length ? errors.join(' | ') : ''));

  // 11) celular: sin scroll horizontal con las respuestas más largas
  const mob = await browser.newContext({ viewport: { width: 360, height: 760 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const m = await mob.newPage();
  await m.goto(URL); await m.click('[data-go="vocab"]');
  await m.uncheck('#fShuffle'); await m.selectOption('#fSize','0');
  const longOnes = ['163 · Word building', '162 · Business'];
  let maxOver = 0;
  for (const u of longOnes) {
    await pickTopic(m, u);
    for (let k = 0; k < 60; k++) {
      const over = await m.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      maxOver = Math.max(maxOver, over);
      if (await m.isVisible('#summary')) break;
      await m.click('#bNext');
    }
  }
  ok(maxOver <= 0, 'en 360 px no hay scroll horizontal en ninguna tarjeta (exceso máx ' + maxOver + ')');
  await pickTopic(m, '154 · Air travel');
  await m.click('#bHint');
  await m.screenshot({ path: OUT + '/mobile-light.png', fullPage: true });
  await m.click('.tchip[data-unit="157 · Feelings"]');
  await m.selectOption('#fSize', '20');
  const over2 = await m.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  ok(over2 <= 0, 'panel de temas abierto en 360 px sin scroll horizontal');
  await m.evaluate(() => window.scrollTo(0, 0));
  await m.screenshot({ path: OUT + '/mobile-topics.png', fullPage: true });
  await mob.close();

  const dark = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: 'dark' });
  const dp = await dark.newPage();
  await dp.goto(URL); await dp.click('[data-go="vocab"]');
  await dp.uncheck('#fShuffle');
  await pickTopic(dp, '160 · Crime and punishment');
  await dp.click('#boxes .box'); await dp.keyboard.type('blackmaol'); await dp.keyboard.press('Enter');
  await dp.screenshot({ path: OUT + '/mobile-dark.png', fullPage: true });
  await dark.close();

  const desk = await browser.newContext({ viewport: { width: 1100, height: 820 }, deviceScaleFactor: 2 });
  const dk = await desk.newPage();
  await dk.goto(URL); await dk.click('[data-go="vocab"]'); await dk.uncheck('#fShuffle'); await pickTopic(dk, '162 · Business');
  for (let k = 0; k < 60; k++) { if ((await dk.textContent('#cDef')).includes('combine work')) break; await dk.click('#bNext'); }
  await dk.click('#bReveal');
  await dk.screenshot({ path: OUT + '/desktop-light.png' });
  await desk.close();

  await browser.close();
  console.log(fails ? `\n${fails} FALLAS` : '\nTODO OK');
  process.exit(fails ? 1 : 0);
})();
