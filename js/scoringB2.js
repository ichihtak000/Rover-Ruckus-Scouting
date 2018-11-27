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
	    if(!partial){
	        partial = true;
	        fully = false;
	        latched = false;
	    }else{
	        partial = false;
	    }
	}
	if(objectId == "fullyB2"){
	    if(!fully){
	        partial = false;
	        fully = true;
	        latched = false;
	    }else{
	        fully = false;
	    }
	}
	if(objectId == "latchedB2"){
	    if(!latched){
	        partial = false;
	        fully = false;
	        latched = true;
	    }else{
	        latched = false;
	    }
	}
	if(!partial){
	    document.getElementById("partialB2").className = "button-off-score";
	}else{
	    document.getElementById("partialB2").className = "button-on-score";
		document.getElementById("endScoreB2").innerHTML = 15;
	}
	if(!fully){
	    document.getElementById("fullyB2").className = "button-off-score";
	}else{
	    document.getElementById("fullyB2").className = "button-on-score";
		document.getElementById("endScoreB2").innerHTML = 25;	
	}
	if(!latched){
	    document.getElementById("latchedB2").className = "button-off-score";
	}else{
	    document.getElementById("latchedB2").className = "button-on-score";
		document.getElementById("endScoreB2").innerHTML = 50;	
	}
}