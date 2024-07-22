function encode_endpoint(
    x, y,
    clipx, clipy, clipw, cliph)
{
code = 0; /* Initialized to being inside clip window */

/* Calculate the min and max coordinates of clip window */
xmin = clipx;
xmax = clipx + clipw;
ymin = clipy;
ymax = clipy + cliph;

if (x < xmin)       /* to left of clip window */
    code |= (1 << 0);
else if (x > xmax)  /* to right of clip window */
    code |= (1 << 1);

if (y < ymin)       /* below clip window */
    code |= (1 << 2);
else if (y > ymax)  /* above clip window */
    code |= (1 << 3);

return code;
}

function line_clipped(
    x0, y0, x1, y1,
    clipx, clipy, clipw, cliph) {
  
    /* Stores encodings for the two endpoints of our line */
    let e0code, e1code;
  
    /* Calculate X and Y ranges for our clip window */
    let xmin = clipx;
    let xmax = clipx + clipw;
    let ymin = clipy;
    let ymax = clipy + cliph;
  
    /* Whether the line should be drawn or not */
    let accept = false;
  
    do {
      /* Get encodings for the two endpoints of our line */
      let e0code = encode_endpoint(x0, y0, clipx, clipy, clipw, cliph);
      let e1code = encode_endpoint(x1, y1, clipx, clipy, clipw, cliph);
  
      if (e0code == 0 && e1code == 0) {
        /* If line inside window, accept and break out of loop */
        accept = true;
        break;
      } else if ((e0code & e1code) != 0) {
        /*
         * If the bitwise AND is not 0, it means both points share
         * an outside zone. Leave accept as 'false' and exit loop.
         */
        break;
      } else {
        /* Pick an endpoint that is outside the clip window */
        let code = e0code != 0 ? e0code : e1code;
  
        let newx = 0, newy = 0;
        
        /*
         * Now figure out the new endpoint that needs to replace
         * the current one. Each of the four cases are handled
         * separately.
         */
        if ((code & (1 << 0)) != 0) {
          /* Endpoint is to the left of clip window */
          newx = xmin;
          newy = ((y1 - y0) / (x1 - x0)) * (newx - x0) + y0;
        } else if ((code & (1 << 1)) != 0) {
          /* Endpoint is to the right of clip window */
          newx = xmax;
          newy = ((y1 - y0) / (x1 - x0)) * (newx - x0) + y0;
        } else if ((code & (1 << 3)) != 0) {
          /* Endpoint is above the clip window */
          newy = ymax;
          newx = ((x1 - x0) / (y1 - y0)) * (newy - y0) + x0;
        } else if ((code & (1 << 2)) != 0) {
          /* Endpoint is below the clip window */
          newy = ymin;
          newx = ((x1 - x0) / (y1 - y0)) * (newy - y0) + x0;
        }
        
        /* Now we replace the old endpoint depending on which we chose */
        if (code == e0code) {
          x0 = newx;
          y0 = newy;
        } else {
          x1 = newx;
          y1 = newy;
        }
      }
    } while (true);
  
    /* Only draw the line if it was not rejected */
    if (accept)
    {
      x0 = Math.round(x0);
      y0 = Math.round(y0);
      x1 = Math.round(x1);
      y1 = Math.round(y1);
      //console.log(`Clipped line (${x0},${y0} ->  ${x1},${y1})`);
      line(x0, y0, x1, y1);
    }
      
  
    return accept;
  }

function draw_square( x, y, w, lineSteps, lineAngle)
{
    let xstart = x + random(w);
    let ystart = y + random(w);
  
    let slope = tan(lineAngle);
    let c = ystart - slope * xstart;
  
    let downAccept = true;
    let upAccept = true;
    
    let i = 0;

    //for (int i = 0; i < w / lineSteps; i++) {
    while (downAccept || upAccept) {
      //console.log(`draw_square iteration ${i}`);
      let x0 = x - w/2;
      let y0 = slope * x0 + c + i * lineSteps / cos(lineAngle);
      let x1 = x + w + w/2;
      let y1 = slope * x1 + c + i * lineSteps / cos(lineAngle);
      upAccept = line_clipped(x0, y0, x1, y1, x, y, w, w);
      
      x0 = x - w/2;
      y0 = slope * x0 + c - i * lineSteps / cos(lineAngle);
      x1 = x + w + w/2;
      y1 = slope * x1 + c - i * lineSteps / cos(lineAngle);
      downAccept = line_clipped(x0, y0, x1, y1, x, y, w, w);
      
      i++;
    }
}

