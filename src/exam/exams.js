/* Exam bank: SET 1-4 are the real exams (transcribed), SET 5-20 were written for practice. */
(function (root) {
  "use strict";
  var C = root.ExamCore || (typeof require !== "undefined" ? require("./exam-core.js") : null);
  var exam = C.exam, B = C.B, R = C.R;

  /* ======================= SET 1 · QUI-01 ======================= */
  exam({ id: 1, code: "QUI-01", source: "real", title: "A MAN WHO HATES CLOTHES SHOPPING",
    text: "Some people enjoy talking about football: some others, about home improvements. But in my case, when the conversation {{1}} to clothes shopping, I try to change the subject. I {{2}} shopping for clothes, ever since the days my mother and I {{3}} downtown to buy a new pair of school trousers, summer sandals or a winter coat. I remember she once bought me an expensive pair of jeans for which she {{4}} money for ages, but I couldn't be excited about it at all. Even now as an adult, I don't buy clothes unless it {{5}} extremely necessary. One of my problems with clothes shopping is that I'm claustrophobic. I {{6}} a psychologist lately to talk about my phobia, and she suggested that I should try online shopping. I once heard that a billion clothing items {{7}} during the Covid pandemic, so I have decided to give online shopping a try. I bought a sweater at eBay yesterday, and according to the website, the item {{8}} home by the end of the week. The best thing is that I {{9}} to shops and their changing rooms ever again. You can't imagine how happy I {{10}}.",
    blanks: [
      B("turn", "turns", "PS", "when the conversation", "Es algo que pasa siempre (un hábito): «cada vez que la conversación pasa a…». Present simple, también después de when."),
      B("always hate", "have always hated", "PP", "ever since", "Ever since = desde entonces hasta ahora: algo que empezó en el pasado y sigue. Present perfect, con always entre have y el participio."),
      B("go", "went", "PaS", "the days my mother and I", "Acciones repetidas en un pasado terminado (cuando era chico). Past simple (también vale used to go / would go).", { acc: ["used to go", "would go"] }),
      B("save", "had been saving", "PaPC", "for ages", "Ella venía ahorrando desde antes de comprar los jeans (for ages + otro momento pasado). Past perfect continuous.", { acc: ["had saved"] }),
      B("be", "is", "PS", "unless", "Después de unless (como después de if) va present simple."),
      B("see", "have been seeing", "PPC", "lately", "Lately = últimamente: actividad que empezó hace un tiempo y sigue. Present perfect continuous."),
      B("order", "were ordered", "PaS", "during the Covid pandemic", "Período terminado del pasado y las prendas no piden solas: alguien las pidió. Past simple en voz pasiva.", { pass: true }),
      B("arrive", "will have arrived", "FP", "by the end of the week", "By the end of the week = antes de ese momento futuro ya va a estar hecho: future perfect. También se acepta will arrive / is going to arrive.", { acc: ["will arrive", "is going to arrive"] }),
      B("not go", "am not going to go", "GT", "The best thing is that", "Una decisión ya tomada (decidió comprar online): be going to en negativo. También vale won't go.", { acc: ["will not go", "am never going to go"] }),
      B("be", "am", "PS", "You can't imagine how happy", "Un estado en el presente: present simple.")
    ],
    rewrites: [
      R("SUCH … THAT", "such", "The festival was so successful that they decided to organise another one.", "It was such a successful festival that they decided to organise another one.", ["[It|That] was such a successful festival that they decided to [organise|organize|hold|have] another one."], { countable: true }),
      R("CAN YOU TELL ME", "indirect", "When does the match start?", "Can you tell me when the match starts?", ["Can you tell me what time the match starts?"]),
      R("WISH", "wish-pp", "I'm really sorry I shouted at you.", "I wish I hadn't shouted at you.", ["I [really|] wish I hadn't shouted at you."]),
      R("WHEN", "time", "Taylor will be seventeen soon. She's going to take driving lessons then.", "When Taylor is seventeen, she's going to take driving lessons.", ["Taylor is going to take driving lessons when she is seventeen.", "When she is seventeen, Taylor is going to take driving lessons.", "When Taylor [is|turns] seventeen, she [is going to|will] take driving lessons.", "Taylor [is going to|will] take driving lessons when she [is|turns] seventeen."]),
      R("WHICH", "relative", "We stayed at the Grand Hotel. Ann recommended it to us.", "We stayed at the Grand Hotel, which Ann recommended to us.", ["We stayed at the Grand Hotel, which [had been|was] recommended to us by Ann.", "We stayed at the Grand Hotel, which Ann had recommended to us."]),
      R("IF", "cond2", "I don't visit you very often because you live so far away.", "If you didn't live so far away, I would visit you more often.", ["If you didn't live so far away, I['d|would|could] visit you [more often|more|very often|often].", "I['d|would|could] visit you [more often|more|very often|often] if you didn't live so far away.", "If you lived [closer|nearer], I['d|would|could] visit you [more often|more|very often|often].", "I['d|would|could] visit you [more often|more|very often|often] if you lived [closer|nearer]."]),
      R("IN CASE", "in-case", "Mary will probably need to contact you, so give her your mobile number.", "Give Mary your mobile number in case she needs to contact you.", ["Give her your mobile number in case Mary needs to contact you.", "In case Mary needs to contact you, give her your mobile number.", "Give Mary your mobile [number|phone number] in case she needs to contact you."])
    ]
  });

  /* ======================= SET 2 · QUI-02 ======================= */
  exam({ id: 2, code: "QUI-02", source: "real", title: "A MAN WHO MAKES ART OUT OF SEASHELLS",
    text: "Peter Cooke is a very creative artist. There are still many things Peter Cooke {{1}} yet – paper-making and feather-work are on his list. For the moment though, he will continue doing what he {{2}} on for over the past ten years: making delicate and unusual objects out of seashells. Peter describes some ornaments above a fireplace in his house. \"I won't get angry if these ornaments {{3}} because they're adorable.\" I never meant to sell my work commercially. Some friends {{4}} to see me about five years ago and said, \"You must have an exhibition – people should see this. We {{5}} to a man who owns an art gallery.\" The result was that my works of art {{6}} at an exhibition in London, at which most of the objects {{7}}. His second exhibition opened at a gallery yesterday. There are 86 pieces in the exhibition, and Peter continues working on new ones: by the end of the month, he {{8}} more than 93 pieces. \"I wish I had started this a lot earlier. Although the ideas are still there and I {{9}} the best I can now, I'm more limited physically than I was when I started - next week I'll be 83 years old. Speaking of his birthday, he {{10}} it with his friends this time next Tuesday. \"I'll probably do something small, as I want to start a new piece for a bedroom.\" It seems Peter is unstoppable.",
    blanks: [
      B("not do", "hasn't done", "PP", "yet", "Yet en negativa = todavía no: algo que hasta ahora no hizo. Present perfect negativo."),
      B("work", "has been working", "PPC", "for over the past ten years", "Una actividad que empezó hace diez años y sigue: present perfect continuous.", { acc: ["has worked"] }),
      B("not sell", "aren't sold", "PS", "I won't get angry if", "Primer condicional: después de if va present simple. Los adornos no se venden solos: pasiva.", { pass: true, acc: ["don't get sold"] }),
      B("come", "came", "PaS", "about five years ago", "Ago marca un momento terminado del pasado: past simple."),
      B("talk", "have talked", "PP", "You must have an exhibition", "Ya hablaron con el dueño de la galería (resultado presente). Present perfect; según el sentido también se aceptan otras formas.", { acc: ["are going to talk", "will talk", "talked", "have already talked", "have spoken"] }),
      B("display", "were displayed", "PaS", "The result was that", "Hecho terminado del pasado y las obras no se exhiben solas: past simple pasivo.", { pass: true }),
      B("sell", "were sold", "PaS", "at which most of the objects", "Los objetos fueron vendidos (por otros) en esa exposición pasada: past simple pasivo.", { pass: true }),
      B("make", "will have made", "FP", "by the end of the month", "By the end of the month: va a estar terminado antes de ese momento futuro. Future perfect."),
      B("do", "am doing", "PC", "now", "Lo que está haciendo en este momento de su vida: present continuous (también se acepta do).", { acc: ["do"] }),
      B("celebrate", "will be celebrating", "FC", "this time next Tuesday", "This time next Tuesday: acción en progreso en un momento futuro. Future continuous.")
    ],
    rewrites: [
      R("WHEN", "time", "I'm nearly eighteen. Then I'll be able to vote.", "When I'm eighteen, I'll be able to vote.", ["I'll be able to vote when I'm eighteen.", "When I [am|turn] eighteen, I['ll|will] be able to vote.", "I['ll|will] be able to vote when I [am|turn] eighteen."]),
      R("WERE", "were", "You shouldn't use your mobile phone so much before bedtime.", "If I were you, I wouldn't use my mobile phone so much before bedtime.", ["If I were you, I wouldn't use [my|your|the] [mobile phone|mobile|phone] so much before bedtime.", "I wouldn't use [my|your|the] [mobile phone|mobile|phone] so much before bedtime if I were you."]),
      R("DO YOU KNOW", "indirect", "When did U2 record their new single?", "Do you know when U2 recorded their new single?", []),
      R("WISH", "wish-could", "I'm sorry I can't go to Australia on holiday.", "I wish I could go to Australia on holiday.", ["I wish I could go on holiday to Australia."]),
      R("WHICH", "relative", "The first Hard Rock Café attracted a great deal of interest. It opened in London in 1971.", "The first Hard Rock Café, which opened in London in 1971, attracted a great deal of interest.", ["The first Hard Rock Café, which attracted a great deal of interest, opened in London in 1971."]),
      R("THE … THE …", "the-the", "If you use a lot of electricity, your bill will be very high.", "The more electricity you use, the higher your bill will be.", ["The more electricity you use, the higher your bill [will be|is]."]),
      R("IF", "cond3", "I went to the concert because my friend gave me a ticket.", "If my friend hadn't given me a ticket, I wouldn't have gone to the concert.", ["I wouldn't have gone to the concert if my friend hadn't given me a ticket.", "If my friend hadn't given me a ticket, I [wouldn't|couldn't] have gone to the concert."])
    ]
  });

  /* ======================= SET 3 · QUI-03 ======================= */
  exam({ id: 3, code: "QUI-03", source: "real", title: "LIAM'S HIKE",
    text: "Liam had always enjoyed hiking alone. He {{1}} his trip to the Andes for months, studying maps and preparing his gear carefully. Last weekend, he finally {{2}} the journey. As he {{3}} a narrow path early on Sunday morning, he noticed footprints in the mud—fresh ones. He looked around, but no one seemed to be nearby. About an hour later, he {{4}} a voice calling for help. He ran toward the sound and found an older man sitting under a tree. The man {{5}} and injured his ankle. Liam gave him water and stayed with him until help arrived. While they {{6}}, the man shared stories about his life as a mountaineer. He said he had climbed those trails for over forty years. Liam is now back home and still thinking about the encounter. He {{7}} a photo of them together on a local hiking forum, hoping someone {{8}} the man. So far, no one has replied, but Liam will keep checking. By this time next week, he {{9}} to the area - with better first aid training. He knows that day changed something in him. He {{10}} an adventure, but he had found one.",
    blanks: [
      B("plan", "had been planning", "PaPC", "for months", "Venía planeando el viaje durante meses antes de empezarlo (pasado): past perfect continuous.", { acc: ["had planned"] }),
      B("begin", "began", "PaS", "Last weekend", "Last weekend: momento terminado del pasado. Past simple."),
      B("climb", "was climbing", "PaC", "As he", "Acción en progreso cuando pasó otra (noticed): past continuous."),
      B("hear", "heard", "PaS", "About an hour later", "Una acción puntual en la secuencia de la historia: past simple."),
      B("slip", "had slipped", "PaP", "and injured his ankle", "Se resbaló antes de que Liam lo encontrara: past perfect."),
      B("wait", "were waiting", "PaC", "While they", "While + acción en progreso en el pasado: past continuous."),
      B("post", "has posted", "PP", "So far", "Liam ahora está en casa: resultado presente de algo hecho sin momento exacto. Present perfect."),
      B("recognize", "will recognize", "WF", "hoping someone", "Hoping + predicción futura: will. También se aceptan recognizes y would recognize.", { acc: ["will recognise", "recognizes", "recognises", "would recognize", "would recognise"] }),
      B("return", "will have returned", "FP", "By this time next week", "By this time next week: va a estar hecho antes de ese momento futuro. Future perfect."),
      B("not expect", "hadn't expected", "PaP", "but he had found one", "Antes de esa aventura no la esperaba: past perfect negativo, en paralelo con had found.")
    ],
    rewrites: [
      R("AS SOON AS", "time", "I'll finish reading this book. Then, I'll start watching a series.", "As soon as I finish reading this book, I'll start watching a series.", ["As soon as I [finish|have finished] reading this book, I['ll|will] start watching a series.", "I['ll|will] start watching a series as soon as I [finish|have finished] reading this book."]),
      R("THE … THE …", "the-the", "When you study hard, you get good marks at school.", "The harder you study, the better marks you get at school.", ["The harder you study, the better [marks you get|your marks are|your marks will be|marks you will get] at school.", "The harder you study at school, the better [marks you get|your marks are]."]),
      R("COULD YOU TELL ME", "indirect", "\"Why didn't you attend the meeting this morning?\"", "Could you tell me why you didn't attend the meeting this morning?", []),
      R("SUCH", "such", "The boy was so clever that he did the calculation in no time.", "He was such a clever boy that he did the calculation in no time.", ["[He|The boy] was such a clever boy that he did the calculation in no time."], { countable: true }),
      R("WHO", "relative", "My grandmother is 89 years old. She does exercise every day.", "My grandmother, who is 89 years old, does exercise every day.", ["My grandmother, who [is 89|is eighty-nine] [years old|], does exercise every day.", "My grandmother, who does exercise every day, is 89 years old."]),
      R("WISH", "wish-past", "I'm quite short. I don't like this.", "I wish I were taller.", ["I wish I [were|was] taller.", "I wish I [weren't|wasn't] so short.", "I wish I [weren't|wasn't] [quite short|short]."]),
      R("IF", "cond3", "She didn't go to the beach because it was cold.", "If it hadn't been cold, she would have gone to the beach.", ["She would have gone to the beach if it hadn't been cold.", "If it had been [warm|warmer|hot], she would have gone to the beach."])
    ]
  });

  /* ======================= SET 4 · QUI-04 ======================= */
  exam({ id: 4, code: "QUI-04", source: "real", title: "STEVE AND THE OLD PHOTOGRAPH",
    text: "When Steve opened the old, dusty box in his attic yesterday, he {{1}} to find anything special inside. The box {{2}} there for many years, untouched and completely forgotten. But as he {{3}} carefully through the dusty papers and old letters, he found a black-and-white photograph. It showed a young woman standing in front of a busy train station, smiling directly at the camera. On the back, someone {{4}}: \"Clara – June 1941. Just before you left.\" Steve {{5}} the woman before, but the handwriting looked strangely familiar. He had been wondering about his grandfather's past for a very long time, and this photo might be a missing piece of the puzzle. Over the next few days, Steve {{6}} to his relatives and began searching through family records with interest. He {{7}} that Clara was a friend of his grandfather's before the war, but nobody {{8}} exactly what had happened to her. Steve is starting to realize that history isn't just in books - it lives in memories, in photographs, and in secrets waiting to be uncovered. Next weekend, he {{9}} the small town where the picture was taken. Maybe someone there {{10}}. He has never felt so curious - or so connected to the past.",
    blanks: [
      B("not expect", "didn't expect", "PaS", "yesterday", "Una reacción en ese momento pasado (yesterday): past simple. También vale hadn't expected.", { acc: ["hadn't expected"] }),
      B("lie", "had been lying", "PaPC", "for many years", "Venía estando ahí muchos años antes de que él lo abriera: past perfect continuous (o had lain).", { acc: ["had lain"] }),
      B("sort", "was sorting", "PaC", "as he", "Acción en progreso cuando encontró la foto: past continuous."),
      B("write", "had written", "PaP", "On the back, someone", "Alguien lo escribió mucho antes del momento de la historia: past perfect."),
      B("never/see", "had never seen", "PaP", "before", "Never… before en una narración en pasado: past perfect."),
      B("speak", "spoke", "PaS", "Over the next few days", "Secuencia de acciones en el pasado (spoke… and began): past simple."),
      B("already/tell", "has already been told", "PP", "before the war", "A él se lo contaron (pasiva) y es un resultado actual: present perfect pasivo. También vale had already been told.", { pass: true, acc: ["had already been told", "was already told"] }),
      B("know", "knew", "PaS", "what had happened", "Nadie sabía en ese momento: past simple (también se acepta knows).", { acc: ["knows"] }),
      B("visit", "is going to visit", "GT", "Next weekend", "Un plan ya decidido para el fin de semana que viene: be going to (o present continuous / will).", { acc: ["is visiting", "will visit"] }),
      B("still/remember", "still remembers", "PS", "Maybe someone there", "Un estado en el presente (remember no va en continuo): present simple con still antes del verbo.", { acc: ["will still remember"] })
    ],
    rewrites: [
      R("DO YOU KNOW", "indirect", "\"Where is the orchestra playing tonight?\"", "Do you know where the orchestra is playing tonight?", []),
      R("WISH", "wish-pp", "I regret not calling her for her birthday.", "I wish I had called her for her birthday.", ["I wish I had called her on her birthday."]),
      R("THE … THE …", "the-the", "If I exercise a lot, I feel good.", "The more I exercise, the better I feel.", []),
      R("IN CASE", "in-case", "Take a sweater with you. It might get cold tonight.", "Take a sweater with you in case it gets cold tonight.", ["Take a sweater in case it gets cold tonight.", "In case it gets cold tonight, take a sweater with you."]),
      R("IF", "cond2", "It's raining. We can't go for a picnic in the park.", "If it weren't raining, we could go for a picnic in the park.", ["If it [weren't|wasn't] raining, we could go for a picnic in the park.", "We could go for a picnic in the park if it [weren't|wasn't] raining.", "If it didn't rain, we could go for a picnic in the park."]),
      R("SO", "such", "It was such a boring meeting that she almost fell asleep.", "The meeting was so boring that she almost fell asleep.", ["It was so boring that she almost fell asleep."]),
      R("WHO", "relative", "Jorge Luis Borges was a great Argentinian writer. He died in Switzerland.", "Jorge Luis Borges, who was a great Argentinian writer, died in Switzerland.", ["Jorge Luis Borges, who died in Switzerland, was a great Argentinian writer.", "Jorge Luis Borges, who was a great Argentine writer, died in Switzerland."])
    ]
  });

  /* ======================= SET 5 ======================= */
  exam({ id: 5, source: "generado", title: "A WOMAN WHO TRAVELS FOR A LIVING",
    text: "Maria Lopez is a travel writer, and airports are almost her second home. She {{1}} for an online travel magazine since 2018, and so far she has visited more than forty countries. Right now she {{2}} in the departure lounge at Madrid airport, because her flight to Lima {{3}} by three hours. \"It happens all the time,\" she says. \"Last month, while I {{4}} for a connecting flight in Paris, all the flights {{5}} because of a storm, and I had to sleep on the floor.\" Maria {{6}} travelling ever since her parents took her to Morocco when she was ten. By the time she finished university, she {{7}} twelve countries. Her next project is a book about South America. \"I {{8}} the next three months in Peru and Bolivia – I've already booked the tickets,\" she explains. Her publisher is optimistic: the book {{9}} next autumn, and this time next year Maria {{10}} her second one. \"I never get tired of airports,\" she laughs. \"Well… maybe a little.\"",
    blanks: [
      B("work", "has been working", "PPC", "since 2018", "Since 2018 y sigue trabajando: present perfect continuous (has worked también vale).", { acc: ["has worked"] }),
      B("sit", "is sitting", "PC", "Right now", "Right now: algo que pasa en este momento. Present continuous."),
      B("delay", "has been delayed", "PP", "by three hours", "El vuelo no se demora solo (alguien lo demoró) y el resultado es presente: present perfect pasivo.", { pass: true, acc: ["is delayed", "was delayed"] }),
      B("wait", "was waiting", "PaC", "while I", "While + acción en progreso en el pasado: past continuous."),
      B("cancel", "were cancelled", "PaS", "Last month", "Hecho terminado (last month) y los vuelos fueron cancelados por alguien: past simple pasivo.", { pass: true, acc: ["were canceled", "had been cancelled"] }),
      B("always/love", "has always loved", "PP", "ever since", "Ever since: desde ese momento hasta hoy. Present perfect con always entre has y el participio."),
      B("already/visit", "had already visited", "PaP", "By the time she finished university", "By the time + pasado: algo que ya había pasado antes. Past perfect."),
      B("spend", "am going to spend", "GT", "I've already booked the tickets", "Plan decidido (ya sacó los pasajes): be going to. También present continuous.", { acc: ["am spending", "will be spending"] }),
      B("publish", "will be published", "WF", "next autumn", "Hecho futuro y el libro no se publica solo: future simple pasivo (o going to be published).", { pass: true, acc: ["is going to be published"] }),
      B("probably/write", "will probably be writing", "FC", "this time next year", "This time next year: acción en progreso en un momento futuro. Future continuous, con probably después de will.", { acc: ["is probably going to be writing"] })
    ],
    rewrites: [
      R("SUCH … THAT", "such", "The hotel was so comfortable that we didn't want to leave.", "It was such a comfortable hotel that we didn't want to leave.", ["[It|That] was such a comfortable hotel that we didn't want to leave."], { countable: true }),
      R("COULD YOU TELL ME", "indirect", "What time does the next train to Rosario leave?", "Could you tell me what time the next train to Rosario leaves?", ["Could you tell me when the next train to Rosario leaves?"]),
      R("WISH", "wish-past", "I don't speak Italian. It's a pity.", "I wish I spoke Italian.", ["I wish I could speak Italian.", "I wish I spoke Italian well."]),
      R("AS SOON AS", "time", "The plane will land. Then I'll call you.", "As soon as the plane lands, I'll call you.", ["I['ll|will] call you as soon as the plane [lands|has landed].", "As soon as the plane [lands|has landed], I['ll|will] call you."]),
      R("WHO", "relative", "My uncle lives in Canada. He is a pilot.", "My uncle, who lives in Canada, is a pilot.", ["My uncle, who is a pilot, lives in Canada."]),
      R("IF", "cond3", "We missed the flight because we got up late.", "If we hadn't got up late, we wouldn't have missed the flight.", ["If we hadn't [got|gotten] up [late|so late], we wouldn't have missed the flight.", "We wouldn't have missed the flight if we hadn't [got|gotten] up [late|so late].", "If we had [got|gotten] up earlier, we [wouldn't have missed|would have caught] the flight.", "We [wouldn't have missed|would have caught] the flight if we had [got|gotten] up earlier."]),
      R("IN CASE", "in-case", "It might rain later, so take an umbrella.", "Take an umbrella in case it rains later.", ["Take an umbrella in case it rains.", "In case it rains [later|], take an umbrella."])
    ]
  });

  /* ======================= SET 6 ======================= */
  exam({ id: 6, source: "generado", title: "A BOY WHO WAS CAUGHT IN A SNOWSTORM",
    text: "Last winter, sixteen-year-old Tom Harris had an experience he will never forget. He and his father {{1}} in the Pyrenees for three days when the weather suddenly changed. \"It {{2}} heavily all morning, and by lunchtime we couldn't see anything,\" Tom remembers. While they {{3}} to find their way back to the hotel, Tom's father slipped and hurt his knee. They had no phone signal, and the temperature was dropping fast. Luckily, they {{4}} a small mountain hut, and they stayed there all night. The next morning, they {{5}} by a team of volunteers who {{6}} for them since dawn. Since then, Tom {{7}} very interested in mountain safety, and he {{8}} a first aid course at his school. \"Every year, hundreds of skiers {{9}} because they don't check the weather forecast,\" he says. Next month Tom and his father are going back to the same resort. \"This time, we {{10}} to check the forecast before we leave,\" he promises. His father, who is still recovering, says he is very proud of him.",
    blanks: [
      B("ski", "had been skiing", "PaPC", "for three days when", "Venían esquiando tres días cuando cambió el tiempo: past perfect continuous.", { acc: ["had skied"] }),
      B("snow", "had been snowing", "PaPC", "all morning, and by lunchtime", "Venía nevando toda la mañana hasta el mediodía: past perfect continuous (también past continuous o past simple).", { acc: ["was snowing", "snowed"] }),
      B("try", "were trying", "PaC", "While they", "While + acción en progreso interrumpida (slipped): past continuous."),
      B("find", "found", "PaS", "Luckily", "Acción puntual de la historia: past simple."),
      B("rescue", "were rescued", "PaS", "The next morning", "Ellos no se rescatan: los rescató un equipo (by…). Past simple pasivo.", { pass: true }),
      B("search", "had been searching", "PaPC", "since dawn", "Venían buscando desde el amanecer hasta que los encontraron: past perfect continuous.", { acc: ["had searched"] }),
      B("become", "has become", "PP", "Since then", "Since then: desde ese momento hasta ahora. Present perfect."),
      B("currently/do", "is currently doing", "PC", "at his school", "Currently = actualmente: algo en progreso en este período. Present continuous."),
      B("injure", "are injured", "PS", "Every year", "Every year: algo que pasa siempre. Los esquiadores no se lastiman a propósito: present simple pasivo.", { pass: true, acc: ["get injured"] }),
      B("not/forget", "won't forget", "WF", "he promises", "Es una promesa: will (won't) + infinitivo.", { acc: ["are not going to forget", "will never forget"] })
    ],
    rewrites: [
      R("DO YOU KNOW", "indirect", "Where did Mike buy his new jacket?", "Do you know where Mike bought his new jacket?", []),
      R("WISH", "wish-pp", "I didn't study for the test, and now I regret it.", "I wish I had studied for the test.", ["I wish I had studied [for the test|more for the test|harder for the test]."]),
      R("WHEN", "time", "I'll get my results next week. Then I'll decide what to do.", "When I get my results next week, I'll decide what to do.", ["When I [get|have got] my results [next week|], I['ll|will] decide what to do.", "I['ll|will] decide what to do when I [get|have got] my results [next week|]."]),
      R("WHICH", "relative", "We visited the Prado Museum. It has thousands of paintings.", "We visited the Prado Museum, which has thousands of paintings.", []),
      R("IF", "cond2", "I don't have a car, so I can't drive you to the airport.", "If I had a car, I could drive you to the airport.", ["If I had a car, I [could|would] drive you to the airport.", "I [could|would] drive you to the airport if I had a car."]),
      R("WERE", "were", "You should apologise to her.", "If I were you, I would apologise to her.", ["If I were you, I['d|would] apologise to her.", "I['d|would] apologise to her if I were you."]),
      R("THE … THE …", "the-the", "If you practise more, you will play better.", "The more you practise, the better you will play.", ["The more you practise, the better you['ll|will] play.", "The more you practise, the better you play."])
    ]
  });

  /* ======================= SET 7 ======================= */
  exam({ id: 7, source: "generado", title: "A WOMAN WHO OPENED A VEGAN RESTAURANT",
    text: "When Sofia Ruiz {{1}} her vegan restaurant in Córdoba in 2019, many people thought it was a crazy idea. Even her own parents were worried that she would lose all her savings. \"Back then, most people in my neighbourhood {{2}} vegan food,\" she says. Today the restaurant is so popular that you have to book a table weeks in advance. Every dish {{3}} with local vegetables, and the menu {{4}} every season. At the moment, Sofia {{5}} for a bigger place, because the kitchen is too small for her eight cooks. \"We {{6}} in this tiny kitchen for five years, and I'm exhausted!\" she laughs. Last year the restaurant {{7}} as the best new restaurant in the province, and since then the number of customers {{8}}. Sofia has big plans: \"We {{9}} a second restaurant in Rosario next March – we signed the contract last week.\" And by the end of next year, she hopes she {{10}} a cookbook with all her favourite recipes. She has already chosen the title: Green Córdoba.",
    blanks: [
      B("open", "opened", "PaS", "in 2019", "In 2019: momento terminado del pasado. Past simple."),
      B("never/try", "had never tried", "PaP", "Back then", "Antes de ese momento del pasado nunca la habían probado: past perfect (también se acepta never tried).", { acc: ["never tried"] }),
      B("prepare", "is prepared", "PS", "Every dish", "Algo que pasa siempre y los platos no se preparan solos: present simple pasivo.", { pass: true }),
      B("change", "changes", "PS", "every season", "Every season: algo habitual. Present simple."),
      B("look", "is looking", "PC", "At the moment", "At the moment: en progreso ahora. Present continuous."),
      B("cook", "have been cooking", "PPC", "for five years", "For five years y siguen: present perfect continuous.", { acc: ["have cooked"] }),
      B("choose", "was chosen", "PaS", "Last year", "Last year y el restaurante fue elegido por otros: past simple pasivo.", { pass: true }),
      B("already/double", "has already doubled", "PP", "since then", "Since then: desde entonces hasta ahora. Present perfect con already."),
      B("open", "are opening", "PC", "we signed the contract last week", "Un plan arreglado (firmaron el contrato): present continuous con sentido de futuro (o going to).", { acc: ["are going to open", "will open"] }),
      B("write", "will have written", "FP", "by the end of next year", "By the end of next year: terminado antes de ese momento futuro. Future perfect.")
    ],
    rewrites: [
      R("SUCH … THAT", "such", "The film was so funny that we couldn't stop laughing.", "It was such a funny film that we couldn't stop laughing.", ["[It|That] was such a funny film that we couldn't stop laughing."], { countable: true }),
      R("WISH", "wish-could", "I'm sorry I can't come to your party.", "I wish I could come to your party.", ["I wish I could go to your party."]),
      R("AS SOON AS", "time", "I'll get home. Then I'll have a shower.", "As soon as I get home, I'll have a shower.", ["I['ll|will] have a shower as soon as I [get|have got] home.", "As soon as I [get|have got] home, I['ll|will] have a shower."]),
      R("WHICH", "relative", "My new phone cost a fortune. It doesn't work properly.", "My new phone, which cost a fortune, doesn't work properly.", ["My new phone, which doesn't work properly, cost a fortune."]),
      R("IF", "cond3", "She didn't win the race because she fell.", "If she hadn't fallen, she would have won the race.", ["She would have won the race if she hadn't fallen.", "If she hadn't fallen [over|down], she would have won the race."]),
      R("IN CASE", "in-case", "The shops might be closed tomorrow. Buy some bread today.", "Buy some bread today in case the shops are closed tomorrow.", ["In case the shops are closed tomorrow, buy some bread today."]),
      R("THE … THE …", "the-the", "As you get older, you become wiser.", "The older you get, the wiser you become.", ["The older you [get|become], the wiser you [become|get|are]."])
    ]
  });

  /* ======================= SET 8 ======================= */
  exam({ id: 8, source: "generado", title: "A MAN WHO DISCOVERED A FAMILY SECRET",
    text: "Daniel Fischer {{1}} that his family came from Germany. But last year, while he {{2}} out his late grandmother's flat, he found a box of letters that {{3}} under the floor for decades. The letters {{4}} in Italian, not German, and they were signed by a man called Giovanni. Daniel {{5}} that name before. \"I was shocked. I {{6}} to solve the mystery ever since,\" he says. He {{7}} three historians so far, and they {{8}} the letters for him. Daniel now thinks that his great-grandfather left Italy in 1938 and changed his name. If that is true, the surname Fischer may not be German at all. \"Next summer I {{9}} to Naples to visit the church where Giovanni got married – I've already booked my flights,\" he explains. \"I'm sure that by the time I come back, I {{10}} a lot more about who I really am.\" His sisters are just as excited, and they have asked him to send them photos of every document he finds.",
    blanks: [
      B("always/believe", "had always believed", "PaP", "But last year", "Lo creía hasta que el año pasado encontró las cartas: past perfect (también se acepta has always believed).", { acc: ["has always believed"] }),
      B("clear", "was clearing", "PaC", "while he", "While + acción en progreso interrumpida (found): past continuous."),
      B("hide", "had been hidden", "PaP", "for decades", "Las cartas habían estado escondidas (por alguien) durante décadas antes de que las encontrara: past perfect pasivo.", { pass: true }),
      B("write", "were written", "PaS", "in Italian, not German", "Las cartas fueron escritas (por alguien) en el pasado: past simple pasivo.", { pass: true, acc: ["had been written"] }),
      B("never/hear", "had never heard", "PaP", "before", "Never… before en una narración en pasado: past perfect."),
      B("try", "have been trying", "PPC", "ever since", "Ever since: desde entonces y sigue. Present perfect continuous.", { acc: ["have tried"] }),
      B("contact", "has contacted", "PP", "so far", "So far = hasta ahora: present perfect."),
      B("currently/translate", "are currently translating", "PC", "the letters for him", "Currently: algo en progreso en este período. Present continuous."),
      B("travel", "am going to travel", "GT", "I've already booked my flights", "Plan decidido (ya reservó los vuelos): be going to o present continuous.", { acc: ["am travelling", "am traveling"] }),
      B("learn", "will have learned", "FP", "by the time I come back", "By the time + futuro: terminado antes de ese momento. Future perfect.", { acc: ["will have learnt"] })
    ],
    rewrites: [
      R("SO", "such", "It was such a hot day that we stayed indoors.", "The day was so hot that we stayed indoors.", ["It was so hot that we stayed indoors.", "It was so hot that day that we stayed indoors.", "The day was so hot that we stayed inside."]),
      R("CAN YOU TELL ME", "indirect", "How much does this coat cost?", "Can you tell me how much this coat costs?", []),
      R("WHEN", "time", "Sara will finish university. Then she's going to travel around Asia.", "When Sara finishes university, she's going to travel around Asia.", ["When Sara [finishes|has finished] university, she ['s going to|is going to|will] travel around Asia.", "Sara [is going to|'s going to|will] travel around Asia when she [finishes|has finished] university."]),
      R("WHO", "relative", "Picasso painted Guernica. He was born in Málaga.", "Picasso, who was born in Málaga, painted Guernica.", ["Picasso, who painted Guernica, was born in Málaga."]),
      R("IF", "cond2", "Paul doesn't eat healthy food, so he feels tired all the time.", "If Paul ate healthy food, he wouldn't feel tired all the time.", ["If Paul ate [healthy|healthier] food, he wouldn't feel [tired all the time|so tired|tired].", "Paul wouldn't feel tired all the time if he ate [healthy|healthier] food."]),
      R("IN CASE", "in-case", "You might get hungry on the trip, so take some sandwiches.", "Take some sandwiches in case you get hungry on the trip.", ["In case you get hungry on the trip, take some sandwiches."]),
      R("WERE", "were", "Why don't you see a doctor about your back?", "If I were you, I would see a doctor about your back.", ["If I were you, I['d|would] see a doctor about [your|my] back.", "I['d|would] see a doctor about [your|my] back if I were you."])
    ]
  });

  /* ======================= SET 9 ======================= */
  exam({ id: 9, source: "generado", title: "A GIRL WHO BECAME AN INFLUENCER",
    text: "Two years ago, nobody knew who Lucía Gómez was. She {{1}} short cooking videos on social media for a few months when one of them suddenly went viral. \"I {{2}} pancakes in my kitchen when my phone started going crazy,\" she remembers. Within two days, the video had more than a million views. Since then, her account {{3}} by more than two million people, and last year she {{4}} to appear on several TV shows. These days Lucía {{5}} three videos a week, and she {{6}} on her first online course. Not everything is easy, though. \"Some people write horrible comments. At first I {{7}} how to deal with them, but now I just ignore them,\" she says. Lucía has big plans for the future. \"Next month I {{8}} a cooking channel with my sister – we've already chosen the name.\" Her manager believes that by the end of the year her channel {{9}} three million subscribers. \"And this time next year,\" Lucía jokes, \"I {{10}} in my own restaurant!\" Her parents still can't believe it.",
    blanks: [
      B("post", "had been posting", "PaPC", "for a few months when", "Venía subiendo videos unos meses cuando uno se hizo viral: past perfect continuous.", { acc: ["had posted"] }),
      B("make", "was making", "PaC", "when my phone started", "Acción en progreso interrumpida por otra: past continuous."),
      B("follow", "has been followed", "PP", "Since then", "Since then y la cuenta es seguida por otros (by…): present perfect pasivo.", { pass: true }),
      B("invite", "was invited", "PaS", "last year", "Last year y a ella la invitaron: past simple pasivo.", { pass: true }),
      B("usually/upload", "usually uploads", "PS", "three videos a week", "Rutina (three videos a week): present simple con usually antes del verbo."),
      B("currently/work", "is currently working", "PC", "on her first online course", "Currently: en progreso en este período. Present continuous."),
      B("not/know", "didn't know", "PaS", "At first", "At first (al principio, en el pasado): past simple negativo."),
      B("start", "am going to start", "GT", "we've already chosen the name", "Plan decidido: be going to (o present continuous).", { acc: ["am starting"] }),
      B("reach", "will have reached", "FP", "by the end of the year", "By the end of the year: terminado antes de ese momento. Future perfect."),
      B("cook", "will be cooking", "FC", "this time next year", "This time next year: en progreso en un momento futuro. Future continuous.")
    ],
    rewrites: [
      R("DO YOU KNOW", "indirect", "Who wrote this song?", "Do you know who wrote this song?", []),
      R("WISH", "wish-past", "My flat is very small. I don't like it.", "I wish my flat were bigger.", ["I wish my flat [were|was] bigger.", "I wish my flat [weren't|wasn't] so small."]),
      R("WHO", "relative", "My neighbour plays the drums every night. She's a music teacher.", "My neighbour, who plays the drums every night, is a music teacher.", ["My neighbour, who is a music teacher, plays the drums every night."]),
      R("IF", "cond3", "I didn't know you were in hospital, so I didn't visit you.", "If I had known you were in hospital, I would have visited you.", ["If I had known [that|] you were in [hospital|the hospital], I would have visited you.", "I would have visited you if I had known [that|] you were in [hospital|the hospital]."]),
      R("IN CASE", "in-case", "There may be a lot of traffic, so leave early.", "Leave early in case there is a lot of traffic.", ["In case there is a lot of traffic, leave early."]),
      R("WERE", "were", "You shouldn't lend him any more money.", "If I were you, I wouldn't lend him any more money.", ["I wouldn't lend him any more money if I were you."]),
      R("THE … THE …", "the-the", "If a hotel is expensive, it's usually more comfortable.", "The more expensive a hotel is, the more comfortable it usually is.", ["The more expensive a hotel is, the more comfortable it [usually is|is].", "The more expensive the hotel [is|], the more comfortable it [usually is|is]."])
    ]
  });

  /* ======================= SET 10 ======================= */
  exam({ id: 10, source: "generado", title: "A MAN WHO HATES MOVING HOUSE",
    text: "Some people love moving house, but Mark Evans isn't one of them. He {{1}} six times in the last ten years, and he says it gets worse every time. He hates packing, he hates unpacking, and he especially hates carrying heavy furniture up the stairs. \"When we {{2}} to Bristol in 2020, half our furniture {{3}} by the removal company,\" he complains. Right now Mark and his wife {{4}} boxes again, because his company {{5}} him to Edinburgh. \"We {{6}} for two weeks and we still haven't finished the kitchen!\" he says, pointing at a mountain of plates and glasses. The new house is not ready yet: the walls {{7}} at the moment, and the new kitchen {{8}} next Friday. \"I {{9}} again after this,\" Mark insists. \"I've told my wife: this is the last time.\" His wife isn't so sure. \"By the time we retire, I bet we {{10}} at least twice more,\" she laughs. Mark just shakes his head and goes back to his boxes.",
    blanks: [
      B("already/move", "has already moved", "PP", "in the last ten years", "In the last ten years: período que llega hasta hoy. Present perfect con already."),
      B("move", "moved", "PaS", "in 2020", "In 2020: momento terminado. Past simple."),
      B("break", "was broken", "PaS", "by the removal company", "Los muebles fueron rotos por la empresa (by…): past simple pasivo.", { pass: true, acc: ["got broken"] }),
      B("pack", "are packing", "PC", "Right now", "Right now: en progreso ahora. Present continuous."),
      B("transfer", "is transferring", "PC", "because his company", "Un cambio que está en marcha ahora (o ya decidido): present continuous o present perfect.", { acc: ["has transferred"] }),
      B("pack", "have been packing", "PPC", "for two weeks", "For two weeks y siguen: present perfect continuous."),
      B("paint", "are being painted", "PC", "at the moment", "At the moment y las paredes no se pintan solas: present continuous pasivo.", { pass: true }),
      B("deliver", "will be delivered", "WF", "next Friday", "Hecho futuro y la cocina la entregan otros: future simple pasivo (o going to be / is being delivered).", { pass: true, acc: ["is going to be delivered", "is being delivered"] }),
      B("never/move", "will never move", "WF", "Mark insists", "Una afirmación firme sobre el futuro: will never (o be never going to).", { acc: ["am never going to move"] }),
      B("move", "will have moved", "FP", "By the time we retire", "By the time + futuro: va a estar hecho antes. Future perfect.")
    ],
    rewrites: [
      R("SUCH … THAT", "such", "The questions were so difficult that nobody finished the test.", "They were such difficult questions that nobody finished the test.", ["[They|These|Those] were such difficult questions that nobody finished the test."]),
      R("WISH", "wish-pp", "I regret buying such an expensive phone.", "I wish I hadn't bought such an expensive phone.", []),
      R("WHEN", "time", "We'll arrive at the hotel. Then we'll go to the beach.", "When we arrive at the hotel, we'll go to the beach.", ["When we [arrive at|get to|have arrived at] the hotel, we['ll|will] go to the beach.", "We['ll|will] go to the beach when we [arrive at|get to|have arrived at] the hotel."]),
      R("IF", "cond2", "I'm not rich, so I can't buy a house by the sea.", "If I were rich, I could buy a house by the sea.", ["If I [were|was] rich, I [could|would] buy a house by the sea.", "I [could|would] buy a house by the sea if I [were|was] rich."]),
      R("IN CASE", "in-case", "Write down my address. You might forget it.", "Write down my address in case you forget it.", ["Write my address down in case you forget it.", "In case you forget it, write down my address."]),
      R("WERE", "were", "I think you should take the job.", "If I were you, I would take the job.", ["If I were you, I['d|would] take the job.", "I['d|would] take the job if I were you."]),
      R("THE … THE …", "the-the", "When it gets darker, it gets colder.", "The darker it gets, the colder it gets.", ["The darker it gets, the colder it [gets|becomes|is]."])
    ]
  });

  /* ======================= SET 11 ======================= */
  exam({ id: 11, source: "generado", title: "A WOMAN WHO SWIMS WITH SHARKS",
    text: "Emma Clarke {{1}} the sea when she was a child. Today she is a professional diver, and she {{2}} with sharks for nearly fifteen years. \"I {{3}} my first dive with a whale shark,\" she says. \"I {{4}} about that moment for years before it happened, and when I finally saw it, I wasn't scared at all.\" Since then, she has done more than two thousand dives all over the world. While she {{5}} a documentary in Australia last year, Emma {{6}} by a small reef shark. \"It wasn't serious. I {{7}} my hand too close to its food – it was my fault,\" she explains. The documentary {{8}} on TV next spring, and Emma hopes it will change people's opinion of sharks. \"Every year, millions of sharks {{9}} by humans, and only a few people are killed by sharks.\" Her next challenge is even bigger: this time next month she {{10}} in the Arctic, under the ice. She will be the first woman from her country to try it.",
    blanks: [
      B("not/like", "didn't like", "PaS", "when she was a child", "When she was a child: pasado terminado. Past simple negativo (también used to).", { acc: ["did not use to like", "didn't use to like"] }),
      B("swim", "has been swimming", "PPC", "for nearly fifteen years", "For nearly fifteen years y sigue: present perfect continuous.", { acc: ["has swum"] }),
      B("never/forget", "will never forget", "WF", "my first dive with a whale shark", "Una afirmación sobre el futuro (nunca lo voy a olvidar): will never. También have never forgotten.", { acc: ["have never forgotten"] }),
      B("dream", "had been dreaming", "PaPC", "for years before it happened", "Venía soñando durante años antes de que pasara: past perfect continuous.", { acc: ["had dreamed", "had dreamt"] }),
      B("film", "was filming", "PaC", "While she", "While + acción en progreso: past continuous."),
      B("bite", "was bitten", "PaS", "by a small reef shark", "A ella la mordió un tiburón (by…): past simple pasivo.", { pass: true }),
      B("put", "had put", "PaP", "it was my fault", "Explica algo que había hecho antes de la mordida: past perfect (también put).", { acc: ["put"] }),
      B("show", "will be shown", "WF", "next spring", "Hecho futuro y el documental lo pasan otros: future simple pasivo.", { pass: true, acc: ["is going to be shown"] }),
      B("kill", "are killed", "PS", "Every year", "Every year: algo que pasa siempre. Pasiva (by humans): present simple pasivo.", { pass: true }),
      B("dive", "will be diving", "FC", "this time next month", "This time next month: en progreso en un momento futuro. Future continuous.")
    ],
    rewrites: [
      R("SO", "such", "It was such a long journey that the children fell asleep.", "The journey was so long that the children fell asleep.", ["It was so long that the children fell asleep."]),
      R("COULD YOU TELL ME", "indirect", "Where is the nearest chemist's?", "Could you tell me where the nearest chemist's is?", ["Could you tell me where the nearest [chemist|pharmacy] is?"]),
      R("AS SOON AS", "time", "I'll receive the information. I'll send it to you immediately.", "As soon as I receive the information, I'll send it to you.", ["As soon as I [receive|get|have received] the information, I['ll|will] send it to you [immediately|].", "I['ll|will] send it to you [immediately|] as soon as I [receive|get|have received] the information."]),
      R("WHICH", "relative", "The Eiffel Tower is in Paris. It was built in 1889.", "The Eiffel Tower, which is in Paris, was built in 1889.", ["The Eiffel Tower, which was built in 1889, is in Paris."]),
      R("IN CASE", "in-case", "Charge your phone. You might need it tonight.", "Charge your phone in case you need it tonight.", ["In case you need it tonight, charge your phone."]),
      R("WERE", "were", "You ought to stop smoking.", "If I were you, I would stop smoking.", ["If I were you, I['d|would] stop smoking.", "I['d|would] stop smoking if I were you."]),
      R("THE … THE …", "the-the", "If you sleep less, you feel more tired.", "The less you sleep, the more tired you feel.", ["The less you sleep, the more tired you [feel|will feel|are|get]."])
    ]
  });

  /* ======================= SET 12 ======================= */
  exam({ id: 12, source: "generado", title: "A FESTIVAL THAT ALMOST DIDN'T HAPPEN",
    text: "Every summer, the Riverside Music Festival {{1}} in a small town in the north of England. This year, however, it almost didn't happen. Two weeks before the opening day, the main stage {{2}} by a terrible storm. \"We {{3}} the site for months, and suddenly everything was ruined,\" says organiser Kate Morris. Fortunately, hundreds of volunteers {{4}} to help, and the stage {{5}} in just ten days. \"I {{6}} anything like it in my life,\" Kate says. The festival finally opened last Friday, and so far more than 20,000 people {{7}} tickets. Right now, a famous rock band {{8}} on the main stage, and the crowd is going wild. Food stalls are selling burgers and pizzas, and the queues for drinks are very long. Kate is already thinking about next year. \"We {{9}} the festival to a bigger site – we've just signed the agreement.\" And by the time the festival ends on Sunday night, the organisers {{10}} more than £50,000 for local charities. Not bad for a festival that almost didn't happen!",
    blanks: [
      B("hold", "is held", "PS", "Every summer", "Every summer: algo que pasa siempre y el festival lo organizan otros: present simple pasivo.", { pass: true }),
      B("damage", "was damaged", "PaS", "by a terrible storm", "El escenario fue dañado por la tormenta (by…): past simple pasivo.", { pass: true, acc: ["had been damaged"] }),
      B("prepare", "had been preparing", "PaPC", "for months, and suddenly", "Venían preparando el lugar durante meses hasta que todo se arruinó: past perfect continuous.", { acc: ["had prepared"] }),
      B("immediately/offer", "immediately offered", "PaS", "Fortunately", "Acción puntual en la historia: past simple con immediately antes del verbo."),
      B("rebuild", "was rebuilt", "PaS", "in just ten days", "El escenario fue reconstruido por los voluntarios: past simple pasivo.", { pass: true }),
      B("never/see", "have never seen", "PP", "in my life", "In my life: experiencia hasta ahora. Present perfect con never."),
      B("buy", "have bought", "PP", "so far", "So far = hasta ahora: present perfect."),
      B("play", "is playing", "PC", "Right now", "Right now: en progreso ahora. Present continuous."),
      B("move", "are going to move", "GT", "we've just signed the agreement", "Plan decidido: be going to (o present continuous).", { acc: ["are moving", "will move"] }),
      B("raise", "will have raised", "FP", "by the time the festival ends", "By the time + futuro: terminado antes de ese momento. Future perfect.")
    ],
    rewrites: [
      R("SUCH", "such", "The weather was so bad that the match was cancelled.", "It was such bad weather that the match was cancelled.", ["[It|That] was such bad weather that the match was [cancelled|canceled].", "We had such bad weather that the match was [cancelled|canceled]."]),
      R("DO YOU KNOW", "indirect", "When will the results be published?", "Do you know when the results will be published?", []),
      R("WISH", "wish-could", "I can't swim, and I'd love to.", "I wish I could swim.", []),
      R("WHO", "relative", "Lionel Messi has won the World Cup. He was born in Rosario.", "Lionel Messi, who was born in Rosario, has won the World Cup.", ["Lionel Messi, who has won the World Cup, was born in Rosario."]),
      R("IF", "cond3", "I didn't take my umbrella, so I got wet.", "If I had taken my umbrella, I wouldn't have got wet.", ["If I had taken my umbrella, I wouldn't have [got|gotten] wet.", "I wouldn't have [got|gotten] wet if I had taken my umbrella."]),
      R("WERE", "were", "Don't buy that car – it's too old.", "If I were you, I wouldn't buy that car.", ["If I were you, I wouldn't buy that car[|, it's too old|, because it's too old| because it's too old].", "I wouldn't buy that car if I were you."]),
      R("THE … THE …", "the-the", "If you leave early, you'll arrive early.", "The earlier you leave, the earlier you'll arrive.", ["The earlier you leave, the [earlier|sooner] you['ll|will] arrive.", "The earlier you leave, the earlier you arrive."])
    ]
  });

  /* ======================= SET 13 ======================= */
  exam({ id: 13, source: "generado", title: "A TEENAGER WHO BUILT A ROBOT",
    text: "Seventeen-year-old Nicolás Herrera {{1}} interested in technology since he was a little boy. When he was eight, he {{2}} his parents' radio apart to see how it worked – and it {{3}} again! His parents were not very happy about it. Last year, while he {{4}} a documentary about farmers, he had an idea: a small robot that could water plants automatically. Many farmers in his area waste a lot of water, and he wanted to help them. He {{5}} on the project every weekend for six months before it was finished. His robot {{6}} as the winner of a national science competition last month, and since then he {{7}} by several newspapers. At the moment, the robot {{8}} on three farms near his town. \"If the tests go well, the robots {{9}} by a local company next year,\" Nicolás explains. And his plans for the future? \"This time next year, I {{10}} engineering at university – I hope!\" His teachers are sure he will get there.",
    blanks: [
      B("always/be", "has always been", "PP", "since he was a little boy", "Since + momento pasado y sigue: present perfect (be no va en continuo)."),
      B("take", "took", "PaS", "When he was eight", "Momento terminado del pasado: past simple."),
      B("never/work", "never worked", "PaS", "again", "Resultado en el pasado de la historia: past simple con never (también has never worked).", { acc: ["has never worked"] }),
      B("watch", "was watching", "PaC", "while he", "While + acción en progreso: past continuous."),
      B("work", "had been working", "PaPC", "for six months before it was finished", "Venía trabajando seis meses antes de terminarlo: past perfect continuous.", { acc: ["had worked"] }),
      B("choose", "was chosen", "PaS", "last month", "Last month y el robot fue elegido por un jurado: past simple pasivo.", { pass: true }),
      B("interview", "has been interviewed", "PP", "since then", "Since then y a él lo entrevistaron otros: present perfect pasivo.", { pass: true }),
      B("test", "is being tested", "PC", "At the moment", "At the moment y el robot no se prueba solo: present continuous pasivo.", { pass: true }),
      B("produce", "will be produced", "WF", "If the tests go well", "Primer condicional (if + present, will) en pasiva: will be + participio.", { pass: true, acc: ["are going to be produced"] }),
      B("study", "will be studying", "FC", "This time next year", "This time next year: en progreso en un momento futuro. Future continuous.")
    ],
    rewrites: [
      R("SUCH … THAT", "such", "The concert was so loud that my ears hurt.", "It was such a loud concert that my ears hurt.", ["[It|That] was such a loud concert that my ears hurt."], { countable: true }),
      R("CAN YOU TELL ME", "indirect", "Why is the museum closed today?", "Can you tell me why the museum is closed today?", []),
      R("WISH", "wish-pp", "I spent all my money on clothes. Now I regret it.", "I wish I hadn't spent all my money on clothes.", ["I wish I hadn't spent [all my|so much] money on clothes."]),
      R("WHEN", "time", "I'll be twenty-one next year. Then I'll move out.", "When I'm twenty-one, I'll move out.", ["When I [am|turn] twenty-one [next year|], I['ll|will] move out.", "I['ll|will] move out when I [am|turn] twenty-one [next year|]."]),
      R("IF", "cond2", "We don't have a garden, so we can't get a dog.", "If we had a garden, we could get a dog.", ["If we had a garden, we [could|would] get a dog.", "We [could|would] get a dog if we had a garden."]),
      R("IN CASE", "in-case", "You might feel cold on the plane. Take a jacket.", "Take a jacket in case you feel cold on the plane.", ["In case you feel cold on the plane, take a jacket."]),
      R("THE … THE …", "the-the", "If you read more, your vocabulary will be richer.", "The more you read, the richer your vocabulary will be.", ["The more you read, the richer your vocabulary [will be|is|gets|becomes]."])
    ]
  });

  /* ======================= SET 14 ======================= */
  exam({ id: 14, source: "generado", title: "A NURSE WHO WORKS NIGHT SHIFTS",
    text: "Laura Benítez {{1}} as a nurse at a children's hospital for twelve years, and she still loves her job. The pay isn't great and the hours are long, but she says the children make it worth it. She {{2}} at ten at night and finishes at eight in the morning. \"This week I {{3}} nights because a colleague is on holiday,\" she explains. Last Tuesday was one of the hardest nights of her career. \"At about three in the morning, a little boy {{4}} in by ambulance. He {{5}} off a wall while he {{6}} with his friends, and he had broken his arm.\" The boy {{7}} on that same night, and he is recovering well. Laura believes nurses {{8}} enough for what they do, but she wouldn't change her job. Next year, she {{9}} a course to become a specialist in emergency care – she has already been accepted. \"By the time I'm forty, I hope I {{10}} my specialist training,\" she says. Then, she jokes, she might finally get some sleep at night!",
    blanks: [
      B("work", "has been working", "PPC", "for twelve years", "For twelve years y sigue: present perfect continuous.", { acc: ["has worked"] }),
      B("usually/start", "usually starts", "PS", "and finishes at eight in the morning", "Rutina: present simple con usually antes del verbo."),
      B("work", "am working", "PC", "This week", "Situación temporal (this week): present continuous."),
      B("bring", "was brought", "PaS", "by ambulance", "Al chico lo trajeron (by ambulance): past simple pasivo.", { pass: true }),
      B("fall", "had fallen", "PaP", "and he had broken his arm", "Se cayó antes de llegar al hospital: past perfect (también past simple).", { acc: ["fell"] }),
      B("play", "was playing", "PaC", "while he", "While + acción en progreso: past continuous."),
      B("operate", "was operated", "PaS", "on that same night", "Al chico lo operaron (operate on): past simple pasivo.", { pass: true }),
      B("not/pay", "aren't paid", "PS", "for what they do", "Una opinión general en presente y a las enfermeras les pagan otros: present simple pasivo negativo.", { pass: true, acc: ["don't get paid"] }),
      B("begin", "is going to begin", "GT", "she has already been accepted", "Plan decidido: be going to (o present continuous / will).", { acc: ["is beginning", "will begin", "is going to start", "is starting"] }),
      B("finish", "will have finished", "FP", "By the time I'm forty", "By the time + futuro: terminado antes. Future perfect.")
    ],
    rewrites: [
      R("SO", "such", "It was such an interesting book that I read it in one day.", "The book was so interesting that I read it in one day.", ["It was so interesting that I read it in one day."]),
      R("DO YOU KNOW", "indirect", "What time do the shops close on Sundays?", "Do you know what time the shops close on Sundays?", ["Do you know when the shops close on Sundays?"]),
      R("WISH", "wish-past", "I don't have enough free time.", "I wish I had more free time.", ["I wish I had [more|enough] free time."]),
      R("AS SOON AS", "time", "The film will finish. Then we'll go out for dinner.", "As soon as the film finishes, we'll go out for dinner.", ["As soon as the film [finishes|ends|has finished], we['ll|will] go out for dinner.", "We['ll|will] go out for dinner as soon as the film [finishes|ends|has finished]."]),
      R("WHICH", "relative", "Our school has a new swimming pool. It was opened last month.", "Our school has a new swimming pool, which was opened last month.", []),
      R("IN CASE", "in-case", "The museum may be busy. Book your tickets online.", "Book your tickets online in case the museum is busy.", ["In case the museum is busy, book your tickets online."]),
      R("WERE", "were", "You'd better not tell anyone about this.", "If I were you, I wouldn't tell anyone about this.", ["I wouldn't tell anyone about this if I were you."])
    ]
  });

  /* ======================= SET 15 ======================= */
  exam({ id: 15, source: "generado", title: "A PAINTING THAT WAS STOLEN",
    text: "For more than fifty years, nobody knew where 'The Blue Garden' was. The painting {{1}} from a museum in Paris in 1971, and the police {{2}} the thieves. Then, last month, something amazing happened. It has been on the front page of every French newspaper since then. An elderly woman in Lyon {{3}} her attic when she found a large, flat package. Inside was the missing painting! It {{4}} there for decades by her late husband, who {{5}} in 2015. He had worked as a security guard at the museum at the time of the robbery. \"I {{6}} any idea,\" she told reporters. Since the discovery, the painting {{7}} by experts, who say it is in excellent condition. It {{8}} to the museum next month, and it will be shown to the public again in the spring. Meanwhile, the police {{9}} the case. \"We {{10}} out the whole truth one day,\" says the detective in charge. Until then, the mystery of 'The Blue Garden' will not be completely solved.",
    blanks: [
      B("steal", "was stolen", "PaS", "in 1971", "In 1971 y el cuadro fue robado por alguien: past simple pasivo.", { pass: true }),
      B("never/find", "never found", "PaS", "the police", "Resultado en ese pasado: past simple con never (también have never found).", { acc: ["have never found"] }),
      B("clean", "was cleaning", "PaC", "when she found", "Acción en progreso interrumpida (found): past continuous."),
      B("keep", "had been kept", "PaP", "for decades", "Había estado guardado durante décadas (por su marido) antes de encontrarlo: past perfect pasivo.", { pass: true }),
      B("die", "died", "PaS", "in 2015", "In 2015: momento terminado. Past simple."),
      B("not/have", "didn't have", "PaS", "she told reporters", "Lo que dijo sobre ese momento pasado: past simple negativo.", { acc: ["had no"] }),
      B("examine", "has been examined", "PP", "Since the discovery", "Since + y el cuadro lo examinan otros: present perfect pasivo.", { pass: true }),
      B("return", "will be returned", "WF", "next month", "Hecho futuro y el cuadro lo devuelven otros: future simple pasivo.", { pass: true, acc: ["is going to be returned", "is being returned"] }),
      B("still/investigate", "are still investigating", "PC", "Meanwhile", "Algo que sigue en progreso ahora: present continuous con still."),
      B("find", "will find", "WF", "one day", "Una predicción sobre el futuro: will.")
    ],
    rewrites: [
      R("COULD YOU TELL ME", "indirect", "How long does the journey take?", "Could you tell me how long the journey takes?", []),
      R("WISH", "wish-pp", "I'm sorry I didn't go to the concert with you.", "I wish I had gone to the concert with you.", []),
      R("WHEN", "time", "The rain will stop. Then we'll go for a walk.", "When the rain stops, we'll go for a walk.", ["When [the rain|it] [stops|has stopped], we['ll|will] go for a walk.", "We['ll|will] go for a walk when [the rain|it] [stops|has stopped]."]),
      R("WHO", "relative", "Frida Kahlo was a Mexican painter. She painted many self-portraits.", "Frida Kahlo, who was a Mexican painter, painted many self-portraits.", ["Frida Kahlo, who painted many self-portraits, was a Mexican painter."]),
      R("IF", "cond3", "The team lost because their best player was injured.", "If their best player hadn't been injured, the team wouldn't have lost.", ["If their best player hadn't been injured, the team [wouldn't have lost|would have won].", "The team [wouldn't have lost|would have won] if their best player hadn't been injured."]),
      R("WERE", "were", "You should wear a coat – it's freezing.", "If I were you, I would wear a coat.", ["If I were you, I['d|would] wear a coat[|, it's freezing|, because it's freezing| because it's freezing].", "I['d|would] wear a coat if I were you."]),
      R("THE … THE …", "the-the", "If the flight is long, the tickets are expensive.", "The longer the flight is, the more expensive the tickets are.", ["The longer the flight [is|], the more expensive the tickets [are|]."])
    ]
  });

  /* ======================= SET 16 ======================= */
  exam({ id: 16, source: "generado", title: "A MAN WHO RAN ACROSS THE DESERT",
    text: "Last April, Pablo Martín {{1}} 250 kilometres across the Sahara Desert in six days. He {{2}} for the race for over a year, but nothing had prepared him for the heat. During the day the temperature reached 50 degrees, and at night it was freezing. \"On the third day, while I {{3}} some enormous sand dunes, I ran out of water,\" he remembers. \"Luckily, I {{4}} by a medical team, who gave me something to drink.\" Pablo finished the race in 48th position. \"I {{5}} so proud in my life,\" he says. Since then he {{6}} talks in schools about the importance of not giving up, and his story {{7}} in a short film that {{8}} at several festivals this year. These days, Pablo {{9}} for an even harder challenge: a race across Antarctica. \"By this time next year, I {{10}} on every continent,\" he says with a smile. His family is less excited. \"We just want him to stay at home for a while,\" says his mother.",
    blanks: [
      B("run", "ran", "PaS", "Last April", "Last April: momento terminado. Past simple."),
      B("train", "had been training", "PaPC", "for over a year, but nothing had prepared", "Venía entrenando más de un año antes de la carrera: past perfect continuous.", { acc: ["had trained"] }),
      B("cross", "was crossing", "PaC", "while I", "While + acción en progreso: past continuous."),
      B("see", "was seen", "PaS", "by a medical team", "A él lo vio el equipo médico (by…): past simple pasivo.", { pass: true }),
      B("never/feel", "have never felt", "PP", "in my life", "In my life: experiencia hasta ahora. Present perfect con never (también had never felt).", { acc: ["had never felt"] }),
      B("give", "has been giving", "PPC", "Since then", "Since then y sigue haciéndolo: present perfect continuous (o has given).", { acc: ["has given"] }),
      B("tell", "has been told", "PP", "in a short film", "Su historia fue contada por otros, con resultado presente: present perfect pasivo.", { pass: true, acc: ["was told"] }),
      B("show", "has been shown", "PP", "this year", "This year (período que no terminó) y la película la proyectan otros: present perfect pasivo.", { pass: true, acc: ["was shown", "is being shown"] }),
      B("already/prepare", "is already preparing", "PC", "These days", "These days: en progreso en este período. Present continuous."),
      B("run", "will have run", "FP", "By this time next year", "By this time next year: terminado antes. Future perfect.")
    ],
    rewrites: [
      R("SUCH", "such", "The children were so noisy that I couldn't concentrate.", "They were such noisy children that I couldn't concentrate.", ["[They|These|Those] were such noisy children that I couldn't concentrate."]),
      R("WISH", "wish-pp", "My brother regrets selling his guitar.", "My brother wishes he hadn't sold his guitar.", []),
      R("AS SOON AS", "time", "I'll find a job. Then I'll rent a flat.", "As soon as I find a job, I'll rent a flat.", ["As soon as I [find|get|have found] a job, I['ll|will] rent a flat.", "I['ll|will] rent a flat as soon as I [find|get|have found] a job."]),
      R("WHICH", "relative", "Mount Aconcagua is in Argentina. It is the highest mountain in America.", "Mount Aconcagua, which is in Argentina, is the highest mountain in America.", ["Mount Aconcagua, which is the highest mountain in America, is in Argentina."]),
      R("IF", "cond2", "He works too much, so he never sees his friends.", "If he didn't work so much, he would see his friends.", ["If he didn't work [so|too] much, he would see his friends [more often|more|].", "He would see his friends [more often|more|] if he didn't work [so|too] much.", "If he worked less, he would see his friends [more often|more|]."]),
      R("IN CASE", "in-case", "Somebody might call while I'm out. Please take a message.", "Please take a message in case somebody calls while I'm out.", ["[Please|] take a message in case [somebody|someone|anybody|anyone] calls while I'm out."]),
      R("THE … THE …", "the-the", "If you work hard, you'll earn more money.", "The harder you work, the more money you'll earn.", ["The harder you work, the more money you['ll|will|] earn."])
    ]
  });

  /* ======================= SET 17 ======================= */
  exam({ id: 17, source: "generado", title: "A WOMAN WHO LOST HER DOG",
    text: "Last Saturday, Ana Silva {{1}} her dog, Bruno, in the park when a loud firework exploded. Bruno {{2}} free from his lead and disappeared into the trees. \"I looked for him for hours, and by midnight I {{3}} him,\" Ana says. She {{4}} Bruno since he was a puppy, so she was devastated. She called all the vets and animal shelters in the city, but nobody had seen him. The next morning, hundreds of posters {{5}} up around the neighbourhood by her friends, and so far a message about Bruno {{6}} more than five thousand times on social media. Finally, on Monday, a phone call came: Bruno {{7}} by a bus driver twenty kilometres away! \"I {{8}} him off the lead near fireworks again,\" Ana promises. These days she {{9}} Bruno to a dog trainer twice a week, and they are going on holiday next week. \"This time next week, we {{10}} on a beach together, far away from any fireworks!\" Bruno, of course, has no idea how much trouble he caused.",
    blanks: [
      B("walk", "was walking", "PaC", "when a loud firework exploded", "Acción en progreso interrumpida (exploded): past continuous."),
      B("pull", "pulled", "PaS", "and disappeared into the trees", "Secuencia de acciones en el pasado: past simple."),
      B("still/not/find", "still hadn't found", "PaP", "by midnight", "By midnight (antes de ese momento pasado) todavía no: past perfect negativo con still antes de hadn't."),
      B("have", "had had", "PaP", "since he was a puppy, so she was devastated", "Tenía a Bruno desde cachorro hasta ese momento del pasado: past perfect (have no va en continuo).", { acc: ["has had"] }),
      B("put", "were put", "PaS", "The next morning", "Los carteles fueron puestos por sus amigos: past simple pasivo.", { pass: true }),
      B("share", "has been shared", "PP", "so far", "So far y el mensaje lo comparten otros: present perfect pasivo.", { pass: true }),
      B("find", "had been found", "PaP", "a phone call came", "Lo encontraron antes de que llegara la llamada: past perfect pasivo (también was found).", { pass: true, acc: ["was found"] }),
      B("never/let", "will never let", "WF", "Ana promises", "Es una promesa: will never.", { acc: ["am never going to let"] }),
      B("take", "takes", "PS", "twice a week", "Twice a week: rutina. Present simple (también is taking, por these days).", { acc: ["is taking"] }),
      B("lie", "will be lying", "FC", "This time next week", "This time next week: en progreso en un momento futuro. Future continuous.")
    ],
    rewrites: [
      R("SUCH … THAT", "such", "The view was so beautiful that we took hundreds of photos.", "It was such a beautiful view that we took hundreds of photos.", ["[It|That] was such a beautiful view that we took hundreds of [photos|pictures]."], { countable: true }),
      R("CAN YOU TELL ME", "indirect", "Where did you park the car?", "Can you tell me where you parked the car?", []),
      R("WHO", "relative", "My grandfather was a fisherman. He taught me to swim.", "My grandfather, who was a fisherman, taught me to swim.", ["My grandfather, who taught me to swim, was a fisherman.", "My grandfather, who was a fisherman, taught me how to swim."]),
      R("IF", "cond3", "I forgot her birthday because I didn't write it down.", "If I had written it down, I wouldn't have forgotten her birthday.", ["If I had written [it|her birthday] down, I wouldn't have forgotten [her birthday|it].", "I wouldn't have forgotten her birthday if I had written it down."]),
      R("IN CASE", "in-case", "The tickets might sell out. Let's buy them now.", "Let's buy the tickets now in case they sell out.", ["Let's buy them now in case the tickets sell out.", "Let us buy the tickets now in case they sell out."]),
      R("WERE", "were", "Why don't you ask your teacher for help?", "If I were you, I would ask my teacher for help.", ["If I were you, I['d|would] ask [my|your|the] teacher for help.", "I['d|would] ask [my|your|the] teacher for help if I were you."]),
      R("THE … THE …", "the-the", "If a car is small, it is easy to park.", "The smaller a car is, the easier it is to park.", ["The smaller [a|the] car [is|], the easier it is to park."])
    ]
  });

  /* ======================= SET 18 ======================= */
  exam({ id: 18, source: "generado", title: "A STUDENT WHO MOVED TO DUBLIN",
    text: "When Julia Moreno {{1}} in Dublin last September, she could hardly understand the Irish accent. Even ordering a coffee was a challenge. \"I {{2}} English for ten years, but people spoke so fast!\" she remembers. For the first few weeks, she felt tired and a bit homesick. She {{3}} with an Irish family since then, and her English {{4}} enormously. \"Every morning, I {{5}} up by my host mother singing in the kitchen,\" she laughs. The family has two teenage sons who have become like brothers to her. At the moment, Julia {{6}} for the Cambridge C1 exam, which {{7}} by thousands of students every year. \"I {{8}} nervous yet, but I'm sure I will on the day!\" Her exam is on 12th December, and her results {{9}} to her by email about a month later. Julia's plans are clear: \"By the end of next year, I {{10}} my degree, and then I want to teach English in Argentina.\" Her host family has already promised to visit her there.",
    blanks: [
      B("arrive", "arrived", "PaS", "last September", "Last September: momento terminado. Past simple."),
      B("study", "had been studying", "PaPC", "for ten years", "Venía estudiando diez años antes de llegar a Dublín: past perfect continuous.", { acc: ["had studied"] }),
      B("live", "has been living", "PPC", "since then", "Since then y sigue: present perfect continuous (o has lived).", { acc: ["has lived"] }),
      B("already/improve", "has already improved", "PP", "enormously", "Resultado presente de un cambio: present perfect con already."),
      B("wake", "am woken", "PS", "Every morning", "Rutina (every morning) y a ella la despiertan (by…): present simple pasivo.", { pass: true, acc: ["get woken"] }),
      B("prepare", "is preparing", "PC", "At the moment", "At the moment: en progreso ahora. Present continuous."),
      B("take", "is taken", "PS", "every year", "Every year y el examen lo rinden otros (by thousands…): present simple pasivo.", { pass: true }),
      B("not/feel", "don't feel", "PS", "yet", "Un estado en este momento: present simple negativo (también am not feeling).", { acc: ["am not feeling"] }),
      B("send", "will be sent", "WF", "about a month later", "Hecho futuro y los resultados los mandan otros: future simple pasivo.", { pass: true, acc: ["are going to be sent"] }),
      B("finish", "will have finished", "FP", "By the end of next year", "By the end of next year: terminado antes. Future perfect.")
    ],
    rewrites: [
      R("SO", "such", "It was such a cold night that the lake froze.", "The night was so cold that the lake froze.", ["It was so cold that night that the lake froze.", "It was so cold that the lake froze."]),
      R("DO YOU KNOW", "indirect", "Has Lucy finished her project?", "Do you know if Lucy has finished her project?", ["Do you know whether Lucy has finished her project?", "Do you know whether or not Lucy has finished her project?"]),
      R("WISH", "wish-past", "I live far from my friends and I don't like it.", "I wish I lived closer to my friends.", ["I wish I lived [closer to|nearer to|near|nearer] my friends.", "I wish I didn't live so far from my friends."]),
      R("IF", "cond2", "I don't know her phone number, so I can't call her.", "If I knew her phone number, I could call her.", ["If I knew her [phone|] number, I [could|would] call her.", "I [could|would] call her if I knew her [phone|] number."]),
      R("IN CASE", "in-case", "You might get lost. Take a map.", "Take a map in case you get lost.", ["In case you get lost, take a map."]),
      R("WERE", "were", "You should go to bed early tonight.", "If I were you, I would go to bed early tonight.", ["If I were you, I['d|would] go to bed early tonight.", "I['d|would] go to bed early tonight if I were you."]),
      R("THE … THE …", "the-the", "If you shout, the baby cries more.", "The more you shout, the more the baby cries.", ["The more you shout, the more the baby [cries|will cry]."])
    ]
  });

  /* ======================= SET 19 ======================= */
  exam({ id: 19, source: "generado", title: "A CITY THAT IS CHANGING FAST",
    text: "If you {{1}} Valparaíso for a few years, you won't recognise some parts of the city. A lot {{2}} since 2015. The old port area, which {{3}} for decades, is now full of cafés and art galleries. Tourists from all over the world now walk up and down its colourful hills. Right now, a new cultural centre {{4}} next to the harbour, and it {{5}} next spring. \"When I was a child, people {{6}} to this part of town because it was dangerous,\" says local artist Rodrigo Paz. \"My parents {{7}} here for twenty years when the first gallery opened, and they couldn't believe it.\" Today his own studio is in the same street where his parents lived. Not everybody is happy, though. Rents {{8}} a lot in the last few years, and some families {{9}} to move out. The local government says that by 2030 it {{10}} two thousand new homes for local families. Critics say that is not enough, but it is a start.",
    blanks: [
      B("not/visit", "haven't visited", "PP", "for a few years", "For a few years hasta ahora: present perfect negativo (en un primer condicional).", { acc: ["haven't been to"] }),
      B("change", "has changed", "PP", "since 2015", "Since 2015 hasta hoy: present perfect."),
      B("abandon", "had been abandoned", "PaP", "for decades", "Había estado abandonada (por la gente) durante décadas antes de cambiar: past perfect pasivo.", { pass: true, acc: ["was abandoned"] }),
      B("build", "is being built", "PC", "Right now", "Right now y el centro lo construyen otros: present continuous pasivo.", { pass: true }),
      B("open", "will open", "WF", "next spring", "Hecho futuro: will (también going to o present continuous).", { acc: ["is going to open", "is opening", "opens"] }),
      B("not/come", "didn't come", "PaS", "When I was a child", "Hábito en un pasado terminado: past simple negativo (o didn't use to come / wouldn't come).", { acc: ["did not use to come", "didn't use to come", "wouldn't come"] }),
      B("live", "had been living", "PaPC", "for twenty years when", "Venían viviendo ahí veinte años cuando abrió la galería: past perfect continuous.", { acc: ["had lived"] }),
      B("rise", "have risen", "PP", "in the last few years", "In the last few years: período hasta hoy. Present perfect (o have been rising).", { acc: ["have been rising"] }),
      B("force", "have been forced", "PP", "in the last few years", "Las familias fueron obligadas (por la situación): present perfect pasivo.", { pass: true, acc: ["were forced"] }),
      B("build", "will have built", "FP", "by 2030", "By 2030: terminado antes de ese momento. Future perfect.")
    ],
    rewrites: [
      R("SUCH", "such", "The exam was so easy that everyone passed.", "It was such an easy exam that everyone passed.", ["[It|That] was such an easy exam that [everyone|everybody] passed."], { countable: true }),
      R("COULD YOU TELL ME", "indirect", "Which platform does the train leave from?", "Could you tell me which platform the train leaves from?", ["Could you tell me from which platform the train leaves?"]),
      R("WISH", "wish-pp", "I regret not learning to play an instrument when I was young.", "I wish I had learned to play an instrument when I was young.", ["I wish I had [learned|learnt] [to play|how to play] an instrument when I was [young|younger]."]),
      R("WHEN", "time", "Dad will retire next year. Then he's going to write a novel.", "When Dad retires next year, he's going to write a novel.", ["When Dad [retires|has retired] [next year|], he['s going to|is going to|will] write a novel.", "Dad [is going to|'s going to|will] write a novel when he [retires|has retired] [next year|]."]),
      R("IN CASE", "in-case", "The guests might arrive early. Have everything ready.", "Have everything ready in case the guests arrive early.", ["In case the guests arrive early, have everything ready."]),
      R("WERE", "were", "Don't drive in this weather.", "If I were you, I wouldn't drive in this weather.", ["I wouldn't drive in this weather if I were you."]),
      R("THE … THE …", "the-the", "If a film is long, I get bored.", "The longer a film is, the more bored I get.", ["The longer [a|the] film [is|], the more bored I [get|become|feel]."])
    ]
  });

  /* ======================= SET 20 ======================= */
  exam({ id: 20, source: "generado", title: "A SINGER WHO NEVER GAVE UP",
    text: "Today Ruby Lane is one of the most famous singers in Britain, but success didn't come easily. She grew up in a small village in Wales, where there were no music schools. She {{1}} songs since she was eleven, and she {{2}} more than three hundred. \"For years, I {{3}} by every record company in London,\" she says. \"Once, while I {{4}} in a small bar, the owner asked me to stop because I was 'too loud'!\" Everything changed in 2021. A video of one of her concerts {{5}} by a fan, and within a week it {{6}} by ten million people. Before that, Ruby {{7}} in front of more than fifty people. Right now she {{8}} her third album in Los Angeles, and next month she {{9}} on a world tour – all the tickets are already sold out. \"By the end of the tour, we {{10}} in thirty countries. I still can't believe it!\" She says she will never forget the bar owner who told her to stop.",
    blanks: [
      B("write", "has been writing", "PPC", "since she was eleven", "Since + momento pasado y sigue: present perfect continuous (o has written).", { acc: ["has written"] }),
      B("already/compose", "has already composed", "PP", "more than three hundred", "Cantidad de cosas hechas hasta ahora: present perfect simple con already."),
      B("reject", "was rejected", "PaS", "by every record company", "A ella la rechazaban (by…), en un período terminado: past simple pasivo.", { pass: true, acc: ["had been rejected"] }),
      B("sing", "was singing", "PaC", "while I", "While + acción en progreso: past continuous."),
      B("upload", "was uploaded", "PaS", "in 2021", "In 2021 y el video lo subió un fan (by…): past simple pasivo.", { pass: true }),
      B("see", "had been seen", "PaP", "within a week", "En una semana ya había sido visto (por millones): past perfect pasivo (también was seen).", { pass: true, acc: ["was seen"] }),
      B("never/play", "had never played", "PaP", "Before that", "Before that: antes de ese momento del pasado. Past perfect con never."),
      B("record", "is recording", "PC", "Right now", "Right now: en progreso ahora. Present continuous."),
      B("go", "is going", "PC", "all the tickets are already sold out", "Plan ya arreglado (entradas vendidas): present continuous con sentido de futuro (o going to).", { acc: ["is going to go", "will go"] }),
      B("play", "will have played", "FP", "By the end of the tour", "By the end of the tour: terminado antes. Future perfect.")
    ],
    rewrites: [
      R("SO", "such", "They were such kind people that they lent us their car.", "The people were so kind that they lent us their car.", ["They were so kind that they lent us their car."]),
      R("CAN YOU TELL ME", "indirect", "Who is the man in the grey suit?", "Can you tell me who the man in the grey suit is?", []),
      R("WISH", "wish-past", "It's a pity I'm not on holiday right now.", "I wish I were on holiday right now.", ["I wish I [were|was] on holiday [right now|now|]."]),
      R("AS SOON AS", "time", "Our guests will arrive. Then we'll serve dinner.", "As soon as our guests arrive, we'll serve dinner.", ["As soon as [our|the] guests [arrive|have arrived], we['ll|will] serve dinner.", "We['ll|will] serve dinner as soon as [our|the] guests [arrive|have arrived]."]),
      R("WHO", "relative", "Marta is my best friend. She is studying medicine in Madrid.", "Marta, who is my best friend, is studying medicine in Madrid.", ["Marta, who is studying medicine in Madrid, is my best friend."]),
      R("IN CASE", "in-case", "We might not have time to cook later. Let's make sandwiches now.", "Let's make sandwiches now in case we don't have time to cook later.", ["Let's make [some|] sandwiches now in case we don't have time to cook later."]),
      R("WERE", "were", "I think you should talk to your parents.", "If I were you, I would talk to my parents.", ["If I were you, I['d|would] talk to [my|your] parents.", "I['d|would] talk to [my|your] parents if I were you."])
    ]
  });

  var EXAMS = C.exams;
  root.EXAMS = EXAMS;
  if (typeof module !== "undefined" && module.exports) module.exports = EXAMS;
})(typeof window !== "undefined" ? window : globalThis);
