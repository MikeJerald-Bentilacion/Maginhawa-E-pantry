function login(username, password) {
    $.ajax({
        url: 'http://localhost:8000/rider/login',
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            username: username,
			password: password
		}),
        success: function(resp) {
            if(resp.username != username) {
                alert("Incorrect username");
            } else if(resp.password != password) {
                alert("Incorrect password");
            } else {
                alert(resp.Message);
                location.replace("rider-item-ui.html")
            }
        },
        error: function (e) {
            alert("danger");
           }
    }); 
}

var Login = document.getElementById("login");

Login.addEventListener('click', function(){
    var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
    
    if (username == ''){
        alert("Username is required")
    } else if(password == ''){
        alert("Password is required")
    } else{
        login(username, password);
    }
})

