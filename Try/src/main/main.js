const { app, BrowserWindow } = require("electron/main");
const os = require("os");

const WebApp = require("../../webApp");
const QADRModels = require("../../models");


// ** Functions  *********************************************************************

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile("./src/main/index.html");
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

const models = new QADRModels();

models.serverIPs = getIPs();

const webApp = new WebApp(models, 3000);

// ** Events *********************************************************************

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
