let mic, fft;
var validate = true;

var inc = 0.01;
var time = 0;
var record = false;

function setup() {
  createCanvas(710, 400);
  noFill();

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}
function draw() {
  background(0);
  colorMode(HSB, 255, 255, 255);
  
  let spectrum = fft.analyze();
  if (validate == true){
    validate = false;
    console.log(spectrum)
  }

  var yoff = 1;
  loadPixels();
  for (var x = 0; x < width; x++) {
    var xoff = 1;
    var bar_height = map(spectrum[x], 0, 255, height, 0);
    var col = color(map(x, 0, width, 0, 235), 255, 255);
    var r = red(col);
    var g = green(col);
    var b = blue(col)

    for (var y = width; y > bar_height; y--){
      var index = (x + y * width) * 4;
      var n = noise(xoff, yoff, time);
      pixels[index + 0] = r * n;
      pixels[index + 1] = g * n;
      pixels[index + 2] = b * n;
      xoff += inc;
    }
    yoff += inc;
  }	
  time += 0.1;
  if (record) {
    // console.log(pixels.length);
    // console.log("1 est : " + width*height)
    console.log("red : " + red(col) + "green : " + green(col) + "blue : " + blue(col));
  }
  updatePixels();
}

function stop() {
  record = ! record;
}