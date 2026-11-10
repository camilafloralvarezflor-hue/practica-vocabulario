#!/usr/bin/env python3
"""Parse vb.txt + pv.txt -> entries; run checks; inject JSON into template.html."""
import json, re, sys, os
from collections import OrderedDict, Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HERE = os.path.join(ROOT, "src", "vocab")
VB_UNITS = [
    "152 · Illnesses and injuries", "153 · Clothes and fashion", "154 · Air travel",
    "155 · Adverbs and adverbial phrases", "156 · Weather", "157 · Feelings",
    "158 · Verbs often confused", "159 · The body", "160 · Crime and punishment",
    "161 · The media", "162 · Business", "163 · Word building",
]
VB_BY_NUM = {u[:3]: u for u in VB_UNITS}
LESSONS = {"TK": "4B · Phrasal verbs with take", "TE": "4B · Expressions with take",
           "GB": "Grammar Bank y Appendix"}
TYPE_TXT = {"S": "(separable)", "I": "(inseparable)", "-": "(no object)",
            "S-": "(separable / no object)", "-S": "(no object / separable)", "x": ""}
VB, PV = "Vocabulary Bank", "Phrasal Verbs"


def parse(path, kind):
    out, unit = [], None
    for ln, raw in enumerate(open(path, encoding="utf-8"), 1):
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        if line.startswith("@"):
            unit = line.split(" ", 1)[1].strip()
            continue
        f = [x.strip() for x in line.split("|")]
        if kind == "VB":
            if len(f) != 4:
                sys.exit(f"{path}:{ln}: expected 4 fields, got {len(f)}")
            ans, d, ex, es = f
            typ, codes = "x", ""
        else:
            if len(f) != 6:
                sys.exit(f"{path}:{ln}: expected 6 fields, got {len(f)}")
            ans, typ, d, ex, es, codes = f
        forms = [a.strip() for a in ans.split(";") if a.strip()]
        sources, units = [], []
        if kind == "VB":
            sources.append(VB); units.append(unit)
        else:
            sources.append(PV)
            for c in codes.split():
                if c[0] == "V":
                    sources.append(VB); units.append(VB_BY_NUM[c[1:]])
                elif c[0] == "P":
                    units.append(VB_BY_NUM[c[1:]])
                elif c.startswith("AZ:"):
                    units.append("A–Z · " + c[3:])
                elif c in LESSONS:
                    units.append(LESSONS[c])
                else:
                    sys.exit(f"{path}:{ln}: unknown code {c}")
            units.append(unit)
        units = list(OrderedDict.fromkeys(units))
        sources = [s for s in (VB, PV) if s in sources]
        definition = d + ((" " + TYPE_TXT[typ]) if TYPE_TXT[typ] else "")
        if "{" not in ex:
            sys.exit(f"{path}:{ln}: example without {{blank}}")
        out.append(dict(answer=forms[0], alternatives=forms[1:], definition=definition,
                        example_raw=ex, example=re.sub(r"\{[^}]*\}", "_____", ex),
                        spanish=es, source=sources, unit=" / ".join(units), units=units,
                        _type=typ, _line=f"{os.path.basename(path)}:{ln}", _base=d))
    return out


# ---------------- root checker ----------------
STOP = {"a", "an", "the", "of", "to", "in", "on", "at", "up", "off", "out", "with", "for",
        "into", "by", "it", "is", "your", "my", "me", "him", "her", "them", "somebody",
        "something", "sb", "sth", "no", "and", "or", "well"}
