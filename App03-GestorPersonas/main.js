const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');

let mainWindow;
let menuApp = [
    {
        label: 'Aplicación',
        submenu: [
            {
                label: 'About',
                click: () => {
                    openWindowAbout();
                }
            },
            {
                label: 'DevTools',
                accelerator: 'F12',
                click: () => {
                    mainWindow.webContents.toggleDevTools();
                }
            }
        ]
    }
];

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 700,
        resizable: false,
        webPreferences: {   // To use 'require' anywhere
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    mainWindow.loadFile('index.html');

    let menu = Menu.buildFromTemplate(menuApp);
    mainWindow.setMenu(menu);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function openWindowAbout() {
    let aboutWindow = new BrowserWindow({
        parent: mainWindow,
        modal: true,
        show: false,
        width: 310,
        height: 280,
        resizable: false,
    });

    aboutWindow.loadFile('about.html');
    aboutWindow.setMenu(null);
    aboutWindow.once('ready-to-show', () => {
        aboutWindow.show();
    });
}

app.whenReady().then(createMainWindow);

app.on('window-all-closed', function(){
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', function(){
    if(BrowserWindow.getAllWindows().length === 0){
        createMainWindow();
    }
});