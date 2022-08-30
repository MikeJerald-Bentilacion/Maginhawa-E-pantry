// Add
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("Add");

var cancel_add = document.getElementById("cancel-add");

// Get the <span> element that closes the modal
var span = document.getElementById("close");

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

cancel_add.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}




var modal2 = document.getElementById("Modal-Edit");

// Get the button that opens the modal
var btn2 = document.getElementById("Edit");

var cancel_edit = document.getElementById("cancel-edit");

// Get the <span> element that closes the modal
var span2 = document.getElementById("close-edit");

// When the user clicks the button, open the modal 
btn2.onclick = function() {
  modal2.style.display = "block";
}

cancel_edit.onclick = function() {
  modal2.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
  modal2.style.display = "none";
}


// Delete

var modal3 = document.getElementById("Modal-Delete");

// Get the button that opens the modal
var btn3 = document.getElementById("Delete");

var cancel_delete = document.getElementById("cancel-delete");

// Get the <span> element that closes the modal
var span3 = document.getElementById("close-delete");

// When the user clicks the button, open the modal 
btn3.onclick = function() {
  modal3.style.display = "block";
}

cancel_delete.onclick = function() {
  modal3.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
span3.onclick = function() {
  modal3.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
  if (event.target == modal3) {
    modal3.style.display = "none";
  }
}