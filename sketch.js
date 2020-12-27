var helicopterIMG, helicopterSprite, packageSprite,packageIMG,gameState = "play";
var packageBody,ground
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	

	packageSprite=createSprite(width/2, -50, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2
	packageSprite.velocityY = 2;

	helicopterSprite=createSprite(width/2, -50, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6
	helicopterSprite.velocityY = 2;

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , -50 , 5 , {restitution:0.8, isStatic:true});
	packageBody.velocityY = 2;
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);


	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 
  if (helicopterSprite.y === 200){
	helicopterSprite.velocityY = 0;
	packageSprite.velocityY= 0;
	packageBody.velocityY=0;
	if (gameState == "play"){
	fill("White")
	textSize(22);
	text("Press Down Arrow!!", 270, 400)
	}
}
  drawSprites();
 
}

function keyPressed() {
 if (keyCode === DOWN_ARROW) {
    // Look at the hints in the document and understand how to make the package body fall only on press of the Down arrow key.
	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.8, isStatic:false});
	World.add(world, packageBody);
	gameState = "end";
	
  }
  if (gameState == "end"){
	helicopterSprite.velocityY = -2;
	}
  if (helicopterSprite.y < -50){
	  helicopterSprite.destroy;
  }
}



