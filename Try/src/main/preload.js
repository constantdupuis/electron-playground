const { contextBridge, ipcRenderer } = require('electron');


console.log('preload.js');

// Expose a limited API to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
    requestParams : ipcRenderer.send('send-params'),
    onParams: (callback) => ipcRenderer.on('send-params', (event, data) => callback(data))
});