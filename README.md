# Kodlabb

En interaktiv Electron-app för att lära sig programmering. Stödjer JavaScript, Python och HTML/CSS med inbyggd kodredigerare, övningar och verifiering.

## Funktioner

- **3 programmeringsspråk** – JavaScript, Python, HTML/CSS
- **12 interaktiva lektioner** – från variabler till funktioner
- **Inbyggd kodredigerare** – med radnummer och kortkommandon (Ctrl+Enter)
- **Direkt feedback** – kör kod och se resultat direkt
- **HTML-preview** – se din HTML/CSS renderad i realtid
- **Tips-system** – få hjälp när du fastnar
- **Framstegsspårning** – sparas lokalt i webbläsaren
- **Mörkt tema** – skonsamt för ögonen
- **🏆 Hall of Fame** – skapa en bra issue på GitHub och bli evighetsinlagd i appen!

## Kom igång

```bash
npm install
npm start
```

### Bygg för Windows

```bash
npm run build:win
```

### Bygg för Linux

```bash
npm run build:linux
```

## Lektioner

| Språk | Nivå | Lektion |
|-------|------|---------|
| JavaScript | 1 | Variabler |
| JavaScript | 2 | Räkna med siffror |
| JavaScript | 3 | Villkor (if/else) |
| JavaScript | 4 | Loopar |
| JavaScript | 5 | Funktioner |
| Python | 1 | Variabler |
| Python | 2 | If-satser |
| Python | 3 | Loopar |
| Python | 4 | Listor |
| HTML/CSS | 1 | HTML-grunder |
| HTML/CSS | 2 | CSS-styling |
| HTML/CSS | 3 | Interaktiv HTML |

## Krav

- [Node.js](https://nodejs.org/) 18+
- **Python** (krävs endast för Python-lektioner)

## Teknik

- [Electron](https://www.electronjs.org/) – plattformsoberoende app
- Vanilla JavaScript – ingen extra frontend-ramverk
- Sandlåde-exekvering för JavaScript i huvudprocessen
- Blob-URL för HTML-preview
- **GitHub Actions** – automatisk issue-granskning och Hall of Fame

## Hall of Fame

Skapa en issue av hög kvalitet (≥ 7/10 på Kodlabb-botens betygsskala) på [GitHub](https://github.com/mrknutte26/kodlabb/issues/new) för att bli evigt inlagd i appens Hall of Fame! 🏆

Betygsättningen baseras på:
- Titelns längd och detaljrikedom
- Beskrivningens längd och struktur
- Kodblock (` ``` `)
- Markdown-formattering
- Steg-för-steg-beskrivning

Får du ≥ 7/10 svarar du `!halloffame` på kommentaren från boten för att bli inlagd.

**Du väljer själv** – ingen läggs till utan uttryckligt samtycke. Svara bara inte, eller skriv att du inte vill, så läggs du inte till.
