document.getElementById("myBtn").onclick = function() {myFunction()};

/* myFunction toggles between adding and removing the show class, which is used to hide and show the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
var typeFileSystem = PERSISTENT; //the type can be either TEMPORARY or PERSISTENT
var fs = null; // our connection variable to the filesystem

// inital load of the file system
function kickUpFileSystem(){
	alert("ready");
	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
	try{
		//window.webkitStorageInfo.requestQuota(typeFileSystem, 5*1024*1024 /*5MB*/, function(grantedBytes) {
			//alert("good");
			//window.requestFileSystem(typeFileSystem, grantedBytes, function(filesystem) {
				//alert("heyyyy");
				//fs = fileSystem;
				//alert("hey");
				fileSystemLoaded();
			  //}, errorHandler);
		//}, function(e) {
			//alert('Error', e);
		//});
		alert("tried");
	} catch( error ) {
		alert("Filesystem API is not supported on this browser\nPlease use Chrome");
	}
	alert('done');
}

// Error message handler
function errorHandler(e) {
	alert("errorMassage" + "hello");
  var msg = "k";

  switch (e.code) {
	  
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = "Quota Exceeded";
	  alert("are you here");
      break;
    case FileError.NOT_FOUND_ERR:
      msg = "Not Found";
	  alert("say");
      break;
    case FileError.SECURITY_ERR:
      msg = "Security Error";
	  alert("nkafvba");
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = "Invalid Modification Error";
	  alert("this one?");
      break;
    case FileError.INVALID_STATE_ERR:
      msg = "Invalid State Error";
	  alert("or this");
      break;
    default:
      msg = "Unknown Error";
	  alert("default");
      break;
  };
  alert("Error: " + msg);
  
}

// file system is loaded
function fileSystemLoaded() {
	alert("loaded");
	alert("Opened file system: " + fs);
	fileSpace(); // log file space left
	displayDirectory(); // display existing folders and files
}

// display how much space is available in the file system
function fileSpace(){
	alert("fileSapce");
	try {
		window.webkitStorageInfo.queryUsageAndQuota(webkitStorageInfo.typeFileSystem,
		function(used, remaining) {
		  alert("Used quota: " + used + ", remaining quota: " + remaining);
		}, function(e) {
		  alert('Error', e); 
		} );
	} catch( error ) {
		alert("Filesystem API is not supported on this browser\nPlease use Chrome");
	}
}

// create a new file
function createFile(){
	alert("creating flie");
	fs.root.getFile('info.txt', {create: true, exclusive: true}, function(fileEntry) {
		//displayDirectory(); // reload files and folders
	//}, function(e) { // file was not created for some reason
		//if (e.code == FileError.INVALID_MODIFICATION_ERR){ // alert most common reason for failure
			//alert("Filename already exists");
		//}
	//});
}

function displayDirectory(){
	alert("dispalying");
	window.open("file:///C:/Users/Takumi/Development/Scouting/");
	alert("done2");
}

function toArray(list) {
	alert("array");
  return Array.prototype.slice.call(list || [], 0);
}