/* Checks the exam bank and the answer checker. Run: node tests/exam.test.js */
"use strict";
const C = require("../src/exam/exam-core.js");
const EXAMS = require("../src/exam/exams.js");

let fails = 0, passes = 0;
function ok(cond, msg) { if (cond) passes++; else { fails++; console.log("FAIL " + msg); } }

const blanks = EXAMS.flatMap(e => e.blanks);
const rewrites = EXAMS.flatMap(e => e.rewrites);
const byId = Object.fromEntries(blanks.concat(rewrites).map(x => [x.id, x]));

/* ---------- structure of the bank ---------- */
ok(EXAMS.length === 20, "hay 20 sets (hay " + EXAMS.length + ")");
EXAMS.forEach((e, i) => {
  ok(e.id === i + 1, `SET ${e.id} en orden`);
  ok(e.blanks.length === 10, `SET ${e.id}: 10 huecos (tiene ${e.blanks.length})`);
  ok(e.rewrites.length === 7, `SET ${e.id}: 7 rewrites (tiene ${e.rewrites.length})`);
  for (let n = 1; n <= 10; n++) ok(e.text.split("{{" + n + "}}").length === 2, `SET ${e.id}: el hueco ${n} aparece una vez en el texto`);
  ok(!/\{\{1[1-9]\}\}/.test(e.text), `SET ${e.id}: no hay huecos de más`);
  e.blanks.forEach(b => {
    ok(e.text.includes(b.cue), `${b.id}: la pista «${b.cue}» está en el texto`);
    ok(C.TENSES[b.t], `${b.id}: tiempo verbal conocido (${b.t})`);
    ok(b.why && b.why.length > 10, `${b.id}: tiene explicación`);
  });
  e.rewrites.forEach(r => {
    ok(C.STRUCTURES[r.structure], `${r.id}: estructura conocida (${r.structure})`);
    ok(C.KEY_RE[r.key], `${r.id}: palabra clave conocida (${r.key})`);
    ok(C.KEY_RE[r.key].test(C.norm(r.answer, true)), `${r.id}: la respuesta usa la palabra clave ${r.key}`);
  });
});

/* new sets: passives, adverbs inside brackets, words per text, no repeated sentences */
const realOriginals = new Set(EXAMS.filter(e => e.source === "real").flatMap(e => e.rewrites.map(r => C.norm(r.original))));
EXAMS.filter(e => e.source === "generado").forEach(e => {
  const pass = e.blanks.filter(b => b.voice === "passive");
  ok(pass.length >= 2, `SET ${e.id}: al menos 2 pasivas (tiene ${pass.length})`);
  ok(new Set(pass.map(b => b.t)).size >= 2, `SET ${e.id}: las pasivas están en tiempos distintos`);
  const adv = e.blanks.filter(b => /[\/ ]/.test(b.verb));
  ok(adv.length >= 2, `SET ${e.id}: al menos 2 huecos con adverbio o negación (tiene ${adv.length})`);
  const words = e.text.replace(/\{\{\d+\}\}/g, "x x").split(/\s+/).length;
  ok(words >= 175 && words <= 260, `SET ${e.id}: largo del texto razonable (${words} palabras)`);
  ok(new Set(e.blanks.map(b => b.t)).size >= 6, `SET ${e.id}: variedad de tiempos (${new Set(e.blanks.map(b => b.t)).size})`);
  e.rewrites.forEach(r => ok(!realOriginals.has(C.norm(r.original)), `${r.id}: no repite una oración de los modelos`));
});

