const LESSONS = [
  // ===== JAVASCRIPT =====
  {
    id: 'js-variables',
    title: 'Variabler',
    lang: 'javascript',
    level: 1,
    content: `
      <h2>Variabler i JavaScript</h2>
      <p>En variabel är som en låda där du kan spara data. I JavaScript använder du <code>let</code> eller <code>const</code> för att skapa variabler.</p>
      
      <h3>let vs const</h3>
      <p><code>let</code> används för värden som kan ändras:</p>
      <pre><code>let age = 25;
age = 26; // fungerar</code></pre>
      <p><code>const</code> används för värden som inte kan ändras:</p>
      <pre><code>const name = "Anna";
name = "Erik"; // ERROR! går inte</code></pre>

      <h3>Olika datatyper</h3>
      <pre><code>let text = "Hej världen";   // string
let nummer = 42;            // number
let sant = true;            // boolean
let lista = [1, 2, 3];      // array</code></pre>

      <div class="challenge-box">
        <h3>✏️ Din uppgift</h3>
        <p>Skapa en variabel <code>name</code> med ditt namn och en variabel <code>age</code> med din ålder. Skriv ut dem med <code>console.log()</code>.</p>
        <p><strong>Exempel:</strong> <code>console.log("Hej, jag heter " + name);</code></p>
      </div>
    `,
    template: `// Skapa dina variabler här
let name = "Kalle";
let age = 25;

// Skriv ut dem
console.log("Hej! Jag heter " + name);
console.log("Jag är " + age + " år gammal");`,
    hint: 'Använd `let variabelNamn = värde;` för att skapa en variabel. Använd `+` för att slå ihop text och variabler.',
    verify: (output) => output.includes('Hej') && output.length > 5,
  },
  {
    id: 'js-numbers',
    title: 'Räkna med siffror',
    lang: 'javascript',
    level: 2,
    content: `
      <h2>Räkna med siffror</h2>
      <p>JavaScript kan räkna precis som en miniräknare! Här är de vanligaste räknesätten:</p>
      <pre><code>let summa = 10 + 5;    // 15
let differens = 10 - 5; // 5
let produkt = 10 * 5;   // 50
let kvot = 10 / 5;      // 2</code></pre>

      <h3>Modulo (rest)</h3>
      <p><code>%</code> ger resten vid division:</p>
      <pre><code>console.log(10 % 3); // 1 (10 / 3 = 3 med 1 i rest)</code></pre>

      <div class="challenge-box">
        <h3>✏️ Din uppgift</h3>
        <p>Räkna ut arean av en rektangel med bredd 8 och höjd 5. Skriv ut resultatet.</p>
        <p><strong>Tips:</strong> Area = bredd × höjd</p>
      </div>
    `,
    template: `let bredd = 8;
let hojd = 5;

// Räkna ut arean här
let area = bredd * hojd;

console.log("Arean är: " + area);`,
    hint: 'Använd `*` för multiplikation. Area = bredd * höjd.',
    verify: (output) => output.includes('40'),
  },
  {
    id: 'js-conditions',
    title: 'Villkor (if/else)',
    lang: 'javascript',
    level: 3,
    content: `
      <h2>Villkor med if/else</h2>
      <p>Med <code>if</code> kan du få programmet att fatta beslut:</p>
      <pre><code>let age = 18;

if (age >= 18) {
  console.log("Du är myndig");
} else {
  console.log("Du är inte myndig");
}</code></pre>

      <h3>Jämförelseoperatorer</h3>
      <pre><code>===   // lika med
!==   // inte lika med
> >=  // större än / större eller lika
< <=  // mindre än / mindre eller lika</code></pre>

      <div class="challenge-box">
        <h3>✏️ Din uppgift</h3>
        <p>Skriv ett program som kollar om ett tal är jämnt eller udda. Använd modulo (<code>%</code>).</p>
        <p><strong>Ledtråd:</strong> Om <code>tal % 2 === 0</code> är talet jämnt.</p>
      </div>
    `,
    template: `let tal = 7;

// Kolla om talet är jämnt eller udda
if (tal % 2 === 0) {
  console.log(tal + " är jämnt");
} else {
  console.log(tal + " är udda");
}`,
    hint: 'Använd `% 2` för att kolla om ett tal är jämnt (rest 0) eller udda (rest 1).',
    verify: (output) => output.includes('udda'),
  },
  {
    id: 'js-loops',
    title: 'Loopar',
    lang: 'javascript',
    level: 4,
    content: `
      <h2>Loopar - upprepa kod</h2>
      <p>Loopar låter dig köra samma kod flera gånger. <code>for</code>-loopen är vanligast:</p>
      <pre><code>for (let i = 0; i < 5; i++) {
  console.log("Nummer: " + i);
}</code></pre>

      <h3>For-loopens delar</h3>
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
        <p>Skriv ut alla jämna tal från 0 till 10 med en for-loop.</p>
      </div>
    `,
    template: `// Skriv ut jämna tal från 0 till 10
for (let i = 0; i <= 10; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}`,
    hint: 'Använd `i % 2 === 0` för att hitta jämna tal. Loopa från 0 till 10 med `<=`.',
    verify: (output) => {
      const lines = output.split('\n').filter(l => l.trim());
      return lines.length === 6; // 0, 2, 4, 6, 8, 10
    },
  },
  {
    id: 'js-functions',
    title: 'Funktioner',
    lang: 'javascript',
    level: 5,
    content: `
      <h2>Funktioner - återanvändbar kod</h2>
      <p>En funktion är ett kodblock som du kan anropa flera gånger:</p>
      <pre><code>function halsning(namn) {
  return "Hej " + namn + "!";
}

console.log(halsning("Anna"));  // "Hej Anna!"
console.log(halsning("Erik"));  // "Hej Erik!"</code></pre>

      <h3>Funktionens delar</h3>
      <ul>
        <li><code>function</code> – nyckelord för att skapa funktion</li>
        <li><code>namn</code> – parameter (indata)</li>
        <li><code>return</code> – vad funktionen skickar tillbaka</li>
      </ul>

      <div class="challenge-box">
        <h3>✏️ Din uppgift</h3>
        <p>Skapa en funktion <code>multiply</code> som tar två tal och returnerar produkten. Anropa den och skriv ut resultatet.</p>
      </div>
    `,
    template: `// Skapa din funktion här
function multiply(a, b) {
  return a * b;
}

// Anropa funktionen och skriv ut
let result = multiply(4, 7);
console.log("4 * 7 = " + result);`,
    hint: 'En funktion skapas med `function namn(a, b) { return a * b; }`. Glöm inte att anropa den!',
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
      <p>Python är känt för att vara lättläst. Variabler skapas utan nyckelord:</p>
      <pre><code>name = "Anna"
age = 25
print(f"Hej {name}!")</code></pre>

      <h3>Datatyper i Python</h3>
      <pre><code>text = "Hej"        # str (string)
tal = 42            # int (heltal)
decimal = 3.14      # float (decimal)
sant = True         # bool (boolean)
lista = [1, 2, 3]   # list</code></pre>

      <div class="challenge-box">
        <h3>✏️ Din uppgift</h3>
        <p>Skapa en variabel <code>stad</code> med namnet på en stad och en variabel <code>population</code> med ett antal. Skriv ut: "Staden X har Y invånare".</p>
      </div>
    `,
    template: `stad = "Stockholm"
population = 975000

print(f"Staden {stad} har {population} invånare")`,
    hint: 'Använd f-string: `f"text {variabel}"` för att sätta in variabler i text.',
    verify: (output) => output.includes('Stockholm') && output.includes('975000'),
  },
  {
    id: 'py-if',
    title: 'If-satser i Python',
    lang: 'python',
    level: 2,
    content: `
      <h2>If-satser i Python</h2>
      <p>I Python använder man <code>if</code>, <code>elif</code> och <code>else</code>:</p>
      <pre><code>temperatur = 25

if temperatur > 30:
    print("Det är varmt!")
elif temperatur > 15:
    print("Det är lagom.")
else:
    print("Det är kallt.")</code></pre>

      <p><strong>Viktigt:</strong> Python använder indentering (mellanslag) istället för klamrar!</p>

      <div class="challenge-box">
        <h3>✏️ Din uppgift</h3>
        <p>Skriv ett program som säger om ett tal är positivt, negativt eller noll.</p>
      </div>
    `,
    template: `tal = -3

if tal > 0:
    print(f"{tal} är positivt")
elif tal < 0:
    print(f"{tal} är negativt")
else:
    print("Talet är noll")`,
    hint: 'Använd `>` för positivt, `<` för negativt, `else` för noll. Glöm inte kolon `:` och indentering!',
    verify: (output) => output.includes('negativt'),
  },
  {
    id: 'py-loops',
    title: 'Loopar i Python',
    lang: 'python',
    level: 3,
    content: `
      <h2>For-loopar i Python</h2>
      <p>Pythons for-loop är enkel och kraftfull:</p>
      <pre><code># Loopa genom en lista
frukter = ["äpple", "banan", "apelsin"]
for frukt in frukter:
    print(frukt)

# Loopa med range()
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4</code></pre>

      <h3>range()</h3>
      <pre><code>range(5)       # 0, 1, 2, 3, 4
range(2, 6)    # 2, 3, 4, 5
range(0, 10, 2) # 0, 2, 4, 6, 8</code></pre>

      <div class="challenge-box">
        <h3>✏️ Din uppgift</h3>
        <p>Använd en for-loop för att skriva ut 5:ans multiplikationstabell (1-10).</p>
      </div>
    `,
    template: `for i in range(1, 11):
    print(f"5 * {i} = {5 * i}")`,
    hint: 'Använd `range(1, 11)` för talen 1 till 10. Använd f-string för att formatera utskriften.',
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
      <p>Listor används för att lagra flera värden:</p>
      <pre><code>frukter = ["äpple", "banan", "apelsin"]
print(frukter[0])     # äpple (index 0)
print(len(frukter))   # 3 (längd)
frukter.append("kiwi")# lägg till
frukter.remove("banan")# ta bort</code></pre>

      <h3>Användbara list-metoder</h3>
      <pre><code>lista.append(x)   # lägg till i slutet
lista.sort()      # sortera
lista.reverse()   # vänd om
len(lista)        # längd
sum(lista)        # summa (om tal)</code></pre>

      <div class="challenge-box">
        <h3>✏️ Din uppgift</h3>
        <p>Skapa en lista med talen 10, 20, 30, 40, 50. Beräkna och skriv ut summan och medelvärdet.</p>
      </div>
    `,
    template: `tal = [10, 20, 30, 40, 50]
summa = sum(tal)
medel = summa / len(tal)

print(f"Summa: {summa}")
print(f"Medelvärde: {medel}")`,
    hint: 'Använd `sum(lista)` för summa och `sum(lista) / len(lista)` för medelvärde.',
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
      <p>HTML (HyperText Markup Language) används för att skapa webbsidor. HTML består av <strong>taggar</strong> som strukturerar innehåll:</p>
      <pre><code>&lt;h1&gt;Stor rubrik&lt;/h1&gt;
&lt;p&gt;Detta är en paragraf.&lt;/p&gt;
&lt;a href="https://example.com"&gt;En länk&lt;/a&gt;</code></pre>

      <h3>Vanliga taggar</h3>
      <pre><code>&lt;h1&gt; till &lt;h6&gt;  Rubriker
&lt;p&gt;              Paragraf
&lt;img&gt;             Bild
&lt;a&gt;               Länk
&lt;ul&gt; &lt;li&gt;        Lista
&lt;div&gt;             Låda/behållare</code></pre>

      <p><strong>OBS:</strong> HTML visas i en inbyggd webbläsare. Du ser resultatet direkt!</p>

      <div class="challenge-box">
        <h3>✏️ Din uppgift</h3>
        <p>Skapa en enkel webbsida med en rubrik, en paragraf och en lista med dina favoritämnen.</p>
      </div>
    `,
    template: `<!DOCTYPE html>
<html>
<head>
  <title>Min första sida</title>
  <style>
    body { font-family: Arial; padding: 20px; background: #f0f0f0; }
    h1 { color: #333; }
  </style>
</head>
<body>
  <h1>Välkommen!</h1>
  <p>Detta är min första webbsida.</p>
  <h2>Mina favoritämnen:</h2>
  <ul>
    <li>Matematik</li>
    <li>Programmering</li>
    <li>Design</li>
  </ul>
</body>
</html>`,
    hint: 'Använd `<h1>` för rubrik, `<p>` för paragraf, `<ul>` och `<li>` för lista.',
    verify: (output) => output.includes('<h1>') && output.includes('<li>'),
  },
  {
    id: 'html-styling',
    title: 'CSS - styling',
    lang: 'html',
    level: 2,
    content: `
      <h2>CSS - gör din sida snygg</h2>
      <p>CSS (Cascading Style Sheets) används för att styla HTML-element:</p>
      <pre><code>&lt;style&gt;
  h1 {
    color: blue;
    font-size: 36px;
    text-align: center;
  }
  p {
    color: #666;
    line-height: 1.5;
  }
&lt;/style&gt;</code></pre>

      <h3>CSS-egenskaper att testa</h3>
      <pre><code>color              textfärg
background-color   bakgrundsfärg
font-size          textstorlek
text-align         textjustering
padding            inre marginal
margin             yttre marginal
border             kantlinje</code></pre>

      <div class="challenge-box">
        <h3>✏️ Din uppgift</h3>
        <p>Skapa en personlig presentationssida med rubrik, bild (använd emoji eller text), och styling med CSS.</p>
      </div>
    `,
    template: `<!DOCTYPE html>
<html>
<head>
  <title>Min sida</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 30px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border-radius: 15px;
    }
    h1 {
      font-size: 40px;
      text-align: center;
    }
    p {
      font-size: 18px;
      line-height: 1.6;
    }
    .card {
      background: rgba(255,255,255,0.1);
      padding: 20px;
      border-radius: 10px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <h1>🌟 Hej, jag är Kalle!</h1>
  <div class="card">
    <p>Jag lär mig webbutveckling och älskar att skapa snygga sidor med HTML och CSS.</p>
    <p>Mina favoritfärger är blå och lila! 💜</p>
  </div>
</body>
</html>`,
    hint: 'Använd `<style>` i `<head>` för CSS. Testa olika färger, marginaler och typsnitt!',
    verify: (output) => output.includes('<style>') && output.includes('color'),
  },
  {
    id: 'html-interactive',
    title: 'Interaktiv HTML',
    lang: 'html',
    level: 3,
    content: `
      <h2>Interaktivitet med JavaScript</h2>
      <p>Du kan lägga till enkel JavaScript i din HTML för att göra sidan interaktiv:</p>
      <pre><code>&lt;button onclick="alert('Hej!')"&gt;Klicka mig&lt;/button&gt;

&lt;script&gt;
function andraText() {
  document.getElementById("demo").innerHTML = "Texten ändrades!";
}
&lt;/script&gt;</code></pre>

      <h3>Vanliga JavaScript-kommandon för HTML</h3>
      <pre><code>document.getElementById("id")
document.querySelector(".class")
element.innerHTML = "ny text"
element.style.color = "red"</code></pre>

      <div class="challenge-box">
        <h3>✏️ Din uppgift</h3>
        <p>Skapa en sida med en knapp som ändrar text och färg när man klickar på den.</p>
      </div>
    `,
    template: `<!DOCTYPE html>
<html>
<head>
  <title>Interaktiv demo</title>
  <style>
    body {
      font-family: Arial;
      text-align: center;
      padding: 50px;
      transition: background 0.3s;
    }
    #message {
      font-size: 24px;
      padding: 20px;
      margin: 20px;
      border-radius: 10px;
      background: #f0f0f0;
    }
    button {
      padding: 12px 30px;
      font-size: 18px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
    button:hover { background: #5a6fd6; }
  </style>
</head>
<body>
  <h1>Klicka på knappen!</h1>
  <div id="message">Detta är ett meddelande</div>
  <button onclick="changeMessage()">Ändra mig!</button>

  <script>
    function changeMessage() {
      document.getElementById("message").innerHTML = "🎉 Du klickade!";
      document.getElementById("message").style.background = "#a6e3a1";
      document.body.style.background = "#f0f4ff";
    }
  </script>
</body>
</html>`,
    hint: 'Använd `onclick` attributet på knappen. I JavaScript, använd `document.getElementById()` för att ändra HTML-element.',
    verify: (output) => output.includes('onclick') && output.includes('getElementById'),
  },
];

const getLessonsByLang = (lang) => {
  if (lang === 'all') return LESSONS;
  return LESSONS.filter(l => l.lang === lang);
};
