const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        title: "САШКА",
        webPreferences: {
            nodeIntegration: true
        },
        autoHideMenuBar: true 
    });

    win.setMenu(null); 
    win.maximize();
    win.loadURL('http://localhost:8000/pages/customer/customers.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});