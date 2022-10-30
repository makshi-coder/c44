var backgroundImg,background
var rocketImg,rocket
var bombImg,bomb,bombGroup
var starImg,star,starGroup
var gameState="play"
var bgsprite
var score=0
var starGroup,bombGroup
function preload(){
backgroundImg=loadImage("background.png")
rocketImg=loadImage("rocket.png")
bombImg=loadImage("bomb.png")
starImg=loadImage("star.png")
bombSound=loadSound("bombSound.wav")
}

function setup() {
createCanvas(windowWidth,windowHeight)
bgsprite=createSprite(width/2,height/2,800,800)
bgsprite.scale=2.8
bgsprite.addImage(backgroundImg)

rocket=createSprite(width/2,height/2,50,50)
rocket.addImage(rocketImg)
rocket.scale=0.8

starGroup=new Group()
bombGroup=new Group()

rocket.debug=true
rocket.setCollider("rectangle",0,0,100,200)

}

function draw() {
 background("black")
 bgsprite.velocityY=1
 if (bgsprite.y>400){
    bgsprite.y=200
    console.log(bgsprite)

 }

 if(keyDown("right")){
   rocket.x=rocket.x+4
}

if(keyDown("left")){
   rocket.x=rocket.x-4
}
if(keyDown("up")){
   rocket.y=rocket.y-4
}
if(keyDown("down")){
   rocket.y=rocket.y+4
}
 spawnbomb()
 spawnStars()
 for(var i=0;i<starGroup.length;i++){
    if(starGroup.get(i).isTouching(rocket)){
       starGroup.get(i).destroy()
       score=score+1
    }
 }
 for(var i=0;i<bombGroup.length;i++){
   if(bombGroup.get(i).isTouching(rocket)){
      bombGroup.get(i).destroy()
      bombSound.play()
      score=score-2

   }
}
 drawSprites()
   fill("white") 
   stroke("blue")
   strokeWeight(4)
   textSize(20)
   text("SCORE- "+score,600,50)
}
function spawnStars(){
   if(frameCount%300===0){
      star=createSprite(400,400,20,20)
      star.x=Math.round(random(160,1200))
      star.y=Math.round(random(50,200))
      star.addImage(starImg)
      star.scale=0.03
      starGroup.add(star)
      star.lifetime=200
   }
}
function spawnbomb(){
   if(frameCount%700===0){
      bomb=createSprite(400,400,20,20)
      bomb.x=Math.round(random(160,1200))
      bomb.y=Math.round(random(50,200))
      bomb.addImage(bombImg)
      bomb.scale=0.2
      bombGroup.add(bomb)
      bomb.lifetime=300
   }
}