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
        this.webapp.use('/static',express.static(path.join(__dirname,'static')));

        // this.webapp.get('/sketch/show/:sketchId', (req, res) => {
        //     console.log(req.params);
        //     res.render('home', {models : models});
        // });

        // this.webapp.get('/sketch/autostart/:sketchId', (req, res) => {
        //     console.log(req.params);
        //     res.render('home', {models : models});
        // });

        //this.webapp.use('/', express.static(path.join(process.cwd(), 'webApp')));
        this.webapp.get('/', (req, res) => {
            console.log(`GET /`);
            console.log(req.query);
            res.render('home', {models : models});
        });

        this.webapp.get('/remote/Togglefullscreen', (req, res) => {
            console.log(`GET /remote/Togglefullscreen`);
            if( this.toggleFullscreenCallback)
                this.toggleFullscreenCallback();
            console.log(req.query);
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