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

  data.remoteIPs.forEach(item => {
    const li = document.createElement('div');
    li.textContent = `http://${item}:${data.port}`;
    ul.appendChild(li);
  });
  rootEl.appendChild(ul);
  //document.getElementById('IPList').innerText = `Shared Variable: ${data.remoteIPs}`;
});

window.electronAPI.requestParams();
