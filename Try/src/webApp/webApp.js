const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

class WebApp {
    webapp;
    toggleFullscreenCallback;
    //port = 3000;
    constructor( models, port )
    {
        this.models = models;
        this.port = 4000;

        this.webapp = express();
        this.webapp.engine('hbs', engine({defaultLayout: 'main', extname: '.hbs'}));
        this.webapp.set('view engine','hbs');
        this.webapp.set('views', path.join(__dirname,'views'));
        this.webapp.use(express.static(path.join(__dirname,'static')));

        this.webapp.get('/', (req, res) => {
            console.log(`GET /`);
            console.log(req.query);
            res.render('home', {models : models});
        });

        this.webapp.post('/remote/Togglefullscreen', (req, res) => {
            console.log(`receive POST /remote/Togglefullscreen`);
            if( this.toggleFullscreenCallback)
                this.toggleFullscreenCallback();
            console.log(req.query);
            res.send('OK');
        });

        this.webapp.post('/remote/StartSketch/:sketchId', (req, res) => {
            const sketchId = req.params.sketchId;
            console.log(`receive POST /remote/StartSketch/${sketchId}`);
            res.send('OK');
        });
          
        const server = this.webapp.listen(this.port, () => {
            const port = server.address().port;
            console.log('QADR remote web app is listening at :');
            for( const ip of this.models.serverIPs)
            {
                console.log(`- ${ip}:${port}`);
            }
        });
    }
}

module.exports = WebApp;