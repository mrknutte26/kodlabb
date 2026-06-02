function sandboxEval(code, lang) {
  const logs = [];
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;

  console.log = (...args) => {
    logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
  };
  console.error = (...args) => {
    logs.push('[ERROR] ' + args.map(a => String(a)).join(' '));
  };
  console.warn = (...args) => {
    logs.push('[WARN] ' + args.map(a => String(a)).join(' '));
  };

  try {
    const result = eval(code);
    if (result !== undefined && logs.length === 0) {
      logs.push(String(result));
    }
    return { output: logs.join('\n') };
  } catch (err) {
    logs.push('[ERROR] ' + err.message);
    return { output: logs.join('\n') };
  } finally {
    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
  }
}

module.exports = { sandboxEval };
