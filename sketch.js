var dog,dogI,happyDogI,boneI;
var database;
var foodS,foodStock;

function preload(){
  dogI=loadImage("Dog.png");
  happyDogI=loadImage("happydog.png");
  boneI=loadImage("bone.png")
}

function setup(){
  createCanvas(1000,500);
  dog= createSprite(800,280);
  dog.addImage(dogI);
  dog.scale=0.2;

  bone=createSprite(180,250);
  bone.addImage(boneI);
  bone.scale=0.18;
 
  bone1=createSprite(720,330);
  bone1.addImage(boneI);
  bone1.scale=0.1;
  database= firebase.database();
  foodStock= database.ref('Food');
  foodStock.on("value",readStock);
}

function draw(){ 
  background(46,139,87)
  drawSprites();

  textFont("audiowide")
  textSize(50)
  fill("white")
  text("="+foodS,260,265);

  if(keyWentDown(DOWN_ARROW)){
	  writeStock1(foodS);
	  dog.addImage(happyDogI);
	  bone1.visible=true;
  }
  if(keyWentDown(UP_ARROW)){
	writeStock(foodS);
	dog.addImage(dogI);
  }

  textSize(25)
  text("PRESS DOWN ARROW TO FEED YOUR DOG",200,400)
  text("PRESS UP ARROW TO ADD FOOD",200,430)

  text("VAIBHAV RAJ",50,30)
  

}

function readStock(data){
  foodS=data.val();
}

function writeStock1(x){
	x=x-1
  database.ref("/").update({
	  Food:x
  }) 
}

function writeStock(x){
	x=x+1
  database.ref("/").update({
	  Food:x
  }) 
}