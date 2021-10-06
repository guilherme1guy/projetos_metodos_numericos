function setup() {
    createCanvas(28 * 10, 28 * 10);
    background(255);
    colorMode(HSB);
}
  
function draw() {
    strokeWeight(0);
  
    for (var x = 0; x < width; x = x + 1) {
      fill((x / 360) * 360, 100, 100);
    }
  
    strokeWeight(2);
  
    if (mouseIsPressed) {
      stroke(0, 0, 0);
      line(mouseX, mouseY, pmouseX, pmouseY);
    }
}

function clean() {
    clear();
    background(255);
}