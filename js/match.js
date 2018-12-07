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
        var end = row.insertCell(6);
		var comment = row.insertCell(7);
		winner.className = "class";
		team.className = "class";
		if(i%4==0){
			matchNum++;
			color = getRandomColor();
			match.innerHTML = matchNum;
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
			match.innerHTML = matchNum;
			table.rows[i-2].cells[0].rowSpan = "4";
			table.rows[i-1].deleteCell(0);
			table.rows[i].deleteCell(0);
			table.rows[i+1].deleteCell(0);
			table.rows[i-2].cells[1].innerHTML = blueSum;
			table.rows[i].cells[0].innerHTML = redSum;
			table.rows[i-2].cells[1].rowSpan = "2";
			table.rows[i-1].deleteCell(0);
			table.rows[i].cells[0].rowSpan = "2";
			table.rows[i+1].deleteCell(0);
		}else{
			
		}
		
		match.style.backgroundColor = color;
		team.innerHTML = teamTable[i];
	    total.innerHTML = totalTable[i];
		auto.innerHTML = autoTable[i];
		tele.innerHTML = teleTable[i];
		end.innerHTML = endTable[i];
		comment.innerHTML = "hello";
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