var ansel,ansel_img,ansel_shoot,ansel_jump,ansel_die,virus1,virus1_img,virus2,virus2_img,virus3_img,virus3;
var mask,weapon,mask_img,weapon_img,vaccine,vaccine_img,box,box_img;
var bg_img,bg_img2,bg_img3,end_img,log_img,log,symbol_img,symbol,ground,ground_img,invisibleground;
var score=0;
var live=3;
var vaccines=0;
var gameState=0;
var virusGroup;
var obstacle,obstacle_img,obstacle2,obstacle2_img,obstacle3,obstacle3_img;
var obstacleGroup;
var immunity=100;
var infection=0;

function preload(){
  ansel_img=loadImage("ansel2.png");
  ansel_shoot=loadImage("ansel3.png");
  ansel_jump=loadImage("ansel2.png");
  ansel_die=loadImage("1.png");
  mask_img=loadImage("4.png");
  weapon_img=loadImage("2.png");
  vaccine_img=loadImage("3.png");
  bg_img=loadImage("bg5.png");
  bg_img2=loadImage("bg1.png");
  bg_img3=loadImage("bg3.png");
  end_img=loadImage("end.png");
  virus1_img=loadImage("virus1.png");
  virus2_img=loadImage("virus3.png");
  virus3_img=loadImage("virus2.png");
  symbol_img=loadImage("symbol.png");
  box_img=loadImage("box.png");
  ground_img=loadImage("ground1.png");
  obstacle_img=loadImage("obstacle.png");
  obstacle2_img=loadImage("obstacle2.png");
  obstacle3_img=loadImage("obstacle3.png");

}

function setup() {
  createCanvas(displayWidth-2,displayHeight-145);
  
  ground=createSprite(displayWidth/2,displayHeight-180);
  ground.addImage(ground_img);
  //ground.shapeColor="brown"; 
  ground.x = ground.width /2;
  ground.scale=1;
  ground.visible=false;

  invisibleground=createSprite(displayWidth/2,displayHeight-115,displayWidth,50);

  ansel=createSprite(displayWidth/8-100,displayHeight-200);
  ansel.addImage(ansel_img);
  ansel.scale=0.25;
  ansel.visible=false;
  ansel.debug=true;

  weapon=createSprite(ansel.velocityX,ansel.velocityY);
  weapon.addImage(weapon_img);
  weapon.visible=false;

  virusGroup= new Group();
  
  obstacleGroup= new Group();

}

function draw() {
  if(gameState===0){
      background(bg_img);
     // symbol=createSprite(displayWidth/2+25,displayHeight/2-270);
      //symbol.addImage("symbol",symbol_img);
      //symbol.scale=0.5;
      //box=createSprite(displayWidth/2+450,displayHeight/2+150);
      //box.addImage("box",box_img);
      //box.scale=0.6;

      textFont("Monotype Corsiva");
      fill("red");
      stroke("black");
      strokeWeight(4);
      textSize(70);
      text("COVID         FIGHTER",displayWidth/2-245,displayHeight/2-250);
      textFont("Viner Hand ITC");
      fill("green");
      stroke("black");
      strokeWeight(4);
      textSize(20);
      text("A deadly virus has spread across the",displayWidth/2+285,displayHeight/2+100);
      text("EARTH.",displayWidth/2+400,displayHeight/2+130);
      text("Kill the virus and find the vaccines to",displayWidth/2+275,displayHeight/2+155);
      text("protect your family and friends.",displayWidth/2+300,displayHeight/2+185);
      text("Click UP KEY to Start the game.",displayWidth/2+300,displayHeight/2+220);
      
  if(keyCode===32){
        gameState=1;
        //symbol.destroy();
        //box.destroy();
      }
  }

  
 else if (gameState===1){
  background(bg_img2);
  
  ground.visible=true;
  ground.velocityX=-6;
  ansel.visible=true;
  invisibleground.visible=false;
 
  fill("green");
    stroke("black");
    strokeWeight(4);
    textSize(20);
    text("IMMUNITY:"+ immunity ,displayWidth/4,displayHeight/4);

    fill("green");
    stroke("black");
    strokeWeight(4);
    textSize(20);
    text("INFECTION:"+ infection ,displayWidth/4,displayHeight/4+50);
  
 

  if(keyDown("S") && ansel.y>=500 ){
    ansel.velocityY=-20;
  }

  ansel.velocityY=ansel.velocityY+0.8;

  if (keyWentUp( "S"||"D" )) {
     ansel.changeAnimation(ansel_shoot);
  }

  if (keyWentDown("S" || "D" )) {
     ansel.changeAnimation(ansel_img);  
  }


  if(keyDown("D") ){
    ansel.x=ansel.x+5;

  }

  
  //if(keyDown(RIGHT_ARROW)){
    // ansel.changeImage(ansel_shoot);
     //weapon.visible=true;
     //weapon.velocityX=ansel.velocityX+15; 

  //}

  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }

  spawnVirus();

  spawnObstacles();

 if(virusGroup.isTouching(ansel)){
   gameState=2;

 }
  if(obstacleGroup.isTouching(ansel)){
    infection+=10;
    immunity-=10;
    
  }

 }
  
 else{
    //background("black");
    ground.velocityX=0;
    obstacleGroup.destroyEach();
    virusGroup.destroyEach();
    ansel.destroy();
    //fill("white");
    //stroke("white");
    //strokeWeight(4);
    //textSize(20);
    //text("You are being infected",displayWidth/2,displayHeight/2);
    console.log("ended");

 }

 ansel.collide(invisibleground);

  drawSprites();
}

function spawnVirus(){
  if(frameCount % 600 ===0){
   y=Math.round(random(height/2,height/2+300));
   virus=createSprite(displayWidth,y);
   virus.velocityX=-5;
   var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: virus.addImage(virus1_img);
              break;
      case 2: virus.addImage(virus2_img);
              virus.scale=0.25;
              break;
      case 3: virus.addImage(virus3_img);
              virus.scale=0.7;
              break;
      default: break;
    }
   virus.scale=0.5;
   virusGroup.add(virus);

   virus.debug=true;
  }

  
}

function spawnObstacles(){
 if (frameCount % 250===0){
  //y=Math.round(random(ground.x,ground.y-180));
  obstacle=createSprite(displayWidth,displayHeight/2+200);
  obstacle.velocityX=-3;
  obstacle.scale=0.7;
  var rand = Math.round(random(1,2));
  switch(rand) {
    case 1: obstacle.addImage(obstacle_img);
            obstacle.scale=3;
            break;
   // case 2: obstacle.addImage(obstacle2_img);
           // obstacle.scale=0.5;
            //break;
    case 2: obstacle.addImage(obstacle3_img);
           obstacle.scale=2;
            break;
    default: break;
  }
  obstacle.scale=0.5;
  obstacleGroup.add(obstacle);

  obstacle.depth = ansel.depth;
  ansel.depth = ansel.depth + 1;

  obstacle.debug=true;

 }
}
