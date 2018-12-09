/* Copyright (c) 2018 FIRST, Thomas Barnette, George Marchant, and Trey Woodlief. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted (subject to the limitations in the disclaimer below) provided that
 * the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list
 * of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice, this
 * list of conditions and the following disclaimer in the documentation and/or
 * other materials provided with the distribution.
 *
 * Neither the name of FIRST nor the names of its contributors may be used to endorse or
 * promote products derived from this software without specific prior written permission.
 *
 * NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS
 * LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var startSound = document.getElementById("charge");
var endAutoSound = document.getElementById("endauto");
var countSound = document.getElementById("teleop321");
var teleopSound = document.getElementById("firebell");
var endgameSound = document.getElementById("factwhistle");
var buzzerSound = document.getElementById("endmatch");
var foghornSound = document.getElementById("fogblast");


const OVERLAY = 0;
const AD = 1;
const FD = 2;
const PERM = 3;
var displayMode = AD;
var behaviorMode = AD;

var boundField = -1;
var muted = false;
var live = true;

var displayState = 0;
const BLANK = 0;
const PREVIEW = 1;
const RANDOM = 2;
const RANDOM1 = 2.5;
const MATCH = 3;
const RESULTS = 4;
const TIMEOUT = 5;
const SELECTION = 6;
const SPONSORS = 7;
const AWARD_SHOW = 8;
const AWARD_THIRD = 9;
const AWARD_SECOND = 10;
const AWARD_WINNER = 11;
const BRACKET = 12;
//Other states here

//Uses the behavior Mode to determine which states are legal
var validStates = [
	//Not Used
	[],
	//AD
	[BLANK, PREVIEW, RANDOM, MATCH, RESULTS, TIMEOUT, SELECTION, SPONSORS, AWARD_SHOW, AWARD_THIRD, AWARD_SECOND, AWARD_WINNER, BRACKET],
	//FD
	[BLANK, RANDOM, RANDOM1, MATCH, RESULTS, SELECTION, TIMEOUT],
	//Permanent Overlay
	[MATCH, TIMEOUT]
];

var inMatch = 0;




var match = -1;
var scoreUpdatePromise;



var endAutoFlag = false;
var countFlag = false;
var teleopFlag = false;
var endGameFlag = false;
var firstTickSinceReload = false;
function sec(x){
	if(x < 10){
		return "0" + x;
	}
	return "" + x;
}

function playSound(sound){
	if(!muted){
		sound.play();
	}
}

var timer = new Timer(100, 158, function(x){
	var time = "";
	var color = "W";
	if(x < 30){
		time = 30 - x;
	} else if(x < 38){
		time = 38 - x;
		color = x >= 35 ? "R" : "Y";
	} else if(x < 158){
		var time = 158 - x;
	} else {
		time = 0;
		inMatch = 0;
	}
	//sound effects
	if (x < 30) {
		//in auto, no sound
		document.getElementById("progress").style.backgroundColor = "green";
	} else if (x < 35) {
		//sound auto buzzer
		if(!endAutoFlag){
			if (!firstTickSinceReload) {
				playSound(endAutoSound);
			}
			endAutoFlag = true;
  		}
	} else if (x < 38) {
		//announce pick up controller
		if(!countFlag){
  			countFlag = true;
  			if (!firstTickSinceReload) {
  				playSound(countSound);
  			}
  		}
	} else if (x < 128) {
		//announce start teleop
		if(!teleopFlag){
  			teleopFlag = true;
  			if (!firstTickSinceReload) {
  				playSound(teleopSound);
  			}
  		}
	} else if (x < 158) {
		//announce end game
		if(!endGameFlag){
  			endGameFlag = true;
  			if (!firstTickSinceReload) {
  				playSound(endgameSound);
  			}
		}
		document.getElementById("progress").style.backgroundColor = "#FFFF00"; //yellow for endgame
	} else {
		//announce end game buzzer
		if (!firstTickSinceReload) {
  			playSound(buzzerSound);
		}
		document.getElementById("progress").classList.add('gameOverAnim');
		document.getElementById("progress").style.borderRadius = "0px 0px 0px 0px";
		endAnimTimeout = setTimeout(function() {
			document.getElementById("progress").classList.remove('gameOverAnim');
			document.getElementById("progress").style.backgroundColor = "#FF0000";
		}, 6000);
	}
	firstTickSinceReload = false;

	$("#progressTime").text(time);
	$("#minDigit").attr("src", "/digits/" + color + (x < 30 ? 2 : Math.floor(time / 60)) + ".png");
	$("#tensDigit").attr("src", "/digits/" + color + Math.floor((time % 60) / 10) + ".png");
	$("#onesDigit").attr("src", "/digits/" + color + (time % 60) % 10 + ".png");
	$("#colon").attr("src", "/digits/" + color + "colon.png");
}, function(){
		//desync code.
		if(firstTickSinceReload){
			return;
		}
		console.warn("CLOCK DESYNCH DETECTED!");
		var before = Date.now();
		$.ajax({
			url: base+"time/"+match+"/",
		    type: "GET",
			success: function (data) {
				var latency = Date.now() - before;
				//elapsed time since match start in ms from when server received this request
				var time = parseInt(data);
				var elapsed = time + latency/2;
				console.log(elapsed);
				timer.setStartTime(Date.now()-elapsed);
				endAutoFlag = elapsed > 30000;
				countFlag = elapsed > 35000;
				teleopFlag = elapsed > 38000;
				endGameFlag = elapsed > 128000;
			},error:function(a,b,c){}
		});	
}, function(ms){
	//we can explore having this not done on tick and instead done using animations
	//however, in my testing this has been less consistent, and also requires more suppoting
	//code to ensure the state is always valid
	document.getElementById("progress").style.width = (ms * 100 / 158000.0)+'%';
});

var allianceTO = false;


var toTimer = new Timer(100,300, function(x){

	var time  = toTimer.stopTimeSec - x;
	var allianceTime = time - 120;//2 minutes before expiration
	console.log(x+","+time);


	var bb;
	if(allianceTO){
		bb = "Alliance Timeout Called";
	} else if(allianceTime >0){
		bb = "Alliance Timeout Window: " + Math.floor(allianceTime / 60) + ":"+ Math.floor((allianceTime % 60) / 10) +""+(allianceTime % 60) % 10
	} else{
		bb = "Alliance Timeout Window Expired";
	}
	if(time <= 0){
		playSound(buzzerSound);
		allianceTO = false;
	}
	$("#bottomBar").text(bb);

	$("#progressTime").text(time);
	$("#minDigit").attr("src", "/digits/W" + Math.floor(time / 60) + ".png");
	$("#tensDigit").attr("src", "/digits/W" + Math.floor((time % 60) / 10) + ".png");
	$("#onesDigit").attr("src", "/digits/W" + (time % 60) % 10 + ".png");
	$("#colon").attr("src", "/digits/W" + "colon.png");
}, function(){/*getTimeoutTime to reset start*/})

