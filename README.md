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
