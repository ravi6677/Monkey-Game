var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["b0f04be9-cad4-4d48-bf4c-6732b350ddd8","63b9f456-511e-482c-a1b6-6669589c14fa","b701fcec-cee6-486b-a54b-1e5bfc80722c","bcef9278-f3c6-43dc-99ba-99d4b8eab3e3","d6271434-7f65-4b35-afee-69e79bab7b5b","8146d02a-d087-4086-91a3-debc17afcfd4"],"propsByKey":{"b0f04be9-cad4-4d48-bf4c-6732b350ddd8":{"name":"Monkey","sourceUrl":null,"frameSize":{"x":199,"y":253},"frameCount":1,"looping":true,"frameDelay":12,"version":"rcS26xgBenBM_wenLzEM9p4I.pjOEIMu","loadedFromSource":true,"saved":true,"sourceSize":{"x":199,"y":253},"rootRelativePath":"assets/b0f04be9-cad4-4d48-bf4c-6732b350ddd8.png"},"63b9f456-511e-482c-a1b6-6669589c14fa":{"name":"Background","sourceUrl":"assets/v3/animations/KYiGgX0IShWrJMkk5mFuuSI4LcVy-IniN3wCzRTOoOA/63b9f456-511e-482c-a1b6-6669589c14fa.png","frameSize":{"x":263,"y":191},"frameCount":1,"looping":true,"frameDelay":4,"version":"i8XGKhPq.aAZuKHzx95yJkJC593Zk018","loadedFromSource":true,"saved":true,"sourceSize":{"x":263,"y":191},"rootRelativePath":"assets/v3/animations/KYiGgX0IShWrJMkk5mFuuSI4LcVy-IniN3wCzRTOoOA/63b9f456-511e-482c-a1b6-6669589c14fa.png"},"b701fcec-cee6-486b-a54b-1e5bfc80722c":{"name":"gameOver","sourceUrl":null,"frameSize":{"x":381,"y":21},"frameCount":1,"looping":true,"frameDelay":12,"version":"7RbjqjxgBGQPm4Hn1Y92zq5sJOqyxMQC","loadedFromSource":true,"saved":true,"sourceSize":{"x":381,"y":21},"rootRelativePath":"assets/b701fcec-cee6-486b-a54b-1e5bfc80722c.png"},"bcef9278-f3c6-43dc-99ba-99d4b8eab3e3":{"name":"restart","sourceUrl":null,"frameSize":{"x":75,"y":64},"frameCount":1,"looping":true,"frameDelay":12,"version":"Y0FZ4kLkZ8sT2QQQ2NXeMvDbddedkyWp","loadedFromSource":true,"saved":true,"sourceSize":{"x":75,"y":64},"rootRelativePath":"assets/bcef9278-f3c6-43dc-99ba-99d4b8eab3e3.png"},"d6271434-7f65-4b35-afee-69e79bab7b5b":{"name":"Banana","sourceUrl":"assets/v3/animations/KYiGgX0IShWrJMkk5mFuuSI4LcVy-IniN3wCzRTOoOA/d6271434-7f65-4b35-afee-69e79bab7b5b.png","frameSize":{"x":958,"y":958},"frameCount":1,"looping":true,"frameDelay":4,"version":"bXpfBTvESzpeOU_Wk8a2FkqIeuWv4Z5.","loadedFromSource":true,"saved":true,"sourceSize":{"x":958,"y":958},"rootRelativePath":"assets/v3/animations/KYiGgX0IShWrJMkk5mFuuSI4LcVy-IniN3wCzRTOoOA/d6271434-7f65-4b35-afee-69e79bab7b5b.png"},"8146d02a-d087-4086-91a3-debc17afcfd4":{"name":"obstacle.png_1","sourceUrl":"assets/v3/animations/KYiGgX0IShWrJMkk5mFuuSI4LcVy-IniN3wCzRTOoOA/8146d02a-d087-4086-91a3-debc17afcfd4.png","frameSize":{"x":560,"y":560},"frameCount":1,"looping":true,"frameDelay":4,"version":"lrFko.an0ZV_Ls9ZpemHhgO9wDSQu7KX","loadedFromSource":true,"saved":true,"sourceSize":{"x":560,"y":560},"rootRelativePath":"assets/v3/animations/KYiGgX0IShWrJMkk5mFuuSI4LcVy-IniN3wCzRTOoOA/8146d02a-d087-4086-91a3-debc17afcfd4.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//initiate game STATES
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground = createSprite(200,200,400,20);
ground.setAnimation("Background");
ground.x = ground.width/2;

ground.scale = 3;

var invisibleGround = createSprite(200,375,400,5);
invisibleGround.visible = false;

var Monkey = createSprite(50,355,400,400);
Monkey.setAnimation("Monkey");

Monkey.setCollider("circle",0,0,140);

Monkey.scale = 0.3;
Monkey.x = 50;

var BananasGroup = createGroup();
var ObstaclesGroup = createGroup();

textSize(20);
textFont("Playfair Display");

var count = 0;

var survivalTime = 0;

var gameOver = createSprite(190,100);
gameOver.setAnimation("gameOver");

gameOver.visible = false;


var restart = createSprite(190,150);
restart.setAnimation("restart");

restart.scale = 0.5;
restart.visible = false;

function draw(){
  background("white");
  
  if(gameState === PLAY){
    
    ground.velocityX = -(2+3*count/100);
    
    survivalTime = survivalTime + Math.round(World.frameRate/60);
    
    if(ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& Monkey.y >= 328){
      Monkey.velocityY = -12;
    }
    
    Monkey.velocityY = Monkey.velocityY + 0.8;
    
    Bananas();
    Obstacles();
    
    if(BananasGroup.isTouching(Monkey)){
      BananasGroup.destroyEach();
      count += 1;
      playSound("assets/category_achievements/lighthearted_bonus_objective_6.mp3");

    }
    
    if(ObstaclesGroup.isTouching(Monkey)){
      gameState = END;
      playSound("assets/category_music/gameover.mp3");
    }
   }
   
   else if(gameState === END){
     gameOver.visible = true;
     restart.visible = true;
     
     Monkey.velocityY = 0;
     ground.velocityX = 0;
     BananasGroup.setVelocityXEach(0);
     ObstaclesGroup.setVelocityXEach(0);
     
     BananasGroup.destroyEach();
     ObstaclesGroup.setLifetimeEach(-1);
     }
     
     if(mousePressedOver(restart)){
       reset();
     }
   
   Monkey.collide(invisibleGround);
  
  drawSprites();
  
  text("Score:"+count,42,55);
  
  text("Survival Time:"+survivalTime,200,55);
  
}

function reset(){
  
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  BananasGroup.destroyEach();
  ObstaclesGroup.destroyEach();
  
  count = 0;    
  survivalTime = 0;   
}

function Bananas(){
  if(World.frameCount%80 === 0){
    var Banana = createSprite(200,200);
    Banana.velocityX = -(6+3*(count/100))             ;
    
    Banana.y = randomNumber(240,260);
    
    Banana.setAnimation("Banana");
    Banana.scale = 0.05;
    
    Banana.lifetime = 35;
    
    BananasGroup.add(Banana);
    
  }
}

function Obstacles(){
  if(World.frameCount%100 === 0){
  var Obstacle = createSprite(400,352);
  Obstacle.velocityX = -(6+3*count/100);
  
  Obstacle.setAnimation("obstacle.png_1");
  Obstacle.scale = 0.09;
  
  Obstacle.lifetime = 70;
  
  ObstaclesGroup.add(Obstacle);
  
  }
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
