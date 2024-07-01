console.log('rendered.js');

var qrcode = new QRCode("qrcode");

window.electronAPI.onParams((data) => {
  console.log(`Receive ${data.remoteIPs}`);
  const elementId = 'IPList';
  
  const rootEl = document.getElementById(elementId);

  if (!rootEl) {
    console.error(`Element with ID ${elementId} not found`);
    return;
  }

  //const ul = document.createElement('div');

  let first = true;
  let url = '';

  data.remoteIPs.forEach(item => {
    //const li = document.createElement('div');
    const link = document.createElement('a');
    const fullUrl = `http://${item}:${data.port}`;
    link.textContent = fullUrl;
    link.href = '#';
    link.classList.add('gen-qrcode-a');
    link.onclick = (event) => {
      event.preventDefault();
      generateQrCode(fullUrl);
    };
    
    if( first)
    {
      //link.textContent = link.textContent + ' (QRCode)';
      url = fullUrl;
      first = false;
    }

    //li.appendChild(link);
    rootEl.appendChild(link);
    //ul.appendChild(li);
  });

  //rootEl.appendChild(ul);
  generateQrCode(url);
 
});

generateQrCode = (url) => {
  qrcode.makeCode(url);
};

window.electronAPI.requestParams();
