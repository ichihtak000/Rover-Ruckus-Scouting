<!DOCTYPE html>
<html>
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
</br>

fileName <?php echo $_GET["fileName"]; ?><br> 
Red1 <?php echo $_GET["red1"]; ?><br>
Red2 <?php echo $_GET["red2"]; ?><br>

Blue1 <?php echo $_GET["blue1"]; ?><br>
Blue2 <?php echo $_GET["blue2"]; ?><br>

</body>
</html>