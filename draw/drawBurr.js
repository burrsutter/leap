// 
// Credit for the drawing technique goes to
// https://github.com/tmcw/leap-simple


// Setup Leap loop with frame callback function
var controllerOptions = 
   { enableGestures: true },
    width = 1260,
    height = 700,
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

function draw() {
    var a, b;

    for (var id in after) {
        b = before[id],
        a = after[id];
        if (!b) continue;

				var stroke = { 
		  		'id' : id, 
		  		'bx' : b.tipPosition.x,
		  		'by' : b.tipPosition.y,
		  		'ax' : a.tipPosition.x,
		  		'ay' : a.tipPosition.y
				};
				strokeAsString = JSON.stringify(stroke);
				publish("drawingAddress", strokeAsString);

			  drawStroke(stroke);
			  console.log(strokeAsString);
    } // for

    before = after;
}

function drawStroke(stroke) {
  ctx.strokeStyle = color(stroke.id);
  ctx.moveTo(stroke.bx, -stroke.by);
  ctx.lineTo(stroke.ax, -stroke.ay);
  ctx.stroke();
  ctx.beginPath();	
}

Leap.loop(controllerOptions, function(frame, done) {
    after = {};
    for (var i = 0; i < frame.pointables.length; i++) {
        after[frame.pointables[i].id] = frame.pointables[i];
    }
    draw();
    done();
});
