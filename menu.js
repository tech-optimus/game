//create variables
var menu1 = document.getElementById("menu1");
var menu2 = document.getElementById("menu2");
var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");
var button3 = document.getElementById("button3");

//add the sounds
var clickSound = new Audio;
clickSound.src = "Sounds/click.mp3";

var coinSound = new Audio;
coinSound.src = "Sounds/coin.mp3";

var keySound = new Audio;
keySound.src = "Sounds/key.mp3";

//create navigation
button1.onclick = function(){
	
	//creation of the world and arrangement of the objects
	clickSound.play();
	menu1.style.display="none";
	CreateNewWorld();
	CreateSquares(coins,"coin");
	CreateSquares(keys,"key");
	
	//run the game
	TimerGame = setInterval(repeatFunction,10);
	canlock = true;
}

button2.onclick = function(){
	clickSound.play();
	menu1.style.display = "none";
	menu2.style.display = "block";
}

button3.onclick = function(){
	clickSound.play();
	menu1.style.display = "block";
	menu2.style.display = "none";
}

//function to check if there is interaction
function interact(objects,string,soundObject){
	for (i = 0; i < objects.length; i++){
		let r = (objects[i][0] - pawn.x)**2 + (objects[i][1]-pawn.y)**2 + (objects[i][2] - pawn.z)**2;
		let r1 = objects[i][7]**2;
		if (r < r1){
			soundObject.play();
			document.getElementById(string + i).style.display = "none";
			document.getElementById(string + i).style.transform = "reanslate3d(1000000px,1000000px,1000000px)";
		}
	}
}

//rotation of the objects
function rotate(objects,string,wy){
	for (i = 0; i < objects.length; i++){
		objects[i][4] = objects[i][4] + wy;
		document.getElementById(string + i).style.transform = "translate3d(" + (600 - objects[i][6]/2 + objects[i][0]) + "px," + (400 - objects[i][7]/2 + objects[i][1]) + "px," + (objects[i][2]) + "px)" +
			"rotateX(" + objects[i][3] + "deg)" + 
			"rotateY(" + objects[i][4] + "deg)" + 
			"rotateZ(" + objects[i][5] + "deg)";
	}
}

//function that repeats during the game
function repeatFunction(){
	update();
	interact(coins,"coin",coinSound);
	interact(keys,"key",keySound);
	rotate(coins,"coin",0.5);
	rotate(keys,"key",0.5);
}

