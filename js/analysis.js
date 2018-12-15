var teamTable = [];
var totalTable = [];
var autoTable = [];
var teleTable = [];
var endTable = [];
var rankingTable = [];
var tieTable = [];

var color;

window.onload = function(){updateTable();updateTable2();};

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
		rankingTable[i] = localStorage.getItem("rankingPoint" + i);
		tieTable[i] = localStorage.getItem("tiePoint" + i);
		
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
				
				var tmpRank = rankingTable[i-1];
				rankingTable[i-1] = rankingTable[i];
				rankingTable[i] = tmpRank;
				
				var tmpTie = tieTable[i-1];
				tieTable[i-1] = tieTable[i];
				tieTable[i] = tmpTie;
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
		var rank = row.insertCell(5);
		
		team.innerHTML = teamTable[i];
	    total.innerHTML = totalTable[i];
		auto.innerHTML = autoTable[i];
		tele.innerHTML = teleTable[i];
		end.innerHTML = endTable[i];
		rank.innerHTML = rankingTable[i];
		if(!(+teamTable[i -1] == +teamTable[i])){
			color = getRandomColor();
		}
		team.style.backgroundColor = color;
		total.style.backgroundColor = color;
		auto.style.backgroundColor = color;
		tele.style.backgroundColor = color;
		end.style.backgroundColor = color;
		rank.style.backgroundColor = color;
	}
}

function updateTable2(){
	var table2 = document.getElementById("analysisTable2");
	
	var tableLength = table2.rows.length;
	for(var i = (tableLength-1); i>0; i--){
		table2.deleteRow(i);
	}
	
	var tLength = localStorage.getItem("tableLength");
	
	var row;
	var team;
	var rank;
	var tie;
	var totalAve;
	var totalHigh;
	var totalLow;
	var standardDev;
	var autoAve;
	var teleAve;
	var endAve;
	
	var numTeam = 0;
	var numTeamEach = 0;
	var totalRanking = 0;
	var totalTie = 0;
	var totalAveScore = 0;
	var highestTotal = 0;
	var lowestTotal = Number.MAX_SAFE_INTEGER;
	var autoAveScore = 0;
	var teleAveScore = 0;
	var endAveScore = 0;
	
	for(var i=0; i<tLength; i++){
		totalAveScore+= totalTable[i];
		totalRanking += +rankingTable[i]; 
		totalTie += +tieTable[i];
		autoAveScore += +autoTable[i];
		teleAveScore += +teleTable[i];
		endAveScore += +endTable[i];
		
		numTeamEach++;
		if(highestTotal < totalTable[i]){
			highestTotal = totalTable[i];
		}
		if(lowestTotal > totalTable[i]){
			lowestTotal = totalTable[i];
		}
		
		if(!(+teamTable[i -1] == +teamTable[i])){
			color = getRandomColor();
			row = table2.insertRow(numTeam+1);
			team = row.insertCell(0);
			rank = row.insertCell(1);
			tie = row.insertCell(2);
			totalAve = row.insertCell(3);
			totalHigh = row.insertCell(4);
			totalLow = row.insertCell(5);
			standardDiv = row.insertCell(6);
			autoAve = row.insertCell(7);
			teleAve = row.insertCell(8);
			endAve = row.insertCell(9);
		}
		if(!(+teamTable[i] == +teamTable[i+1])){
			team.innerHTML = teamTable[i];
			
			var t = teamTable[i];
			if(t == 5446){
				totalRanking += 20;
			}else if(t == 5604 || t == 5961 || t == 9876){
				totalRanking += 16;
			}else if(t == 11865 || t == 4054 || t == 11121 || t == 12217 || t == 13485 || t == 10244){
				totalRanking += 14;
			}else if(t == 6559 || t == 15460 || t == 7742 || t == 7732 || t == 8548 || t == 8563){
				totalRanking +=12;
			}else if(t == 5971 || t == 13601 || t == 3861 || t == 4213){
				totalRanking +=10;
			}else if(t == 11477 || t == 9387 || t == 6424 || t == 8030 || t == 10548){
				totalRanking += 8;
			}else if(t == 11186 || t == 7766 || t == 6046 || t == 5447 || t == 7830 || t == 7299){
				totalRanking +=6;
			}else if(t == 4053 || t == 6395 || t == 13480 || t == 15462 || t == 13707 || t == 13481){
				totalRanking +=4;
			}else if(t == 13484 || t == 15495){
				totalRanking +=2;
			}
			
			rank.innerHTML = totalRanking;
			tie.innerHTML = totalTie;
			totalAve.innerHTML = Math.round(totalAveScore/numTeamEach);
			totalHigh.innerHTML = highestTotal;
			totalLow.innerHTML = lowestTotal;
			standardDiv.innerHTML = endTable[i];
			autoAve.innerHTML = Math.round(autoAveScore/numTeamEach);
			teleAve.innerHTML = Math.round(teleAveScore/numTeamEach);
			endAve.innerHTML = Math.round(endAveScore/numTeamEach);
			
			team.style.backgroundColor = color;
			rank.style.backgroundColor = color;
			tie.style.backgroundColor = color;
			totalAve.style.backgroundColor = color;
			totalHigh.style.backgroundColor = color;
			totalLow.style.backgroundColor = color;
			standardDiv.style.backgroundColor = color;
			autoAve.style.backgroundColor = color;
			teleAve.style.backgroundColor = color;
			endAve.style.backgroundColor = color;
			
			numTeam++;
			totalRanking = 0;
			totalTie = 0;
			totalAveScore = 0;
			autoAveScore = 0;
			teleAveScore = 0;
			endAveScore = 0;
			numTeamEach = 0;
			highestTotal = 0;
			lowestTotal = Number.MAX_SAFE_INTEGER;
		}
	}
}

function getStandardDiv(){
}

function getRandomColor() {
  var letters = 'BCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
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


function sortTable2(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("analysisTable2");
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