function stopAndResetAllSounds() {
	startSound.pause();
  	endAutoSound.pause();
  	countSound.pause();
  	teleopSound.pause();
  	endgameSound.pause();
  	buzzerSound.pause();
  	foghornSound.pause();

  	startSound.currentTime = 0;
  	endAutoSound.currentTime = 0;
  	countSound.currentTime = 0;
  	teleopSound.currentTime = 0;
  	endgameSound.currentTime = 0;
  	buzzerSound.currentTime = 0;
  	foghornSound.currentTime = 0;
}
function zoom() {
	var zoom = window.innerWidth / 1920;
  	$("#body").css("zoom", zoom); //look into transform:scale(x) as alt for firefox
}
$(window).resize(function () { 
	zoom();
});
$().ready(function(){
	zoom();
  	$( "#glassPane" ).on( 'click', function( event ) {
  	    if ( event.ctrlKey ) {
  	    	$("#settings").removeAttr("hidden");
  	    } else {
  	    }
  	} );
  	startSound = document.getElementById("charge");
  	endAutoSound = document.getElementById("endauto");
  	countSound = document.getElementById("teleop321");
  	teleopSound = document.getElementById("firebell");
  	endgameSound = document.getElementById("factwhistle");
  	buzzerSound = document.getElementById("endmatch");
  	foghornSound = document.getElementById("fogblast");
  	$("input,select").on("click", function(){
  		calculateSettings();
  	});

  	calculateSettings();
  	applySettings();
	setVisibleState(displayState);
  	getCommand();

  	$(document).on('input', '#overlayInput', function() {
  		$("#chromaBox").css("background-color", "#"+$("#overlayInput").val());
  	});
  	if(base == "./"){
  		
  	}else if(matchInProgressVelocity){
  		//set state to that of active match
  		console.log("Match "+matchInProgressVelocity+" is in progress!");
  		//need to know the teams in the match, match name
  		
  		//need to fetch the current time. 
  		var before = Date.now();
  		$.ajax({
  			url: base+"time/"+matchInProgressVelocity+"/",
		    type: "GET",
			success: function (data) {
				var latency = Date.now() - before;
				//elapsed time since match start in ms from when server received this request
				var time = parseInt(data);
				var elapsed = time + latency/2;
				firstTickSinceReload = true;
				timer.start(elapsed);
				endAutoFlag = elapsed > 30000;
    			countFlag = elapsed > 35000;
    			teleopFlag = elapsed > 38000;
    			endGameFlag = elapsed > 128000;
    			$.ajax({
    	  			url: base+"info/"+matchInProgressVelocity+"/",
    			    type: "GET",
    				success: function (data) {
    					var params = JSON.parse(data);
    					match = params[0];
	            		inMatch = params[0];
    					showMatch(params);   
    					if(live){
    						showScores(1)
    					}
    				}, error: function(a,b,c){
    					
    				}
    			});    			
			},
			error: function(a,b,c){
				
			}
  		});
  		//Need to set audio flags that should be in the past
  		//need to start live score updates
  		//setVisibleState(MATCH);
  	}else if(timeoutInProgressVelocity){
  		//TODO get timeout state (the same code for desync)
  	} else{
  		//check last command.
  	}
  	

});

//calculates advanced settings from combo of basic settings
function calculateSettings(){
	var mode = $("#modeSelect").val();
	live = $("#liveInput").prop("checked");
	var advanced = $("#enableAdvanced").prop("checked");
	if(!advanced){
		//AD & no live = fd appearance
		$("#appearanceSelect").val(mode == "ad" ? (live ? "ad" : "field") : mode);

		//Overlay = AD behavior.
		$("#behaviorSelect").val((mode == "ad" || mode == "field") ? mode : "ad");
	} else{

	}
	$("#advancedSettings").prop("disabled", !advanced);
	$("#modeSelect").prop("disabled", advanced);
}

