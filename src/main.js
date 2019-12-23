const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain, ipcRenderer} = electron;

// SET ENVIRONMENT TO PRODUCTION
//process.env.NODE_ENV = 'production';

let mainWindow;

app.on('ready', ()=>{

    //Create new window
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 600,
        title: 'Custodian',
        webPreferences: {
            nodeIntegration: true
        }
    }); // Parameter object is as of yet empty, as there is no configuration options that we need to pass in.
    // Load html into window

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'), // dirname/stc/mainWindow.html
        protocol: 'file:', // file:
        slashes: true // //
    })); //What this urlObject is doing: It constructs the path "file://dirname/src/mainWindow.html" and passes it into the loadURL function.

    //Quit application when closed
    mainWindow.on('closed', ()=>{
        app.quit();
    });

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu)

});

// Create menu template
const mainMenuTemplate = [
    {
        label: 'Terminal',
        submenu:[
            {
                label: 'Clear',
                accelerator: 'Esc',
                click() {
                    mainWindow.webContents.send('text:clear'); // Sends the message "text:clear"
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

// If mac, add empty object to menu
if (process.platform == 'darwin'){
    mainMenuTemplate.unshift({}); // Adds an empty object to the start of the mainMenuTemplate array
}


// Add dev tools item if program is not in production
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer tools',
        submenu:[
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload',
            }
        ]
    })
}