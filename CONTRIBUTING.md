# Bidra till Kodlabb

Vi välkomnar bidrag! Här är hur du kommer igång.

## Kom igång

1. Forka repot
2. Klona din fork: `git clone https://github.com/ditt-användarnamn/kodlabb.git`
3. Installera beroenden: `npm install`
4. Starta appen: `npm start`

## Lägga till en lektion

Lektioner finns i `src/lessons.js`. Varje lektion har följande struktur:

```javascript
{
  id: 'js-example',
  title: 'Lektionens titel',
  lang: 'javascript',    // 'javascript', 'python', eller 'html'
  level: 1,              // svårighetsnivå
  content: `
    <h2>Markdown/HTML-innehåll</h2>
    <p>Lektionstext med <code>kod</code>.</p>
    <div class="challenge-box">
      <h3>Uppgift</h3>
      <p>Vad användaren ska göra.</p>
    </div>
  `,
  template: `// Startkod för lektionen`,
  hint: 'Ett tips för uppgiften',
  verify: (output) => output.includes('expected text'),
}
```

## Kodstandard

- Använd `const` och `let`, aldrig `var`
- Använd engelska för variabelnamn och funktioner
- Svenska för användar-facing text (lektioner, UI)
- 2 spaces indentation

## Bygga

```bash
npm run build:win     # Windows (.exe)
npm run build:linux   # Linux (.AppImage)
```

## Rapportera buggar

Skapa en [Issue](https://github.com/mrknutte26/kodlabb/issues) med:
- Steg för att återskapa
- Förväntat beteende
- Verkligt beteende
- Skärmdump (om relevant)
