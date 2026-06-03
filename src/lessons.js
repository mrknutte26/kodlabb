const LESSONS = [
  // ===== JAVASCRIPT =====
  {
    id: 'js-variables',
    title: 'Variabler',
    lang: 'javascript',
    level: 1,
    content: `
      <h2>Variabler i JavaScript</h2>
      <p>En variabel är som en låda där du kan spara data. Du skapar en variabel med <code>let</code> eller <code>const</code>:</p>
      <pre><code>let ålder = 25;
const namn = "Anna";</code></pre>

      <h3>Olika datatyper</h3>
      <pre><code>let text = "Hej";       // string
let tal = 42;            // number
let sant = true;         // boolean</code></pre>
      <p>Du skriver ut värden med <code>console.log()</code>.</p>

      <div class="challenge-box">
        <h3>✏️ Din uppgift</h3>
        <p>Skapa variablerna <code>name</code> (ditt namn) och <code>age</code> (din ålder). Skriv sedan ut dem med <code>console.log</code>.</p>
      </div>
    `,
    template: `// Skapa variablerna name och age här
let name =
let age =

// Skriv ut dem
console.log("Hej! Jag heter " + name);
console.log("Jag är " + age + " år gammal");`,
    hint: 'Använd `let name = "DittNamn";` och `let age = 25;`. Glöm inte citattecken runt text!',
    verify: (output) => output.includes('Hej!') && output.includes('år'),
  },
  {
    id: 'js-numbers',
    title: 'Räkna med siffror',
    lang: 'javascript',
    level: 2,
    content: `
      <h2>Räkna med siffror</h2>
      <p>Operatorerna i JavaScript:</p>
      <pre><code>+   addition
-   subtraktion
*   multiplikation
/   division
%   modulo (rest)</code></pre>

      <div class="challenge-box">
        <h3>✏️ Din uppgift</h3>
        <p>Räkna ut arean av en rektangel med bredd 8 och höjd 5. Skriv ut resultatet.</p>
        <p><strong>Tips:</strong> Area = bredd × höjd</p>
      </div>
    `,
    template: `let bredd = 8;
let hojd = 5;

// Räkna ut arean här (bredd * hojd)
let area =

console.log("Arean är: " + area);`,
    hint: 'Skriv `bredd * hojd` efter likhetstecknet. Använd `*` för multiplikation.',
    verify: (output) => output.includes('40'),
  },
  {
    id: 'js-conditions',
    title: 'Villkor (if/else)',
    lang: 'javascript',
    level: 3,
    content: `
      <h2>Villkor med if/else</h2>
      <p>Med <code>if</code> och <code>else</code> kan koden fatta beslut:</p>
      <pre><code>let age = 18;

if (age >= 18) {
  console.log("Du är myndig");
} else {
  console.log("Du är inte myndig");
}</code></pre>

      <h3>Jämförelseoperatorer</h3>
      <pre><code>===   lika med
!==   inte lika med
> >=  större än
< <=  mindre än</code></pre>

      <div class="challenge-box">
        <h3>✏️ Din uppgift</h3>
        <p>Skriv ett program som kollar om talet <code>7</code> är jämnt eller udda med hjälp av <code>%</code>.</p>
        <p><strong>Ledtråd:</strong> Om <code>tal % 2 === 0</code> är talet jämnt.</p>
      </div>
    `,
    template: `let tal = 7;

// Skriv din if/else här
// Kolla om tal % 2 === 0
if () {
  console.log(tal + " är jämnt");
} else {
  console.log(tal + " är udda");
}`,
    hint: 'Skriv `tal % 2 === 0` efter `if`. Om resten är 0 är talet jämnt, annars udda.',
    verify: (output) => output.includes('udda'),
  },
  {
    id: 'js-loops',
    title: 'Loopar',
    lang: 'javascript',
    level: 4,
    content: `
      <h2>Loopar - upprepa kod</h2>
      <p><code>for</code>-loopen upprepar kod flera gånger:</p>
      <pre><code>for (start; villkor; steg) {
  // kod som upprepas
}</code></pre>
      <ul>
        <li><strong>Start:</strong> <code>let i = 0</code> – börja räkna från 0</li>
        <li><strong>Villkor:</strong> <code>i < 5</code> – fortsätt så länge i är mindre än 5</li>
        <li><strong>Steg:</strong> <code>i++</code> – öka i med 1 varje varv</li>
      </ul>

      <div class="challenge-box">
        <h3>✏️ Din uppgift</h3>
        <p>Skriv ut alla jämna tal från 0 till 10 med en for-loop. Använd <code>%</code> för att hitta jämna tal.</p>
      </div>
    `,
    template: `// Skriv ut jämna tal från 0 till 10
for (let i = 0; i <= 10; i++) {
  // Lägg till en if-sats här
  // som kollar om i är jämnt
    console.log(i);
}`,
    hint: 'Lägg till `if (i % 2 === 0) {` innan console.log. Glöm att stänga med `}`.',
    verify: (output) => {
      const lines = output.split('\n').filter(l => l.trim());
      return lines.length === 6;
    },
  },
  {
    id: 'js-functions',
    title: 'Funktioner',
    lang: 'javascript',
    level: 5,
    content: `
      <h2>Funktioner - återanvändbar kod</h2>
      <p>En funktion skapas med <code>function</code>-nyckelordet:</p>
      <pre><code>function halsning(namn) {
  return "Hej " + namn + "!";
}</code></pre>
      <p>Sen <strong>anropar</strong> du den: <code>halsning("Anna")</code></p>

      <div class="challenge-box">
        <h3>✏️ Din uppgift</h3>
        <p>Skapa funktionen <code>multiply</code> som tar två tal och <code>return</code>erar produkten. Sen anropar du den med 4 och 7.</p>
      </div>
    `,
    template: `// Skapa funktionen multiply här
function multiply(a, b) {
  // lägg till return här
}

// Anropa funktionen och skriv ut
let result = multiply(4, 7);
console.log("4 * 7 = " + result);`,
    hint: 'Inuti funktionen: `return a * b;`. Glöm inte `return`!',
    verify: (output) => output.includes('28'),
  },

  // ===== PYTHON =====
  {
    id: 'py-variables',
    title: 'Variabler i Python',
    lang: 'python',
    level: 1,
    content: `
      <h2>Variabler i Python</h2>
      <p>I Python skapar du variabler utan nyckelord:</p>
      <pre><code>name = "Anna"
age = 25
print(f"Hej {name}!")</code></pre>

      <div class="challenge-box">
        <h3>✏️ Din uppgift</h3>
        <p>Skapa variablerna <code>stad</code> och <code>population</code>. Skriv ut "Staden X har Y invånare" med en f-string.</p>
      </div>
    `,
    template: `# Skapa variablerna här
stad =
population =

# Skriv ut med f-string
print(f"Staden {stad} har {population} invånare")`,
    hint: 'Använd `stad = "Stockholm"` och `population = 975000`. f-string: `f"text {variabel}"`.',
    verify: (output) => output.includes('Staden') && output.includes('har') && output.includes('invånare'),
  },
  {
    id: 'py-if',
    title: 'If-satser i Python',
    lang: 'python',
    level: 2,
    content: `
      <h2>If-satser i Python</h2>
      <p>Python använder <code>if</code>, <code>elif</code> och <code>else</code>:</p>
      <pre><code>temperatur = 25

if temperatur > 30:
    print("Varmt!")
elif temperatur > 15:
    print("Lagom.")
else:
    print("Kallt.")</code></pre>
      <p><strong>Viktigt:</strong> Kolon <code>:</code> och indentering (4 mellanslag) istället för klamrar!</p>

      <div class="challenge-box">
        <h3>✏️ Din uppgift</h3>
        <p>Skriv klart koden så den säger om <code>tal</code> är positivt, negativt eller noll.</p>
      </div>
    `,
    template: `tal = -3

# Skriv klart if-satserna
if :
    print(f"{tal} är positivt")
 tal < 0:
    print(f"{tal} är negativt")
:
    print("Talet är noll")`,
    hint: 'Använd `tal > 0`, `elif tal < 0`, `else:`. Glöm inte kolon `:` efter villkoren!',
    verify: (output) => output.includes('negativt'),
  },
  {
    id: 'py-loops',
    title: 'Loopar i Python',
    lang: 'python',
    level: 3,
    content: `
      <h2>For-loopar i Python</h2>
      <p><code>range()</code> genererar en serie tal:</p>
      <pre><code>range(5)       # 0, 1, 2, 3, 4
range(1, 11)   # 1, 2, 3, ..., 10
range(0, 10, 2) # 0, 2, 4, 6, 8</code></pre>

      <div class="challenge-box">
        <h3>✏️ Din uppgift</h3>
        <p>Skriv ut 5:ans multiplikationstabell (1 till 10) med en for-loop och <code>range()</code>.</p>
        <p><strong>Exempel på utskrift:</strong> <code>5 * 3 = 15</code></p>
      </div>
    `,
    template: `# Skriv din for-loop här
for i in range(, ):
    print(f"5 * {i} = {}")`,
    hint: 'Använd `range(1, 11)` för talen 1–10. Räkna ut produkten med `5 * i`.',
    verify: (output) => {
      return output.includes('5 * 5 = 25') && output.includes('5 * 10 = 50');
    },
  },
  {
    id: 'py-lists',
    title: 'Listor i Python',
    lang: 'python',
    level: 4,
    content: `
      <h2>Listor i Python</h2>
      <p>Listor lagrar flera värden. <code>sum()</code> och <code>len()</code> är användbara:</p>
      <pre><code>priser = [10, 20, 30]
print(sum(priser))   # 60
print(len(priser))   # 3
print(sum(priser) / len(priser))  # 20.0</code></pre>

      <div class="challenge-box">
        <h3>✏️ Din uppgift</h3>
        <p>Beräkna summan och medelvärdet av talen <code>[10, 20, 30, 40, 50]</code> och skriv ut.</p>
      </div>
    `,
    template: `tal = [10, 20, 30, 40, 50]

# Räkna ut summa och medelvärde här
summa =
medel =

print(f"Summa: {summa}")
print(f"Medelvärde: {medel}")`,
    hint: 'Använd `sum(tal)` för summa och `summa / len(tal)` för medelvärde.',
    verify: (output) => output.includes('Summa: 150') && output.includes('Medelvärde: 30.0'),
  },

  // ===== HTML/CSS =====
  {
    id: 'html-basics',
    title: 'HTML-grunder',
    lang: 'html',
    level: 1,
    content: `
      <h2>HTML - webbens byggstenar</h2>
      <p>HTML använder <strong>taggar</strong> för att strukturera innehåll:</p>
      <pre><code>&lt;h1&gt;Stor rubrik&lt;/h1&gt;
&lt;p&gt;En paragraf&lt;/p&gt;
&lt;ul&gt;
  &lt;li&gt;Punkt i lista&lt;/li&gt;
&lt;/ul&gt;</code></pre>

      <p><strong>OBS:</strong> Din HTML visas som en förhandsvisning direkt!</p>

      <div class="challenge-box">
        <h3>✏️ Din uppgift</h3>
        <p>Bygg en sida med en rubrik (<code>h1</code>), en paragraf (<code>p</code>) och en lista (<code>ul</code> / <code>li</code>) med dina favoritämnen.</p>
      </div>
    `,
    template: `<!DOCTYPE html>
<html>
<head>
  <title>Min sida</title>
</head>
<body>
  <!-- Lägg till en rubrik här -->

  <!-- Lägg till en paragraf här -->

  <!-- Lägg till en lista här -->

</body>
</html>`,
    hint: 'Använd `<h1>Rubrik</h1>`, `<p>Text</p>`, `<ul><li>Ämne</li></ul>`.',
    verify: (output) => output.includes('<h1>') && output.includes('<li>'),
  },
  {
    id: 'html-styling',
    title: 'CSS - styling',
    lang: 'html',
    level: 2,
    content: `
      <h2>CSS - gör din sida snygg</h2>
      <p>CSS läggs i en <code>&lt;style&gt;</code>-tagg i <code>&lt;head&gt;</code>:</p>
      <pre><code>h1 {
  color: blue;
  text-align: center;
}</code></pre>

      <h3>Vanliga CSS-egenskaper</h3>
      <pre><code>color            textfärg
background       bakgrund
font-size        textstorlek
text-align       justering
padding          inre marginal
margin           yttre marginal</code></pre>

      <div class="challenge-box">
        <h3>✏️ Din uppgift</h3>
        <p>Lägg till CSS i <code>&lt;style&gt;</code> för att styla sidan. Välj färger, typsnitt och stil själv!</p>
      </div>
    `,
    template: `<!DOCTYPE html>
<html>
<head>
  <title>Min sida</title>
  <style>
    /* Lägg till din CSS här */
    body {
      font-family: Arial;
      padding: 40px;
    }
    h1 {
      /* styla rubriken */
    }
  </style>
</head>
<body>
  <h1>Min sida</h1>
  <p>Detta är min personliga sida med egen styling!</p>
</body>
</html>`,
    hint: 'Prova `color`, `text-align`, `background`, `font-size`. T.ex. `h1 { color: red; text-align: center; }`.',
    verify: (output) => output.includes('<style>') && output.includes('{'),
  },
  {
    id: 'html-interactive',
    title: 'Interaktiv HTML',
    lang: 'html',
    level: 3,
    content: `
      <h2>Interaktivitet med JavaScript</h2>
      <p>Knappen har redan <code>onclick="changeMessage()"</code>. Du ska skriva funktionen!</p>
      <pre><code>document.getElementById("id").innerHTML = "ny text";
document.getElementById("id").style.color = "red";</code></pre>

      <div class="challenge-box">
        <h3>✏️ Din uppgift</h3>
        <p>Skriv klart JavaScript-funktionen <code>changeMessage()</code> så att den ändrar texten i <code>#message</code> och stilar om den när man klickar på knappen.</p>
      </div>
    `,
    template: `<!DOCTYPE html>
<html>
<head>
  <title>Interaktiv demo</title>
  <style>
    body { font-family: Arial; text-align: center; padding: 50px; }
    #message { font-size: 24px; padding: 20px; margin: 20px; background: #f0f0f0; border-radius: 10px; }
    button { padding: 12px 30px; font-size: 18px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer; }
  </style>
</head>
<body>
  <h1>Klicka på knappen!</h1>
  <div id="message">Detta är ett meddelande</div>
  <button onclick="changeMessage()">Ändra mig!</button>

  <script>
    // Skriv klart funktionen här
    function changeMessage() {
      // Ändra texten i #message

      // Ändra bakgrundsfärgen på #message
    }
  </script>
</body>
</html>`,
    hint: 'Använd `document.getElementById("message").innerHTML = "...";` för text och `.style.background = "..."` för färg.',
    verify: (output) => output.includes('onclick') && output.includes('getElementById'),
  },
];

const getLessonsByLang = (lang) => {
  if (lang === 'all') return LESSONS;
  return LESSONS.filter(l => l.lang === lang);
};
