var land = false;
var sample = false;
var claim = false;
var park = false;

var partial = false;
var fully = false;
var latched = false;

var autoScores = [];
var teleOpScores = [];
var endGameScores = [];

function chooseAuto(object){
	var objectId = object.getAttribute("id");
	if(objectId == "landing"){
	    if(!land){
	        document.getElementById(objectId).className = "button-On";
	        land = true;
	    }else{
	        document.getElementById(objectId).className = "button-Off";
	        land = false;
	    }
	}
	if(objectId == "sampling"){
	    if(!sample){
	        document.getElementById(objectId).className = "button-On";
	        sample = true;
	    }else{
	        document.getElementById(objectId).className = "button-Off";
	        sample = false;
	    }
	}
	if(objectId == "claiming"){
	    if(!claim){
	        document.getElementById(objectId).className = "button-On";
	        claim = true;
	    }else{
	        document.getElementById(objectId).className = "button-Off";
	        claim = false;
	    }
	}
	if(objectId == "parking"){
	    if(!park){
	        document.getElementById(objectId).className = "button-On";
	        park = true;
	    }else{
	        document.getElementById(objectId).className = "button-Off";
	        park = false;
	    }
	}
}

function chooseEnd(object){
    var objectId = object.getAttribute("id");
	if(objectId == "partial"){
	    if(!partial){
	        partial = true;
	        fully = false;
	        latched = false;
	    }else{
	        partial = false;
	    }
	}
	if(objectId == "fully"){
	    if(!fully){
	        partial = false;
	        fully = true;
	        latched = false;
	    }else{
	        fully = false;
	    }
	}
	if(objectId == "latched"){
	    if(!latched){
	        partial = false;
	        fully = false;
	        latched = true;
	    }else{
	        latched = false;
	    }
	}
	if(!partial){
	    document.getElementById("partial").className = "button-Off";
	}else{
	    document.getElementById("partial").className = "button-On";
	}
	if(!fully){
	    document.getElementById("fully").className = "button-Off";
	}else{
	    document.getElementById("fully").className = "button-On";
	}
	if(!latched){
	    document.getElementById("latched").className = "button-Off";
	}else{
	    document.getElementById("latched").className = "button-On";
	}
	
}

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

//document.getElementById("demo").innerHTML = "autoScore " + 89;
	//var x = document.getElementById("scoreTable").rows.length
    //document.getElementById("scoreTable").deleteRow(x-1);

function clearData(){
    var button = document.getElementById("clear");
    button.style.backgroundColor = "lightblue";
    localStorage.clear();
    location.reload();
}

function colorBack(object){
    object.style.backgroundColor = '#4CAF50';
}
        
