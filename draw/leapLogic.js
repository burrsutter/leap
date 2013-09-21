// 
// Credit for the drawing technique goes to
// https://github.com/tmcw/leap-simple



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
				// send to subscribers via Vert.x
				publish("drawingAddress", strokeAsString);
				// draw the gesture/movement on my canvas
			  drawStroke(stroke);
			  console.log(strokeAsString);
    } // for

    before = after;
}

// Setup Leap loop with frame callback function
Leap.loop(controllerOptions, function(frame, done) {
    after = {};
    for (var i = 0; i < frame.pointables.length; i++) {
        after[frame.pointables[i].id] = frame.pointables[i];
    }
    draw();
    done();
});
