const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var player, SpaceshipImage;
var asteroid, asteroidImage;
var Winsound;
var Score = 0;
var Hits = 0;
var gameState; // = "WIN";
// var gameState = "LOSE";
var MissileGroup, AsteroidGroup;

function preload() {
  SpaceshipImage = loadImage('./images/UFO.png');
  asteroidImage = loadImage('./images/asteroid1.png');
  Losesound = loadSound('./Background/15 Game Lost....mp3');
  WinSound = loadSound('./Background/14 Game Won!.mp3');
}

function setup() {
  createCanvas(1200, 400);

  engine = Engine.create();
  world = engine.world;

  player = createSprite(300, 200, 50, 50);
  player.addImage(SpaceshipImage);
  player.scale = 0.4;

  MissileGroup = new Group();
  AsteroidGroup = new Group();

}

function draw() {
  background(0);
  drawSprites();


  if (frameCount % 50 === 0) {
    asteroid = createSprite(900, 200, 50, 50);
    asteroid.addImage(asteroidImage);
    asteroid.debug = true;
    asteroid.x = Math.round(random(700, 1100));
    asteroid.y = Math.round(random(100, 370));
    asteroid.scale = 0.15;
    asteroid.velocityX = -(6 + 3 * Score / 10);
    asteroid.lifetime = 80;
    AsteroidGroup.add(asteroid);
  }
  keyPressed();

  if (keyDown("SPACE")) {
    createMissiles();
  }
  textSize(24);
  fill('green');
  text('Press Space to Shoot Missiles', 50, 50);
  text('Use Up and Down Arrow to Move', 400, 50);
  text('Score:' + Score, 800, 50);
  text('Hits:' + Hits, 1000, 50);

  if (MissileGroup.isTouching(asteroid)) {
    Score = Score + 2;
    MissileGroup.destroyEach();
    AsteroidGroup.destroyEach();
  }
  if (AsteroidGroup.isTouching(player)) {
    Hits = Hits + 1;
    AsteroidGroup.destroyEach();
  }

  // Winsound.play();

  if (Score === 20) {
    gameState = "WIN";
  }

  if (Hits === 10) {
    gameState = "LOSE";
  }

  if (gameState === "WIN") {
    textSize(48)
    fill("red");
    text("YOU WIN ", 500, 200)

    MissileGroup.destroyEach();
    AsteroidGroup.destroyEach();
    player.visible = false;
    WinSound.play();
  }
  else {
    WinSound.stop();
  }

  if (gameState === "LOSE") {
    textSize(48)
    fill("red");
    text("YOU LOSE ",500,200)

    MissileGroup.destroyEach();
    AsteroidGroup.destroyEach();
    player.visible = false;
    Losesound.play();
  }
  else {
    Losesound.stop();
  }
}

function keyPressed() {

  if (keyDown(UP_ARROW)) {
    player.y = player.y - 10;
  }

  if (keyDown(DOWN_ARROW)) {
    player.y = player.y + 10;
  }
}
function createMissiles() {
  Missile = createSprite(player.x, player.y, 30, 50);
  //Missile.x = player.x;
  Missile.shapeColor = "red";
  Missile.velocityX = 6;
  Missile.scale = 0.3;
  Missile.lifetime = 100;
  MissileGroup.add(Missile);

}