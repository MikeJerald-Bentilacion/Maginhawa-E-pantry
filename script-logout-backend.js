function logout() {
	$.ajax({
		url: 'http://localhost:8000/logout',
		type:"POST",
    	dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function (resp) {
			alert(resp.Message);
			location.replace("login.html");
		},
		error: function (e) {
			alert("Error Occured.");
		}
	});
}

var logout_user = document.getElementById("logout-user");

logout_user.addEventListener('click', function(){
	logout();
})