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
var teamR1 = '0';
var teamR2 = '0';
var teamB1 = '0';
var teamB2 = '0';

var teams=[];
var totalScores=[];
var autoScores=[];
var teleScores=[];
var endScores=[];

function updateTotalR1(){
	teamR1 = document.getElementById("teamNameR1").value;
	autoR1 = document.getElementById("autoScoreR1").innerHTML;
	teleR1 = document.getElementById("teleScoreR1").innerHTML;
	endR1 = document.getElementById("endScoreR1").innerHTML;
	totalR1 = (+autoR1 + +teleR1 + +endR1);
	document.getElementById("totalScoreR1").innerHTML = totalR1;
}

function updateTotalR2(){
	teamR2 = document.getElementById("teamNameR2").value;
	autoR2 = document.getElementById("autoScoreR2").innerHTML;
	teleR2 = document.getElementById("teleScoreR2").innerHTML;
	endR2 = document.getElementById("endScoreR2").innerHTML;
	totalR2 = (+autoR2 + +teleR2 + +endR2);
	document.getElementById("totalScoreR2").innerHTML = totalR2;
}

function updateTotalB1(){
	teamB1 = document.getElementById("teamNameB1").value;
	autoB1 = document.getElementById("autoScoreB1").innerHTML;
	teleB1 = document.getElementById("teleScoreB1").innerHTML;
	endB1 = document.getElementById("endScoreB1").innerHTML;
	totalB1 = (+autoB1 + +teleB1 + +endB1);
	document.getElementById("totalScoreB1").innerHTML = totalB1;
}

function updateTotalB2(){
	teamB2 = document.getElementById("teamNameB2").value;
	autoB2 = document.getElementById("autoScoreB2").innerHTML;
	teleB2 = document.getElementById("teleScoreB2").innerHTML;
	endB2 = document.getElementById("endScoreB2").innerHTML;
	totalB2 = (+autoB2 + +teleB2 + +endB2);
	document.getElementById("totalScoreB2").innerHTML = totalB2;
}

function getPreviousDatas(){
	if (typeof(Storage) !== "undefined") {
		var tLength = localStorage.getItem("tableLength");
		for(var i=0; i<tLength; i++){
			teams[i] = localStorage.getItem("team" +i);
			totalScores[i] = localStorage.getItem("totalScore" +i);
			autoScores[i] = localStorage.getItem("autoScore" +i);
			teleScores[i] = localStorage.getItem("teleScore" +i);
			endScores[i] = localStorage.getItem("endScore" +i);
		}
		localStorage.setItem("tableLength",teams.length);
	} else {
		alert("Sorry, your browser does not support Web Storage...");
	}
}

function store() {
	var check = confirm("Submit?");
	if(check){
		teams[teams.length] = teamB1;
		teams[teams.length] = teamB2;
		teams[teams.length] = teamR1
		teams[teams.length] = teamR2;
		
		totalScores[totalScores.length] = totalB1;
		totalScores[totalScores.length] = totalB2;
		totalScores[totalScores.length] = totalR1;
		totalScores[totalScores.length] = totalR2;
		
		autoScores[autoScores.length] = autoB1;
		autoScores[autoScores.length] = autoB2;
		autoScores[autoScores.length] = autoR1;
		autoScores[autoScores.length] = autoR2;
		
		teleScores[teleScores.length] = teleB1;
		teleScores[teleScores.length] = teleB2;
		teleScores[teleScores.length] = teleR1;
		teleScores[teleScores.length] = teleR2;
		
		endScores[endScores.length] = endB1;
		endScores[endScores.length] = endB2;
		endScores[endScores.length] = endR1;
		endScores[endScores.length] = endR2;
		
		
		if (typeof(Storage) !== "undefined") {
			for(var i=0; i<autoScores.length; i++){
				localStorage.setItem("team" + i, teams[i]);
				localStorage.setItem("totalScore" + i, totalScores[i]);
				localStorage.setItem("autoScore" + i, autoScores[i]);
				localStorage.setItem("teleScore" + i, teleScores[i]);
				localStorage.setItem("endScore" + i, endScores[i]);
			}
			localStorage.setItem("tableLength",teams.length);
		} else {
			alert("Sorry, your browser does not support Web Storage...");
		}
	}
}