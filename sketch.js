// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/147-chrome-dinosaur.html
// https://youtu.be/l0HoJHc-63Q

// Google Chrome Dinosaur Game (Unicorn, run!)
// https://editor.p5js.org/codingtrain/sketches/v3thq2uhk
let progress
let speed
let bgImageWidth
let bgpose1
let bgpose2
let unicorn;
let uImg;
let tImg;
let bImg1;
let bImg2;
let trains = [];
//let soundClassifier;
let imageNum = 0
let bgsound
gameOn = true
touchOn = false

function preload() {


  // const options = {
  //   probabilityThreshold: 0.95

  // };

  //soundClassifier = ml5.soundClassifier('SpeechCommands18w', options);
  uImg = loadImage('irus2.jpeg');
  tImg = loadImage('ofek2.png');
  bImg1 = loadImage('ib.jpg');
  bImg2 = loadImage('ib.jpg');
  looseBg = loadImage('ofek.jpeg')
  progress = 0.005
  speed = 8




}

function mousePressed() {
  // trains.push(new Train());
  if (!touchOn) {
    touchOn = true
    bgsound = loadSound("./iruss.mp3", playSound)
    touchOn = true
  }
}

function setup() {
   createCanvas(800, 450);
  //createCanvas(windowWidth, windowHeight)
  //bgsound.set
  unicorn = new Unicorn();
  //soundClassifier.classify(gotCommand);
  bgImageWidth = bImg1.width
  bgpose2 = bgImageWidth
  console.log("sheet !!!!!")
  console.log(bgImageWidth)
  bgpose1 = 0
  lives = 5
}


function playSound() {
  //  bgsound.play()
  bgsound.setVolume(0.4)
  bgsound.loop()
}
// function gotCommand(error, results) {
//   if (error) {
//     console.error(error);
//   }
//   console.log(results[0].label, results[0].confidence);
//   if (results[0].label == 'up') {
//     unicorn.jump();
//   }
// }

function keyPressed() {
  if (key == ' ') {
    unicorn.jump();
  }
  if (!touchOn) {
    bgsound = loadSound("./iruss.mp3", playSound)
    touchOn = true
  }
}


function touchStarted() {

  if (touchOn) {
    unicorn.jump();
  } else {
    bgsound = loadSound("./iruss.mp3", playSound)
    touchOn = true
  }
}


function draw() {
  if (touchOn) {
    if (gameOn) {
      gameLoop()
    } else {
      image(looseBg, 0, 0, width, height)
      noLoop();
      console.log(gameOn)

    }
  } else {
    fill(255, 0, 255)
    stroke(5)
    textSize(60)
    text(" לחץ להתחיל ", width / 2, height / 2)
  }
}

function setScore(lives) {
  fill(255, 0, 255)
  textSize(25)
  text(" חיים", width - 80, 50)
  text(lives, width - 110, 50)
}

function gameLoop() {


  if (random(1) < progress) {
    trains.push(new Train());
    progress += 0.0001
    speed += 1
    console.log(`progress ${progress} speed ${speed} \n energy ${unicorn.energy}`)

  }
  console.log(lives)
  bgpose1 -= 1
  bgpose2 -= 1
  if (bgpose1 == width - bgImageWidth) bgpose2 = width
  if (bgpose2 == width - bgImageWidth) bgpose1 = width

  image(bImg1, bgpose1, 0)
  image(bImg2, bgpose2, 0)
  console.log(`bimg1 x ${bgpose1} \n bimg2 x ${bgpose2} \n ${bgImageWidth} \n canvas ${width} \n window width ${windowWidth}`)
  console.log(width)
  //background(im);


  for (let i = trains.length - 1; i >= 0; i--) {
    trains[i].speed = speed
    trains[i].move();
    trains[i].show();
    if (unicorn.hits(trains[i])) {
      console.log('sss');
      lives = lives - 1
      trains.splice(i, 1)
      console.log(lives)
      if (lives == 0) {
        console.log(lives)
        gameOn = false
        //image(looseBg)
        //noLoop();
      }
    }
  }

  unicorn.show();
  unicorn.move();
  setScore(lives)
}