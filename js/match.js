var autoTable = [];
var matchNum = 0;

function show(){
	var tLength = localStorage.getItem("tableLength");
	for(var i=0; i<tLength;i++){
		autoTable[i] = localStorage.getItem("autoScore" +i);
	}
	for(var i=0; i<tLength; i++){
	    var table = document.getElementById("scoreTable");
        var row = table.insertRow(i+1);
        var match = row.insertCell(0);
        var team = row.insertCell(1);
        var total = row.insertCell(2);
        var auto = row.insertCell(3);
        var tele = row.insertCell(4);
        var end = row.insertCell(5);
		if(i%4==0){
			matchNum++;
			match.innerHTML = matchNum;
		}else{
			match.innerHTML = ""
		}
	    auto.innerHTML = autoTable[i];
	}
}


