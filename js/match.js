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
			color = getRandomColor();
			match.innerHTML = matchNum;
		}else if(i%4==3){
			match.innerHTML = matchNum;
			table.rows[i-2].cells[0].style.backgroundColor="green";
			table.rows[i-2].cells[0].rowSpan = "4"
			table.rows[i-1].deleteCell(0);
			table.rows[i].deleteCell(0);
			table.rows[i+1].deleteCell(0);
			//match.rowSpan = "4";
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

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("matchTable");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (+(x.innerHTML) > +(y.innerHTML)) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (+(x.innerHTML) < +(y.innerHTML)) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

