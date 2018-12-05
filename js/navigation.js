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
