var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var PLAY,END,gameState;
var score,gameOver,restart,gameOverImg,restartImg;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("stop",trex_collided);
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,30);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  gameOver = createSprite(300,100,400,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  gameOver.visible = false;
  
  restart = createSprite(300,125,400,10);
  restart.addImage(restartImg);
  restart.scale=0.5;
  restart.visible = false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  PLAY=1;
  END=0;
  
  gameState=PLAY;
}

function draw() {
  background(180);
  
  if(gameState===PLAY){
  score = score + Math.round(getFrameRate()/60);
  
  if(keyDown("space")&&trex.y>152.5) {
    if(score<200){
    trex.velocityY = -13;
       }
    if(score>201){
    trex.velocityY = -10;
       }
    if(score>301){
    trex.velocityY = -8.5;
       }
    if(score>401){
    trex.velocityY = -6.5;
       }
    if(score>501){
    trex.velocityY = -5.5;
       }
  }
  
  trex.velocityY = trex.velocityY + 0.9;
    
  ground.velocityX = -(6+3*score/100);
    
  spawnClouds();
  spawnObstacles();
    
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
  if(trex.isTouching(obstaclesGroup)){
  gameState=END;
  }    
  }
  else if(gameState===END){
  //sets velocity
  ground.velocityX=0;
  trex.velocityY=0;
  cloudsGroup.setVelocityXEach(0);  
  obstaclesGroup.setVelocityXEach(0);
    
  //sets lifetime
  cloudsGroup.setLifetimeEach(-1);
  obstaclesGroup.setLifetimeEach(-1);
    
  //changes trex animation
  trex.changeAnimation("stop",trex_collided);
    
  restart.visible = true;
  gameOver.visible = true;
  }
  trex.collide(invisibleGround);
  
  if(mousePressedOver(restart)){
  reset();
  }
  
  drawSprites();
  text("Score: "+ score, 500,50);
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX =-(6+3*score/100);
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6+3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
 gameState=PLAY;
  
 restart.visible = false;
 gameOver.visible = false;
  
 score=0;
  
 cloudsGroup.destroyEach();
 obstaclesGroup.destroyEach();
  
 trex.changeAnimation("running", trex_running);
}
