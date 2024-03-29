import { createContext } from "@src/shared/context";
import { appRouter } from "@src/shared/routers/_app";
import { BrowserWindow, app } from "electron";
import { createIPCHandler } from "electron-trpc/main";
import { join } from "path";

app.setName("Apollo");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    frame: false,
    // these are strict , no need for full screens
    height: 550,
    width: 650,
    maxWidth: 650,
    maxHeight: 550,
    minHeight: 550,
    minWidth: 650,
    maximizable: false,
    resizable: false,
    show: false,
    webPreferences: {
      sandbox: false,
      preload: join(__dirname, "../preload/preload.js"),
    },
  });

  createIPCHandler({
    router: appRouter,
    windows: [mainWindow],
    createContext,
  });

  mainWindow.webContents.on("dom-ready", () => {
    mainWindow.show();
  });

  if (import.meta.env.DEV) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }

  // mainWindow.webContents.openDevTools({ mode: "detach" });
};

app.whenReady().then(() => {
  createWindow();
});

app.once("window-all-closed", () => app.quit());
