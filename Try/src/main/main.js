const { app, BrowserWindow, ipcMain } = require("electron/main");
const os = require("os");
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');

const WebApp = require("../../webApp");
const QADRModels = require("../../models");


// ** Functions  *********************************************************************

const createWindow = ( models ) => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
  }
  });

  win.loadFile("./src/main/index.html");

  console.log(`send-params : ${models.serverIPs}`);
  ipcMain.on('send-params', (event, args) => {
        console.log(`Received send-params`);
        
        // Send a variable back to the renderer process
        event.sender.send('send-params', { remoteIPs : models.serverIPs});
  });

};

const createWindowFromHbs = () =>{

  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // Load the Handlebars template
  const templatePath = path.join(__dirname, 'index.hbs');
  const templateContent = fs.readFileSync(templatePath, 'utf8');
  const template = handlebars.compile(templateContent);

  // Define the context data for the template
  const context = {
    testVar: 'Variable Test'
  };

    // Render the template with the context data
    const html = template(context);

     // Load the rendered HTML into the Electron window
     win.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(html));

    //  win.on('closed', () => {
    //      win = null;
    //  });

};

function getIPs() {
  var ifaces = os.networkInterfaces();
  //let ipAdresse = {};
  let ipAdresse = [];
  Object.keys(ifaces).forEach(function (ifname) {
    let alias = 0;
    ifaces[ifname].forEach(function (iface) {
      if ("IPv4" !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        console.log(ifname + ":" + alias, iface.address);
      } else {
        // this interface has only one ipv4 adress
        console.log(ifname, iface.address);
        //ipAdresse = { IP: iface.address, MAC: iface.mac };
        ipAdresse.push(iface.address);
      }
      ++alias;
    });
  });

  return ipAdresse;
}

// ** Main *********************************************************************



// ** Events *********************************************************************

app.whenReady().then(() => {

  const models = new QADRModels();

  models.serverIPs = getIPs();

  const webApp = new WebApp(models, 3000);

  console.log(`createWindows with models ${models}`);

  createWindow(models);

  // app.on("activate", () => {
  //   if (BrowserWindow.getAllWindows().length === 0) {
  //     createWindow();
  //   }
  // });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