//Takes the settings objects and assigns to js vars
function applySettings(){
	var val = $("#appearanceSelect").val();
	var newCss = ""
	if(val == "ad"){
		newCss = "/css/audience.css";
		displayMode = AD;
	} else if(val == "overlay"){
		$("#progressBar").prop("hidden", false);
		newCss = "/css/displayOverlay.css";
		displayMode = OVERLAY;
	} else if(val == "field"){
		newCss = "/css/field.css";
		displayMode = FD;
	}
	$("#typeSpecificCSS").attr("href", newCss)
	val = $("#behaviorSelect").val();
	if(val == "ad"){
		behaviorMode = AD;
	} else if(val == "field"){
		behaviorMode = FD;
	} else if(val == "perm"){
		behaviorMode = PERM;
	}

	if($("#bindInput").prop("checked")){
		boundField = $("#fieldSelect").val();
	}

	muted = $("#muteInput").prop("checked");

	$("#chroma").css("background-color", "#"+$("#overlayInput").val());
	$("#chromaBox").css("background-color", "#"+$("#overlayInput").val());

	if(live){
		$("#overlayBody").removeClass("nolive");
		$("#digits").removeClass("nolive");
	} else{
		$("#overlayBody").addClass("nolive");
		$("#digits").addClass("nolive");
	}
}

//These mappings are for what components are visible based on the current state.
//They do not enforce what states are valid for a given behavior.
var visibleStatesOverlay = {
	chroma : [BLANK, MATCH],
	titleBar: [PREVIEW, RANDOM, RESULTS, SPONSORS, SELECTION, TIMEOUT, AWARD_SHOW, AWARD_THIRD, AWARD_SECOND, AWARD_WINNER, BRACKET],
	previews: [PREVIEW],
	randomization: [RANDOM],
	results: [RESULTS],
	digits: [MATCH, TIMEOUT],
	overlayBar: [MATCH],
	overlayBody: [MATCH],
	scores: [MATCH],
	bottomBar: [SPONSORS, TIMEOUT],
	sponsor: [SPONSORS],
	selection: [SELECTION],
	award: [AWARD_SHOW, AWARD_THIRD, AWARD_SECOND, AWARD_WINNER],
	bracket: [BRACKET]
};

var visibleStatesAD = {
	chroma : [],
	titleBar: [PREVIEW, RANDOM, RESULTS, SPONSORS, SELECTION, TIMEOUT, AWARD_SHOW, AWARD_THIRD, AWARD_SECOND, AWARD_WINNER, BRACKET],
	previews: [PREVIEW],
	randomization: [RANDOM],
	results: [RESULTS],
	digits: [MATCH, TIMEOUT],
	overlayBar: [MATCH],
	overlayBody: [MATCH],
	scores: [MATCH],
	bottomBar: [SPONSORS, TIMEOUT],
	sponsor: [SPONSORS]	,
	selection: [SELECTION],
	award: [AWARD_SHOW, AWARD_THIRD, AWARD_SECOND, AWARD_WINNER],
	bracket:[BRACKET]
};
var visibleStatesFD = {
	chroma : [],
	titleBar: [RANDOM, MATCH, SELECTION, TIMEOUT,AWARD_SHOW, AWARD_THIRD, AWARD_SECOND, AWARD_WINNER, BRACKET],
	previews: [],
	randomization: [RANDOM],
	results: [],
	digits: [MATCH, TIMEOUT],
	overlayBar: [MATCH],
	overlayBody: [MATCH],
	scores: [MATCH],
	bottomBar: [TIMEOUT],
	sponsor: [],
	selection: [SELECTION],
	award: [AWARD_SHOW, AWARD_THIRD, AWARD_SECOND, AWARD_WINNER],
	bracket:[BRACKET]
};

function isValidState(state){
	return validStates[behaviorMode].indexOf(state) >= 0;
}

