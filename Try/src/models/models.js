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
        homeSketch.htmlRealivePath = 'index.html';

        this.sketchs.push(homeSketch);
    }

    async loadSketchsInfo( basePath )
    {
        let sketchInfo = await this.loadManifestJson(basePath);

        sketchInfo.forEach( (m) => {
            console.log(`ADD Sketch ${m.manifest.id}`);
            const sd = new SketchDef( m.manifest.id, m.manifest.name,m.manifest.description);
            sd.htmlRealivePath = m.path;
            this.sketchs.push( sd );
        } );

        console.log('Loaded manifests:', sketchInfo);
    }

    findSketchById(sketchId)
    {
      return this.sketchs.find( si => si.id === sketchId );
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
              loadedManifests.push( {
                path : subfolder,
                manifest : jsonData});
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