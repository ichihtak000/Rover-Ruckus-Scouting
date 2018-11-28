var landR1 = false;
var sampleR1 = false;
var claimR1 = false;
var parkR1 = false;

var partialR1 = false;
var fullyR1 = false;
var latchedR1 = false;

var landSR1 = 0;
var sampleSR1 = 0;
var claimSR1 = 0;
var parkSR1 = 0;

var depotR1 = 0;
var cargoR1 = 0;

function chooseAutoR1(object){
	var objectId = object.getAttribute("id");
	if(objectId == "landingR1"){
	    if(!landR1){
	        document.getElementById(objectId).className = "button-on-score";
	        landR1 = true;
			landSR1 = 30;
	    }else{
	        document.getElementById(objectId).className = "button-off-score";
	        landR1 = false;
			landSR1 = 0;
	    }
	}
	if(objectId == "samplingR1"){
	    if(!sampleR1){
	        document.getElementById(objectId).className = "button-on-score";
	        sampleR1 = true;
			sampleSR1 = 25;
	    }else{
	        document.getElementById(objectId).className = "button-off-score";
	        sampleR1 = false;
			sampleSR1 = 0;
	    }
	}
	if(objectId == "claimingR1"){
	    if(!claimR1){
	        document.getElementById(objectId).className = "button-on-score";
	        claimR1 = true;
			claimSR1 = 15;
	    }else{
	        document.getElementById(objectId).className = "button-off-score";
	        claimR1 = false;
			claimSR1 = 0;
	    }
	}
	if(objectId == "parkingR1"){
	    if(!parkR1){
	        document.getElementById(objectId).className = "button-on-score";
	        parkR1 = true;
			parkSR1 = 10;
	    }else{
	        document.getElementById(objectId).className = "button-off-score";
	        parkR1 = false;
			parkSR1 = 0;
	    }
	}
	document.getElementById("autoScoreR1").innerHTML = (landSR1 + sampleSR1 + claimSR1 + parkSR1);
}

function countTeleR1(object){
	var objectId = object.getAttribute("id");
	document.getElementById(objectId).className = "button-on-score"
	if(objectId == "depotR1+"){
		depotR1++;
		document.getElementById("depotR1Num").value = depotR1;
	}
	if(objectId == "depotR1-"){
		if(depotR1 > 0){
			depotR1--;
		}
		document.getElementById("depotR1Num").value = depotR1;
	}
	if(objectId == "cargoR1+"){
		cargoR1++;
		document.getElementById("cargoR1Num").value = cargoR1;
	}
	if(objectId == "cargoR1-"){
		if(cargoR1 > 0){
			cargoR1--;
		}
		document.getElementById("cargoR1Num").value = cargoR1;
	}
	var teleTotal = (depotR1 * 2) + (cargoR1 * 5);
	document.getElementById("teleScoreR1").innerHTML = teleTotal;
}

function chooseEndR1(object){
    var objectId = object.getAttribute("id");
	if(objectId == "partialR1"){
	    if(!partialR1){
	        partialR1 = true;
	        fullyR1 = false;
	        latchedR1 = false;
	    }else{
	        partialR1 = false;
	    }
	}
	if(objectId == "fullyR1"){
	    if(!fullyR1){
	        partialR1 = false;
	        fullyR1 = true;
	        latchedR1 = false;
	    }else{
	        fullyR1 = false;
	    }
	}
	if(objectId == "latchedR1"){
	    if(!latchedR1){
	        partialR1 = false;
	        fullyR1 = false;
	        latchedR1 = true;
	    }else{
	        latchedR1 = false;
	    }
	}
	if(!partialR1){
	    document.getElementById("partialR1").className = "button-off-score";
	}else{
	    document.getElementById("partialR1").className = "button-on-score";
		document.getElementById("endScoreR1").innerHTML = 15;
	}
	if(!fullyR1){
	    document.getElementById("fullyR1").className = "button-off-score";
	}else{
	    document.getElementById("fullyR1").className = "button-on-score";
		document.getElementById("endScoreR1").innerHTML = 25;	
	}
	if(!latchedR1){
	    document.getElementById("latchedR1").className = "button-off-score";
	}else{
	    document.getElementById("latchedR1").className = "button-on-score";
		document.getElementById("endScoreR1").innerHTML = 50;	
	}
}

function updateTeleR1(){
	var depotNum = document.getElementById("depotR1Num").value;
	var cargoNum = document.getElementById("cargoR1Num").value;
	depotR1 = depotNum;
	cargoR1 = cargoNum;
	var teleTotal = (depotR1 * 2) + (cargoR1 * 5);
	document.getElementById("teleScoreR1").innerHTML = teleTotal;
}

function colorBack(object){
	var objectId = object.getAttribute("id");
	document.getElementById(objectId).className = "button-off-score";
}
/*
function addTable(){
    var button = document.getElementById("submit");
    button.style.backgroundColor = "lightblue";
    addAutoTable();
    addEndTable();
    var scoreLength = document.getElementById("scoreTable").rows.length -1;
    localStorage.setItem("rowNum",scoreLength);
}

function addAutoTable() {
    var table = document.getElementById("scoreTable");
    var tableLength = table.rows.length;
    var row = table.insertRow(tableLength);
    var row1 = row.insertCell(0);
    var row2 = row.insertCell(1);
    
    var landScore = 0;
    var sampleScore = 0;
    var claimScore = 0;
    var parkScore = 0;
    var score = 0;
    if(land){
        landScore = 30;
    }
    if(sample){
        sampleScore = 25;
    }
    if(claim){
        claimScore = 15;
    }
    if(park){
        parkScore = 10;
    }
    score = landScore + sampleScore + claimScore + parkScore;
    
    row2.innerHTML = score;
    autoScores[tableLength] = score;
    
    if (typeof(Storage) !== "undefined") {
		for(var i=1; i<autoScores.length; i++){
            localStorage.setItem("autoScore" + i, autoScores[i]);
        }
	} else {
		document.getElementById("demo").innerHTML = "Sorry, your browser does not support Web Storage...";
	}
}

function addEndTable() {
    var table = document.getElementById("scoreTable");
    var tableLength = (table.rows.length)-1;
    var row = table.rows[tableLength]
    var row3 = row.insertCell(2);
    var row4 = row.insertCell(3);
    
    var score = 0;
    if(partial){
        score = 15;
    }else if(fully){
        score = 25;
    }else if(latched){
        score = 50;
    }
    row3.innerHTML = 0;
    row4.innerHTML = score;
    endGameScores[tableLength] = score;
    document.getElementById("demo").innerHTML = score;
    if (typeof(Storage) !== "undefined") {
		for(var i=1; i<endGameScores.length; i++){
            localStorage.setItem("endGame" + i, endGameScores[i]);
        }
	} else {
		document.getElementById("demo").innerHTML = "Sorry, your browser does not support Web Storage...";
	}
}



function colorBack(object){
    object.style.backgroundColor = '#4CAF50';
}
        
*/