///This handles the visibility of components, not the information displayed
function setVisibleState(state){
	var states = null;
	switch(behaviorMode){
		case FD:
			states = visibleStatesFD;
			break;
		case AD:
			states = visibleStatesAD;
			break;
		case OVERLAY:
			states = visibleStatesOverlay;
			break;
	}
	console.log("Setting display state: "+state+", display Mode: "+displayMode);
	console.log(states);
	for(var e in states){
		var obj = $("#"+e);
		if(states[e].indexOf(state) == -1){
			//Hide
			obj.attr("hidden", true);
		} else{
			//Show
			obj.removeAttr("hidden");
		}
	}
	$("#chroma").attr("hidden", displayMode != OVERLAY || visibleStatesOverlay.chroma.indexOf(state) == -1);
	//background
	$("#body").removeClass();
	switch(state){
		case MATCH:
			$("#body").addClass("bgMatch");
	        break;
	    case PREVIEW:
	    case RESULTS:
	    case TIMEOUT:
	    	$("#body").addClass("bg3");
	    	break;
		case AWARD_SHOW:
		case AWARD_THIRD:
		case AWARD_SECOND:
		case AWARD_WINNER:
	    case RANDOM:
	    case BRACKET:
	    case SELECTION:
	    	$("#body").addClass("bgBig");
	    	break;
	    case SPONSORS:
	    	$("#body").addClass("bgSponsor");
	    	break;

	    default:
	    	$("#body").addClass("bgEmpty");
	}
	if(state == SPONSORS){
		$("#titleBar").addClass("sponsors");
		$("#bottomBar").addClass("sponsors");
	} else{
		$("#titleBar").removeClass("sponsors");
		$("#bottomBar").removeClass("sponsors");
	}
	if(state == TIMEOUT){
		$("#digits").addClass("to");
	} else{
		$("#digits").removeClass("to");
	}
	displayState = state;

}
var plainGold = "/img/block_yellow.png";
var plainSilver = "/img/ball_white_plain.png";
var yesGold = "/img/block_yellow.png";
var noGold = "/img/block_black.png";
var yesSilver = "/img/ball_white.png";
var noSilver = "/img/ball_black.png";
var base_crater = "/img/base_crater.png";
var in_crater = "/img/in_crater.png";
var completely_in_crater = "/img/completely_in_crater.png";
var autoParking = [base_crater, completely_in_crater];
var endParking = [base_crater, in_crater, completely_in_crater];
function initSampleField(rand) {
	document.getElementById("redSF_1,1").src = (rand == 1 || rand == 6) ? yesGold : yesSilver;
	document.getElementById("redSF_1,2").src = (rand == 2 || rand == 5) ? yesGold : yesSilver;
	document.getElementById("redSF_1,3").src = (rand == 3 || rand == 4) ? yesGold : yesSilver;
	document.getElementById("redSF_2,1").src = (rand == 1 || rand == 6) ? yesGold : yesSilver;
	document.getElementById("redSF_2,2").src = (rand == 2 || rand == 5) ? yesGold : yesSilver;
	document.getElementById("redSF_2,3").src = (rand == 3 || rand == 4) ? yesGold : yesSilver;

	document.getElementById("blueSF_1,1").src = (rand == 1 || rand == 6) ? yesGold : yesSilver;
	document.getElementById("blueSF_1,2").src = (rand == 2 || rand == 5) ? yesGold : yesSilver;
	document.getElementById("blueSF_1,3").src = (rand == 3 || rand == 4) ? yesGold : yesSilver;
	document.getElementById("blueSF_2,1").src = (rand == 1 || rand == 6) ? yesGold : yesSilver;
	document.getElementById("blueSF_2,2").src = (rand == 2 || rand == 5) ? yesGold : yesSilver;
	document.getElementById("blueSF_2,3").src = (rand == 3 || rand == 4) ? yesGold : yesSilver;
}
function isGold(rand, id) {
	if ((rand == 1 || rand == 6) && id == 1) {
		return true;
	}
	if ((rand == 2 || rand == 5) && id == 2) {
		return true;
	}
	if ((rand == 3 || rand == 4) && id == 3) {
		return true;
	}
}
function showScores(to,oneTime,customMatch){
//	if(match == -1){
//		return;
//	}
	if(scoreUpdatePromise){
		scoreUpdatePromise.abort();
	}
	scoreUpdatePromise = $.ajax({
        url: base+"scoreupdate/"+(customMatch?customMatch:match)+"/" + (to ? ("?to="+to+"&random="+Math.random()) : "?random="+Math.random()),
        type: "GET",
        success: function (data) {
        	try {
            console.log(JSON.parse(data));
            var d = JSON.parse(data);
            d.red = JSON.parse(d.red);
            d.blue = JSON.parse(d.blue)
            $("#redTotal").text(d.red.scoredPoints + d.blue.penaltyPoints);
            $("#blueTotal").text(d.blue.scoredPoints + d.red.penaltyPoints);
            //set onscreen references to robot
            $("#redCrater1Label").text(d.redRobot1);
            $("#redCrater2Label").text(d.redRobot2);
            $("#blueCrater1Label").text(d.blueRobot1);
            $("#blueCrater2Label").text(d.blueRobot2);
            $("#redCrater3Label").text(d.redRobot1);
            $("#redCrater4Label").text(d.redRobot2);
            $("#blueCrater3Label").text(d.blueRobot1);
            $("#blueCrater4Label").text(d.blueRobot2);
            $("#redFlag1").text(d.redRobot1);
            $("#redFlag2").text(d.redRobot2);
            $("#blueFlag1").text(d.blueRobot1);
            $("#blueFlag2").text(d.blueRobot2);
            //sample field:
        	var i;
        	var j;
        	var sampleFieldState;
        	sampleFieldState = d.red.sampleFieldState;
        	for (i = 2; i > 0; i--) {
        		for (j = 3; j > 0; j--) {
        			if ((sampleFieldState & 1) == 1) {
        				document.getElementById("redSF_"+i+","+j).src = isGold(d.rand, j) ? yesGold : yesSilver;
        			} else {
        				document.getElementById("redSF_"+i+","+j).src = isGold(d.rand, j) ? noGold : noSilver;
        			}
        			sampleFieldState = sampleFieldState >> 1;
        		}
        	}
        	sampleFieldState = d.blue.sampleFieldState;
        	for (i = 2; i > 0; i--) {
        		for (j = 3; j > 0; j--) {
        			if ((sampleFieldState & 1) == 1) {
        				document.getElementById("blueSF_"+i+","+j).src = isGold(d.rand, j) ? yesGold : yesSilver;
        			} else {
        				document.getElementById("blueSF_"+i+","+j).src = isGold(d.rand, j) ? noGold : noSilver;
        			}
        			sampleFieldState = sampleFieldState >> 1;
        		}
        	}
        	//auto parking
        	document.getElementById("redCrater1Image").src = autoParking[d.red.autoParking1];
        	document.getElementById("redCrater2Image").src = autoParking[d.red.autoParking2];
        	document.getElementById("blueCrater1Image").src = autoParking[d.blue.autoParking1];
        	document.getElementById("blueCrater2Image").src = autoParking[d.blue.autoParking2];
        	//end parking
        	document.getElementById("redCrater3Image").src = endParking[d.red.endParked1];
        	document.getElementById("redCrater4Image").src = endParking[d.red.endParked2];
        	document.getElementById("blueCrater3Image").src = endParking[d.blue.endParked1];
        	document.getElementById("blueCrater4Image").src = endParking[d.blue.endParked2];
            //claiming depot
            cur = $("#redFlag1");
            cur.stop();
            if (d.red.claimed1) {
            	cur.animate({top:'44px'});
            } else {
            	cur.animate({top:'126px'});
            }
            cur = $("#redFlag2");
            cur.stop();
            if (d.red.claimed2) {
            	cur.animate({top:'44px'});
            } else {
            	cur.animate({top:'126px'});
            }
            cur = $("#blueFlag1");
            cur.stop();
            if (d.blue.claimed1) {
            	cur.animate({top:'44px'});
            } else {
            	cur.animate({top:'126px'});
            }
            cur = $("#blueFlag2");
            cur.stop();
            if (d.blue.claimed2) {
            	cur.animate({top:'44px'});
            } else {
            	cur.animate({top:'126px'});
            }

            cur = $("#redAutoRobot1");
            cur.stop();
            if (d.red.initLatched1) {
            	cur.removeClass('ineligibleRobot');
            	if (d.red.landed1) {
            		cur.animate({top:'110px'});
            	} else {
            		cur.animate({top:'57px'});
            	}
            } else {
            	cur.animate({top:'110px'}, 0);
            	cur.addClass('ineligibleRobot');
            }
            cur = $("#redAutoRobot2");
            cur.stop();
            if (d.red.initLatched2) {
            	cur.removeClass('ineligibleRobot');
            	if (d.red.landed2) {
            		cur.animate({top:'110px'});
            	} else {
            		cur.animate({top:'57px'});
            	}
            } else {
            	cur.animate({top:'110px'}, 0);
            	cur.addClass('ineligibleRobot');
            }
            cur = $("#blueAutoRobot1");
            cur.stop();
            if (d.blue.initLatched1) {
            	cur.removeClass('ineligibleRobot');
            	if (d.blue.landed1) {
            		cur.animate({top:'110px'});
            	} else {
            		cur.animate({top:'57px'});
            	}
            } else {
            	cur.animate({top:'110px'}, 0);
            	cur.addClass('ineligibleRobot');
            }
            cur = $("#blueAutoRobot2");
            cur.stop();
            if (d.blue.initLatched2) {
            	cur.removeClass('ineligibleRobot');
            	if (d.blue.landed2) {
            		cur.animate({top:'110px'});
            	} else {
            		cur.animate({top:'57px'});
            	}
            } else {
            	cur.animate({top:'110px'}, 0);
            	cur.addClass('ineligibleRobot');
            }

            cur = $("#redEndRobot1");
            cur.stop();
            if (d.red.latched1) {
            	cur.animate({top:'57px'});
            } else {
            	cur.animate({top:'110px'});
            }
            cur = $("#redEndRobot2");
            cur.stop();
            if (d.red.latched2) {
            	cur.animate({top:'57px'});
            } else {
            	cur.animate({top:'110px'});
            }
            cur = $("#blueEndRobot1");
            cur.stop();
            if (d.blue.latched1) {
            	cur.animate({top:'57px'});
            } else {
            	cur.animate({top:'110px'});
            }
            cur = $("#blueEndRobot2");
            cur.stop();
            if (d.blue.latched2) {
            	cur.animate({top:'57px'});
            } else {
            	cur.animate({top:'110px'});
            }
            // Minerals
            $("#redSilver").text(": " + d.red.silver);
            $("#blueSilver").text(": " + d.blue.silver);
            $("#redGold").text(": " + d.red.gold);
            $("#blueGold").text(": " + d.blue.gold);
            $("#redDepot").text(": " + d.red.depot);
            $("#blueDepot").text(": " + d.blue.depot);

        	} catch (err) {
        		console.log(err.message); //in case there is an error, we still need to catch it so that we can get the next promise
        	}
            if(!oneTime && !d.liveScoringComplete)showScores();
        },
        error: function (xhr, textStatus, errorThrown) {
			if(textStatus == "abort"){
				console.log("Score updates aborted");
        		return;
        	}
        	console.log("ERROR "+textStatus);
			console.log(xhr);

        }});
}

