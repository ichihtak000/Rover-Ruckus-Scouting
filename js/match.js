var autoTable = [];

function show(){
	var tLength = localStorage.getItem("tableLength");
	for(var i=0; i<tLength;i++){
		autoTable[i] = localStorage.getItem("autoScore" +i);
	}
	for(var i=1; i<tLength; i++){
	    var table = document.getElementById("scoreTable");
        var row = table.insertRow(i);
        var row1 = row.insertCell(0);
        var row2 = row.insertCell(1);
        var row3 = row.insertCell(2);
        var row4 = row.insertCell(3);
        var row5 = row.insertCell(4);
        var row6 = row.insertCell(5);
		row1.innerHTML = i;
	    row2.innerHTML = autoTable[i];
	}
}


