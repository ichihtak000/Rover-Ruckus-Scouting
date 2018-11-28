var landB1 = false;
var sampleB1 = false;
var claimB1 = false;
var parkB1 = false;

var partialB1 = false;
var fullyB1 = false;
var latchedB1 = false;

var landSB1 = 0;
var sampleSB1 = 0;
var claimSB1 = 0;
var parkSB1 = 0;

var depotB1 = 0;
var cargoB1 = 0;

function chooseAutoB1(object){
	var objectId = object.getAttribute("id");
	if(objectId == "landingB1"){
	    if(!landB1){
	        document.getElementById(objectId).className = "button-on-score";
	        landB1 = true;
			landSB1 = 30;
	    }else{
	        document.getElementById(objectId).className = "button-off-score";
	        landB1 = false;
			landSB1 = 0;
	    }
	}
	if(objectId == "samplingB1"){
	    if(!sampleB1){
	        document.getElementById(objectId).className = "button-on-score";
	        sampleB1 = true;
			sampleSB1 = 25;
	    }else{
	        document.getElementById(objectId).className = "button-off-score";
	        sampleB1 = false;
			sampleSB1 = 0;
	    }
	}
	if(objectId == "claimingB1"){
	    if(!claimB1){
	        document.getElementById(objectId).className = "button-on-score";
	        claimB1 = true;
			claimSB1 = 15;
	    }else{
	        document.getElementById(objectId).className = "button-off-score";
	        claimB1 = false;
			claimSB1 = 0;
	    }
	}
	if(objectId == "parkingB1"){
	    if(!parkB1){
	        document.getElementById(objectId).className = "button-on-score";
	        parkB1 = true;
			parkSB1 = 10;
	    }else{
	        document.getElementById(objectId).className = "button-off-score";
	        parkB1 = false;
			parkSB1 = 0;
	    }
	}
	document.getElementById("autoScoreB1").innerHTML = (landSB1 + sampleSB1 + claimSB1 + parkSB1);
}

function countTeleB1(object){
	var objectId = object.getAttribute("id");
	document.getElementById(objectId).className = "button-on-score"
	if(objectId == "depotB1+"){
		depotB1++;
		document.getElementById("depotB1Num").value = depotB1;
	}
	if(objectId == "depotB1-"){
		if(depotB1 > 0){
			depotB1--;
		}
		document.getElementById("depotB1Num").value = depotB1;
	}
	if(objectId == "cargoB1+"){
		cargoB1++;
		document.getElementById("cargoB1Num").value = cargoB1;
	}
	if(objectId == "cargoB1-"){
		if(cargoB1 > 0){
			cargoB1--;
		}
		document.getElementById("cargoB1Num").value = cargoB1;
	}
	var teleTotal = (depotB1 * 2) + (cargoB1 * 5);
	document.getElementById("teleScoreB1").innerHTML = teleTotal;
}

function chooseEndB1(object){
    var objectId = object.getAttribute("id");
	if(objectId == "partialB1"){
	    if(!partialB1){
	        partialB1 = true;
	        fullyB1 = false;
	        latchedB1 = false;
	    }else{
	        partialB1 = false;
	    }
	}
	if(objectId == "fullyB1"){
	    if(!fullyB1){
	        partialB1 = false;
	        fullyB1 = true;
	        latchedB1 = false;
	    }else{
	        fullyB1 = false;
	    }
	}
	if(objectId == "latchedB1"){
	    if(!latchedB1){
	        partialB1 = false;
	        fullyB1 = false;
	        latchedB1 = true;
	    }else{
	        latchedB1 = false;
	    }
	}
	if(!partialB1){
	    document.getElementById("partialB1").className = "button-off-score";
	}else{
	    document.getElementById("partialB1").className = "button-on-score";
		document.getElementById("endScoreB1").innerHTML = 15;
	}
	if(!fullyB1){
	    document.getElementById("fullyB1").className = "button-off-score";
	}else{
	    document.getElementById("fullyB1").className = "button-on-score";
		document.getElementById("endScoreB1").innerHTML = 25;	
	}
	if(!latchedB1){
	    document.getElementById("latchedB1").className = "button-off-score";
	}else{
	    document.getElementById("latchedB1").className = "button-on-score";
		document.getElementById("endScoreB1").innerHTML = 50;	
	}
}

function updateTeleB1(){
	var depotNum = document.getElementById("depotB1Num").value;
	var cargoNum = document.getElementById("cargoB1Num").value;
	depotB1 = depotNum;
	cargoB1 = cargoNum;
	var teleTotal = (depotB1 * 2) + (cargoB1 * 5);
	document.getElementById("teleScoreB1").innerHTML = teleTotal;
}

function colorBack(object){
	var objectId = object.getAttribute("id");
	document.getElementById(objectId).className = "button-off-score";
}