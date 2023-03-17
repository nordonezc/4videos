const electron = require("electron");
const ffmpeg = require("fluent-ffmpeg");
const { app, BrowserWindow, ipcMain } = electron;
let win;

app.on("ready", () => {
  console.log("App is ready");
  createWindow();
});

const createWindow = () => {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 800,
    height: 600,
  });

  win.loadURL(`file://${__dirname}/index.html`);
  //win.loadFile('index.html')
};

ipcMain.on("video:submit", (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    console.log(metadata?.format);
    console.log(metadata?.format?.duration);
    win.webContents.send("video:metadata", metadata?.format?.duration);
  });
});
