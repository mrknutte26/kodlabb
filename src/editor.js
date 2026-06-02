const CodeEditor = {
  textarea: null,
  lineNumbers: null,
  wrapper: null,
  currentLang: 'javascript',

  init(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
      <div class="editor-wrapper">
        <div class="line-numbers"></div>
        <textarea class="code-textarea" spellcheck="false" autocorrect="off" autocapitalize="off" wrap="off"></textarea>
      </div>
    `;

    this.wrapper = container.querySelector('.editor-wrapper');
    this.lineNumbers = container.querySelector('.line-numbers');
    this.textarea = container.querySelector('.code-textarea');

    this.textarea.addEventListener('input', () => this.updateLineNumbers());
    this.textarea.addEventListener('scroll', () => this.syncScroll());
    this.textarea.addEventListener('keydown', (e) => this.handleKeydown(e));
    this.textarea.addEventListener('click', () => this.textarea.focus());

    this.updateLineNumbers();

    const style = document.createElement('style');
    style.textContent = `
      .editor-wrapper {
        display: flex;
        height: 100%;
        background: #1e1e2e;
        font-family: 'Cascadia Code', 'Fira Code', 'JetBrains Mono', Consolas, 'Courier New', monospace;
        font-size: 14px;
        line-height: 1.6;
      }
      .line-numbers {
        padding: 12px 0;
        min-width: 48px;
        text-align: right;
        color: #6c7086;
        user-select: none;
        font-size: 13px;
        line-height: 1.6;
        border-right: 1px solid #313244;
        padding-right: 12px;
        background: #181825;
        overflow: hidden;
      }
      .line-numbers span {
        display: block;
      }
      .code-textarea {
        flex: 1;
        padding: 12px 16px;
        background: transparent;
        border: none;
        color: #cdd6f4;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        resize: none;
        outline: none;
        tab-size: 2;
        white-space: pre;
        overflow: auto;
      }
      .code-textarea::selection {
        background: #45475a;
      }
    `;
    document.head.appendChild(style);

    return this;
  },

  updateLineNumbers() {
    const lines = this.textarea.value.split('\n');
    this.lineNumbers.innerHTML = lines.map((_, i) => `<span>${i + 1}</span>`).join('');
  },

  syncScroll() {
    this.lineNumbers.scrollTop = this.textarea.scrollTop;
  },

  handleKeydown(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = this.textarea.selectionStart;
      const end = this.textarea.selectionEnd;
      const val = this.textarea.value;
      this.textarea.value = val.substring(0, start) + '  ' + val.substring(end);
      this.textarea.selectionStart = this.textarea.selectionEnd = start + 2;
      this.updateLineNumbers();
    }

    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      document.getElementById('btn-run').click();
    }
  },

  getValue() {
    return this.textarea.value;
  },

  setValue(code) {
    this.textarea.value = code;
    this.updateLineNumbers();
  },

  focus() {
    this.textarea.focus();
  },

  setLanguage(lang) {
    this.currentLang = lang;
    document.getElementById('lang-badge').textContent = this.editorLangName(lang);
  },

  editorLangName(lang) {
    const map = { javascript: 'JavaScript', python: 'Python', html: 'HTML/CSS' };
    return map[lang] || lang;
  },
};
