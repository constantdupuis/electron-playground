console.log('rendered.js');
window.electronAPI.onParams((data) => {
  console.log(`Receive ${data.remoteIPs}`);
  document.getElementById('IPList').innerText = `Shared Variable: ${data.remoteIPs}`;
});