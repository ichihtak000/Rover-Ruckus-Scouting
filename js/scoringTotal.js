function updateTotalR1(){
	var auto = document.getElementById("autoScoreR1").innerHTML;
	var end = document.getElementById("endScoreR1").innerHTML;
	document.getElementById("totalScoreR1").innerHTML = +auto + +end;
}

function updateTotalR2(){
	var auto = document.getElementById("autoScoreR2").innerHTML;
	var end = document.getElementById("endScoreR2").innerHTML;
	document.getElementById("totalScoreR2").innerHTML = +auto + +end;
}

function updateTotalB1(){
	var auto = document.getElementById("autoScoreB1").innerHTML;
	var end = document.getElementById("endScoreB1").innerHTML;
	document.getElementById("totalScoreB1").innerHTML = +auto + +end;
}

function updateTotalB2(){
	var auto = document.getElementById("autoScoreB2").innerHTML;
	var end = document.getElementById("endScoreB2").innerHTML;
	document.getElementById("totalScoreB2").innerHTML = +auto + +end;
}