function display_rider()
{

$.ajax({
    		url: 'http://localhost:8000/rider',
    		type:"GET",
    		dataType: "json",
    		success: function(resp) {
				$("#display").html("");
				if (resp.status  == 'OK') {
				   for (i = 0; i < resp.size; i++)
                        {
                            rider_id = resp.tasks[i].rider_id;
                	        rider_name = resp.tasks[i].rider_name;
                            rider_phone_number = resp.tasks[i].rider_phone_number;
                            rider_username = resp.tasks[i].rider_username;
							rider_status = resp.tasks[i].rider_status;
							$("#display").append("<tr>"+
							"<td width='202px'>"+rider_id+"</td>"+
							"<td width='370px'>"+rider_name+"</td>"+
							"<td width='224px'>"+rider_phone_number+"</td>"+
                            "<td width='280px'>"+rider_username+"</td>"+
							"<td width='168px'>"+rider_status+"</td>"+"</tr>");
										
	                    }
				} else
				{
					$("#display").html("");
					alert(resp.status);
				}
    		},
    		error: function (e) {
        		alert("danger");
   			}
		}); 
}

function display_admin() 
{
    $.ajax({
        url: 'http://localhost:8000/admin',
        type:"GET",
        dataType: "json",
        success: function(resp) {
            $("#admin-name").html("");
            if (resp.status  == 'OK') {
               for (i = 0; i < resp.size; i++)
                    {
                        username= resp.tasks[i].username;
                        admin_name = resp.tasks[i].name;
                        $("#admin-name").append("<p style='margin: 0; padding: 1em; background-color: #00acee; text-align: center; color: white;'>"+username+"</p>");
                        $("#admin-name2").append("<h3>"+admin_name+"</h3>");
                        $(".admin-name3").append("<p style='display:inline; font-size: 16px;'>"+admin_name+"▾"+"</p>");
                                    
                    }
            } else
            {
                $("#admin-name").html("");
                alert(resp.status);
            }
        },
        error: function (e) {
            alert("danger");
           }
    }); 
}

function rider_registration(id, name, phone_number, username, password) {
	$.ajax({
		url: 'http://localhost:8000/rider',
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			rider_id: id,
			rider_name: name,
			rider_phone_number: phone_number,
			rider_username: username,
			rider_password: password
		}),
		success: function (data) {
			alert(data.status);
		},
		error: function (e) {
			alert("Error Occured.");
		}
	});
}

function edit_rider(id, name, phone_number) {
	$.ajax({
		url: 'http://localhost:8000/rider',
		type: "PUT",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			rider_id: id,
			rider_name: name,
			rider_phone_number: phone_number
		}),
		success: function (data) {
			alert(data.status);
		},
		error: function (e) {
			alert("Error Occured.");
		}
	});
}

function del_rider(id) {
	$.ajax({
		url: 'http://localhost:8000/rider/' + id,
		type: "DELETE",
		dataType: "json",
		success: function (resp) {
			alert(resp.status);
		},
		error: function (e) {
			alert("Error Occured.");
		}
	});
}

function search_rider(id) {
	$.ajax({
				url: 'http://localhost:8000/rider/'+ id,
				type:"GET",
				dataType: "json",
				success: function(resp) {
					$("#display").remove();
					$("#display-search").append("<tr>"+
                    "<td width='233px'>"+resp.rider_id+"</td>"+
                    "<td width='428px'>"+resp.rider_name+"</td>"+
                    "<td width='323px'>"+resp.rider_phone_number+"</td>"+
                    "<td width='260px'>"+resp.rider_username+"</td>"+"</tr>");
				},
				error: function (e) {
					alert("Please fill in the search box.");
				   }
			}); 
	}

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
var Add = document.getElementById("Add-rider");
//var Clear = document.getElementById("Clear");
var Edit = document.getElementById("Edit-rider");
var Delete = document.getElementById("Delete-rider");
var Search = document.getElementById("Search-rider");

logout_user.addEventListener('click', function(){
	logout();
})

Add.addEventListener('click', function(){
	var id = document.getElementById("rider-id").value;
	var name = document.getElementById("rider-name").value;
	var phone_number = document.getElementById("rider-pn").value;
	var username = document.getElementById("rider-un").value;
	var password = document.getElementById("rider-password").value;
	if (id == '' || name == '' || phone_number =='' || username == '' || password == ''){
		alert("Please fill in the blank");
	} else {
		rider_registration(id, name, phone_number, username, password);
	}
})

Edit.addEventListener('click', function(){
	var id = document.getElementById("rider-id-edit").value;
	var name = document.getElementById("rider-name-edit").value;
	var phone_number = document.getElementById("rider-pn-edit").value;
	if (id == '' || name == '' || phone_number ==''){
		alert("Please fill in the blank");
	} else {
		edit_rider(id, name, phone_number);
	}
})

Delete.addEventListener('click', function(){
	var id = document.getElementById("id-delete").value;
	if (id == ''){
		alert("Please select Customer ID to be deleted");
	} else {
		del_rider(id);
	}
})

Search.addEventListener('click', function(){
	var id = document.getElementById("search-id").value;
	search_rider(id);
})
