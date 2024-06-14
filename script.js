//world constants
var deg = Math.PI/180;

//player constuction
function player(x,y,z,rx,ry){
	this.x = x;
	this.y = y;
	this.z = z;
	this.rx = rx;
	this.ry = ry;
}

//array initialization
var map = [
	[0,0,1000,0,180,0,2000,200,"#FCF0F0"],
	[0,0,-1000,0,0,0,2000,200,"Patterns/wall1.avif"],
	[0,0,-1000,0,0,0,170,170,"Patterns/window1.jpg"],
	[1000,0,0,0,-90,0,2000,200,"#FCF0F0"],
	[-1000,0,0,0,90,0,2000,200,"#FCF0F0"],
	[0,100,0,90,0,0,2000,2000,"#665566"],
]

var coins = [
	[200,30,-100,0,0,0,50,50,"#FFFF00"],
	[400,30,-200,0,0,0,50,50,"#FFFF00"],
	[200,30,500,0,0,0,50,50,"#FFFF00"]
]

var keys = [
	[-600,30,100,0,0,0,50,50,"#FF0000"],
	[300,30,-700,0,0,0,50,50,"#FF0000"],
	[-300,30,550,0,0,0,50,50,"#FF0000"]
]

//keyboard and mouse movement variables
var PressLeft = 0;
var PressRight = 0
var PressForward = 0;
var PressBack = 0;
var PressUp = 0;
var MouseX = 0;
var MouseY = 0;
var lock = false;
var canlock = false;

//link variable to container
var container = document.getElementById("container");

//if the mouse is pressed
container.onclick = function(){
	if (canlock) container.requestPointerLock();
}

//if the key is pressed
document.addEventListener("keydown", (event) =>{
	if (event.key == "a"){
		PressLeft = 1;
	}
	if (event.key == "d"){
		PressRight = 1;
	}
	if (event.key == "w"){
		PressForward = 1;
	}
	if (event.key == "s"){
		PressBack = 1;
	}
	if (event.keyCode == 32){
		PressUp = 1;
	}
})

//if the key is released
document.addEventListener("keyup", (event) =>{
	if (event.key == "a"){
		PressLeft = 0;
	}
	if (event.key == "d"){
		PressRight = 0;
	}
	if (event.key == "w"){
		PressForward = 0;
	}
	if (event.key == "s"){
		PressBack = 0;
	}
	if (event.keyCode == 32){
		PressUp = 0;
	}
})

//locked mouse listener
document.addEventListener("pointerlockchange", (event) =>{
	lock = !lock;		
})

//mouse movement listener
document.addEventListener("mousemove", (event) =>{
	MouseX = event.movementX;
	MouseY = event.movementY;
})

//new object
var pawn = new player(0,0,0,0,0)

var world = document.getElementById("world");

function update(){
	
	//count movement
	dx = Math.cos(pawn.ry * deg) * (PressRight - PressLeft) - Math.sin(pawn.ry * deg) * (PressForward - PressBack);
	dz = - Math.sin(pawn.ry * deg) * (PressRight - PressLeft) - Math.cos(pawn.ry * deg) * (PressForward - PressBack);
	dy = - PressUp;
	drx = MouseY;
	dry = - MouseX;
	
	MouseX = MouseY = 0;
	
	//add movement to the coordinates
	pawn.x = pawn.x + dx;
	pawn.y = pawn.y + dy;
	pawn.z = pawn.z + dz;
	if (lock) {
		pawn.rx = pawn.rx + drx;
		pawn.ry = pawn.ry + dry;
	}
	
	//change the coordinates of the world
	world.style.transform = "translateZ(600px)" + "rotateX(" + (-pawn.rx) + "deg)" + "rotateY(" + (-pawn.ry) + "deg)" + "translate3d(" + (-pawn.x) + "px," + (-pawn.y) + "px," + (-pawn.z) + "px)";
	
}

//generation of the world
function CreateNewWorld(){
	CreateSquares(map,"map");
}


function CreateSquares(squares,string){
	for (let i = 0; i < squares.length; i++){
		
		//create rectangles and styles
		let newElement = document.createElement("div");
		newElement.className = string + " square";
		newElement.id = string + i;
		newElement.style.width = squares[i][6] + "px";
		newElement.style.height = squares[i][7] + "px";
		newElement.style.background = squares[i][8];
		newElement.style.backgroundImage = "url(" + squares[i][8] + ")";
		newElement.style.backgroundRepeat = "repeat";
		
		//transformation of the rectangles
		newElement.style.transform = "translate3d(" + (600 - squares[i][6]/2 + squares[i][0]) + "px," + (400 - squares[i][7]/2 + squares[i][1]) + "px," + (squares[i][2]) + "px)" + 
			"rotateX(" + squares[i][3] + "deg)" + 
			"rotateY(" + squares[i][4] + "deg)" + 
			"rotateZ(" + squares[i][5] + "deg)";
		
		//add rectangles to the world
		world.append(newElement);
	}	
}