function checkField(field){
	return boundField == -1 || field == 0 || field == boundField;
}
var sponsorCycle = null;
function getCommand(){
	$.ajax({
        url: base + "command/?random="+Math.random(),
        type: "GET",

        success: function (data) {
        	try{
        	if (sponsorCycle != null) {
        		clearInterval(sponsorCycle);
        		sponsorCycle = null;
        	}
        	var d = JSON.parse(data);
            console.log(d);

            switch(d.type){

            	case "SHOW_PREVIEW":
            		if(!inMatch && isValidState(PREVIEW) && checkField(d.params[2])){
            			showPreview(d.params);
            		}
            		break;
            	case "RANDOMIZE":
            		//TODO should AD show if preview has been shown?
            		if(!inMatch && isValidState(RANDOM1) && checkField(d.params[2])){
	            		$("#titleBar").text(d.params[1]);
	            		var randomization = d.params[3];
	            		var die = 9855 + randomization;
	            		$("#randomizationDie").html("&#"+die+";");
	            		document.getElementById("randomSF_1").src = (randomization == 1 || randomization == 6) ? plainGold : plainSilver;
	            		document.getElementById("randomSF_2").src = (randomization == 2 || randomization == 5) ? plainGold : plainSilver;
	            		document.getElementById("randomSF_3").src = (randomization == 3 || randomization == 4) ? plainGold : plainSilver;
		            	setVisibleState(RANDOM);
            		}
            		break;
            	case "SHOW_RANDOM":
            		if(!inMatch && isValidState(RANDOM) && checkField(d.params[2])){
	            		$("#titleBar").text(d.params[1]);
	            		var randomization = d.params[3];
	            		var die = 9855 + randomization;
	            		$("#randomizationDie").html("&#"+die+";");
	            		document.getElementById("randomSF_1").src = (randomization == 1 || randomization == 6) ? plainGold : plainSilver;
	            		document.getElementById("randomSF_2").src = (randomization == 2 || randomization == 5) ? plainGold : plainSilver;
	            		document.getElementById("randomSF_3").src = (randomization == 3 || randomization == 4) ? plainGold : plainSilver;
		            	setVisibleState(RANDOM);
            		}
            		break;
            	case "SHOW_MATCH":
            		if(!inMatch && isValidState(MATCH) && checkField(d.params[2])){
	            		showScores(1,true,d.params[0]);
	            		showMatch(d.params);
	            		timer.reset();
            		}
            		break;
            	case "START_MATCH":
            		if(!inMatch && isValidState(MATCH) && checkField(d.params[2])){
	            		timer.start();

	            		endAutoFlag = false;
            			countFlag = false;
            			teleopFlag = false;
            			endGameFlag = false;
            			stopAndResetAllSounds();
            			playSound(startSound);

	            		match = d.params[0];
	            		inMatch = d.params[0];
	            		showMatch(d.params);
	            		if(scoreUpdatePromise){
	            			scoreUpdatePromise.abort();
		            	}
		            	if(live){
		            		showScores(1);
		            	}
	            	}
            		break;
            	case "SHOW_RESULTS":
            		if(!inMatch && isValidState(RESULTS) && checkField(d.params[2])){
            			showResults(d.params);
            		}
            		break;
            		//TODO ABORT NEEDS MATCH NUMBER!!!!!!!!!!!!! (AND FIELD)
            	case "ABORT_MATCH":
            		if(inMatch && match == d.params[0]){
            			stopAndResetAllSounds();
            			playSound(foghornSound);
            			timer.reset();
            			if(scoreUpdatePromise){
	            			scoreUpdatePromise.abort();
		            	}
            			inMatch = false;
            		}
            		break;
            	case "SHOW_AWARD":
            		if(!inMatch && isValidState(AWARD_SHOW)){
	            		showAward(d.params, AWARD_SHOW);
            		}
            		break;
            	case "SHOW_THIRD":
            		if(!inMatch && isValidState(AWARD_THIRD)){
	            		showAward(d.params, AWARD_THIRD);
            		}
            		break;
            	case "SHOW_SECOND":
            		if(!inMatch && isValidState(AWARD_SECOND)){
	            		showAward(d.params, AWARD_SECOND);
            		}
            		break;
            	case "SHOW_WINNER":
            		if(!inMatch && isValidState(AWARD_WINNER)){
	            		showAward(d.params, AWARD_WINNER);
            		}
            		break;
            	case "SHOW_SPONSORS":
            		if (!inMatch && isValidState(SPONSORS)) {
            			//if the image doesn't exist, then hide it
            			$("#sponsorImage").error(function() {
            				$(this).hide();
            			});
            			$("#sponsorImage").load(function() {
            				$(this).show();
            			});
            			sponsors = JSON.parse(d.params);
            			index = 0;
            			showSponsors = function() {
            				$("#titleBar").text("Thank You to Our Sponsors");
            				sponsor = sponsors[index++];
            				if (index >= sponsors.length) {
            					index = 0;
            				}
            				switch (sponsor.level) {
            				case "GLOBAL":
            					$("#bottomBar").html("<i>FIRST<sup style='font-size:25px'>&reg;</sup></i> Tech Challenge Global Sponsors");
            					break;
            				case "REGIONAL":
            					$("#bottomBar").text("Our Regional Sponsors");
            					break;
            				case "EVENT":
            					$("#bottomBar").text("Our Event Sponsors");
            					break;
            				}
            				$("#sponsorName").html(sponsor.name);
            				$("#sponsorImage").attr('src', '/img/sponsors/' + sponsor.logoPath);
            			};
            			showSponsors();
            			sponsorCycle = setInterval(showSponsors, 10*1000); //set sponsors to cycle every 10s
            			setVisibleState(SPONSORS);
            		}
            		break;
            	case "SHOW_SELECTION":
            		if(!inMatch && isValidState(SELECTION)){
            			showSelection(d.params[0]);
            		}
            		break;
            	case "FIELD_TIMEOUT":
            		if(!inMatch && isValidState(TIMEOUT)){
            			fieldTimeout();
            		}
            		break;
            	case "ALLIANCE_TIMEOUT":
            		if(!inMatch && isValidState(TIMEOUT)){
            			allianceTimeout();
            		}
            		break;
            	case "SHOW_TIMEOUT":
            		if(!inMatch && isValidState(TIMEOUT)){
            			showTimeout();
            		}
            		break;
            	case "END_TIMEOUT":
            		endTimeout();
            		break;
            	case "SHOW_BRACKET":
            		if(!inMatch && isValidState(BRACKET)){
            			showBracket(d.params);
            		}
            		break;
            	case "REDIRECT":
            		if(!inMatch){
            			var url = window.location.href;
            			var config = url.substring(url.lastIndexOf("/display"));
            			var newBase = base;
            			newBase+="../../"+d.params[0];
            			//while()
        				window.location.href = newBase + config;
            		}
            		break;
            }
        	}catch(error){
        		console.error(error);
        		setTimeout(getCommand, 1000);
        		return;
        	}
            getCommand();
        },
        error: function (xhr, textStatus, errorThrown) {
			console.log("ERROR "+textStatus);
			console.log(xhr);
			setTimeout(getCommand, 1000);
        }});
}

