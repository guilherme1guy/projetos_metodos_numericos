const BACKGROUND_COLOR = 0;
const STROKE_COLOR = 255;

function setup() {
    canvas = createCanvas(280, 280);
    background(BACKGROUND_COLOR);
    colorMode(HSB);
}

function draw() {

    strokeWeight(0);

    for (var x = 0; x < width; x = x + 1) {
        fill((x / 360) * 360, 100, 100);
    }
    strokeWeight(40);

    if (mouseIsPressed) {
        stroke(STROKE_COLOR);
        line(mouseX, mouseY, pmouseX, pmouseY)
        normalizePixels()
    }

}

function clean() {
    clear();
    background(BACKGROUND_COLOR);
}

function saveImage() {
    loadPixels();
    return new ImageData(pixels, 280, 280);
}

function normalizePixels() {
    let imagePixel = saveImage();

    const THRESHOLD = Math.floor(255 / 2);

    for (let line = 0; line < 280; line++) {
        for (let column = 0; column < 280; column++) {
            for (let channel = 0; channel < 4; channel++) {

                let idx = line * 280 + column * 4 + channel;
                let val = imagePixel.data[idx];

                if (val < THRESHOLD) {
                    imagePixel.data[idx] = 0;
                }
                else {
                    imagePixel.data[idx] = 255;
                }
            }
        }
    }

    return imagePixel;
}


const model_promise = tf.loadLayersModel('https://raw.githubusercontent.com/guilherme1guy/projetos_metodos_numericos/master/model/web_model/model.json')
let model = null;
function getTensorModel() {
    if (model === null) {
        (async () => model = await model_promise)();
    }

    return model;
}

function predict() {
    let m = getTensorModel();
    let img = normalizePixels();

    if (m == null) return [null, null];

    let tensor = tf.browser.fromPixels(img, 1).resizeBilinear([28, 28]).reshape([1, 784]);
    let prediction = m.predict(tensor);

    return prediction;
}

var intervalId = window.setInterval(async function () {
    let prediction = predict();

    if (prediction != null) {
        let data = await prediction.data();

        let elem = document.getElementById('prediction');
        elem.innerHTML = data.indexOf(Math.max(...data));

    }
}, 1000);