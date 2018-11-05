var background = document.getElementById("background");
var moveImage1 = document.getElementById("head-div");
var moveImage2 = document.getElementById("tail-div");

var birdImage = document.getElementById("bird");

var topBarrier = document.getElementById("top-barrier");
var bottomBarrier = document.getElementById("bottom-barrier");

var topBarrier2 = document.getElementById("top-barrier2");
var bottomBarrier2 = document.getElementById("bottom-barrier2");

var barrierTopArray = topBarrier.getElementsByTagName("li");
var barrierBottomArray = bottomBarrier.getElementsByTagName("li");

var barrierTopArray2 = topBarrier2.getElementsByTagName("li");
var barrierBottomArray2 = bottomBarrier2.getElementsByTagName("li");
var bird = document.getElementById("bird-image");


var backgroundImg=document.getElementsByClassName("bk-img");

var playButton=document.getElementById("play-button");

var replayButton=document.getElementById("replay-div");

var title=document.getElementById("title-div");

var gameoverTitle=document.getElementById("gameover-div");


replayButton.onclick=function(){
	
	location.reload();
}

playButton.onclick=function(){
	clearInterval(barrierInfo.time3);
	playMenu();
	playGame();
	isAlive();
	birdInfo.playState=1;	
}

function playMenu(){
	replayButton.style.display="none";
	playButton.style.display="none";
	title.style.display="none";
}

function gameoverMenu(){
	
	clearInterval(barrierInfo.time3);	
	gameoverTitle.style.display="block";

	replayButton.style.display="block";
	
}


var birdInfo = {
	height: 350,
	gSpeed: 3.5 * 9.8,
	upSpeed: 5 * 9.8,
	state:0,
	score:0,
	playState:0,

};

var barrierInfo = {
	sPosition: 0,
	ePosition: 400,
	speed: 4,
	totalHeight: 700,
	intervalHeight: 80,
	time1: null,
	time2: null,
	time3: null,
	randomTopHeight: 0,
	bottomHeight: 0,
}



function isAlive(){
	
	setInterval(function() {

	for(var i = 0; i < barrierTopArray.length; i++) {

		if(Math.abs(barrierTopArray[i].getBoundingClientRect().left - birdImage.getBoundingClientRect().left) <= 50) {

			var limitTop = barrierTopArray[i].getBoundingClientRect().bottom;
			console.log(limitTop);
			var limitBottom = limitTop + 80;

			/* */
			if((bird.getBoundingClientRect().bottom >= limitBottom+birdInfo.gSpeed/2 || bird.getBoundingClientRect().top<=limitTop-birdInfo.upSpeed/2) && limitTop!==8) {
		
				gameoverMenu();			
			}
		} 
		
		if(Math.abs(barrierTopArray2[i].getBoundingClientRect().left - birdImage.getBoundingClientRect().left) <= 50) {

			var limitTop = barrierTopArray2[i].getBoundingClientRect().bottom;
			console.log(limitTop);
			var limitBottom = limitTop + 80;

			/* */
			if((bird.getBoundingClientRect().bottom >= limitBottom+birdInfo.gSpeed/2 || bird.getBoundingClientRect().top<=limitTop-birdInfo.upSpeed/2) && limitTop!==8) {
				gameoverMenu();			
			}
		} 
			
	}
}, 80);
}


setInterval(function() {
	if(birdInfo.state==0) {
		bird.src="img/bird0_0.png";
		birdInfo.state++;
	}
	else if(birdInfo.state==1) {
		bird.src = "img/bird0_2.png";
		birdInfo.state++;	
	}
	else if(birdInfo.state==2) {
		bird.src = "img/bird0_0.png";
		birdInfo.state=0;
	}
}, 200)




function changebarHeight(n) {
	
	for(var i = 0; i < barrierTopArray.length; i++) {
		barrierInfo.randomTopHeight = Math.random() * 80 + 250;
		barrierInfo.bottomHeight = barrierInfo.totalHeight - barrierInfo.randomTopHeight - barrierInfo.intervalHeight;

		var strTop = "height:" + barrierInfo.randomTopHeight + "px";
		var strBottom = "height:" + barrierInfo.bottomHeight + "px";

		if(n == 1) {
			barrierTopArray[i].setAttribute('style', strTop);
			barrierBottomArray[barrierTopArray.length - i - 1].setAttribute('style', strBottom);
		} else {
			barrierTopArray2[i].setAttribute('style', strTop);
			barrierBottomArray2[barrierTopArray.length - i - 1].setAttribute('style', strBottom);
		}
	}
}




chooseScene();
function chooseScene(){
	var n=Math.round(Math.random());
	if(n==1){
		backgroundImg[0].setAttribute('src','img/bg_day.png');
		backgroundImg[1].setAttribute('src','img/bg_day.png');
	}
	else{
		backgroundImg[0].setAttribute('src','img/bg_night.png');
		backgroundImg[1].setAttribute('src','img/bg_night.png');
	}
}


playGame();
function playGame(){	
	barrierInfo.time3=setInterval(function() {

	if(moveImage1.style.left == "400px") {
		moveImage1.style.transitionDuration = "40ms";
	}

	if(moveImage2.style.left == "400px") {
		moveImage2.style.transitionDuration = "40ms";
	}

	barrierInfo.sPosition = barrierInfo.sPosition - barrierInfo.speed;
	barrierInfo.ePosition = barrierInfo.ePosition - barrierInfo.speed;

	moveImage1.style.left = barrierInfo.sPosition + "px";
	moveImage2.style.left = barrierInfo.ePosition + "px";

	if(barrierInfo.sPosition == 0) {
		barrierInfo.ePosition = 400;
		moveImage2.style.transitionDuration = "0s";
		moveImage2.style.left = barrierInfo.ePosition + "px";
		if(birdInfo.playState==1)
		{
			changebarHeight(2);
		}
	}

	if(barrierInfo.ePosition == 0) {
		barrierInfo.sPosition = 400;
		moveImage1.style.transitionDuration = "0s";
		moveImage1.style.left = barrierInfo.sPosition + "px";
		if(birdInfo.playState==1)
		{
			changebarHeight(1);
		}
	}
}, 40);
}


function play() {

	barrierInfo.time1 = setInterval(function() {

		birdInfo.height = birdInfo.height + birdInfo.gSpeed;

		birdImage.style.top = birdInfo.height + "px";

	}, 400);
}

background.addEventListener("click", function() {

	birdInfo.height = birdInfo.height - birdInfo.upSpeed;

	birdImage.style.top = birdInfo.height + "px";

	clearInterval(barrierInfo.time1);

	clearTimeout(barrierInfo.time2);

	barrierInfo.time2 = setTimeout(function() {
		play();
	}, 400);
})