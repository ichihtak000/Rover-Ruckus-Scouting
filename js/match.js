var teamTable = [];
var totalTable = [];
var autoTable = [];
var teleTable = [];
var endTable = [];

var color;

function updateTable(){
	var table = document.getElementById("matchTable");
	var matchNum = 0;
	
	var tableLength = table.rows.length;
	for(var i = (tableLength-1); i>0; i--){
		table.deleteRow(i);
	}
	
	var tLength = localStorage.getItem("tableLength");
	for(var i=0; i<tLength;i++){
		teamTable[i] = localStorage.getItem("team" +i);
		totalTable[i] = localStorage.getItem("totalScore" +i);
		autoTable[i] = localStorage.getItem("autoScore" +i);
		teleTable[i] = localStorage.getItem("teleScore" +i);
		endTable[i] = localStorage.getItem("endScore" +i);
	}
	for(var i=0; i<tLength; i++){
        var row = table.insertRow(i+1);
		row.className = "item";
        var match = row.insertCell(0);
		var winner = row.insertCell(1);
		var team = row.insertCell(2);
        var total = row.insertCell(3);
        var auto = row.insertCell(4);
        var tele = row.insertCell(5);
        var end = row.insertCell(6);/*
		if(i%4==1 || i%4==3){
			table.rows[i-1].cells[1].rowSpan = "2";
			if(i!=0){
				table.rows[i].cells[1].style.backgroundColor="green";
			}
		}*/
		if(i%4==0){
			matchNum++;
			match.innerHTML = matchNum;
			color = getRandomColor();
		}else if(i%4==3){
			match.innerHTML = ""
			var redSum = (parseInt(totalTable[i-3], 10) + parseInt(totalTable[i-2], 10));
			var blueSum = (parseInt(totalTable[i-1], 10) + parseInt(totalTable[i], 10));
			if(redSum > blueSum){
				table.rows[i-1].style.backgroundColor = "red";
				table.rows[i-2].style.backgroundColor = "red";
				table.rows[i].style.backgroundColor = "#ADD8E6";
				table.rows[i+1].style.backgroundColor = "#ADD8E6";
			}else if(redSum < blueSum){
				table.rows[i-1].style.backgroundColor = "#FA8072";
				table.rows[i-2].style.backgroundColor = "#FA8072";
				table.rows[i].style.backgroundColor = "#4169e1";
				table.rows[i+1].style.backgroundColor = "#4169e1";
			}else{
				table.rows[i-1].style.backgroundColor = "#FA8072";
				table.rows[i-2].style.backgroundColor = "#FA8072";
				table.rows[i].style.backgroundColor = "#ADD8E6";
				table.rows[i+1].style.backgroundColor = "#ADD8E6";
			}
			table.rows[i-1].cells[1].innerHTML = redSum;
			table.rows[i+1].cells[1].innerHTML = blueSum;		
		}else{
			match.innerHTML = ""
		}
		
		match.style.backgroundColor = color;
		team.innerHTML = teamTable[i];
	    total.innerHTML = totalTable[i];
		auto.innerHTML = autoTable[i];
		tele.innerHTML = teleTable[i];
		end.innerHTML = endTable[i];
	}
}

function getRandomColor() {
  var letters = 'BCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

function clearStorage(){
	var check = confirm("Clear localStorage?");
	if(check){
		localStorage.clear();
	}
}

function sortTotal() {
  var table = document.getElementById("matchTable");
	var matchNum = 0;
	
	var tableLength = table.rows.length;
	for(var i = (tableLength-1); i>0; i--){
		table.deleteRow(i);
	}
	
	var tLength = localStorage.getItem("tableLength");
	for(var i=0; i<tLength;i++){
		teamTable[i] = localStorage.getItem("team" +i);
		totalTable[i] = localStorage.getItem("totalScore" +i);
		autoTable[i] = localStorage.getItem("autoScore" +i);
		teleTable[i] = localStorage.getItem("teleScore" +i);
		endTable[i] = localStorage.getItem("endScore" +i);
	}
	totalTable.sort(function(a, b){return b-a});
	for(var i=0; i<tLength; i++){
        var row = table.insertRow(i+1);
		row.className = "item";
        var match = row.insertCell(0);
		var winner = row.insertCell(1);
		var team = row.insertCell(2);
        var total = row.insertCell(3);
        var auto = row.insertCell(4);
        var tele = row.insertCell(5);
        var end = row.insertCell(6);/*
		if(i%4==1 || i%4==3){
			table.rows[i-1].cells[1].rowSpan = "2";
			if(i!=0){
				table.rows[i].cells[1].style.backgroundColor="green";
			}
		}*/
		if(i%4==0){
			matchNum++;
			match.innerHTML = matchNum;
			color = getRandomColor();
		}else if(i%4==3){
			match.innerHTML = ""
			var redSum = (parseInt(totalTable[i-3], 10) + parseInt(totalTable[i-2], 10));
			var blueSum = (parseInt(totalTable[i-1], 10) + parseInt(totalTable[i], 10));
			if(redSum > blueSum){
				table.rows[i-1].style.backgroundColor = "red";
				table.rows[i-2].style.backgroundColor = "red";
				table.rows[i].style.backgroundColor = "#ADD8E6";
				table.rows[i+1].style.backgroundColor = "#ADD8E6";
			}else if(redSum < blueSum){
				table.rows[i-1].style.backgroundColor = "#FA8072";
				table.rows[i-2].style.backgroundColor = "#FA8072";
				table.rows[i].style.backgroundColor = "#4169e1";
				table.rows[i+1].style.backgroundColor = "#4169e1";
			}else{
				table.rows[i-1].style.backgroundColor = "#FA8072";
				table.rows[i-2].style.backgroundColor = "#FA8072";
				table.rows[i].style.backgroundColor = "#ADD8E6";
				table.rows[i+1].style.backgroundColor = "#ADD8E6";
			}
			table.rows[i-1].cells[1].innerHTML = redSum;
			table.rows[i+1].cells[1].innerHTML = blueSum;		
		}else{
			match.innerHTML = ""
		}
		
		match.style.backgroundColor = color;
		team.innerHTML = teamTable[i];
	    total.innerHTML = totalTable[i];
		auto.innerHTML = autoTable[i];
		tele.innerHTML = teleTable[i];
		end.innerHTML = endTable[i];
	}
}

