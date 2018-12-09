var pairTable = [];
var teamTable = [];
var totalTable = [];
var autoTable = [];
var teleTable = [];
var endTable = [];

var color;
var tempPair = [];
var tempTeam = [];
var tempTotal = [];
var tempAuto = [];
var tempTele = [];
var tempEnd = [];

window.onload = function(){updateTable()};

function updateTable(){
	var table = document.getElementById("matchTable");
	var matchNum = 0;
	
	var tableLength = table.rows.length;
	for(var i = (tableLength-1); i>0; i--){
		table.deleteRow(i);
	}
	
	var tLength = localStorage.getItem("tableLength");
	for(var i=0; i<tLength;i++){
		if(i%2 == 0){
			pairTable[i/2] = localStorage.getItem("pair"+i);
		}
		teamTable[i] = localStorage.getItem("team" +i);
		autoTable[i] = localStorage.getItem("autoScore" +i);
		teleTable[i] = localStorage.getItem("teleScore" +i);
		endTable[i] = localStorage.getItem("endScore" +i);
	}
	
	
		
	for(var i=0; i<tLength; i++){
		var footer = table.createTFoot();
        var row = footer.insertRow(i);
        var match = row.insertCell(0);
		var winner = row.insertCell(1);
		var team = row.insertCell(2);
        var total = row.insertCell(3);
        var auto = row.insertCell(4);
        var tele = row.insertCell(5);
        var end = row.insertCell(6);
		var comment = row.insertCell(7);
		
		totalTable[i] = +autoTable[i] + +teleTable[i] + +endTable[i];
		
		if(i%4==0){
			matchNum++;
			color = getRandomColor();
			match.innerHTML = matchNum;
			match.onclick = function () {changeTable(this);};
		}else if(i%4==3){
			var blueSum = (parseInt(totalTable[i-3], 10) + parseInt(totalTable[i-2], 10));
			var redSum = (parseInt(totalTable[i-1], 10) + parseInt(totalTable[i], 10));
			if(blueSum > redSum){
				table.rows[i-1].style.backgroundColor = "#1F45FC";
				table.rows[i-2].style.backgroundColor = "#1F45FC";
				table.rows[i].style.backgroundColor = "#F08080";
				table.rows[i+1].style.backgroundColor = "#F08080";
			}else if(blueSum < redSum){
				table.rows[i-1].style.backgroundColor = "#ADD8E6";
				table.rows[i-2].style.backgroundColor = "#ADD8E6";
				table.rows[i].style.backgroundColor = "red";
				table.rows[i+1].style.backgroundColor = "red";
			}else{
				table.rows[i-1].style.backgroundColor = "#ADD8E6";
				table.rows[i-2].style.backgroundColor = "#ADD8E6";
				table.rows[i].style.backgroundColor = "#F08080";
				table.rows[i+1].style.backgroundColor = "#F08080";
			}	
			
			var tableIndex = (matchNum-1)*2;
			pairTable[tableIndex] = blueSum;
			pairTable[tableIndex+1] = redSum;			
			
			table.rows[i-2].cells[0].rowSpan = "4";
			table.rows[i-1].deleteCell(0);
			table.rows[i].deleteCell(0);
			table.rows[i+1].deleteCell(0);
			
			table.rows[i-2].cells[1].innerHTML = pairTable[tableIndex];
			table.rows[i].cells[0].innerHTML = pairTable[tableIndex+1];
			
			table.rows[i-2].cells[1].id = tableIndex*10 + 1;
			table.rows[i].cells[0].id = (tableIndex+1)*10 + 1;
			
			tempPair[tableIndex] = pairTable[tableIndex];
			tempPair[tableIndex+1] = pairTable[tableIndex+1];
			
			
			table.rows[i-2].cells[1].onclick = function () {changeTable(this);};
			table.rows[i].cells[0].onclick = function () {changeTable(this);};
			
			table.rows[i-2].cells[1].rowSpan = "2";
			table.rows[i-1].deleteCell(0);
			table.rows[i].cells[0].rowSpan = "2";
			table.rows[i+1].deleteCell(0);
		}
		
		match.style.backgroundColor = color;
		team.innerHTML = teamTable[i];
	    total.innerHTML = totalTable[i];
		auto.innerHTML = autoTable[i];
		tele.innerHTML = teleTable[i];
		end.innerHTML = endTable[i];
		comment.innerHTML = "hello";
		
		team.id = i*10 + 2;
		total.id = i*10 + 3;
		auto.id = i*10 + 4;
		tele.id = i*10 + 5;
		end.id = i*10 + 6;
		comment.id = i*10 + 7;
		
		tempTeam[i] = teamTable[i];
		tempTotal[i] = totalTable[i];
		tempAuto[i] = autoTable[i];
		tempTele[i] = teleTable[i];
		tempEnd [i] = endTable[i];
		
		team.onclick = function () {changeTable(this);};
		total.onclick = function () {changeTable(this);};
		auto.onclick = function () {changeTable(this);};
		tele.onclick = function () {changeTable(this);};
		end.onclick = function () {changeTable(this);};
		comment.onclick = function () {changeTable(this);};
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
	var check = confirm("Clear localStorage?\n If yes, make sure to reload the Scouting Sheet as well. \n Lost data will not be recovered");
	if(check){
		localStorage.clear();
		updateTable();
	}
}

function dropLeft() {
    document.getElementById("left-dropdown").classList.toggle("show");
}

function dropRight() {
    document.getElementById("right-dropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
	if (!e.target.matches('.dropbtnLeft')) {
		var leftDropdown = document.getElementById("left-dropdown");
		if (leftDropdown.classList.contains('show')) {
			leftDropdown.classList.remove('show');
		}
	}
	if (!e.target.matches('.dropbtnRight')) {
		var rightDropdown = document.getElementById("right-dropdown");
		if (rightDropdown.classList.contains('show')) {
			rightDropdown.classList.remove('show');
		}
	}
}

function reload(){
	location.reload();
}

function changeTable(tableCell) {
    var change = prompt("Change the value if needed", tableCell.innerHTML);
    if (change != null) {
        tableCell.innerHTML = change + ".";
		var id = tableCell.id;
		var cell = (+id)%10;
		var index = ((+id) - cell)/10;
		if(cell = 1){
			alert(id + " " + cell + " " + index);
			alert(tempPair[index]);
			tempPair[index] = change + ".";
			alert(tempPair[index]);
		}else if(cell == 2){
			tempTeam[index] = change + ".";
		}else if(cell == 3){
			tempTotal[index] = change + ".";
		}else if(cell == 4){
			tempAuto[index] = change + ".";
		}else if(cell == 5){
			tempTele[index] = change + ".";
		}else if(cell == 6){
			tempEnd[index] = change + ".";
		}
	}
}

function saveTable(){
	var check = confirm("Save Changes?");
	if(check){
		var tLength = localStorage.getItem("tableLength");
		
		for(var i=0; i<tLength; i++){
			if(i%2 == 0){
				var index = i / 2;
				pairTable[index] = tempPair[index];
				localStorage.setItem("pair"+i,pairTable[index]);
			}	
			
			teamTable[i] = tempTeam[i];
			totalTable[i] = tempTotal[i];
			autoTable[i] = tempAuto[i];
			teleTable[i] = tempTele[i];
			endTable[i] = tempEnd[i];
			
			localStorage.setItem("team" + i, teamTable[i]);
			localStorage.setItem("totalScore" + i, totalTable[i]);
			localStorage.setItem("autoScore" + i, autoTable[i]);
			localStorage.setItem("teleScore" + i, teleTable[i]);
			localStorage.setItem("endScore" + i, endTable[i]);
			
		}
	}
	updateTable();
}