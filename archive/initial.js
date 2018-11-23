if (typeof(Storage) !== "undefined") {
	var scoreLength = localStorage.getItem("rowNum");
	for(var i=1; i<=scoreLength; i++){
	    var table = document.getElementById("scoreTable");
        var row = table.insertRow(i);
        var row1 = row.insertCell(0);
        var row2 = row.insertCell(1);
        var row3 = row.insertCell(2);
        var row4 = row.insertCell(3);
	    var autoScore = localStorage.getItem("autoScore" + i);
	    var endScore = localStorage.getItem("endGame" + i);
	    row2.innerHTML = autoScore;
	    row4.innerHTML = endScore;
	}
} else {
	document.getElementById("demo").innerHTML = "Sorry, your browser does not support Web Storage...";
}

function newFile(){
	alert('try');
	var fs = require('fs');
	alert("567");
//create an empty file named mynewfile2.txt:
fs.open('mynewfile2.txt', 'w', function (err, file) {
  if (err) throw err;
  console.log('Saved!');
});
}