IRREG = {
    "catch": ["caught"], "caught": ["catch"], "think": ["thought", "thinking"], "thought": ["think", "thinking"],
    "lose": ["lost", "loss", "losing"], "loss": ["lose", "lost", "losing"], "lost": ["lose", "loss"],
    "die": ["dead", "died", "dying"], "death": ["die", "dead", "died", "dying"],
    "high": ["height"], "height": ["high", "higher"], "wide": ["width"], "width": ["wide", "wider"],
    "hot": ["heat"], "heat": ["hot", "hotter"], "strong": ["strength"], "strength": ["strong", "stronger"],
    "hungry": ["hunger"], "hunger": ["hungry"], "choose": ["chose", "choice"],
    "choice": ["choose", "chose", "chosen", "choosing"], "poor": ["poverty"], "poverty": ["poor"],
    "success": ["succeed"], "belief": ["believe", "believed"], "take": ["took", "taken", "taking", "takes"],
    "get": ["got", "gotten", "getting", "gets"], "go": ["went", "gone", "going", "goes"],
    "come": ["came", "coming", "comes"], "give": ["gave", "given", "giving"], "break": ["broke", "broken"],
    "bring": ["brought"], "fall": ["fell", "fallen"], "find": ["found"], "grow": ["grew", "grown"],
    "hang": ["hung", "hanger"], "hold": ["held"], "lie": ["lay", "lain", "lying"], "lay": ["laid", "lie"],
    "make": ["made", "making"], "pay": ["paid"], "run": ["ran", "running"], "sit": ["sat", "sitting"],
    "stand": ["stood"], "throw": ["threw", "thrown"], "wake": ["woke", "woken"], "wear": ["wore", "worn"],
    "write": ["wrote", "written", "writing"], "feel": ["felt", "feeling", "feelings"],
    "swollen": ["swell", "swelling"], "burn": ["burnt", "burning"], "sting": ["stung"],
    "spill": ["spilt"], "lend": ["lent"], "win": ["won"], "rise": ["rose", "risen", "rising"],
    "steal": ["stole", "stolen", "stealing"], "shake": ["shook"], "do": ["did", "done", "doing", "does"],
    "mean": ["meant"], "eat": ["ate", "eaten", "eating"], "build": ["built"], "deal": ["dealt"],
    "bleed": ["blood", "bled"], "kneel": ["knelt", "knee", "knees"], "feet": ["foot"], "calf": ["calves"],
    "icy": ["ice"], "lonely": ["alone"], "loneliness": ["alone", "lonely"], "sunny": ["sun", "sunshine"],
    "sunburn": ["sun", "sunshine", "sunlight"], "smog": ["smoke", "fog"], "fed": ["feed"],
    "bite": ["bit", "bitten", "biting"], "flu": ["influenza"], "advise": ["advice"], "remind": ["mind"],
    "remember": ["memory"], "proof": ["prove"], "avenge": ["revenge", "vengeance"],
    "sell": ["sold"], "cut": ["cutting"], "put": ["putting"], "set": ["setting"], "log": ["logged"],
    "scan": ["scanner"], "board": ["boarding"], "boarding": ["board"], "dizzy": ["dizziness"],
    "drinkable": ["drink"], "unbreakable": ["break", "broken"], "careful": ["care"], "hopeless": ["hope"],
    "useful": ["use", "used"], "homeless": ["home"], "bilingual": ["language", "languages", "linguistic"],
    "misunderstood": ["understand", "understood"], "racism": ["race", "races", "racial"],
    "sneeze": ["sneezing"], "trolley": [], "gutted": ["gut"], "fill": ["full"],
    "stay": ["stayed"], "ache": ["aches", "aching"], "hurt": ["hurting"], "even": [], "near": [],
    "cool": [], "late": ["later"], "row": [], "fit": ["fitting"], "hit": ["hitting"],
}
COMMON3 = set("the and for you are not can has its but one two all any who how why was had did get got may our out own way new now see too off yet".split())
SUFFIXES = ["lessness", "ation", "ition", "ment", "ness", "less", "able", "ible", "tion", "sion",
            "ence", "ance", "hood", "ism", "ist", "ity", "ful", "ous", "ive", "ing", "ies", "ied",
            "ly", "ed", "er", "es", "al", "y", "s", "e"]


def stem(w):
    w = w.lower()
    changed = True
    while changed:
        changed = False
        for s in SUFFIXES:
            if w.endswith(s) and len(w) - len(s) >= 4:
                w = w[: -len(s)]
                changed = True
                break
    return w


def words(text):
    return re.findall(r"[a-z]+", text.lower().replace("’", "'"))


def answer_tokens(e):
    toks = set()
    for form in [e["answer"]] + e["alternatives"]:
        ws = words(form)
        for w in ws:
            if w in STOP and len(ws) > 1:
                continue
            toks.add(w)
    return toks


def forms_of(t):
    f = {t, t + "s", t + "es", t + "ed", t + "d", t + "ing", t + "er", t + "ers", t + "ly"}
    if t.endswith("e"):
        f |= {t[:-1] + "ing", t[:-1] + "ed"}
    if t.endswith("y"):
        f |= {t[:-1] + "ies", t[:-1] + "ied", t[:-1] + "ily"}
    if len(t) >= 2:
        f |= {t + t[-1] + "ing", t + t[-1] + "ed", t + t[-1] + "er"}
    f |= set(IRREG.get(t, []))
    return f


