


let particles = [];
let particlesCount = 10000;
let noiseSpeed = 15;
let alivedPaticlesCount = particlesCount;

//let colorScale = chroma.scale(['#DEF9C4', '#468585']);
//let colorScale = chroma.scale(['#D6EFD8', '#1A5319']);
//let colorScale = chroma.scale(['#EEEEEE', '#DC5F00']);
//let colorScale = chroma.scale(['#DAD3BE', '#002125']);
//let colorScale = chroma.scale(['#002125', '#DAD3BE']); // 10/10
let colorScale = chroma.scale(['#FFFFFF', '#000000']); // 10/10
//let colorScale = chroma.scale(['#DAD3BE', '#002125']);
//let colorScale = chroma.scale(['#00112A', '#6BDFDB']);

function keyPressed() {
  if ((key == 'S') || (key == 's')) {
    console.time('Save canvas to png');
    saveCanvas('noise-flow-field.jpg');
    console.timeEnd('Save canvas to png');
  }
}

let loadingDiv;
let firstDraw = true;

function setup() {

    createCanvas(windowWidth, windowHeight);
    loadingDiv = document.getElementById("loading");
    angleMode(DEGREES);

    clearBackground();
    generateNoiseMapAndParticles();

    //NoiseMapDraw();
    // Turn off the draw loop.
    //noLoop();
}

function clearBackground()
{
  let c = color(colorScale(0.0).alpha(1.0).hex());
  background(c);
}

function generateNoiseMapAndParticles()
{
    // Noise settings
    // noiseSeed(195735482);
    // noiseDetail(3, 0.5);

    NoiseMapGenerate(width, height);
    NoiseMapShowStats();
    NoiseMapNormalize();
    NoiseMapShowStats();

    particles = [];
    for( x = 0; x < particlesCount; x++)
    {
      const p = new Particle(random(width), random(height));

      //const p = new Particle(width * 0.5, height * 0.95);
      const n = NoiseMapGetAt(p.x, p.y);
      //console.log("noise pour particule  : " + x + "  = "  + n);
      const vx = cos(n*360) * noiseSpeed;
      const vy = sin(n*360) * noiseSpeed;
      p.setVelocity( vx, vy);
      p.setTimeToLive(60 + random(60));
      particles.push(p);
    }
}

function windowResized() {
  // Adjust the canvas size when the window is resized
  showLoading();
  resizeCanvas(windowWidth, windowHeight);
  showLoading();
  clearBackground();
  generateNoiseMapAndParticles();
  //myDraw();
}

function hideLoadingOnFirstDraw() {
  if (firstDraw) {
    if (loadingDiv) {
      loadingDiv.style.display = "none";
    }
    firstDraw = false;
  }
}

function showLoading() {
  firstDraw = true;
  if (loadingDiv) {
    loadingDiv.style.display = "flex";
  }
}

function draw() {
  hideLoadingOnFirstDraw();
  //stroke(0, 32);
  noStroke();
  //noFill();
  //fill(0, 8);
  let colorRampIndex = random(0.25,1);
  let c = color(colorScale(0.25+colorRampIndex).alpha(0.1).hex());
  fill(c);
  for( x = 0; x < particlesCount; x++)
  {
    const p = particles[x];
    if( p.isAlive ){
      //point(p.x, p.y);
      circle(p.x, p.y, 2);
      //console.log("particule  : " + x + " pos x : "  + p.x + " y : " + p.y);
      //console.log("deltaTime  : " + deltaTime);
      const n = NoiseMapGetAt(p.x, p.y);
      //console.log("noise pour particule  : " + x + "  = "  + n);
      const vx = cos(n*360) * noiseSpeed;
      const vy = sin(n*360) * noiseSpeed;
      //console.log("new velocity x : " + vx + "  y :"  + vy);
      p.setVelocity(vx, vy);
      p.update(deltaTime);
      KeepInside(p);
    }
    else 
    {
      if( alivedPaticlesCount > 0)
        alivedPaticlesCount--;
      if( alivedPaticlesCount === 0)
      {
        console.log('All particles are dead, stop looping');
        noLoop();
        break;
      }
    }

  }
  //NoiseMapDraw();
}

function KeepInside(p)
{
  if( p.x < 0 || p.x > width-1 || p.y < 0 || p.y > height-1)
  {
    p.x = random(width);
    p.y = random(height);
  }
}

let noiseMap = [];
let noiseMapWidth = 0;
let noiseMapHeight = 0;
let noiseMapSize = 0;
let noiseScale = 0.003;
let noiseOctaveNumber = 2;
let noiseOctaveFalloff = 0.25;
let noiseMapSeed = -1; //49852321
let noiseMapMaxNoise = 0;
let noiseMapMinNoise = 1;

function NoiseMapGenerate(nmWidth, nmHeight)
{
  console.time('generate noisemap');
  noiseMap = [];
  noiseMapWidth = nmWidth;
  noiseMapHeight = nmHeight;
  noiseMapSize = noiseMapWidth * noiseMapHeight;
  noiseMapMaxNoise = 0;
  noiseMapMinNoise = 1;

  noiseDetail(noiseOctaveNumber, noiseOctaveFalloff);
  if( noiseMapSeed != -1)
    noiseSeed(noiseMapSeed);

  for( let i = 0; i < noiseMapWidth; i++)
  {
    for( let j = 0; j < noiseMapHeight; j++)
    {
      const noiseIndex = (j * noiseMapWidth) + i;
      const noiseVal = noise( i * noiseScale, j * noiseScale);

      if( noiseVal > noiseMapMaxNoise) noiseMapMaxNoise = noiseVal;
      if( noiseVal < noiseMapMinNoise) noiseMapMinNoise = noiseVal;

      noiseMap[noiseIndex] = noiseVal;
    }
  }
  console.timeEnd('generate noisemap');
}

function NoiseMapGetAt(x,y)
{
  x = floor(x);
  y = floor(y);
  if( noiseMapSize == 0) return -1;
  const noiseIndex = (y * width) + x;
  if( noiseIndex < noiseMapSize)
  {
    return noiseMap[noiseIndex];
  }
  return -1;
}

function NoiseMapDraw()
{
  console.time("draw noise map");
  for( let i =0; i < width; i++)
    for(let j = 0; j < height; j++)
  {
    let n = 255 * NoiseMapGetAt(i,j);
    
    stroke(n);
    point(i,j);
  }
  console.timeEnd("draw noise map");
}

function NoiseMapShowStats()
{
  console.log("Noise Map ");
  console.log("Noise Min :  " + noiseMapMinNoise);
  console.log("Noise Max :  " + noiseMapMaxNoise);
}

function NoiseMapNormalize()
{
  console.time('Normalize NoiseMap');
  for( let i = 0; i < noiseMapWidth; i++)
    {
      for( let j = 0; j < noiseMapHeight; j++)
      {
        const noiseIndex = (j * noiseMapWidth) + i;
         
        noiseMap[noiseIndex] = map( noiseMap[noiseIndex], noiseMapMinNoise, noiseMapMaxNoise, 0, 1 );
      }
    }
    noiseMapMinNoise = 0;
    noiseMapMaxNoise = 1;
    console.timeEnd('Normalize NoiseMap');
}
