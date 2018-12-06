var teamTable = [];
var totalTable = [];
var autoTable = [];
var teleTable = [];
var endTable = [];

var color;

function updateTable(){
	var table = document.getElementById("matchTable");
	
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

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("matchTable");
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

