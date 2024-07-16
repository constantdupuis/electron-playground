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

  let first = true;
  let url = '';

  data.remoteIPs.forEach(item => {
    const link = document.createElement('a');
    const fullUrl = `http://${item}:${data.port}`;
    link.textContent = fullUrl;
    link.href = '#';
    link.classList.add('gen-qrcode-a');
    link.onclick = (event) => {
      event.preventDefault();
      generateQrCode(fullUrl);
      navigator.clipboard.writeText(fullUrl);
    };
    
    if( first){
      url = fullUrl;
      first = false;
    }

    rootEl.appendChild(link);
  });

  generateQrCode(url);
 
});

generateQrCode = (url) => {
  qrcode.makeCode(url);
};

window.electronAPI.requestParams();
