const fs = require('fs');
const path = require('path');

const HALL_OF_FAME_FILE = path.join(__dirname, '..', 'src', 'hall-of-fame.json');

function loadHallOfFame() {
  try {
    return JSON.parse(fs.readFileSync(HALL_OF_FAME_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function saveHallOfFame(data) {
  fs.writeFileSync(HALL_OF_FAME_FILE, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

async function run() {
  const { GITHUB_EVENT_PATH, GITHUB_TOKEN, GITHUB_REPOSITORY } = process.env;

  if (!GITHUB_EVENT_PATH) {
    console.log('Test mode: no event file');
    const current = loadHallOfFame();
    console.log('Current hall of fame:', current);
    return;
  }

  const event = require(GITHUB_EVENT_PATH);
  const comment = event.comment;
  const issue = event.issue;

  if (!comment || !issue) {
    console.log('No comment or issue in event');
    process.exit(0);
  }

  const body = comment.body.trim().toLowerCase();
  const author = comment.user.login;

  if (body !== '!halloffame') {
    console.log(`Comment "${body}" is not a hall of fame request`);
    process.exit(0);
  }

  if (issue.user.login !== author) {
    console.log(`User ${author} is not the issue author (${issue.user.login})`);
    const { default: fetch } = await import('node-fetch');
    await fetch(`https://api.github.com/repos/${GITHUB_REPOSITORY}/issues/${issue.number}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'kodlabb-bot',
      },
      body: JSON.stringify({ body: 'Endast issue-skaparen kan begära Hall of Fame.' }),
    });
    process.exit(0);
  }

  const hallOfFame = loadHallOfFame();
  const alreadyExists = hallOfFame.some(entry => entry.github === author);
  if (alreadyExists) {
    console.log(`${author} is already in Hall of Fame`);
    const { default: fetch } = await import('node-fetch');
    await fetch(`https://api.github.com/repos/${GITHUB_REPOSITORY}/issues/${issue.number}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'kodlabb-bot',
      },
      body: JSON.stringify({ body: `@${author} Du finns redan i Hall of Fame! 🎉` }),
    });
    process.exit(0);
  }

  hallOfFame.push({
    github: author,
    issue: issue.number,
    title: issue.title,
    added: new Date().toISOString().split('T')[0],
  });
  saveHallOfFame(hallOfFame);

  const { default: fetch } = await import('node-fetch');
  await fetch(`https://api.github.com/repos/${GITHUB_REPOSITORY}/issues/${issue.number}/comments`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': 'kodlabb-bot',
    },
    body: JSON.stringify({ body: `@${author} Du är nu med i **Hall of Fame** i appen! 🏆🥳` }),
  });

  console.log(`Added ${author} to Hall of Fame`);
}

run().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
