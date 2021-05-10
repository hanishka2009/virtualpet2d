//Create variables here
var dog, dogimg,database,foodS,foodStock,happyDog,feed,addfood,foodObj,fedTime,lastFed
function preload()
{
happyDog=loadImage("dogImg.png")
dogimg=loadImage("dogImg1.png")
}

function setup() {
  database=firebase.database()
	createCanvas(1000, 500); 
  foodStock=database.ref('food')
  foodStock.on("value",readStock)
  foodStock.set(20)
  dog=createSprite(250,300,18,60)
  dog.addImage(happyDog)
  dog.scale=0.2
  foodObj = new food()
  addfood=createButton("add food")
  addfood.position(1000,100)
  addfood.mousePressed(addFood)

  feed=createButton("FEED THE DOG")
  feed.position(800,100)
  feed.mousePressed(feedDog)
  
  
}


function draw() {  
 
background(46,139,87)
foodObj.display();
fedTime=database.ref('feedTime')
  fedTime.on("value",function(data){
    lastFed=data.val();
  }) 
  textSize(15)
  fill("black")
  if(lastFed>=12){
    text("lastFed :"+lastFed-12+"pm",180,120)
  }else if (lastFed===0){
text("lastFed :12am",180,1200)
  }else{
text("lastFed"+lastFed+"am",180,120)
  } 
  console.log(lastFed) 
  drawSprites();
  //add styles here
  fill(0);
  textSize(20)
text("food Remaining: "+foodS,150,90)
text("note: press the up arrow key to feed DRAGO milk",20,40)
}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
x=0
  }
  else{
    x=x-1
  }
database.ref('/').update({
  food:x
})
}
function feedDog(){
dog.addImage("happydog",happyDog)
if(foodObj.getFoodStock()<=0){
  foodObj.updateFoodStock(foodObj.getFoodStock()*0)
}else{
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
}

database.ref('/').update({
  food:foodObj.getFoodStock(),feedTime:hour()
})

}
 function addFood() {
foodS=foodS+1
database.ref('/').update({
  food:foodS
})
}
