console.log('rendered.js');

window.electronAPI.onParams((data) => {
  console.log(`Receive ${data.remoteIPs}`);
  const elementId = 'IPList';
  
  const rootEl = document.getElementById(elementId);

  if (!rootEl) {
    console.error(`Element with ID ${elementId} not found`);
    return;
  }

  const ul = document.createElement('div');

  let first = true;
  let url = '';

  data.remoteIPs.forEach(item => {
    const li = document.createElement('div');
    li.textContent = `http://${item}:${data.port}`;
    if( first)
    {
      li.textContent = li.textContent + ' (QRCode)';
      url = li.textContent;
      first = false;
    }
    ul.appendChild(li);
  });
  rootEl.appendChild(ul);

  var qrcode = new QRCode("qrcode");
  qrcode.makeCode(url);

  //let qr = new QRCode(document.getElementById("qrcode-canvas"), "http://jindo.dev.naver.com/collie");

  // QRCode.toCanvas(document.getElementById('qrcode-canvas'), url, function (error) {
  //   if (error) console.error(error)
  //   console.log('QRCode generated');
  // });

  //document.getElementById('IPList').innerText = `Shared Variable: ${data.remoteIPs}`;
});

window.electronAPI.requestParams();
