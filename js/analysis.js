var teamTable = [];
var totalTable = [];
var autoTable = [];
var teleTable = [];
var endTable = [];

var color;

window.onload = function(){updateTable()};

function updateTable(){
	var table = document.getElementById("analysisTable");
	
	var tableLength = table.rows.length;
	for(var i = (tableLength-1); i>0; i--){
		table.deleteRow(i);
	}
	
	var tLength = localStorage.getItem("tableLength");
	for(var i=0; i<tLength;i++){
		teamTable[i] = localStorage.getItem("team" +i);
		autoTable[i] = localStorage.getItem("autoScore" +i);
		teleTable[i] = localStorage.getItem("teleScore" +i);
		endTable[i] = localStorage.getItem("endScore" +i);
		
		totalTable[i] = +autoTable[i] + +teleTable[i] + +endTable[i];
	}
	
	var done = false;
	while (!done) {
		done = true;
		var array = teamTable;
		for (var i = 1; i < array.length; i ++) {
			if (+array[i - 1] > +array[i]) {
				done = false;
				var tmpTeam = array[i - 1];
				teamTable[i - 1] = array[i];
				teamTable[i] = tmpTeam;

				var tmpTotal = totalTable[i - 1];
				totalTable[i - 1] = totalTable[i];
				totalTable[i] = tmpTotal;

				var tmpAuto = autoTable[i - 1];
				autoTable[i - 1] = autoTable[i];
				autoTable[i] = tmpAuto;

				var tmpTele = teleTable[i - 1];
				teleTable[i - 1] = teleTable[i];
				teleTable[i] = tmpTele;

				var tmpEnd = endTable[i - 1];
				endTable[i - 1] = endTable[i];
				endTable[i] = tmpEnd;
			}
		}
	}

	for(var i=0; i<tLength; i++){
        var row = table.insertRow(i+1);
		var team = row.insertCell(0);
        var total = row.insertCell(1);
        var auto = row.insertCell(2);
        var tele = row.insertCell(3);
        var end = row.insertCell(4);

		team.innerHTML = teamTable[i];
	    total.innerHTML = totalTable[i];
		auto.innerHTML = autoTable[i];
		tele.innerHTML = teleTable[i];
		end.innerHTML = endTable[i];
		
		team.style.backgroundColor = getRandomColor();
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

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("analysisTable");
  switching = true;
  dir = "asc"; 
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "desc") {
        if (+(x.innerHTML) > +(y.innerHTML)) {
          shouldSwitch= true;
          break;
        }
      } else if (dir == "asc") {
        if (+(x.innerHTML) < +(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;      
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

