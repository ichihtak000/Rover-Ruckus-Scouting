function reload(){
	location.reload();
}

function clearAll(){
	confirm("Clear?");
	landR1 = false;
	sampleR1 = false;
	claimR1 = false;
	parkR1 = false;

	partialR1 = false;
	fullyR1 = false;
	latchedR1 = false;

	landSR1 = 0;
	sampleSR1 = 0;
	claimSR1 = 0;
	parkSR1 = 0;

	depotR1 = 0;
	cargoR1 = 0;
	
	document.getElementById("landingR1").className = "button-off-score";
	document.getElementById("samplingR1").className = "button-off-score";
	document.getElementById("claimingR1").className = "button-off-score";
	document.getElementById("parkingR1").className = "button-off-score";
	document.getElementById("autoScoreR1").innerHTML = 0;
	
	document.getElementById("depotR1+").className = "button-off-score";
	document.getElementById("depotR1-").className = "button-off-score";
	document.getElementById("cargoR1+").className = "button-off-score";
	document.getElementById("cargoR1-").className = "button-off-score";
	document.getElementById("depotR1Num").value = "";
	document.getElementById("cargoR1Num").value = "";
	document.getElementById("teleScoreR1").innerHTML = 0;
	
	document.getElementById("partialR1").className = "button-off-score";
	document.getElementById("fullyR1").className = "button-off-score";
	document.getElementById("latchedR1").className = "button-off-score";
	document.getElementById("endScoreR1").innerHTML = 0;
	updateTotalR1();
	
	landR2 = false;
	sampleR2 = false;
	claimR2 = false;
	parkR2 = false;

	partialR2 = false;
	fullyR2 = false;
	latchedR2 = false;

	landSR2 = 0;
	sampleSR2 = 0;
	claimSR2 = 0;
	parkSR2 = 0;

	depotR2 = 0;
	cargoR2 = 0;
	
	document.getElementById("landingR2").className = "button-off-score";
	document.getElementById("samplingR2").className = "button-off-score";
	document.getElementById("claimingR2").className = "button-off-score";
	document.getElementById("parkingR2").className = "button-off-score";
	document.getElementById("autoScoreR2").innerHTML = 0;
	
	document.getElementById("depotR2+").className = "button-off-score";
	document.getElementById("depotR2-").className = "button-off-score";
	document.getElementById("cargoR2+").className = "button-off-score";
	document.getElementById("cargoR2-").className = "button-off-score";
	document.getElementById("depotR2Num").value = "";
	document.getElementById("cargoR2Num").value = "";
	document.getElementById("teleScoreR2").innerHTML = 0;
	
	document.getElementById("partialR2").className = "button-off-score";
	document.getElementById("fullyR2").className = "button-off-score";
	document.getElementById("latchedR2").className = "button-off-score";
	document.getElementById("endScoreR2").innerHTML = 0;
	updateTotalR2();
	
	landB1 = false;
	sampleB1 = false;
	claimB1 = false;
	parkB1 = false;

	partialB1 = false;
	fullyB1 = false;
	latchedB1 = false;

	landSB1 = 0;
	sampleSB1 = 0;
	claimSB1 = 0;
	parkSB1 = 0;

	depotB1 = 0;
	cargoB1 = 0;
	
	document.getElementById("landingB1").className = "button-off-score";
	document.getElementById("samplingB1").className = "button-off-score";
	document.getElementById("claimingB1").className = "button-off-score";
	document.getElementById("parkingB1").className = "button-off-score";
	document.getElementById("autoScoreB1").innerHTML = 0;
	
	document.getElementById("depotB1+").className = "button-off-score";
	document.getElementById("depotB1-").className = "button-off-score";
	document.getElementById("cargoB1+").className = "button-off-score";
	document.getElementById("cargoB1-").className = "button-off-score";
	document.getElementById("depotB1Num").value = "";
	document.getElementById("cargoB1Num").value = "";
	document.getElementById("teleScoreB1").innerHTML = 0;
	
	document.getElementById("partialB1").className = "button-off-score";
	document.getElementById("fullyB1").className = "button-off-score";
	document.getElementById("latchedB1").className = "button-off-score";
	document.getElementById("endScoreB1").innerHTML = 0;
	updateTotalB1();
	
	landB2 = false;
	sampleB2 = false;
	claimB2 = false;
	parkB2 = false;

	partialB2 = false;
	fullyB2 = false;
	latchedB2 = false;

	landSB2 = 0;
	sampleSB2 = 0;
	claimSB2 = 0;
	parkSB2 = 0;

	depotB2 = 0;
	cargoB2 = 0;
	
	document.getElementById("landingB2").className = "button-off-score";
	document.getElementById("samplingB2").className = "button-off-score";
	document.getElementById("claimingB2").className = "button-off-score";
	document.getElementById("parkingB2").className = "button-off-score";
	document.getElementById("autoScoreB2").innerHTML = 0;
	
	document.getElementById("depotB2+").className = "button-off-score";
	document.getElementById("depotB2-").className = "button-off-score";
	document.getElementById("cargoB2+").className = "button-off-score";
	document.getElementById("cargoB2-").className = "button-off-score";
	document.getElementById("depotB2Num").value = "";
	document.getElementById("cargoB2Num").value = "";
	document.getElementById("teleScoreB2").innerHTML = 0;
	
	document.getElementById("partialB2").className = "button-off-score";
	document.getElementById("fullyB2").className = "button-off-score";
	document.getElementById("latchedB2").className = "button-off-score";
	document.getElementById("endScoreB2").innerHTML = 0;
	updateTotalB2();
}