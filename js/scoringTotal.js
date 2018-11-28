var autoR1 = "";
var autoR2;
var autoB1;
var autoB2;
var teleR1;
var teleR2;
var teleB1;
var teleB2;
var endR1;
var endR2;
var endB1;
var endB2;
var totalR1;
var totalR2;
var totalB1;
var totalB2;

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
   var getInput = prompt("Hey type something here: ");
   localStorage.setItem("storageName",getInput);
}