const SketchDef = require("../models/sketchDef");
class QADRModels
{   
    sketchs = [];
    serverIPs = [];
    port = 0;
    constructor()
    {
        this.sketchs = [];
        
        const homeSketch = new SketchDef('Home', 'Home', 'Start page with few QADR information');
        homeSketch.inShow = true;
        homeSketch.autoStart = true;

        this.sketchs.push(homeSketch);
        this.sketchs.push(new SketchDef('FlowField','Flow Field', 'Perlin noise base flow field'));
        this.sketchs.push(new SketchDef('MarblePaper','Marble Paper', 'Strange marble paper'));
        this.sketchs.push(new SketchDef('Raymarching','Ray marching', 'Alternate use of ray marching'));
    }
}

module.exports = QADRModels;