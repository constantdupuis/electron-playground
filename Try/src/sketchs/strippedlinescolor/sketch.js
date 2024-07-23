
//colorScale = chroma.scale(['#FD9B63', '#E7D37F','#81A263', '#365E32']);
//colorScale = chroma.scale(['#78ABA8', '#C8CFA0','#FCDC94', '#EF9C66']);
//colorScale = chroma.scale(['#1A5319', '#508D4E','#80AF81', '#D6EFD8']);
//colorScale = chroma.scale(['#468585', '#50B498','#9CDBA6', '#DEF9C4']);
//colorScale = chroma.scale(['#131842', '#E68369','#ECCEAE', '#FBF6E2']);
//colorScale = chroma.scale(['#FF7EE2', '#FFA38F','#FFD18E', '#E9FF97']);
colorScale = chroma.scale(['#B60071', '#E4003A','#EB5B00', '#FFB200']); // 8/10
//colorScale = chroma.scale(['#E76F51', '#F4A261','#E9C46A', '#36BA98']); // 5/10
//colorScale = chroma.scale(['#DD761C', '#FEB941','#FDE49E', '#6DC5D1']); // x/10



let color1;
let color2;
let color3;

let cellWidth = 40;
let halfCellWidth = 25;
let xCellCounts = 0;
let yCellCounts = 0;

let noiseScale = 0.1;

let loadingDiv;
let firstDraw = true;

function setup() {


  // color1 = color(0,255,255); // RGB
  // color2 = color(255,255,0); // RGB
  // color3 = color(255,0,255); // RGB

  // color1 = color(0,100,100); // RGB
  // color2 = color(250,250,0); // RGB
  // color3 = color(180,0,110); // RGB

  color1 = color(colorScale(0.0).hex());
  color2 = color(colorScale(0.5).hex());
  color3 = color(colorScale(1.0).hex());

  createCanvas(windowWidth, windowHeight);
  loadingDiv = document.getElementById("loading");
  noLoop();
}

function windowResized() {
  // Adjust the canvas size when the window is resized
  showLoading();
  resizeCanvas(windowWidth, windowHeight);
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

function draw() 
{
  hideLoadingOnFirstDraw();

  background(225);

  let alphaDivider = 1.1;
  
  noStroke();

  noiseSeed(Date.now() + 789165416);

  cellWidth = 20;
  xCellCounts = Math.ceil(width / cellWidth) ;
  yCellCounts = Math.ceil(height / cellWidth) ;

  for( let i = 0; i < xCellCounts; i++)
  {
    for( let j = 0; j < yCellCounts; j++)
    {
      let noiseVal = noise(i*noiseScale, j*noiseScale);
      noiseVal *= noiseVal;
      //console.log(`noise value ${noiseVal}`);
      //fill(noiseVal * 255, 0, 0, 255/3);
      //fill(noiseVal * 255);
      //rect( i * halfCellWidth,  j * halfCellWidth, halfCellWidth, halfCellWidth);
      color1.setAlpha((noiseVal * 255)/alphaDivider);
      stroke(color1);
      //stroke(0,255,255,(noiseVal * 255)/1.2);
      strokeWeight( 1 + random(3));
      draw_square( i * cellWidth,  j * cellWidth, cellWidth, 6 - random(2), random(TWO_PI));
      //rect( i * cellWidth,  j * cellWidth, cellWidth, cellWidth);
    }
  }

  noiseSeed(Date.now() + 32165944987);

  cellWidth = 20;
  xCellCounts = Math.ceil(width / cellWidth);
  yCellCounts = Math.ceil(height / cellWidth);

  for( let i = 0; i < xCellCounts; i++)
  {
    for( let j = 0; j < yCellCounts; j++)
    {
      let noiseVal = noise(width+i*noiseScale, width+j*noiseScale);
      noiseVal *= noiseVal; 
      //console.log(`noise value ${noiseVal}`);
      //fill(noiseVal * 255);
      //fill(0, noiseVal * 255, 0, 255/3);
      //rect( width /2 + i * halfCellWidth,  j * halfCellWidth, halfCellWidth, halfCellWidth);
      //stroke(255,255,0, (noiseVal * 255)/1.2);
      color2.setAlpha((noiseVal * 255)/alphaDivider);
      stroke(color2);
      strokeWeight( 1 + random(3));
      draw_square( i * cellWidth,  j * cellWidth, cellWidth, 6 - random(2), random(TWO_PI));
      //rect(  i * cellWidth,  j * cellWidth, cellWidth, cellWidth);
    }
  }


  noiseSeed(Date.now() + 44987321659);

  cellWidth = 10;
  xCellCounts = Math.ceil(width / cellWidth);
  yCellCounts = Math.ceil(height / cellWidth);

  for( let i = 0; i < xCellCounts; i++)
    {
      for( let j = 0; j < yCellCounts; j++)
      {
        let noiseVal = noise(width+i*noiseScale, width+j*noiseScale);
        noiseVal *= noiseVal; 
        //console.log(`noise value ${noiseVal}`);
        //fill(noiseVal * 255);
        //fill(0, noiseVal * 255, 0, 255/3);
        //rect( i * halfCellWidth,  height /2 + j * halfCellWidth, halfCellWidth, halfCellWidth);
        //stroke(255,0,255, (noiseVal * 255)/1.2);
        color3.setAlpha((noiseVal * 255)/alphaDivider);
        stroke(color3);
        strokeWeight( 1 + random(3));
        draw_square( i * cellWidth,  j * cellWidth, cellWidth, 6 - random(2), random(TWO_PI));
        //rect( i * cellWidth,  + j * cellWidth, cellWidth, cellWidth);
      }
    }
 
}

function keyPressed() {
  if ((key == 'S') || (key == 's')) {
    console.log('Save canvas');
    const date = new Date();
    let month = (date.getMonth() + 1).toString();
    month = month.padStart(2,'0');
    let day = date.getDate().toString();
    day = day.padStart(2, '0');
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');

    const formattedDate = `${date.getFullYear()}${month}${day}${hours}${minutes}${seconds}`;
    console.log(formattedDate);
    saveCanvas(`line-clipping-color-${formattedDate}-${width}x${height}.jpg`);
  }
}

function mousePressed(event) {}

function mouseDragged(event) {}


// function mouseReleased(event) {
// }