var alliances = ["red", "blue"];
function showPreview(params){
	$("#titleBar").text(params[1]);
	for(var a = 0; a < 2; a++){
		for(var t = 0; t < 3; t++){
			var selector = "#previewBar_"+alliances[a]+"_"+(t+1);
			var offset = (3*t) + (9 * a) ;
			var teamNumber = params[5 + offset];
			$(selector).prop("hidden", teamNumber == 0);
			if(teamNumber == 0){
				continue;
			}
			$(selector+" .previewTeamNumber").text(teamNumber);
			var name = params[6 + offset];
			var nameDiv = $(selector+" .previewTeamName");
			nameDiv.text(name);
			nameDiv.removeClass("long");
			nameDiv.removeClass("tooLong");
			//Few character buffer for big letters
			if(name.length >= 60){
				nameDiv.addClass("tooLong");
			}else if(name.length >= 50){
				nameDiv.addClass("long");
			}
			var rank = params[7 + offset];
			if(rank != "" && rank < 0){
				rank = "NP";
			}
			$(selector+" .previewTeamRank").html(rank);
		}
	}
	var redWins = params[3];
	var blueWins = params[4];
	var series = $("#previewSeries");
	series.prop("hidden", redWins + blueWins == -2);
	series.removeClass("redLead blueLead");
	if(redWins > blueWins){
		series.addClass("redLead");
		series.text("Red Leads Series");
	} else if(blueWins > redWins){
		series.text("Blue leads Series");
		series.addClass("blueLead");
	}else{
		series.text("Series Tied");
	}

	setVisibleState(PREVIEW);
}

