var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood, feedDog1;
var foodObj;
var poppins;

var time = 0;
var minutes = 0;

//create feed and lastFed variable here
var feed, lastFed;

function preload(){
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happy dog.png");

  //loading the 'Poppins' font
  poppins = loadFont("Poppins-Regular.ttf");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  dog = createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedDog1 = createButton("Feed the dog");
  feedDog1.position(700,95);
  textFont(poppins);
  feedDog1.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  if (time >= 12) {
    fill("white");
    textFont(poppins);
    text("Last Feed: " + time + " PM", 350, 30);
  } else if(time == 0){
    fill("white");
    textFont(poppins);
    text("Last Feed: 12 AM", 350, 30);
  } else {
    fill("white");
    textFont(poppins);
    text("Last Feed: " + time + " AM", 350, 30);
  }
 
  //write code to display text lastFed time here
  fill("white");
  textFont(poppins);
  text("Last Feed: " + time, 350, 30);
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  
  if (addFood.mousePressed) {
      time = hour() + " : " + minute();
      minutes = minute();
      database.ref('/').update({
          feedTime: time
      });
  }

  //write code here to update food stock and last fed time
  foodS--;
  database.ref('/').update({
    Food:foodS
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}