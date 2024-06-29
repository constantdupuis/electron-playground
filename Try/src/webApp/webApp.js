const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

class WebApp {
    webapp;
    port = 3000;
    constructor( models, port )
    {
        this.models = models;
        this.port = 3000;

        this.webapp = express();
        this.webapp.engine('hbs', engine({defaultLayout: 'main', extname: '.hbs'}));
        this.webapp.set('view engine','hbs');
        //this.webapp.set('views', './webApp/views');
        this.webapp.set('views', path.join(__dirname,'views'));
        //this.webapp.set('fonts', path.join(__dirname,'static', 'fonts'));
        //this.webapp.set('css', path.join(__dirname,'static', 'css'));
        this.webapp.use('/static',express.static(path.join(__dirname,'static')));
        
        this.webapp.get('/hw', (req, res) => {
            res.send('Hello World!')
        });

        //this.webapp.use('/', express.static(path.join(process.cwd(), 'webApp')));
        this.webapp.use('/', (req, res) => {
            res.render('home', {models : models});
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