function showAward(params, show){
	//all will show title bar
	let a = params[0];
	$("#titleBar").text( a.name );

	//clear stuff i guess
	$("#third").text("");
	$("#second").text("");
	$("#winner").text("");

	if( show > AWARD_SHOW && a.thirdName != undefined && a.thirdName != "" ) {
		if( a.teamAward ) {
			$("#third").text("Third:\n" + a.thirdTeam.data.number + " - " + a.thirdName);
		} else {
			$("#third").text("Third:\n" + a.thirdName);
		}
	}
	if( show > AWARD_THIRD && a.secondName != undefined && a.secondName != "" ) {
		if( a.teamAward ) {
			$("#second").text("Second:\n" + a.secondTeam.data.number + " - " + a.secondName);
		} else {
			$("#second").text("Second:\n" + a.secondName);
		}
	}
	if( show > AWARD_SECOND && a.winnerName != undefined && a.winnerName != "") {
		if( a.teamAward ) {
			$("#winner").text("Winner:\n" + a.winnerTeam.data.number + " - " + a.winnerName);
		} else {
			$("#winner").text("Winner:\n" + a.winnerName + "!");
		}
		
	}
	setVisibleState(show);
}

function showMatch(params){
	$("#titleBar").text("Field "+params[2]);
	$("#matchName").text(params[1]);
	$(".teamNumber").removeClass("card");
	$("#red1").text(params[3]);
	if(params[4]){
		$("#red1").addClass("card");
	}
	$("#red2").text(params[5]);
	if(params[6]){
		$("#red2").addClass("card");
	}
	$("#red3").text(params[7]);
	//red 3 card same as red 1
	if(params[4]){
		$("#red3").addClass("card");
	}
	$("#redNumbers").attr("two", params[7] == 0);
	$("#blue1").text(params[8]);
	if(params[9]){
		$("#blue1").addClass("card");
	}
	$("#blue2").text(params[10]);
	if(params[11]){
		$("#blue2").addClass("card");
	}
	$("#blue3").text(params[12]);
	if(params[9]){
		$("#blue3").addClass("card");
	}
	$("#blueNumbers").attr("two", params[12] == 0);
	setVisibleState(MATCH);
}
function getRankDir(dir){
	return dir < 0 ? "&#9660;" : (dir > 0 ? "&#9650;" : "&nbsp;");
}
function showResults(params){
	//Update scores shown on FD
	if(behaviorMode == FD){
		var rs = params[23];
		var bs = params[24];
		$("#redTotal").text(rs);
		$("#blueTotal").text(bs);
		return;
	}
	
	$("#titleBar").text(params[1]);
	var elims = params[26] >= 0;
	for(var a = 0; a < 2; a++){
		$("#resultBar_"+alliances[a]+"_elims").prop("hidden", !elims);
		$("#resultBar_"+alliances[a]+"_1").prop("hidden", elims);
		$("#resultBar_"+alliances[a]+"_2").prop("hidden", elims);
		if(elims){
			var selector = "#resultBar_"+alliances[a]+"_elims";
			for(var t = 0; t < 3; t++){
				var tstring = params[3 + (4*t) + (9 * a)]
				$(selector+" .resultTeam"+(t+1)).text(tstring == 0 ? "" : tstring);
			}
			$(selector+" .resultSeed").text(params[27+a]+")");
			var c = $(selector+" .resultCard");
			c.removeClass("card1 card2 card3");
			c.addClass("card"+params[6 + (9*a)])

		} else{
			for(var t = 0; t < 2; t++){
				var selector = "#resultBar_"+alliances[a]+"_"+(t+1);
				var offset = (4*t) + (9 * a);
				$(selector+" .resultTeamNumber").text(params[3 + offset]);
				$(selector+" .resultRank").html(params[4 + offset] + getRankDir(params[5+offset]));
				var c = $(selector+" .resultCard");
				c.removeClass("card1 card2 card3");
				c.addClass("card"+params[6 + offset])
			}
		}
	}
	var red = JSON.parse(params[21]);
	var blue = JSON.parse(params[22]);
	var rs = params[23];
	var bs = params[24];
	for(var a = 0; a < 2; a++){
		var aa = a == 0 ? red : blue;
		var other = a == 0 ? blue : red;
		var selector = "#resultBreakdownRow_"+alliances[a]+"_";
		var s2 = " .resultBreakdownScore";
		$(selector+1+s2).text(aa.landedPoints + aa.claimedPoints + aa.autoParkingPoints + aa.samplingPoints);
		$(selector+2+s2).text(aa.goldPoints + aa.silverPoints + aa.depotPoints);
		$(selector+3+s2).text(aa.latchedPoints + aa.endParkingPoints);
		$(selector+4+s2).text(other.penaltyPoints);
		$("#resultScore_"+alliances[a]).text(a == 0 ? rs : bs);
	}
	var winner = params[25];
	$("#resultWinner_blue").prop("hidden", winner != 1);
	$("#resultWinner_red").prop("hidden", winner != 0);
	$("#resultTie_red").prop("hidden", winner != -1);
	$("#resultTie_blue").prop("hidden", winner != -1);


	var series = $("#resultSeries");
	series.prop("hidden", !elims);
	series.removeClass("redLead blueLead");
	switch(params[26]){
		case -1://quals
			break;
		case 0: //series tied
			series.text("Series Tied");
			break;
		case 1: //red leads;
			series.text("Red Leads Series");
			series.addClass("redLead");
			break;
		case 2: //blue leads;
			series.text("Blue Leads Series");
			series.addClass("blueLead");
			break;
		case 3: //red wins
			series.text("Red Wins Series!");
			series.addClass("redLead");
			break;
		case 4: //blue wins
			series.text("Blue Wins Series!");
			series.addClass("blueLead");
			break;
	}
	setVisibleState(RESULTS);

}

