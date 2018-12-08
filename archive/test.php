<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta charset="utf-8">
	<meta name="description" content="FTC Scouting Tool for 2018-2019" />
	<meta name="keywords" content="html, css, javascript, php" />
	<meta name="author" content="Takumi" />

	<title>Rover-Ruckus-Scouting</title>
	
	<link rel="icon" href="visuals/icon2.png">
	
	<link rel="stylesheet" type="text/css" href="css/match.css">
</head>
<body>
<!--
<?php

$fn = "fff.html";
$myfile = fopen(fn, "w") or die("Unable to open file!");
$txt = "John Doe\n";
fwrite($myfile, $txt);
$txt = "Jane Doe\n";
fwrite($myfile, $txt);
fclose($myfile);
$myfile1 = fopen("new.html", "r") or die("Unable to open file!");
echo fread($myfile1,filesize("new.html"));
fclose($myfile1);

?>
-->
<input type="button" onclick="addTable()" value="new File">
<input type="button" onclick="test()" value="test">
	<table id="scoreTable">
	  <tr>
		<td>Match</td>
		<td>Team</td>
		<td>Total</td>
		<td>Autonomous</td>
		<td>TeleOp</td>
		<td>End Game</td>
	  </tr>
	</table>
	
</br>
<?php $mytext = $_GET["red1"];?>
fileName <?php echo $_GET["fileName"]; ?><br> 
Red1 <?php echo $mytext; ?><br>
Red2 <?php echo $_GET["red2"]; ?><br>

Blue1 <?php echo $_GET["blue1"]; ?><br>
Blue2 <?php echo $_GET["blue2"]; ?><br>

<script type="text/javascript">
	function addTable(){
		var simple = '<?php echo $mytext; ?>';
		alert(simple);
	}
	
</script>

<?php
    $complex = array('demo', 'text', array('foo', 'bar'));
?>
<script type="text/javascript">
	function test(){
		var complex = <?php echo json_encode($complex); ?>;
		alert(complex);
	}
</script>
</body>

<script>
alert( jsVar );
</script>
</html>