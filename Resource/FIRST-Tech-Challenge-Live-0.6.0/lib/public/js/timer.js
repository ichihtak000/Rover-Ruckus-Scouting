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
function Timer(sampleTime, stopTimeSeconds, onSecondCallback, onDesyncCallback, onSampleCallback){
	const ERROR_THRESHOLD = 500;
	this.startTime = 0;
	this.stopTimeSec = stopTimeSeconds;
	//The delay between samples
	this.sampleTime = sampleTime;
	//The function to call each second - This function should execute in < sampleTime
	this.onSecondCallback = onSecondCallback;
	this.prevTick;
	this.elapsed;
	this.lastSec;
	this.elapsedSec = -1;
	this.timerInterval;
	this.onDesyncCallback = onDesyncCallback;
	this.onSampleCallback = onSampleCallback;
	this.desync = false;
	
	//Used if the timer needs to be already started on page load
	this.setStartTime = function(st){
		this.startTime = st;
	}
	
	/**
	 * Starts the match at the current time. If a time is specified it is interpreter as "amount into the match already to start"
	 */
	this.start = function(time){
		if (time) {
			this.startTime = Date.now() - time;
		} else {
			this.startTime = Date.now();
		}
		var _this = this;
		if(!this.timerInterval){
			this.timerInterval = setInterval(_this.tick.bind(this), _this.sampleTime);
		}
		this.elapsed = -1;
		this.lastSec = -1;
		this.elapsedSec = -1;
		this.prevTick = -1;
	}
	
	this.stop = function(){
		window.clearInterval(this.timerInterval);
		this.timerInterval = null;
	}
	this.end = function(){
		this.onSecondCallback(this.stopTimeSec);
		this.stop();
	}
	
	this.reset = function(){
		this.stop();
		this.startTime = 0;
		this.onSecondCallback(0);
	}
	
	this.isRunning = function(){
		return this.timerInterval != null;
	}
	
	this.setStopTimeSeconds = function(stop){
		this.stopTimeSec = stop;
	}
	
	//Internal callback every sample
	this.tick = function(){
		var cur = new Date().getTime();
		this.elapsed = cur - this.startTime;
		if(Math.abs(cur - this.prevTick) > ERROR_THRESHOLD){
			//Recovery Code
			if(!this.desync && onDesyncCallback){
				onDesyncCallback();
			}
			this.desync = true;
		} else{
			this.desync = false;
		}
		this.prevTick = cur;
		this.elapsedSec = Math.floor(this.elapsed / 1000);
		if(this.elapsedSec != this.lastSec){
			if(this.onSecondCallback){
				this.onSecondCallback(this.elapsedSec);
			}
			this.lastSec = this.elapsedSec;
			if(this.lastSec >= this.stopTimeSec){
				this.stop();
			}
		}
		if(this.onSampleCallback){
			this.onSampleCallback(this.elapsed);
		}
	}
	
	this.toString = function(){
		return "2:30"
	}
}