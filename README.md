# Práctica de inglés — 5to

Juego para practicar **English File Upper-Intermediate (4th edition)**. Es un solo archivo (`index.html`) sin dependencias: funciona en línea y también descargándolo y abriéndolo con doble clic.

**Jugar:** https://camilafloralvarezflor-hue.github.io/practica-vocabulario/

## Modos

- **Vocabulario:** 598 palabras del Vocabulary Bank (SB p. 152–163) y de los phrasal verbs. Lees la definición en inglés y escribís la palabra. Podés filtrar por temas y repasar las que fallaste.
- **Examen: Tenses & Rewrite:** los dos ejercicios del examen de 5to, con 20 exámenes (4 reales y 16 nuevos), nota sobre 6,5.
  - **A:** completar el texto con el tiempo y la voz correctos (10 × 0,30).
  - **B:** reescribir oraciones con la palabra dada (7 × 0,5).
  - Se puede jugar como examen completo, como práctica con corrección inmediata y pistas, con ejercicios sueltos por tiempo verbal o estructura, o repasando tus errores. También muestra estadísticas.

El progreso se guarda en el navegador. Vocabulario usa la clave `practica-vocabulario-v1` y Examen usa `practica-vocabulario-v1-exam`.

## Para editar

| Archivo | Qué tiene |
|---|---|
| `src/vocab/vb.txt`, `src/vocab/pv.txt` | Las palabras |
| `src/exam/exams.js` | Los 20 exámenes con sus claves |
| `src/exam/exam-core.js` | Las reglas de cada estructura y el corrector |
| `src/exam/exam-ui.js` | La interfaz del modo examen |
| `src/template.html` | La página |

Después de cambiar algo:

```bash
python3 tools/build.py --html index.html
node tests/exam.test.js
node tests/e2e-vocab.js index.html /tmp/shots
node tests/e2e-exam.js index.html /tmp/shots
```

Las dos pruebas `e2e` necesitan Playwright con Chromium.

`practica-vocabulario.backup.html` es la versión anterior a sumar el modo examen.
