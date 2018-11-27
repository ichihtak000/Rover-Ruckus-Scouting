var land = false;
var sample = false;
var claim = false;
var park = false;

var partial = false;
var fully = false;
var latched = false;

var landS = 0;
var sampleS = 0;
var claimS = 0;
var parkS = 0;

function chooseAutoR1(object){
	var objectId = object.getAttribute("id");
	if(objectId == "landingR1"){
	    if(!land){
	        document.getElementById(objectId).className = "button-on-score";
	        land = true;
			landS = 30;
	    }else{
	        document.getElementById(objectId).className = "button-off-score";
	        land = false;
			landS = 0;
	    }
	}
	if(objectId == "samplingR1"){
	    if(!sample){
	        document.getElementById(objectId).className = "button-on-score";
	        sample = true;
			sampleS = 25;
	    }else{
	        document.getElementById(objectId).className = "button-off-score";
	        sample = false;
			sampleS = 0;
	    }
	}
	if(objectId == "claimingR1"){
	    if(!claim){
	        document.getElementById(objectId).className = "button-on-score";
	        claim = true;
			claimS = 15;
	    }else{
	        document.getElementById(objectId).className = "button-off-score";
	        claim = false;
			claimS = 0;
	    }
	}
	if(objectId == "parkingR1"){
	    if(!park){
	        document.getElementById(objectId).className = "button-on-score";
	        park = true;
			parkS = 10;
	    }else{
	        document.getElementById(objectId).className = "button-off-score";
	        park = false;
			parkS = 0;
	    }
	}
	document.getElementById("autoScoreR1").innerHTML = (landS + sampleS + claimS + parkS);
}


function chooseEndR1(object){
    var objectId = object.getAttribute("id");
	if(objectId == "partialR1"){
	    if(!partial){
	        partial = true;
	        fully = false;
	        latched = false;
	    }else{
	        partial = false;
	    }
	}
	if(objectId == "fullyR1"){
	    if(!fully){
	        partial = false;
	        fully = true;
	        latched = false;
	    }else{
	        fully = false;
	    }
	}
	if(objectId == "latchedR1"){
	    if(!latched){
	        partial = false;
	        fully = false;
	        latched = true;
	    }else{
	        latched = false;
	    }
	}
	if(!partial){
	    document.getElementById("partialR1").className = "button-off-score";
	}else{
	    document.getElementById("partialR1").className = "button-on-score";
		document.getElementById("endScoreR1").innerHTML = 15;
	}
	if(!fully){
	    document.getElementById("fullyR1").className = "button-off-score";
	}else{
	    document.getElementById("fullyR1").className = "button-on-score";
		document.getElementById("endScoreR1").innerHTML = 25;	
	}
	if(!latched){
	    document.getElementById("latchedR1").className = "button-off-score";
	}else{
	    document.getElementById("latchedR1").className = "button-on-score";
		document.getElementById("endScoreR1").innerHTML = 50;	
	}
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