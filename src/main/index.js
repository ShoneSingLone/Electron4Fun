'use strict'

import {
  app,
  BrowserWindow,
  Menu,
  Tray
} from 'electron';
import path from "path";

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow, appIcon;


const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:9080` :
  `file://${__dirname}/index.html`;

const notes = [{
    title: 'todo list',
    contents: 'grocery shopping\npick up kids\nsend birthday party invites'
  },
  {
    title: 'grocery list',
    contents: 'Milk\nEggs\nButter\nDouble Cream'
  },
  {
    title: 'birthday invites',
    contents: 'Dave\nSue\nSally\nJohn and Joanna\nChris and Georgina\nElliot'
  }
];

function displayNote(note) {
  mainWindow.webContents.send('displayNote', note);
}

function addNoteToMenu(note) {
  return {
    label: note.title,
    type: 'normal',
    click: () => {
      displayNote(note);
    }
  };
}

function createWindow() {

  let iconPath = path.resolve(__dirname, "icon@2x.png");
  appIcon = new Tray(iconPath);
  let contextMenu = Menu.buildFromTemplate(notes.map(addNoteToMenu));
  appIcon.setToolTip('Notes app');
  appIcon.setContextMenu(contextMenu);

  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)
  mainWindow.webContents.on('dom-ready', () => {
    displayNote(notes[0]);
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */