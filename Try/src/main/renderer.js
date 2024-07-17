console.log('rendered.js');

var qrcode = new QRCode("qrcode");


let IPListEl;
let QRCodeUlrEl;

window.electronAPI.onParams((data) => {
  console.log(`Receive ${data.remoteIPs}`);
 
  const IPListElementId = 'IPList';
  const QRCodeUrlElementId= 'qrcode-url';

  IPListEl = document.getElementById(IPListElementId);
  QRCodeUlrEl = document.getElementById(QRCodeUrlElementId);

  if (!IPListEl) {
    console.error(`Element with ID ${IPListElementId} not found`);
    return;
  }

  if (!QRCodeUlrEl) {
    console.error(`Element with ID ${QRCodeUlrEl} not found`);
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

    IPListEl.appendChild(link);
  });

  generateQrCode(url);
 
});

generateQrCode = (url) => {
  if( QRCodeUlrEl)
  {
    QRCodeUlrEl.textContent = url;
  }
  qrcode.makeCode(url);
};

window.electronAPI.requestParams();

