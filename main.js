'use strict'

const electron = require('electron')
const { Menu, MenuItem } = require('electron')
const app = electron.app
const globalShortcut = electron.globalShortcut
const os = require('os')
const path = require('path')
const BrowserWindow = electron.BrowserWindow

// Initialization.
var SpellChecker = require('simple-spellchecker');

try {
    require('electron-reloader')(module, {
        debug: true,
        watchRenderer: true
    });
} catch (_) { console.log('Error'); } 

app.setName("Author Loki")
var mainWindow = null



app.on('ready', function () {
  mainWindow = new BrowserWindow({
    backgroundColor: 'lightgray',
    title: "Author Loki",
    show: false,
    webPreferences: {
      spellcheck: false,
      nodeIntegration: true,
      defaultEncoding: 'UTF-8',
      worldSafeExecuteJavaScript: true,
      /* See https://stackoverflow.com/questions/63427191/security-warning-in-the-console-of-browserwindow-electron-9-2-0 */
      enableRemoteModule: true,
      contextIsolation: false,
    }
  })

  mainWindow.loadURL(`file://${__dirname}/app/index.html`)

  // Enable keyboard shortcuts for Developer Tools on various platforms.
  let platform = os.platform()
  if (platform === 'darwin') {
    globalShortcut.register('Command+Option+I', () => {
      mainWindow.webContents.openDevTools()
    })
  } else if (platform === 'linux' || platform === 'win32') {
    globalShortcut.register('Control+Shift+I', () => {
      mainWindow.webContents.openDevTools()
    })
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.setMenu(null)
    mainWindow.show()
  })

  mainWindow.onbeforeunload = (e) => {
    // Prevent Command-R from unloading the window contents.
    e.returnValue = false
  }

  mainWindow.on('closed', function () {
    mainWindow = null
  })

})

app.on('window-all-closed', () => { app.quit() })