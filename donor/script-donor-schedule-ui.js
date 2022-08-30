var modal_logout = document.getElementById("modal-logout");

// Get the button that opens the modal
var btn_logout = document.getElementById("logout");


btn_logout.onclick = function() {
  modal_logout.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal_logout) {
    modal_logout.style.display = "none";
  }
}