var modal = document.getElementById("Modal-Received");

// Get the button that opens the modal
var btn = document.getElementById("received");

var span = document.getElementById("close-received");

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}


var modal2 = document.getElementById("Modal-Not-Received");

// Get the button that opens the modal
var btn2 = document.getElementById("not-received");

var span2 = document.getElementById("close-not-received");

// When the user clicks the button, open the modal 
btn2.onclick = function() {
  modal2.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
  modal2.style.display = "none";
}


// Logout
var modal_logout = document.getElementById("modal-logout");

// Get the button that opens the modal
var btn_logout = document.getElementById("logout");

// Get the <span> element that closes the modal
var span_logout = document.getElementById("close-logout");

btn_logout.onclick = function() {
  modal_logout.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span_logout.onclick = function() {
  modal_logout.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
  if (event.target == modal_logout) {
    modal_logout.style.display = "none";
  }
}