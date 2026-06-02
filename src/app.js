(function() {
  let currentLesson = null;
  let currentLessonIndex = 0;
  let completedLessons = new Set(loadCompleted());
  let githubUser = loadGithubUser();

  const lessonListEl = document.getElementById('lesson-list');
  const lessonContentEl = document.getElementById('lesson-content');
  const lessonNumberEl = document.getElementById('lesson-number');
  const lessonTitleEl = document.getElementById('lesson-title');
  const outputEl = document.getElementById('output-content');
  const hintBoxEl = document.getElementById('hint-box');
  const hintTextEl = document.getElementById('hint-text');
  const challengeStatusEl = document.getElementById('challenge-status');
  const langFilterEl = document.getElementById('lang-filter');
  const githubInputEl = document.getElementById('github-user');
  const ghCheckEl = document.getElementById('gh-check');
  const completedCountEl = document.getElementById('completed-count');
  const totalCountEl = document.getElementById('total-count');

  CodeEditor.init('editor-container');

  function loadCompleted() {
    try {
      return JSON.parse(localStorage.getItem('codelearner_completed') || '[]');
    } catch { return []; }
  }

  function saveCompleted() {
    localStorage.setItem('codelearner_completed', JSON.stringify([...completedLessons]));
  }

  function loadGithubUser() {
    return localStorage.getItem('codelearner_github') || '';
  }

  function saveGithubUser(name) {
    githubUser = name;
    localStorage.setItem('codelearner_github', name);
  }

  function getUserName() {
    return githubUser || 'okänd vän';
  }

  function renderLessonList() {
    const lang = langFilterEl.value;
    const lessons = getLessonsByLang(lang);
    lessonListEl.innerHTML = '';

    if (lessons.length === 0) {
      lessonListEl.innerHTML = '<div style="padding:16px;color:#6c7086;font-size:13px;">Inga lektioner för detta språk.</div>';
      return;
    }

    lessons.forEach((lesson, idx) => {
      const item = document.createElement('div');
      item.className = 'lesson-item';
      if (completedLessons.has(lesson.id)) item.classList.add('completed');
      if (currentLesson && currentLesson.id === lesson.id) item.classList.add('active');

      const num = document.createElement('span');
      num.className = 'lesson-number';
      num.textContent = `${lesson.level}`;
      item.appendChild(num);

      const title = document.createElement('span');
      title.textContent = lesson.title;
      item.appendChild(title);

      const badge = document.createElement('span');
      badge.className = 'lesson-lang';
      badge.textContent = lesson.lang === 'javascript' ? 'JS' : lesson.lang === 'python' ? 'Py' : 'HTML';
      item.appendChild(badge);

      item.addEventListener('click', () => loadLesson(lesson, idx));
      lessonListEl.appendChild(item);
    });
  }

  function updateStats() {
    const total = LESSONS.length;
    const done = completedLessons.size;
    completedCountEl.textContent = done;
    totalCountEl.textContent = total;
  }

  function loadLesson(lesson, idx) {
    currentLesson = lesson;
    currentLessonIndex = idx;
    document.getElementById('hall-of-fame-panel').classList.add('hidden');
    document.getElementById('lesson-content').classList.remove('hidden');
    challengeStatusEl.className = 'hidden';
    challengeStatusEl.innerHTML = '';
    hintBoxEl.classList.add('hidden');
    outputEl.textContent = '';
    outputEl.style.display = 'block';
    if (previewFrame) {
      previewFrame.style.display = 'none';
      previewFrame.src = '';
    }

    lessonNumberEl.textContent = `Lektion ${lesson.level}`;
    lessonTitleEl.textContent = lesson.title;
    lessonContentEl.innerHTML = lesson.content;
    CodeEditor.setLanguage(lesson.lang);
    CodeEditor.setValue(lesson.template);
    CodeEditor.focus();

    renderLessonList();
    updateStats();
    updateTitleBar();
  }

  function updateTitleBar() {
    if (!currentLesson) return;
    document.title = `CodeLearner – ${currentLesson.title}`
  }

  let previewFrame = null;

  function ensurePreviewFrame() {
    if (!previewFrame) {
      const container = document.getElementById('output-content');
      container.innerHTML = '';
      const frame = document.createElement('iframe');
      frame.id = 'html-preview';
      frame.style.cssText = 'width:100%;height:100%;border:none;background:white;display:none;';
      container.appendChild(frame);
      previewFrame = frame;
    }
    return previewFrame;
  }

  async function runCode() {
    if (!currentLesson) return;
    const code = CodeEditor.getValue();
    const lang = currentLesson.lang;
    outputEl.textContent = '';
    outputEl.style.display = 'block';

    if (lang === 'html') {
      const frame = ensurePreviewFrame();
      previewFrame.style.display = 'block';
      outputEl.style.display = 'none';
      const blob = new Blob([code], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      previewFrame.src = url;
      setTimeout(() => URL.revokeObjectURL(url), 1000);

      if (currentLesson.verify) {
        const passed = currentLesson.verify(code);
        if (passed) {
          challengeStatusEl.className = 'challenge-status passed';
          challengeStatusEl.innerHTML = `✅ Bra jobbat, ${getUserName()}! Uppgiften är löst!`;
          completedLessons.add(currentLesson.id);
          saveCompleted();
          renderLessonList();
          updateStats();
          showToast(`🎉 ${getUserName()} klarade lektionen!`, 'success');
        } else {
          challengeStatusEl.className = 'challenge-status failed';
          challengeStatusEl.innerHTML = '❌ Nästan rätt! Försök igen. Kolla att din HTML har rätt taggar.';
        }
      }
      return;
    }

    outputEl.textContent = '⏳ Kör...';
    if (previewFrame) previewFrame.style.display = 'none';

    try {
      const result = await window.api.execute(lang, code);
      if (result.success) {
        outputEl.textContent = result.output || '✅ Klart (ingen utdata)';
        challengeStatusEl.className = 'hidden';
        challengeStatusEl.innerHTML = '';

        if (currentLesson.verify) {
          const passed = currentLesson.verify(result.output || '');
          if (passed) {
            challengeStatusEl.className = 'challenge-status passed';
            challengeStatusEl.innerHTML = `✅ Bra jobbat, ${getUserName()}! Uppgiften är löst!`;
            completedLessons.add(currentLesson.id);
            saveCompleted();
            renderLessonList();
            updateStats();
            showToast(`🎉 ${getUserName()} klarade lektionen!`, 'success');
          } else {
            challengeStatusEl.className = 'challenge-status failed';
            challengeStatusEl.innerHTML = '❌ Nästan rätt! Försök igen. Kolla att utskriften matchar uppgiften.';
          }
        }
      } else {
        outputEl.textContent = result.error || '❌ Ett fel uppstod';
        challengeStatusEl.className = 'challenge-status failed';
        challengeStatusEl.innerHTML = '❌ Ett fel uppstod i koden. Kolla output-fliken.';
      }
    } catch (err) {
      outputEl.textContent = '❌ ' + (err.message || 'Okänt fel');
    }
  }

  function showHint() {
    if (!currentLesson) return;
    hintTextEl.textContent = currentLesson.hint;
    hintBoxEl.classList.remove('hidden');
  }

  function resetCode() {
    if (!currentLesson) return;
    CodeEditor.setValue(currentLesson.template);
    outputEl.textContent = '';
    challengeStatusEl.className = 'hidden';
    challengeStatusEl.innerHTML = '';
    hintBoxEl.classList.add('hidden');
    showToast('🔄 Kod återställd');
  }

  function clearOutput() {
    outputEl.textContent = '';
  }

  let toastTimeout;

  function showToast(msg, type) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.className = type || '';
    toast.classList.remove('hidden');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.add('hidden'), 2500);
  }

  let hallOfFameCache = null;

  async function loadHallOfFameData() {
    if (hallOfFameCache) return hallOfFameCache;
    try {
      const res = await fetch('hall-of-fame.json');
      if (!res.ok) return [];
      hallOfFameCache = await res.json();
      return hallOfFameCache;
    } catch {
      return [];
    }
  }

  async function showHallOfFame() {
    document.getElementById('lesson-content').classList.add('hidden');
    document.getElementById('hint-box').classList.add('hidden');
    document.getElementById('challenge-status').classList.add('hidden');
    const hofPanel = document.getElementById('hall-of-fame-panel');
    hofPanel.classList.remove('hidden');

    const listEl = document.getElementById('hof-list');
    const data = await loadHallOfFameData();

    if (data.length === 0) {
      listEl.innerHTML = '<p style="color:var(--text-dim);text-align:center;padding:20px;">Inga bidragsgivare än. Skapa en bra issue på GitHub!</p>';
      return;
    }
    listEl.innerHTML = data.map(entry => {
      const initial = (entry.github || '?')[0].toUpperCase();
      return `
        <div class="hof-entry">
          <div class="hof-avatar">${initial}</div>
          <div class="hof-info">
            <div class="hof-name">
              <a href="https://github.com/${entry.github}" target="_blank">@${entry.github}</a>
              <span style="font-size:11px;color:var(--text-dim)">#${entry.issue}</span>
            </div>
            <div class="hof-issue">${entry.title}</div>
          </div>
          <div class="hof-date">${entry.added}</div>
        </div>
      `;
    }).join('');
  }

  document.getElementById('btn-run').addEventListener('click', runCode);
  document.getElementById('btn-hint').addEventListener('click', showHint);
  document.getElementById('btn-reset').addEventListener('click', resetCode);
  document.getElementById('btn-clear').addEventListener('click', clearOutput);
  document.getElementById('btn-hall-of-fame').addEventListener('click', showHallOfFame);

  githubInputEl.value = githubUser;
  githubInputEl.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    saveGithubUser(val);
    if (val) {
      ghCheckEl.textContent = '👤';
    } else {
      ghCheckEl.textContent = '';
    }
  });
  if (githubUser) ghCheckEl.textContent = '👤';

  langFilterEl.addEventListener('change', () => {
    const lessons = getLessonsByLang(langFilterEl.value);
    if (lessons.length > 0) {
      loadLesson(lessons[0], 0);
    } else {
      lessonListEl.innerHTML = '<div style="padding:16px;color:#6c7086;font-size:13px;">Inga lektioner för detta språk.</div>';
      lessonContentEl.innerHTML = '<p style="color:#6c7086;margin:40px;">Välj ett språk i sidofältet för att börja.</p>';
      lessonNumberEl.textContent = '';
      lessonTitleEl.textContent = '';
    }
  });

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCode();
    }
  });

  const initialLessons = getLessonsByLang('all');
  if (initialLessons.length > 0) {
    loadLesson(initialLessons[0], 0);
  }
  updateStats();
})();