function cancel(){
	$("#settings").attr("hidden", true);
}
function save(){
	//:config/:advanced/:appearance/:behavior/:bind/:field/:chroma/:live/:mute/
	var config = [
		$("#modeSelect").val(),
		$("#enableAdvanced").prop("checked"),
		$("#appearanceSelect").val(),
		$("#behaviorSelect").val(),
		$("#bindInput").prop("checked"),
		$("#fieldSelect").val(),
		$("#overlayInput").val(),
		$("#liveInput").prop("checked"),
		$("#muteInput").prop("checked")
	]
	window.location.href = base + "config/"+ config.join("/")+"/";
}
function test(){
	//test
	var val = $("#typeSelect").val();
	var newCss = ""
	if(val == "ad"){
		newCss = "/css/audience.css";
		displayMode = AD;
	} else if(val == "overlay"){
		newCss = "/css/displayOverlay.css";
		displayMode = OVERLAY;
	} else if(val == "field"){
		newCss = "/css/field.css";
		displayMode = FD;
	}
	console.log(val);
	$("#typeSpecificCSS").attr("href", newCss)
	setVisibleState(displayState);
	cancel();
}

function testSound(soundS){
	stopAndResetAllSounds();
	if(soundS == "start"){
		playSound(startSound);
	}
	if(soundS == "end"){
		playSound(buzzerSound);
	}
	if(soundS == "abort"){
		playSound(foghornSound);
	}
}

function showSelection(data){
	setVisibleState(SELECTION);
	$("#titleBar").text("Alliance Selection");
	console.log(data.availableTeams);
	for(var a = 0; a < 4; a++){
		for(var t = 0; t < 3; t++){
			$("#selection_"+(a+1)+"_"+(t+1)).text(data.alliances[a][t] ? data.alliances[a][t].number : "");
		}
	}
	var count = 0;
	for(var i = 0; i < data.availableTeams.length; i++){
		if(data.availableTeams[i].removed){
			continue;
		}
		console.log(count);
		count++;
	}
	if(count > 40){
		count  = 40;
	}
	var cols = Math.ceil(count / 10);
	console.log("columns:"+cols+",  count"+count);
	var body = $("#availableTable");
	body.empty();
	for(var r = 0; r < 10; r++){
		var row = $("<tr/>");
		for(var c = 0; c < cols; c++){
			row.append($("<td/>").attr("id","availableTeam_"+r+"_"+c));
		}
		body.append(row);
	}

	var added = 0;
	for(var i = 0; i < data.availableTeams.length && added < 40; i++){
		if(data.availableTeams[i].removed){
			continue;
		}
		var team = data.availableTeams[i];
		$("#availableTeam_"+(added%10)+"_"+Math.floor(added / 10)).html(
				(team.declined ? "<s>" : "")+
				"<span class='availableRank'>"+team.rank+"</span>-"+team.number+
				(team.declined ? "</s>" : "")
				);
		added++;
	}
}

function fieldTimeout(){
	if(behaviorMode == FD){ //field display shows TO immediately
		showTimeout();
	}
	if(!toTimer.isRunning()){
		toTimer.setStopTimeSeconds(300);
		toTimer.start();
	} else{
		toTimer.setStopTimeSeconds(300 + toTimer.stopTimeSec);
	}

}
function allianceTimeout(){
	if(behaviorMode == FD){ //field display shows TO immediately
		showTimeout();
	}
	allianceTO = true;
	if(!toTimer.isRunning()){
		toTimer.setStopTimeSeconds(180);
		toTimer.start();
	} else{
		toTimer.setStopTimeSeconds(180 + toTimer.stopTimeSec);
	}
}
function showTimeout(){
	$("#titleBar").text("Timeout In Progress");
	setVisibleState(TIMEOUT);
}
function endTimeout(){
	if(!toTimer.isRunning()){
		return;
	}
	toTimer.end();
}
function showBracket(data){
	$("#titleBar").text("Elimination Bracket");
	for(var s = 0; s < 3; s++){
		if(s >= data.length || !data[s]){
			$(".bracketBar_"+(s < 2 ? "sf" : "f")).children().text("");
			continue;
		}
		for(var a = 0; a < 2; a++){
			var bar = "#bracketBar_"+(s < 2 ? "sf" : "f")+"_"+(a == 0 ? "red" : "blue")+"_"+((s%2)+1);
			for(var t = 0; t < 3; t++){
				var team = data[s][a == 0 ? "red" : "blue"]["team"+(t+1)];
				var num = (team && team.data.number > 0 ) ? team.data.number : "";
				$(bar+" .bracketTeam"+(t+1)).text(num);
			}
			$(bar+" .bracketSeed").text(data[s][(a == 0 ? "red" : "blue")+"Seed"]+")")
			$(bar+" .bracketWins").text(data[s][(a == 0 ? "red" : "blue")+"Wins"])
		}
	}
	setVisibleState(BRACKET);
}