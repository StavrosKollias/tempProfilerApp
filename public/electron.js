const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const { ipcMain } = require("electron");
const db = require("./db");
const { templates } = require("./db");
global.db = db;

let mainWindow;
function createWindow() {
   mainWindow = new BrowserWindow({
      width: 1500,
      height: 1080,
      icon: path.join(__dirname + "./favicon.ico"),
      transparent: false,
      // frame: false,
      // titleBarStyle: "hidden",
      // titleBarStyle: "hiddenInset",
      // backgroundColor: "#2e2c29",
      webPreferences: {
         preload: path.join(__dirname, "preload.js"),
         // 2. Enable Node.js integration
         webSecurity: false,
         enableRemoteModule: true,
         nodeIntegration: true,
      },
   });

   mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
   mainWindow.on("closed", () => (mainWindow = null));
}
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

const createTemplate = async (name, zones, thresholds) => {
   const template = await db.templates.insert({ name, zones, thresholds });
   return template;
};

const getTemplates = async (name) => {
   let proxies;
   if (name) {
      proxies = await db.templates.find({ name: name });
   } else {
      proxies = await db.templates.find({});
   }

   return { proxies };
};

const deleteTemplate = async (name) => {
   const template = await db.templates.remove({ name: name }, { multi: true }, function (err, numRemoved) {
      console.log(numRemoved);
   });
   return template;
};

const updateTemplate = async (newName, name, zones, thresholds, ovenName) => {
   console.log(name);
   console.log(newName);

   const template = await db.templates.update({ name: name }, { name: newName, ovenName: ovenName, zones: zones, thresholds: thresholds }, {}, function (
      err,
      numReplaced
   ) {
      // numReplaced = 1
      // The doc #3 has been replaced by { _id: 'id3', planet: 'Pluton' }
      // Note that the _id is kept unchanged, and the document has been replaced
      // (the 'system' and inhabited fields are not here anymore)
      console.log(numReplaced);

      if (!err) {
         deleteTemplate();
      }
   });

   console.log(template);
   console.log(name);
   return template;
};

global.getTemplate = getTemplates;
global.createTemplate = createTemplate;
global.updateTemplate = updateTemplate;
global.deleteTemplate = deleteTemplate;

const createOven = async (name, tempaleName, solderType) => {
   const oven = await db.oven.insert({ name, tempaleName, solderType });
   return oven;
};

const getOven = async () => {
   const proxies = await db.oven.find({});
   return { proxies };
};

const deleteOven = async (name) => {
   const oven = await db.oven.remove({ name: name }, { multi: true }, function (err, numRemoved) {
      console.log(numRemoved);
   });
   return oven;
};

const updateOven = async (newName, name, templateName, soldreType) => {
   console.log(name);
   console.log(newName);

   const oven = await db.oven.update({ name: name }, { name: newName, templateName: templateName, soldreType: soldreType }, {}, function (err, numReplaced) {
      // numReplaced = 1
      // The doc #3 has been replaced by { _id: 'id3', planet: 'Pluton' }
      // Note that the _id is kept unchanged, and the document has been replaced
      // (the 'system' and inhabited fields are not here anymore)
      console.log(numReplaced);

      if (!err) {
         deleteTemplate();
      }
   });

   console.log(oven);
   console.log(name);
   return oven;
};

global.getOven = getOven;
global.createOven = createOven;
global.updateOven = updateOven;
global.deleteOven = deleteOven;

const createUser = async (username, email, password) => {
   const users = await db.users.insert({ username, email, password });
   console.log(users);
   return users;
};

const getUsers = async (name) => {
   let proxies;
   if (name) {
      proxies = await db.users.find({ name: name });
   } else {
      proxies = await db.users.find({});
   }
   return { proxies };
};

const validateUser = async (username, password) => {
   let proxies = await db.users.find({ username: username });
   console.log(proxies);
   let userId;
   if (proxies.length > 0 && proxies[0].password === password) userId = proxies[0]._id;
   return { success: proxies[0].password === password, userId: userId };
};

global.validateUser = validateUser;
global.createUser = createUser;
