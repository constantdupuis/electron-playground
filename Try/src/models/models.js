const SketchDef = require("../models/sketchDef");
const fs = require('fs').promises;
const path = require('path');

class QADRModels
{   
    sketchs = [];
    serverIPs = [];
    port = 0;

    constructor()
    {
        this.sketchs = [];
        
        const homeSketch = new SketchDef('QADR_HOME', '[Q]ADR', '[Q]ADR start page');
        homeSketch.inShow = true;
        homeSketch.autoStart = true;

        this.sketchs.push(homeSketch);
        // this.sketchs.push(new SketchDef('FlowField','Flow Field', 'Perlin noise base flow field'));
        // this.sketchs.push(new SketchDef('MarblePaper','Marble Paper', 'Strange marble paper'));
        // this.sketchs.push(new SketchDef('Raymarching','Ray marching', 'Alternate use of ray marching'));
    }

    async loadSketchsInfo( basePath )
    {
        let manifests = await this.loadManifestJson(basePath);

        manifests.forEach( (m) => {
            console.log(`ADD Sketch ${m.id}`);
            this.sketchs.push( new SketchDef( m.id, m.name,m.description));
        } );

        console.log('Loaded manifests:', manifests);
    }

    async listSubfolders(folderPath) {
        try {
          const entries = await fs.readdir(folderPath, { withFileTypes: true });
          return entries
            .filter(entry => entry.isDirectory())
            .map(subfolder => path.join(folderPath, subfolder.name));
        } catch (error) {
          console.error('Error reading folder:', error);
          return [];
        }
      }
      
      async loadManifestJson(folderPath) {
        const loadedManifests = [];
      
        try {
          const subfolders = await this.listSubfolders(folderPath);
      
          for (const subfolder of subfolders) {
            const manifestPath = path.join(subfolder, 'manifest.json');
            
            try {
              const data = await fs.readFile(manifestPath, 'utf-8');
              const jsonData = JSON.parse(data);
              loadedManifests.push(jsonData);
            } catch (error) {
              if (error.code === 'ENOENT') {
                console.log(`manifest.json not found in ${subfolder}`);
              } else {
                console.error(`Error reading ${manifestPath}:`, error);
              }
            }
          }
        } catch (error) {
          console.error('Error loading JSON files:', error);
        }
      
        return loadedManifests;
      }
}

module.exports = QADRModels;