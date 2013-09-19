// 
// Credit for the drawing technique goes to
// https://github.com/tmcw/leap-simple

// Setup Leap loop with frame callback function
var controllerOptions = 
   { enableGestures: true },
    width = 960,
    height = 500,
    canvas = d3.select('div#container')
        .append('canvas')
        .attr('width', width)
        .attr('height', height).node(),
    ctx = canvas.getContext('2d'),
    before = {},
    after = {},
    color = d3.scale.category20();

console.log("end of controllerOptions");

ctx.lineWidth = 5;
ctx.translate(width/2, height/2);

function drawStroke(stroke) {
  ctx.strokeStyle = color(stroke.id);
  ctx.moveTo(stroke.bx, -stroke.by);
  ctx.lineTo(stroke.ax, -stroke.ay);
  ctx.stroke();
  ctx.beginPath();	
}

