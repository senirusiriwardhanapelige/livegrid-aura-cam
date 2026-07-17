// const matrixWidth = 10;
// const matrixHeight = 10;
const matrixWidth = 192;
const matrixHeight = 64;
const canvasScale = 5;
const canvasMultiplierX = 1;
const canvasMultiplierY = 1;

const pixelCanvasWidth = matrixWidth * canvasScale;
const pixelCanvasHeight = matrixHeight * canvasScale;
const sketchWidth = matrixWidth * canvasScale * canvasMultiplierX;
const sketchHeight = matrixHeight * canvasScale * canvasMultiplierY;
var pixelPacket = new Uint8Array(matrixWidth*matrixHeight*3+1);
var div;

var artnetSendRate = 60;
var lastSentFrame = 0;
let socket;
var lerpVal = 0.6;

// Connect to the Node.js backend
socket = io.connect('http://localhost:3000');

// Listen for data from the backend
socket.on("e131Data", (data) => {
  // Use the data in your p5.js sketch
  // For example, draw something based on the data
});

function setup() {
	createMetaTag();
  pixelPacket = new Uint8Array(matrixWidth * matrixHeight * 3);
  pixelDensity(1);
  createCanvas(sketchWidth, sketchHeight);
  textSize(5);
  div = createDiv("").size(20000, 5000);
  //
  // frameRate(1);

  capture = createCapture(VIDEO);
  capture.size(sketchWidth, sketchHeight);
  capture.hide(); // Hide the default video element
}

function draw() {
    // background(0,0,0);
    image(capture, 0, 0, sketchWidth, sketchHeight);

    // let universe = 0;
    // let channel = 0;
    // let value = [];

    loadPixels();
    pixelsToByteArray();
  
    if (millis() - lastSentFrame > 1000 / artnetSendRate) {
      sendByteArray();
      lastSentFrame = millis();
    }
    // showPixels();
}

function showPixels() {
  background(0);
  noStroke();
  colorMode(RGB, 255, 255, 255, 255);
  for (var i = 0; i < sketchHeight; i += canvasScale) {
    for (var j = 0; j < sketchWidth; j += canvasScale) {
      var index = 4 * (i * sketchWidth + j);
      var r = pixels[index];
      var g = pixels[index + 1];
      var b = pixels[index + 2];
      fill(r, g, b);
    }
  }
  colorMode(HSB, 360, 100, 100);
  // updatePixels();
}

function sendByteArray() {
  socket.emit("e131Data", pixelPacket);
}


function pixelsToByteArray() {
  var k = 0;
  for (var i = 0; i < sketchHeight; i += canvasScale) {
    for (var j = 0; j < sketchWidth; j += canvasScale) {
      var index = 4 * (i * sketchWidth + j);
      pixelPacket[k]=lerp(pixelPacket[k++], pixels[index], lerpVal);
      pixelPacket[k]=lerp(pixelPacket[k++], pixels[index+1], lerpVal);
      pixelPacket[k]=lerp(pixelPacket[k++], pixels[index+2], lerpVal);
      // pixelPacket[k++] = pixels[index];
      // pixelPacket[k++] = pixels[index + 1];
      // pixelPacket[k++] = pixels[index + 2];
    }
  }
}

function printByteArray() {
    // div.html('');
    var textToDisplay = '';
    var k = 0;
    for(var i=0; i<matrixHeight; i++) {
        for(var j=0; j<matrixWidth; j++) {
            var index = 3*(i*matrixWidth+j);
            textToDisplay_ = "(" + (pixelPacket[index]) + "," + (pixelPacket[index+1]) + "," + (pixelPacket[index+2]) + ") | ";
            textToDisplay = textToDisplay + textToDisplay_
        }
      textToDisplay = textToDisplay + "<br>";
    }
    div.html(textToDisplay, false);
}

function readMessage(event) {
  var msg = event.data; // read data from the onmessage event
  console.log(msg); // print it
}


function createMetaTag() {
	let meta = createElement('meta');
	meta.attribute('name', 'viewport');
	meta.attribute('content', 'user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height');

	let head = select('head');
	meta.parent(head);
}
