(function(){

function VideoPlayer(){

	if (document.querySelector("video").canPlayType){
		document.querySelector(".controls").style.display = "block";
	}

	this.video = document.querySelector("video");
	this.controls = document.querySelector(".controls");
	this.playPause = document.querySelector(".playPause");
	this.timeBar = document.querySelector("#timeBar");

	this.currentTime = document.querySelector(".currentTime");
	this.totalTime = document.querySelector(".totalTime");
	this.volumeBar = document.querySelector("#volumeBar");

	this.video.volume = 0.25;

	this.assignEventListeners();

	console.log(this.video.volume);
};

VideoPlayer.prototype.assignEventListeners = function(){

	this.playPause.onclick = this.play.bind(this);
	
	this.video.addEventListener("timeupdate", this.updatePlayingProgress.bind(this), false);
	
	this.video.addEventListener("timeupdate", this.updateCurrentTime.bind(this), false);
	this.video.ondurationchange = this.setDuration.bind(this);
	this.video.onended = this.endPlaying.bind(this);

	this.timeBar.onclick = this.changeCurrentTime.bind(this);

	this.volumeBar.onclick = this.changeVolume.bind(this);

};
VideoPlayer.prototype.play = function(e){
	if (this.video.paused){

		this.video.play();
		e.target.classList.remove("glyphicon-play");
		e.target.classList.add("glyphicon-pause");
	}else{

		this.video.pause();
		e.target.classList.remove("glyphicon-pause");
		e.target.classList.add("glyphicon-play");
	}
}

VideoPlayer.prototype.updatePlayingProgress = function(){
	
	var parcentPlayed = (this.video.currentTime/this.video.duration) * 100,
		maxValue = 100;

	//console.log('value1 = ' + this.timeBar.getAttribute("value"));	
	

	this.timeBar.setAttribute("max", maxValue);
	
	this.timeBar.value = parcentPlayed.toFixed(2);
	
	//console.log('value = ' + this.timeBar.getAttribute("value"));
}

VideoPlayer.prototype.createtimeLine = function(time){

	var time = Math.round(time),
        minutes = Math.floor(time / 60),
        seconds = time - minutes * 60,
        mainTime = "";

    if (seconds < 10){
    	mainTime = minutes + " : 0" + seconds;
	}else{
		mainTime = minutes + " : " + seconds;
	}

	return mainTime;
}
VideoPlayer.prototype.updateCurrentTime = function(){
	this.currentTime.innerHTML = this.createtimeLine(this.video.currentTime);
}
VideoPlayer.prototype.setDuration = function(){
	this.totalTime.innerHTML = this.createtimeLine(this.video.duration);
}
VideoPlayer.prototype.endPlaying = function(){
	this.playPause.classList.remove("glyphicon-pause");
	this.playPause.classList.add("glyphicon-play");
	this.timeBar.value = 0;
	this.video.currentTime = 0;
}
VideoPlayer.prototype.changeCurrentTime = function(e){
	var timeBarValue = this.timeBar.value,
		secondsValue = Math.round(( timeBarValue/100 ) * this.video.duration);

	this.timeBar.setAttribute("max", 100);
	this.video.currentTime = secondsValue;
	this.video.play();
	this.playPause.classList.remove("glyphicon-play");
	this.playPause.classList.add("glyphicon-pause");

}
VideoPlayer.prototype.changeVolume = function(){
	var volumeBarValue = this.volumeBar.value;

	this.video.volume = volumeBarValue/100;

	console.log(this.video.volume);
}
var VideoPlayer1 = new VideoPlayer();

})();