const button = document.getElementById('btnSwitchFullScreen');


button.addEventListener('click', async () => {
    console.log('btnSwitchFullScreen was clicked!');
    fetch('/remote/Togglefullscreen', {method: 'POST'});
});


function StartSketch(sketchId)
{
    console.log(`Request to start sketch ${sketchId}`);
    fetch(`/remote/StartSketch/${sketchId}`, {method: 'POST'});
}