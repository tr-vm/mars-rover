// Uses AXEL's node module
var ctx = require('axel');

// Clear the terminal
ctx.clear();

// Red box
ctx.bg(255, 0, 0);
ctx.box(45, 10, 50, 25);

// Black box
ctx.bg(0, 0, 0);
ctx.box(45, 30, 10, 5);

ctx.cursor.restore();