/* coverage across the 16 new sets */
const gen = EXAMS.filter(e => e.source === "generado");
const tenseCount = {};
gen.forEach(e => e.blanks.forEach(b => { tenseCount[b.t] = (tenseCount[b.t] || 0) + 1; }));
Object.keys(C.TENSES).forEach(t => ok((tenseCount[t] || 0) >= 4, `tiempo ${t} practicado al menos 4 veces en los sets nuevos (${tenseCount[t] || 0})`));
const groupOf = s => s.indexOf("wish") === 0 ? "wish" : s;
const groupCount = {};
gen.forEach(e => e.rewrites.forEach(r => { const g = groupOf(r.structure); groupCount[g] = (groupCount[g] || 0) + 1; }));
["such", "indirect", "wish", "time", "relative", "in-case", "were", "the-the"].forEach(g => ok(groupCount[g] >= 10, `estructura ${g} al menos 10 veces (${groupCount[g]})`));
ok((groupCount.cond2 || 0) + (groupCount.cond3 || 0) >= 10, "IF (2nd + 3rd) al menos 10 veces");

/* ---------- every accepted answer is accepted, in several spellings ---------- */
function forms(s) {
  const out = new Set([s, s.toUpperCase(), s + ".", "  " + s + "  "]);
  out.add(s.replace(/'/g, "’"));
  out.add(s.replace(/\b(\w+)n't\b/g, (m, w) => (w === "wo" ? "will" : w === "ca" ? "can" : w) + " not"));
  out.add(s.replace(/\bwill not\b/g, "won't").replace(/\bhave not\b/g, "haven't").replace(/\bhas not\b/g, "hasn't").replace(/\bhad not\b/g, "hadn't").replace(/\bare not\b/g, "aren't").replace(/\bdid not\b/g, "didn't"));
  out.add(s.replace(/\bI am\b/g, "I'm").replace(/\bI will\b/g, "I'll").replace(/\bI would\b/g, "I'd"));
  return [...out];
}
blanks.forEach(b => b.accept.forEach(a => C.expandPattern(a).forEach(x => forms(x).forEach(f =>
  ok(C.gradeBlank(b, f).ok, `${b.id}: acepta «${f}»`)))));
rewrites.forEach(r => r.accept.forEach(a => C.expandPattern(a).forEach(x => forms(x).forEach(f => {
  const g = C.gradeRewrite(r, f);
  ok(g.level === "ok", `${r.id}: acepta «${f}» (dio ${g.level})`);
  const t = C.firedTraps(r, f);
  ok(t.length === 0, `${r.id}: ninguna trampa marca «${f}» (${t.join(" | ")})`);
}))));

/* British / American spelling */
ok(C.gradeBlank(byId["S3-A8"], "will recognise").ok, "acepta recognise y recognize");
ok(C.gradeBlank(byId["S5-A5"], "were canceled").ok, "acepta canceled / cancelled");
ok(C.gradeRewrite(byId["S1-B1"], "It was such a successful festival that they decided to organize another one.").level === "ok", "acepta organize / organise");
ok(C.gradeBlank(byId["S8-A10"], "will have learnt").ok, "acepta learnt / learned");

/* ---------- wrong answers are rejected ---------- */
[["S1-A1", "turned"], ["S1-A2", "always hated"], ["S1-A7", "ordered"], ["S2-A8", "will make"], ["S2-A10", "will celebrate"],
 ["S3-A3", "climbed"], ["S4-A5", "never saw"], ["S5-A3", "delayed"], ["S13-A8", "is testing"], ["S19-A4", "is building"]]
  .forEach(([id, wrong]) => ok(!C.gradeBlank(byId[id], wrong).ok, `${id}: rechaza «${wrong}»`));
ok(C.gradeBlank(byId["S1-A1"], "").empty, "un hueco vacío se informa como vacío");

/* ---------- typical mistakes trigger the right trap ---------- */
const TRAPS = [
  ["S1-B1", "The festival was so successful that they decided to organise another one.", "SUCH … THAT sin cambiarla"],
  ["S1-B1", "It was such successful festival that they decided to organise another one.", "such + a/an"],
  ["S5-B1", "It was so a comfortable hotel that we didn't want to leave.", "So va con el adjetivo solo"],
  ["S1-B2", "Can you tell me when does the match start?", "no se usa do / does / did"],
  ["S6-B1", "Do you know where did Mike buy his new jacket?", "no se usa do / does / did"],
  ["S4-B1", "Do you know where is the orchestra playing tonight?", "No inviertas sujeto y verbo"],
  ["S20-B2", "Can you tell me who is the man in the grey suit?", "No inviertas sujeto y verbo"],
  ["S18-B2", "Do you know has Lucy finished her project?", "if o whether"],
  ["S1-B3", "I wish I didn't shout at you.", "arrepentimiento del pasado"],
  ["S1-B3", "I wish I wouldn't shout at you.", "No uses would"],
  ["S2-B4", "I wish I can go to Australia on holiday.", "I wish I could"],
  ["S3-B6", "I wish I am taller.", "un tiempo para atrás"],
  ["S9-B2", "I wish my flat had been bigger.", "situación del presente"],
  ["S1-B4", "When Taylor will be seventeen, she's going to take driving lessons.", "nunca will ni going to"],
  ["S3-B1", "As soon as I will finish reading this book, I'll start watching a series.", "nunca will ni going to"],
  ["S1-B5", "We stayed at the Grand Hotel which Ann recommended to us.", "entre comas"],
  ["S1-B5", "We stayed at the Grand Hotel, that Ann recommended to us.", "no se usa that"],
  ["S1-B5", "We stayed at the Grand Hotel, which Ann recommended it to us.", "No repitas el pronombre"],
  ["S1-B6", "If you wouldn't live so far away, I would visit you more often.", "nunca would ni will después de if"],
  ["S1-B6", "If you didn't live so far away, I will visit you more often.", "no will"],
  ["S2-B7", "If my friend didn't give me a ticket, I wouldn't have gone to the concert.", "no con past simple"],
  ["S2-B7", "If my friend hadn't given me a ticket, I wouldn't go to the concert.", "would have / wouldn't have"],
  ["S2-B7", "If my friend would have given me a ticket, I would have gone to the concert.", "nunca would después de if"],
  ["S2-B2", "If I was you, I wouldn't use my mobile phone so much before bedtime.", "If I WERE you"],
  ["S2-B2", "If I were you, I shouldn't use my mobile phone so much before bedtime.", "sin should ni will"],
  ["S1-B7", "Give Mary your mobile number in case she will need to contact you.", "in case va present simple"],
  ["S5-B7", "Take an umbrella in case of rain.", "in case of"],
  ["S4-B3", "The more I exercise, the more good I feel.", "the better"],
  ["S2-B6", "The more electricity you use, your bill will be higher.", "dos comparativos"],
  ["S3-B5", "My grandmother, that is 89 years old, does exercise every day.", "no se usa that"]
];
TRAPS.forEach(([id, input, expect]) => {
  const g = C.gradeRewrite(byId[id], input);
  ok(g.level === "trap" && g.msgs.some(m => m.indexOf(expect) >= 0), `${id}: «${input}» dispara la trampa «${expect}» (dio ${g.level}: ${g.msgs.join(" | ")})`);
});

/* ---------- unknown but plausible answers: diff + custom acceptance ---------- */
const r = byId["S2-B2"];
const mine = "If I were you, I wouldn't use my phone so much before going to bed.";
let g = C.gradeRewrite(r, mine);
ok(g.level === "maybe", "una variante no prevista queda como «puede que esté bien» (dio " + g.level + ")");
ok(g.diff.some(d => d.t === "extra") && g.diff.some(d => d.t === "missing"), "el diff marca lo que sobra y lo que falta");
g = C.gradeRewrite(r, mine.toUpperCase(), [C.customKey(r, mine)]);
ok(g.level === "ok" && g.custom, "«La mía también vale» queda guardada y se acepta la próxima vez");

console.log(`\n${passes} comprobaciones OK, ${fails} fallas`);
process.exit(fails ? 1 : 0);
