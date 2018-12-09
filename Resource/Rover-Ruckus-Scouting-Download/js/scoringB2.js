var landB2 = false;
var sampleB2 = false;
var claimB2 = false;
var parkB2 = false;

var partialB2 = false;
var fullyB2 = false;
var latchedB2 = false;

var landSB2 = 0;
var sampleSB2 = 0;
var claimSB2 = 0;
var parkSB2 = 0;

var depotB2 = 0;
var cargoB2 = 0;

function countTeleB2(object){
	var objectId = object.getAttribute("id");
	document.getElementById(objectId).className = "button-on-score"
	if(objectId == "depotB2+"){
		depotB2++;
		document.getElementById("depotB2Num").value = depotB2;
	}
	if(objectId == "depotB2-"){
		if(depotB2 > 0){
			depotB2--;
		}
		document.getElementById("depotB2Num").value = depotB2;
	}
	if(objectId == "cargoB2+"){
		cargoB2++;
		document.getElementById("cargoB2Num").value = cargoB2;
	}
	if(objectId == "cargoB2-"){
		if(cargoB2 > 0){
			cargoB2--;
		}
		document.getElementById("cargoB2Num").value = cargoB2;
	}
	var teleTotal = (depotB2 * 2) + (cargoB2 * 5);
	document.getElementById("teleScoreB2").innerHTML = teleTotal;
}

function chooseAutoB2(object){
	var objectId = object.getAttribute("id");
	if(objectId == "landingB2"){
	    if(!landB2){
	        document.getElementById(objectId).className = "button-on-score";
	        landB2 = true;
			landSB2 = 30;
	    }else{
	        document.getElementById(objectId).className = "button-off-score";
	        landB2 = false;
			landSB2 = 0;
	    }
	}
	if(objectId == "samplingB2"){
	    if(!sampleB2){
	        document.getElementById(objectId).className = "button-on-score";
	        sampleB2 = true;
			sampleSB2 = 25;
	    }else{
	        document.getElementById(objectId).className = "button-off-score";
	        sampleB2 = false;
			sampleSB2 = 0;
	    }
	}
	if(objectId == "claimingB2"){
	    if(!claimB2){
	        document.getElementById(objectId).className = "button-on-score";
	        claimB2 = true;
			claimSB2 = 15;
	    }else{
	        document.getElementById(objectId).className = "button-off-score";
	        claimB2 = false;
			claimSB2 = 0;
	    }
	}
	if(objectId == "parkingB2"){
	    if(!parkB2){
	        document.getElementById(objectId).className = "button-on-score";
	        parkB2 = true;
			parkSB2 = 10;
	    }else{
	        document.getElementById(objectId).className = "button-off-score";
	        parkB2 = false;
			parkSB2 = 0;
	    }
	}
	document.getElementById("autoScoreB2").innerHTML = (landSB2 + sampleSB2 + claimSB2 + parkSB2);
}


function chooseEndB2(object){
    var objectId = object.getAttribute("id");
	if(objectId == "partialB2"){
	    if(!partialB2){
	        partialB2 = true;
	        fullyB2 = false;
	        latchedB2 = false;
	    }else{
	        partialB2 = false;
	    }
	}
	if(objectId == "fullyB2"){
	    if(!fullyB2){
	        partialB2 = false;
	        fullyB2 = true;
	        latchedB2 = false;
	    }else{
	        fullyB2 = false;
	    }
	}
	if(objectId == "latchedB2"){
	    if(!latchedB2){
	        partialB2 = false;
	        fullyB2 = false;
	        latchedB2 = true;
	    }else{
	        latchedB2 = false;
	    }
	}
	if(!partialB2 && !fullyB2 && !latchedB2){
		document.getElementById("endScoreB2").innerHTML = 0;
	}
	if(!partialB2){
	    document.getElementById("partialB2").className = "button-off-score";
	}else{
	    document.getElementById("partialB2").className = "button-on-score";
		document.getElementById("endScoreB2").innerHTML = 15;
	}
	if(!fullyB2){
	    document.getElementById("fullyB2").className = "button-off-score";
	}else{
	    document.getElementById("fullyB2").className = "button-on-score";
		document.getElementById("endScoreB2").innerHTML = 25;	
	}
	if(!latchedB2){
	    document.getElementById("latchedB2").className = "button-off-score";
	}else{
	    document.getElementById("latchedB2").className = "button-on-score";
		document.getElementById("endScoreB2").innerHTML = 50;	
	}
}

function updateTeleB2(){
	var depotNum = document.getElementById("depotB2Num").value;
	var cargoNum = document.getElementById("cargoB2Num").value;
	depotB2 = depotNum;
	cargoB2 = cargoNum;
	var teleTotal = (depotB2 * 2) + (cargoB2 * 5);
	document.getElementById("teleScoreB2").innerHTML = teleTotal;
}

function colorBack(object){
	var objectId = object.getAttribute("id");
	document.getElementById(objectId).className = "button-off-score";
}