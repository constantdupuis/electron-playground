//colorScale = chroma.scale(['#FD9B63', '#E7D37F','#81A263', '#365E32']);
//colorScale = chroma.scale(['#78ABA8', '#C8CFA0','#FCDC94', '#EF9C66']);
//colorScale = chroma.scale(['#1A5319', '#508D4E','#80AF81', '#D6EFD8']);
//colorScale = chroma.scale(['#468585', '#50B498','#9CDBA6', '#DEF9C4']);
//colorScale = chroma.scale(['#131842', '#E68369','#ECCEAE', '#FBF6E2']);
colorScale = chroma.scale(["#323232", "#323232"]);

let cellWidth = 40;
let halfCellWidth = cellWidth / 2;
let xCellCounts = 0;
let yCellCounts = 0;

let noiseScale = 0.1;

let loadingDiv;
let firstDraw = true;

function setup() {
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

function draw() {
  myDraw();
}

function myDraw() {
  const coin = random(100);

  hideLoadingOnFirstDraw();
  if( coin < 50)
    drawPerlinNoiseBaseSquares();
  else
    drawSimpleOverlayedSquares();
}

function keyPressed() {
  if (key == "S" || key == "s") {
    console.log("Save canvas");
    const date = new Date();
    let month = (date.getMonth() + 1).toString();
    month = month.padStart(2, "0");
    let day = date.getDate().toString();
    day = day.padStart(2, "0");
    let hours = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    let seconds = date.getSeconds().toString().padStart(2, "0");

    const formattedDate = `${date.getFullYear()}${month}${day}${hours}${minutes}${seconds}`;
    console.log(formattedDate);
    saveCanvas(`line-clipping-bw-${formattedDate}-${width}x${height}.jpg`);
  }
}

function drawSimpleOverlayedSquares() {
  background(255);

  noFill();
  stroke(0);
  strokeWeight(1);

  noiseSeed(Date.now() + 789165416);

  cellWidth = 40;
  xCellCounts = Math.ceil(width / cellWidth)+1;
  yCellCounts = Math.ceil(height / cellWidth)+1;

  let c = color(colorScale(0.0).alpha(0.25).hex());
  stroke(c);

  for (let i = 0; i < width; i += cellWidth)
    for (let j = 0; j < height; j += cellWidth)
      draw_square(i, j, cellWidth, 4 - random(2), random(TWO_PI));

  c = color(colorScale(0.55).alpha(0.25).hex());
  stroke(c);

  cellWidth = 50;
  xCellCounts = Math.ceil(width / cellWidth)+1;
  yCellCounts = Math.ceil(height / cellWidth)+1;

  for (let i = 0; i < width; i += cellWidth)
    for (let j = 0; j < height; j += cellWidth)
      draw_square(i, j, cellWidth, 4 - random(2), random(TWO_PI));
  c = color(colorScale(0.85).alpha(0.25).hex());
  stroke(c);

  cellWidth = 50;
  xCellCounts = Math.ceil(width / cellWidth)+1;
  yCellCounts = Math.ceil(height / cellWidth)+1;

  for (let i = 0; i < width; i += cellWidth)
    for (let j = 0; j < height; j += cellWidth)
      draw_square(i, j, cellWidth, 4 - random(2), random(TWO_PI));

  c = color(colorScale(1.0).alpha(0.25).hex());
  stroke(c);

  cellWidth = 100;
  xCellCounts = Math.ceil(width / cellWidth)+1;
  yCellCounts = Math.ceil(height / cellWidth)+1;

  for (let i = 0; i < width; i += cellWidth)
    for (let j = 0; j < height; j += cellWidth)
      draw_square(i, j, cellWidth, 4 - random(2), random(TWO_PI));
}

function drawPerlinNoiseBaseSquares() {
  let alphaDivider = 1.0;
  background(255);

  noFill();
  stroke(0);
  strokeWeight(1);

  noiseSeed(Date.now() + 789165416);

  cellWidth = 20;
  xCellCounts = Math.ceil(width / cellWidth)+1;
  yCellCounts = Math.ceil(height / cellWidth)+1;

  for (let i = 0; i < xCellCounts; i++)
    for (let j = 0; j < yCellCounts; j++) {
      let noiseVal = noise(i * noiseScale, j * noiseScale);
      noiseVal *= noiseVal;
      let c = color(
        colorScale(0.0)
          .alpha(noiseVal / alphaDivider)
          .hex()
      );
      stroke(c);
      strokeWeight(1 + random(3));
      draw_square(
        i * cellWidth,
        j * cellWidth,
        cellWidth,
        4 - random(2),
        random(TWO_PI)
      );
    }

  noiseSeed(Date.now() + 85349231);

  cellWidth = 30;
  xCellCounts = Math.ceil(width / cellWidth)+1;
  yCellCounts = Math.ceil(height / cellWidth)+1;

  for (let i = 0; i < xCellCounts; i++)
    for (let j = 0; j < yCellCounts; j++) {
      let noiseVal = noise(width + i * noiseScale, height + j * noiseScale);
      noiseVal *= noiseVal;
      let c = color(
        colorScale(0.0)
          .alpha(noiseVal / alphaDivider)
          .hex()
      );
      stroke(c);
      strokeWeight(1 + random(3));
      draw_square(
        i * cellWidth,
        j * cellWidth,
        cellWidth,
        4 - random(2),
        random(TWO_PI)
      );
    }

  cellWidth = 10;
  xCellCounts = Math.ceil(width / cellWidth)+1;
  yCellCounts = Math.ceil(height / cellWidth)+1;

  for (let i = 0; i < xCellCounts; i++)
    for (let j = 0; j < yCellCounts; j++) {
      let noiseVal = noise(width + i * noiseScale, height + j * noiseScale);
      noiseVal *= noiseVal;
      let c = color(
        colorScale(0.0)
          .alpha(noiseVal / alphaDivider)
          .hex()
      );
      stroke(c);
      strokeWeight(1 + random(3));
      draw_square(
        i * cellWidth,
        j * cellWidth,
        cellWidth,
        4 - random(2),
        random(TWO_PI)
      );
    }
}

function mousePressed(event) {}

function mouseDragged(event) {}

// function mouseReleased(event) {
// }
