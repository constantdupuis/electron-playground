const button = document.getElementById('btnSwitchFullScreen');

// Step 2: Add a click event handler
button.addEventListener('click', async () => {
    console.log('btnSwitchFullScreen was clicked!');
    fetch('/remote/Togglefullscreen');
});