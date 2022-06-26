const {app, BrowserWindow} = require('electron');
const path = require('path');

function createMainWindow(){
    let mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:{
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then(createMainWindow);

app.on('window-all-closed', function() {
    if(process.platform !== 'darwin'){ // Si el sistema operativo es MacOS
        app.quit();
    }
});

app.on('activate', function() {
    if(BrowserWindow.getAllWindows().length === 0){
        createMainWindow();
    }
});

// electron-packager . --platform=win32 --arch=x64 comando para crear ejecutable en windows de 64 bits