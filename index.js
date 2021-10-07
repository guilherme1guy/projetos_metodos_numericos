function setup() {
    canvas = createCanvas(28 * 10, 28 * 10);
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
        line(mouseX, mouseY, pmouseX, pmouseY)
        normalizePixels()
    }
    
}

function clean() {
    clear();
    background(255);
}

function saveImage() {
    loadPixels();
    return pixels;
}

function adjustPixelsImage() {
    let imagePixels = saveImage();
    let recizedArray = math.resize((math.reshape(Array.prototype.slice.call(imagePixels), [280, 280, 4])), [280, 280]);

    return recizedArray;
}

function normalizePixels() {
    let imagePixel = adjustPixelsImage();
    
    for(var column = 0; column < 280; column++) {
        for(var line = 0; line < 280; line++) {
            if (imagePixel[column][line] < 128) {
                imagePixel[column][line] = 0
            }
            else {
                imagePixel[column][line] = 255
            }
        }
    }

    return imagePixel;
}

