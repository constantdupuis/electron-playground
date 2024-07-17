const button = document.getElementById('btnSwitchFullScreen');


button.addEventListener('click', async () => {
    console.log('btnSwitchFullScreen was clicked!');
    fetch('/remote/Togglefullscreen');
});