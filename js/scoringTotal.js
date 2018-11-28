var autoR1 = 0;
var autoR2 = 0;
var autoB1 = 0;
var autoB2 = 0;
var teleR1 = 0;
var teleR2 = 0;
var teleB1 = 0;
var teleB2 = 0;
var endR1 = 0;
var endR2 = 0;
var endB1 = 0;
var endB2 = 0;
var totalR1 = 0;
var totalR2 = 0;
var totalB1 = 0;
var totalB2 = 0;

var autoScores=[];

function updateTotalR1(){
	autoR1 = document.getElementById("autoScoreR1").innerHTML;
	teleR1 = document.getElementById("teleScoreR1").innerHTML;
	endR1 = document.getElementById("endScoreR1").innerHTML;
	document.getElementById("totalScoreR1").innerHTML = (+autoR1 + +teleR1 + +endR1);
}

function updateTotalR2(){
	var auto = document.getElementById("autoScoreR2").innerHTML;
	var tele = document.getElementById("teleScoreR2").innerHTML;
	var end = document.getElementById("endScoreR2").innerHTML;
	document.getElementById("totalScoreR2").innerHTML = (+auto + +tele + +end);
}

function updateTotalB1(){
	var auto = document.getElementById("autoScoreB1").innerHTML;
	var tele = document.getElementById("teleScoreB1").innerHTML;
	var end = document.getElementById("endScoreB1").innerHTML;
	document.getElementById("totalScoreB1").innerHTML = (+auto + +tele + +end);
}

function updateTotalB2(){
	var auto = document.getElementById("autoScoreB2").innerHTML;
	var tele = document.getElementById("teleScoreB2").innerHTML;
	var end = document.getElementById("endScoreB2").innerHTML;
	document.getElementById("totalScoreB2").innerHTML = (+auto + +tele + +end);
}

function store() {
	alert("Submited");
	autoScores[autoScores.length] = autoR1;
	if (typeof(Storage) !== "undefined") {
		for(var i=1; i<autoScores.length; i++){
            localStorage.setItem("autoScore" + i, autoScores[i]);
        }
		localStorage.setItem("tableLength",autoScores.length);
	} else {
		alert("Sorry, your browser does not support Web Storage...");
	}
}