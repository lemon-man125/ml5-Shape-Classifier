const TOTAL = 100;

let brain;

let circles = [];
let squares = [];
let triangles = [];

function preload() {
  for (let i = 0; i < TOTAL; i++) {
    const index = nf(i+1, 4, 0);
    circles[i] = loadImage(`data/circle${index}.png`);
    squares[i] = loadImage(`data/square${index}.png`);
    triangles[i] = loadImage(`data/triangle${index}.png`);
  }
}


function setup() {
  createCanvas(400, 400);
  const options = {
    inputs: [64, 64, 4],
    task: 'imageClassification',
    //learningRate: 0.15,
    debug: true,
  }

  brain = ml5.neuralNetwork(options);
  for (let i = 0; i < circles.length; i++) {
    brain.addData({image: circles[i]}, {label: 'circle'});
    brain.addData({image: squares[i]}, {label: 'square'});
    brain.addData({image: triangles[i]}, {label: 'triangle'});
  }
  train();
}

function train() {
  brain.normalizeData();
  const options = {
    epochs: 300
  }
  brain.train(options, () => brain.save());
}



function draw() {
  background(255);
}
