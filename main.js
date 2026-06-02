const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { sandboxEval } = require('./src/executor');

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    title: 'CodeLearner',
    backgroundColor: '#1e1e2e',
    show: false,
  });

  win.loadFile(path.join(__dirname, 'src', 'index.html'));

  win.once('ready-to-show', () => win.show());

  win.on('closed', () => null);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.handle('execute:javascript', async (event, code) => {
  try {
    const result = sandboxEval(code, 'javascript');
    return { success: true, output: result.output, error: null };
  } catch (err) {
    return { success: false, output: null, error: err.message };
  }
});

ipcMain.handle('execute:python', async (event, code) => {
  const { execSync } = require('child_process');
  const fs = require('fs');
  const tmpFile = path.join(app.getPath('temp'), `codelearner_${Date.now()}.py`);
  try {
    fs.writeFileSync(tmpFile, code, 'utf-8');
    const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
    const result = execSync(`"${pythonCmd}" "${tmpFile}"`, {
      timeout: 8000,
      encoding: 'utf-8',
      windowsHide: true,
      maxBuffer: 1024 * 1024,
    });
    return { success: true, output: result.trim(), error: null };
  } catch (err) {
    return { success: false, output: err.stdout ? err.stdout.trim() : null, error: err.stderr ? err.stderr.trim() : err.message };
  } finally {
    try { fs.unlinkSync(tmpFile); } catch {}
  }
});

ipcMain.handle('execute:html', async (event, code) => {
  return { success: true, output: code, error: null };
});
