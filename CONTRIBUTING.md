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

## Skapa en Pull Request

1. Skapa en ny branch: `git checkout -b min-ny-funktion`
2. Göra dina ändringar
3. Testa att allt fungerar: `npm start`
4. Committa: `git add . && git commit -m "Beskriv vad du ändrade"`
5. Pusha: `git push origin min-ny-funktion`
6. Öppna en PR på GitHub: https://github.com/mrknutte26/kodlabb/compare

### Vad kan du bidra med?

- nya lektioner
- fixa buggar
 förbättra UI/UX
- översättning till fler språk
- bättre testning av uppgifter

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
