const electron = require("electron");
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
let mainWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 1080,
    icon: path.join(__dirname + "../../favicon.ico"),
    transparent: false,
    // frame: false,
    // titleBarStyle: "hidden",
    // titleBarStyle: "hiddenInset",
    // backgroundColor: "#2e2c29",
    webPreferences: {
      preload: path.join(__dirname, "../preload.js"),
      // 2. Enable Node.js integration
      webSecurity: false,
      enableRemoteModule: true,
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
  return mainWindow;
};
// export mainWindow
module.exports = createWindow;
