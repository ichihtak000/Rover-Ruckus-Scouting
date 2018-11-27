var landR2 = false;
var sampleR2 = false;
var claimR2 = false;
var parkR2 = false;

var partial = false;
var fully = false;
var latched = false;

var landSR2 = 0;
var sampleSR2 = 0;
var claimSR2 = 0;
var parkSR2 = 0;

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


function chooseEndR2(object){
    var objectId = object.getAttribute("id");
	if(objectId == "partialR2"){
	    if(!partial){
	        partial = true;
	        fully = false;
	        latched = false;
	    }else{
	        partial = false;
	    }
	}
	if(objectId == "fullyR2"){
	    if(!fully){
	        partial = false;
	        fully = true;
	        latched = false;
	    }else{
	        fully = false;
	    }
	}
	if(objectId == "latchedR2"){
	    if(!latched){
	        partial = false;
	        fully = false;
	        latched = true;
	    }else{
	        latched = false;
	    }
	}
	if(!partial){
	    document.getElementById("partialR2").className = "button-off-score";
	}else{
	    document.getElementById("partialR2").className = "button-on-score";
		document.getElementById("endScoreR2").innerHTML = 15;
	}
	if(!fully){
	    document.getElementById("fullyR2").className = "button-off-score";
	}else{
	    document.getElementById("fullyR2").className = "button-on-score";
		document.getElementById("endScoreR2").innerHTML = 25;	
	}
	if(!latched){
	    document.getElementById("latchedR2").className = "button-off-score";
	}else{
	    document.getElementById("latchedR2").className = "button-on-score";
		document.getElementById("endScoreR2").innerHTML = 50;	
	}
}