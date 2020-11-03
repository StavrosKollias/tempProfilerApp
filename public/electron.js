const electron = require("electron");
const app = electron.app;
const { ipcMain } = require("electron");
const db = require("./db");
// Images Requests
const saveCallback = require("./functions/images");

// Database Requests
const templates = require("./dataFiles/templates");
global.db = db;
global.getTemplate = templates.getTemplates;
global.createTemplate = templates.createTemplate;
global.updateTemplate = templates.updateTemplate;
global.deleteTemplate = templates.deleteTemplate;

const oven = require("./dataFiles/oven");
global.getOven = oven.getOven;
global.createOven = oven.createOven;
global.updateOven = oven.updateOven;
global.deleteOven = oven.deleteOven;

const users = require("./dataFiles/users");
global.getUsers = users.getUsers;
global.validateUser = users.validateUser;
global.createUser = users.createUser;
global.getUserByID = users.getUserByID;

// End of Database Request
// App Window
const createWindow = require("./functions/window");

// import { createWindow, mainWindow } from "./functions/window";
// let mainWindow = require("./functions/window");
const mainWindow = require("electron-main-window").getMainWindow();
// console.log(mainWindow);
app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.commandLine.appendSwitch("disable-http-cache");

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("close-me", (evt, arg) => {
  mainWindow.close();
});

ipcMain.on("minimize-window", (evt, arg) => {
  mainWindow.minimize();
});

ipcMain.on("maximize-window", (evt, arg) => {
  mainWindow.maximize();
});

ipcMain.on("restore-window", () => {
  mainWindow.restore();
});
