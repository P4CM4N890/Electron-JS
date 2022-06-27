const {app, BrowserWindow} = require('electron');
const path = require('path');

function createMainWindow() {
    let mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then(createMainWindow);