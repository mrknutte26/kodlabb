const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  execute: (lang, code) => ipcRenderer.invoke(`execute:${lang}`, code),
  platform: process.platform,
});
