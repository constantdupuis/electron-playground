class SketchDef {
  constructor( id, name, description)
  {
    this.id = id;
    this.name = name;
    this.description = description;
    this.autoStart = false;
    this.inShow = false;
    this.path= '';
  }
}

module.exports = SketchDef;