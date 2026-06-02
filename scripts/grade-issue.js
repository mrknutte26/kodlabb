const SCORE_THRESHOLD = 7;
const MIN_TITLE_LENGTH = 5;
const MIN_BODY_LENGTH = 50;

function gradeIssue(title, body, labels) {
  let score = 0;
  const reasons = [];

  if (title.length >= MIN_TITLE_LENGTH) {
    score += 2;
    reasons.push('Titel har tillräcklig längd');
  } else {
    reasons.push(`Titel för kort (${title.length} tecken, minst ${MIN_TITLE_LENGTH} behövs)`);
  }

  if (title.length > 20) {
    score += 1;
    reasons.push('Titel är detaljerad');
  }

  if (body.length >= MIN_BODY_LENGTH) {
    score += 2;
    reasons.push('Beskrivning har tillräcklig längd');
  } else {
    reasons.push(`Beskrivning för kort (${body.length} tecken, minst ${MIN_BODY_LENGTH} behövs)`);
  }

  if (body.length > 200) {
    score += 1;
    reasons.push('Beskrivning är detaljerad');
  }

  const hasCodeBlock = /```[\s\S]*```/.test(body);
  if (hasCodeBlock) {
    score += 2;
    reasons.push('Innehåller kodexempel');
  }

  const hasFormatting = /#{1,6}\s|-\s|\d+\.\s|\*\*|\*|\[.+\]\(.+\)/.test(body);
  if (hasFormatting) {
    score += 1;
    reasons.push('Använder markdown-formattering');
  }

  const hasSteps = /steg|steps|förväntat|expected|actual|reproduce|återskapa/i.test(body);
  if (hasSteps) {
    score += 1;
    reasons.push('Innehåller steg-för-steg-beskrivning');
  }

  return { score: Math.min(score, 10), reasons };
}

async function run() {
  const { GITHUB_EVENT_PATH, GITHUB_TOKEN, GITHUB_REPOSITORY } = process.env;

  if (!GITHUB_EVENT_PATH) {
    console.log('Test mode: no event file');
    const testCases = [
      { title: 'Hej', body: 'Kort', labels: [] },
      { title: 'Appen kraschar när jag sparar', body: 'När jag trycker på spara så kraschar appen. Jag använder Windows 11.\n\n```js\nconsole.log("test")\n```\n\nFörväntat: Det ska sparas.\nSteg:\n1. Öppna appen\n2. Skriv något\n3. Tryck spara', labels: ['bug'] },
      { title: 'Bra issue med detaljer', body: 'Detta är en väldigt detaljerad beskrivning av ett problem som jag har stött på i appen. Här beskriver jag noggrant vad som händer och vad jag förväntar mig ska hända istället.\n\n```python\nprint("hello")\n```\n\nSteg för att återskapa:\n1. Gör si\n2. Gör så\n3. Se felet\n\nFörväntat beteende: Det borde fungera', labels: ['enhancement'] },
    ];

    for (const tc of testCases) {
      const result = gradeIssue(tc.title, tc.body, tc.labels);
      console.log(`\n--- Test: "${tc.title}" ---`);
      console.log(`Score: ${result.score}/10`);
      console.log(`Reasons: ${result.reasons.join(', ')}`);
      console.log(result.score >= SCORE_THRESHOLD ? '✅ Kvalificerad för Hall of Fame' : '❌ Inte kvalificerad');
    }
    return;
  }

  const event = require(GITHUB_EVENT_PATH);
  const issue = event.issue;

  if (!issue) {
    console.log('No issue in event');
    process.exit(0);
  }

  const title = issue.title || '';
  const body = issue.body || '';
  const labels = (issue.labels || []).map(l => l.name);

  const result = gradeIssue(title, body, labels);

  let comment = `## 🤖 Issue-granskning\n\n**Betyg: ${result.score}/10**\n\n`;

  if (result.score >= SCORE_THRESHOLD) {
    comment += `Din issue höll hög kvalitet! 🎉\n\n`;
    comment += `Vill du bli inlagd i **Hall of Fame** i appen? Svara på denna kommentar med \`!halloffame\` så lägger vi till dig!\n\n`;
    comment += `---\n*Detta är en automatisk granskning från Kodlabb-boten.*`;
  } else {
    comment += `Några förbättringar som kan höja kvaliteten:\n\n`;
    for (const reason of result.reasons) {
      if (reason.startsWith('Titel för kort') || reason.startsWith('Beskrivning för kort')) {
        comment += `- ❌ ${reason}\n`;
      }
    }
    comment += '\nTips: l\u00e4gg till kodexempel med ``` och beskriv steg f\u00f6r att \u00e5terskapa problemet.\n\n';
    comment += `---\n*Försök igen med mer detaljer för att kvalificera dig till Hall of Fame!*`;
  }

  const { default: fetch } = await import('node-fetch');
  const apiUrl = `https://api.github.com/repos/${GITHUB_REPOSITORY}/issues/${issue.number}/comments`;

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': 'kodlabb-bot',
    },
    body: JSON.stringify({ body: comment }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`Failed to post comment: ${res.status} ${errText}`);
    process.exit(1);
  }

  console.log(`Comment posted to issue #${issue.number} with score ${result.score}/10`);

  if (result.score >= SCORE_THRESHOLD) {
    const labelRes = await fetch(`https://api.github.com/repos/${GITHUB_REPOSITORY}/issues/${issue.number}/labels`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'kodlabb-bot',
      },
      body: JSON.stringify({ labels: ['hall-of-fame-nominee'] }),
    });
    if (!labelRes.ok) {
      console.error(`Failed to add label: ${labelRes.status}`);
    }
  }
}

run().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
