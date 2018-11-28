var landR2 = false;
var sampleR2 = false;
var claimR2 = false;
var parkR2 = false;

var partialR2 = false;
var fullyR2 = false;
var latchedR2 = false;

var landSR2 = 0;
var sampleSR2 = 0;
var claimSR2 = 0;
var parkSR2 = 0;

var depotR2 = 0;
var cargoR2 = 0;

function chooseAutoR2(object){
	var objectId = object.getAttribute("id");
	if(objectId == "landingR2"){
	    if(!landR2){
	        document.getElementById(objectId).className = "button-on-score";
	        landR2 = true;
			landSR2 = 30;
	    }else{
	        document.getElementById(objectId).className = "button-off-score";
	        landR2 = false;
			landSR2 = 0;
	    }
	}
	if(objectId == "samplingR2"){
	    if(!sampleR2){
	        document.getElementById(objectId).className = "button-on-score";
	        sampleR2 = true;
			sampleSR2 = 25;
	    }else{
	        document.getElementById(objectId).className = "button-off-score";
	        sampleR2 = false;
			sampleSR2 = 0;
	    }
	}
	if(objectId == "claimingR2"){
	    if(!claimR2){
	        document.getElementById(objectId).className = "button-on-score";
	        claimR2 = true;
			claimSR2 = 15;
	    }else{
	        document.getElementById(objectId).className = "button-off-score";
	        claimR2 = false;
			claimSR2 = 0;
	    }
	}
	if(objectId == "parkingR2"){
	    if(!parkR2){
	        document.getElementById(objectId).className = "button-on-score";
	        parkR2 = true;
			parkSR2 = 10;
	    }else{
	        document.getElementById(objectId).className = "button-off-score";
	        parkR2 = false;
			parkSR2 = 0;
	    }
	}
	document.getElementById("autoScoreR2").innerHTML = (landSR2 + sampleSR2 + claimSR2 + parkSR2);
}

function countTeleR2(object){
	var objectId = object.getAttribute("id");
	document.getElementById(objectId).className = "button-on-score"
	if(objectId == "depotR2+"){
		depotR2++;
		document.getElementById("depotR2Num").value = depotR2;
	}
	if(objectId == "depotR2-"){
		if(depotR2 > 0){
			depotR2--;
		}
		document.getElementById("depotR2Num").value = depotR2;
	}
	if(objectId == "cargoR2+"){
		cargoR2++;
		document.getElementById("cargoR2Num").value = cargoR2;
	}
	if(objectId == "cargoR2-"){
		if(cargoR2 > 0){
			cargoR2--;
		}
		document.getElementById("cargoR2Num").value = cargoR2;
	}
	var teleTotal = (depotR2 * 2) + (cargoR2 * 5);
	document.getElementById("teleScoreR2").innerHTML = teleTotal;
}

function chooseEndR2(object){
    var objectId = object.getAttribute("id");
	if(objectId == "partialR2"){
	    if(!partialR2){
	        partialR2 = true;
	        fullyR2 = false;
	        latchedR2 = false;
	    }else{
	        partialR2 = false;
	    }
	}
	if(objectId == "fullyR2"){
	    if(!fullyR2){
	        partialR2 = false;
	        fullyR2 = true;
	        latchedR2 = false;
	    }else{
	        fullyR2 = false;
	    }
	}
	if(objectId == "latchedR2"){
	    if(!latchedR2){
	        partialR2 = false;
	        fullyR2 = false;
	        latchedR2 = true;
	    }else{
	        latchedR2 = false;
	    }
	}
	if(!partialR2){
	    document.getElementById("partialR2").className = "button-off-score";
	}else{
	    document.getElementById("partialR2").className = "button-on-score";
		document.getElementById("endScoreR2").innerHTML = 15;
	}
	if(!fullyR2){
	    document.getElementById("fullyR2").className = "button-off-score";
	}else{
	    document.getElementById("fullyR2").className = "button-on-score";
		document.getElementById("endScoreR2").innerHTML = 25;	
	}
	if(!latchedR2){
	    document.getElementById("latchedR2").className = "button-off-score";
	}else{
	    document.getElementById("latchedR2").className = "button-on-score";
		document.getElementById("endScoreR2").innerHTML = 50;	
	}
}

function updateTeleR2(){
	var depotNum = document.getElementById("depotR2Num").value;
	var cargoNum = document.getElementById("cargoR2Num").value;
	depotR2 = depotNum;
	cargoR2 = cargoNum;
	var teleTotal = (depotR2 * 2) + (cargoR2 * 5);
	document.getElementById("teleScoreR2").innerHTML = teleTotal;
}

function colorBack(object){
	var objectId = object.getAttribute("id");
	document.getElementById(objectId).className = "button-off-score";
}