

colorScale01 = chroma.scale(['#B60071', '#E4003A','#EB5B00', '#FFB200']); 
colorScale02 = chroma.scale(['#FF7EE2', '#FFA38F','#FFD18E', '#E9FF97']); 
colorScale03 = chroma.scale(['#78ABA8', '#C8CFA0','#FCDC94', '#EF9C66']); 
colorScale04 = chroma.scale(['#131842', '#E68369','#ECCEAE', '#FBF6E2']); 
colorScale05 = chroma.scale([ '#E9C46A','#36BA98','#E76F51', '#F4A261']);
colorScale06 = chroma.scale(['#DD761C', '#FEB941','#FDE49E', '#6DC5D1']);

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

let colorPalettes = [];

function setColorPalettes(){

  colorPalettes.push( {
    color1 : color(0,255,255),
    color2 : color(255,255,0),
    color3 : color(255,0,255)
  });

  colorPalettes.push( {
    color1 : color(colorScale01(0.0).hex()),
    color2 : color(colorScale01(0.5).hex()),
    color3 : color(colorScale01(1.0).hex())
  });

  colorPalettes.push( {
    color1 : color(colorScale02(0.0).hex()),
    color2 : color(colorScale02(0.5).hex()),
    color3 : color(colorScale02(1.0).hex())
  });

  colorPalettes.push( {
    color1 : color(colorScale03(0.0).hex()),
    color2 : color(colorScale03(0.5).hex()),
    color3 : color(colorScale03(1.0).hex())
  });

  colorPalettes.push( {
    color1 : color(colorScale04(0.0).hex()),
    color2 : color(colorScale04(0.5).hex()),
    color3 : color(colorScale04(1.0).hex())
  });

  colorPalettes.push( {
    color1 : color(colorScale05(0.0).hex()),
    color2 : color(colorScale05(0.5).hex()),
    color3 : color(colorScale05(1.0).hex())
  });

  colorPalettes.push( {
    color1 : color(colorScale06(0.0).hex()),
    color2 : color(colorScale06(0.5).hex()),
    color3 : color(colorScale06(1.0).hex())
  });
}

function selectColorPalette(){
  console.log(`Color palettes length ${colorPalettes.length}`);
  let index = Math.floor(random(colorPalettes.length));
  console.log(`Color palettes index ${index}`);
  color1 = colorPalettes[index].color1;
  color2 = colorPalettes[index].color2;
  color3 = colorPalettes[index].color3;
}

function setup() {
  setColorPalettes();
  selectColorPalette();

  createCanvas(windowWidth, windowHeight);
  loadingDiv = document.getElementById("loading");
  noLoop();
}

function windowResized() {
  // Adjust the canvas size when the window is resized
  showLoading();
  resizeCanvas(windowWidth, windowHeight);
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
       color1.setAlpha((noiseVal * 255)/alphaDivider);
      stroke(color1);
       strokeWeight( 1 + random(3));
      draw_square( i * cellWidth,  j * cellWidth, cellWidth, 6 - random(2), random(TWO_PI));
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
        color2.setAlpha((noiseVal * 255)/alphaDivider);
      stroke(color2);
      strokeWeight( 1 + random(3));
      draw_square( i * cellWidth,  j * cellWidth, cellWidth, 6 - random(2), random(TWO_PI));
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
        color3.setAlpha((noiseVal * 255)/alphaDivider);
        stroke(color3);
        strokeWeight( 1 + random(3));
        draw_square( i * cellWidth,  j * cellWidth, cellWidth, 6 - random(2), random(TWO_PI));
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

