var numenemy = 9;
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


function load_images(){
	virus_image = new Image;
	virus_image.src = "Assets/v1.png";

	player_img = new Image;
	player_img.src = "Assets/superhero.png";

	gem_image = new Image;
	gem_image.src = "Assets/gemm.png";

}

function init(){

	canvas = document.getElementById("mycanvas");
	console.log(canvas);

	//Change the height and width of the canvas using Javascript
	W = 1330
	H = 455
	canvas.width = W
	canvas.height = H


	// try to work with canvas
	pen = canvas.getContext('2d');
	console.log(pen);

	score = 0;
	game_over = false;


	e1 = {
		x : 100,
		y : 50,
		w : 40,
		h : 40,
		speed : 20,
	};
	e2 = {
		x : 225,
		y : 150,
		w : 40,
		h : 40,
		speed : 30,
	};
	e3 = {
		x : 350,
		y : 100,
		w : 40,
		h : 40,
		speed : 40,
	};
	e4 = {
		x : 475,
		y : 400,
		w : 40,
		h : 40,
		speed : 50,
	};
	e5 = {
		x : 600,
		y : 270,
		w : 40,
		h : 40,
		speed : 60,
	};
	e6 = {
		x : 725,
		y : 170,
		w : 40,
		h : 40,
		speed : 70,
	};
	e7 = {
		x : 850,
		y : 400,
		w :  40,
		h : 40,
		speed : 73,
	};
	e8 = {
		x : 975,
		y : 177,
		w : 40,
		h : 40,
		speed : 77,
	};
	e9 = {
		x : 1100,
		y : 75,
		w : 40,
		h : 40,
		speed : 80,
	};
	enemy = [e1,e2,e3,e4,e5,e6,e7,e8,e9];

	player = {
		x : 20,
		y : H/2,
		w : 45,
		h : 45,
		speed : 20,
		moving : "false",
	}
	gem = {
		x : W-100,
		y : H/2,
		w : 45,
		h : 45,
	}
	

	document.getElementById("myBtn").addEventListener("mouseover", function(){
		console.log("You pressed the mouse");
		player.moving = true;
	});
  
    document.getElementById("myBtn").addEventListener("mouseout", function(){
		console.log("You released the mouse");
		player.moving = false;
	});

    //rightArrowPressed();

}

/*function rightArrowPressed() {
    var element = document.getElementById("right");
    player_img.style.left = parseInt(player_img.style.left) + 5 + 'px';

}

function moveSelection(evt) {
    switch (evt.keyCode) {
         case 39:
         rightArrowPressed();
         break;
       }
};

function docReady(){
          
    window.addEventListener('keydown', moveSelection);
}*/


function setupModeButtons(){
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function()
		{
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			modeButtons[2].classList.remove("selected");
			this.classList.add("selected");

			if(this.textContent === "Easy")
			{
				numenemy=7;
			}
			else if(this.textContent === "medium")
			{
				numenemy=8;
			
			}                             
			else
			{
				numenemy=9;
			}
			reset();
		});
	}
	return numenemy;
}

function draw(){

	//Clear the old screen (entire area)
	pen.clearRect(0,0,W,H);

	//Draw this bird on the screen
	pen.fillStyle = "red";
	//pen.fillRect(bird.x,bird.y,bird.w,bird.h);

	pen.drawImage(player_img,player.x,player.y,player.w,player.h);
	pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);

    numenemy = setupModeButtons();
	for(let i=0;i<numenemy;i++){
		pen.drawImage(virus_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
	}
	pen.fillStyle = "black";
	pen.font = "30px Verdana";
	pen.fillText("Health Score: " + score,25,25);
}

function isColliding(b1,b2){
	//x,y,w,h
	if(Math.abs(b1.x - b2.x)<=30 && Math.abs(b1.y-b2.y)<=30){
		return true;
	}
	return false;
}

function update(){

	//player state
	if(player.moving==true){
		player.x += player.speed;
		score += 10;
	}
	//check collision btw corona virus enemy and player
	for(let i=0;i<enemy.length;i++){
		if(isColliding(enemy[i],player)){
			score -= 100;
			if(score<0){
				game_over = true;
				//alert("Game Over");                 // game over 1 pop up in center with animations
				functionAlert();
			}

		}
	}

	//collision gem and player
	if(isColliding(gem,player)){
		game_over = true;
		draw();
		//alert("You score" +score);               pop up in center with animations
		functionAlert();
		//break the game loop
	}

	for(let i=0;i<enemy.length;i++){
		enemy[i].y += enemy[i].speed;
		if(enemy[i].y >H - enemy[i].h || enemy[i].y<0 ){
			enemy[i].speed *= -1;
		}
	}
	
}
function reset(){
  reload();
}

resetButton.addEventListener("click", function(){
	//reset();
	reload();
})

 function functionAlert(msg, myYes) {
	    
	 var confirmBox = $("#confirm");
	 confirmBox.find(".message").text(msg);
	 confirmBox.find(".yes").unbind().click(function() {
			 confirmBox.hide();
	 });
	 confirmBox.find(".yes").click(myYes);
	 confirmBox.show();
 }

  function funAlert(msg, myYes) {
	    
	 var confirmBox = $("#instruct");
	 confirmBox.find(".message").text(msg);
	 confirmBox.find(".rules").unbind().click(function() {
			 confirmBox.hide();
	 });
	 confirmBox.find(".rules").click(myYes);
	 confirmBox.show();
 }

function gameloop(){
	if(game_over==true){
		clearInterval(f);
	}
	draw();
	update();
}

//start of the game
load_images();
init();

//repeated call gameloop
var f = setInterval(gameloop,100);