def root_problems(e, text):
    probs = set()
    dws = words(text)
    for t in answer_tokens(e):
        fs = forms_of(t)
        st = stem(t)
        for w in dws:
            if w in fs:
                probs.add(f"'{w}' ~ '{t}'")
            elif len(st) >= 4 and w.startswith(st):
                probs.add(f"'{w}' starts with stem '{st}' of '{t}'")
            elif len(w) >= 4 and w not in STOP and len(t) > len(w) and w in t:
                probs.add(f"'{w}' is inside '{t}'")
            elif len(w) == 3 and w not in COMMON3 and len(t) > 3 and (t.startswith(w) or t.endswith(w)):
                probs.add(f"'{w}' is the start/end of '{t}'")
            elif len(w) >= 5 and len(stem(w)) >= 4 and stem(w) in t and len(t) > 4:
                probs.add(f"stem of '{w}' ('{stem(w)}') is inside '{t}'")
    return sorted(probs)


def boxes_ok(ans):
    return re.fullmatch(r"[a-z](?:[a-z'\- ]*[a-z])?", ans.lower()) is not None


def main():
    vb = parse(os.path.join(HERE, "vb.txt"), "VB")
    pv = parse(os.path.join(HERE, "pv.txt"), "PV")
    entries = vb + pv
    for i, e in enumerate(entries, 1):
        e["id"] = f"e{i:03d}"

    bad = 0
    for e in entries:
        if not boxes_ok(e["answer"]):
            print("BAD ANSWER CHARS", e["_line"], e["answer"]); bad += 1
        p = root_problems(e, e["definition"])
        if p:
            print(f"ROOT  {e['_line']:<12} {e['answer']!r}: {'; '.join(p)}\n      def: {e['definition']}")
            bad += 1
        # the example (outside the blank) must not give the answer away
        outside = re.sub(r"\{[^}]*\}", " ", e["example_raw"])
        p2 = [x for x in root_problems(e, outside) if "~" in x]
        if p2:
            print(f"EXMPL {e['_line']:<12} {e['answer']!r}: {'; '.join(p2)}\n      ex: {e['example_raw']}")
        if "{" not in e["example_raw"]:
            print("NO BLANK", e["_line"])
    # duplicate PV answers (allowed only for different senses)
    c = Counter(e["answer"] for e in entries if PV in e["source"])
    for a, n in c.items():
        if n > 1:
            print(f"INFO  PV answer repeated (senses): {a!r} x{n}")

    # ----- counts -----
    print("\n=== Conteo por unidad ===")
    unit_order = VB_UNITS + list(LESSONS.values()) + sorted(
        {u for e in entries for u in e["units"] if u.startswith("A–Z")})
    for u in unit_order:
        es = [e for e in entries if u in e["units"]]
        nvb = sum(1 for e in es if VB in e["source"])
        npv = sum(1 for e in es if PV in e["source"])
        both = sum(1 for e in es if len(e["source"]) == 2)
        print(f"{u:<40} {len(es):>4}   (VB {nvb}, PV {npv}, en ambas {both})")
    print(f"\nTotal entradas únicas: {len(entries)}")
    print(f"  con etiqueta Vocabulary Bank: {sum(VB in e['source'] for e in entries)}")
    print(f"  con etiqueta Phrasal Verbs:  {sum(PV in e['source'] for e in entries)}")
    print(f"  con las dos etiquetas:       {sum(len(e['source']) == 2 for e in entries)}")
    print(f"  solo VB: {sum(e['source'] == [VB] for e in entries)} · solo PV: {sum(e['source'] == [PV] for e in entries)}")
    az = [e for e in entries if any(u.startswith('A–Z') for u in e['units'])]
    print(f"  tarjetas del A–Z: {len(az)}")
    print(f"\nProblemas: {bad}")

    data = [dict(id=e["id"], answer=e["answer"], alternatives=e["alternatives"],
                 definition=e["definition"], example=e["example"], spanish=e["spanish"],
                 source=e["source"], unit=e["unit"], units=e["units"]) for e in entries]
    tpl_path = os.path.join(ROOT, "src", "template.html")
    if "--html" in sys.argv:
        tpl = open(tpl_path, encoding="utf-8").read()
        js = json.dumps(data, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
        units_js = json.dumps(unit_order, ensure_ascii=False)
        html = tpl.replace("/*__DATA__*/[]", js).replace("/*__UNITS__*/[]", units_js)
        for name in ("exam-core.js", "exams.js", "exam-ui.js"):
            marker = "/*__INLINE:" + name + "__*/"
            if marker in html:
                code = open(os.path.join(ROOT, "src", "exam", name), encoding="utf-8").read().replace("</script", "<\\/script")
                html = html.replace(marker, code)
        out = os.path.join(ROOT, sys.argv[sys.argv.index("--html") + 1])
        open(out, "w", encoding="utf-8").write(html)
        print("HTML escrito en", out, f"({len(html)//1024} KB)")


if __name__ == "__main__":
    main()
