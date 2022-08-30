function display_donor()
{

$.ajax({
    		url: 'http://localhost:8000/donor',
    		type:"GET",
    		dataType: "json",
    		success: function(resp) {
				$("#display").html("");
				if (resp.status  == 'OK') {
				   for (i = 0; i < resp.size; i++)
                        {
                            donor_id = resp.tasks[i].donor_id;
                	        donor_name = resp.tasks[i].donor_name;
                            donor_address = resp.tasks[i].donor_address;
                            donor_phone_number = resp.tasks[i].donor_phone_number;
                            donor_username = resp.tasks[i].donor_username;
                            donor_password = resp.tasks[i].donor_password;
							$("#display").append("<tr>"+
							"<td width='185px'>"+donor_id+"</td>"+
							"<td width='350px'>"+donor_name+"</td>"+
							"<td width='255px'>"+donor_address+"</td>"+
							"<td width='255px'>"+donor_phone_number+"</td>"+
                            "<td width='200px'>"+donor_username+"</td>"+"</tr>");
										
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
$.ajax({
	url: 'http://localhost:8000/donor',
	type:"GET",
	dataType: "json",
	success: function(resp) {
		$("#dropdown").html("");
		if (resp.status  == 'OK') {
		   for (i = 0; i < resp.size; i++)
				{
					donor_id = resp.tasks[i].donor_id;
					$("#dropdown").append("<option>" +
					donor_id + "</option>"
					);
				}
		} else
		{
			$("#dropdown").html("");
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

function donor_registration(id, name, address, phone_number, username, password) {
	$.ajax({
		url: 'http://localhost:8000/donor',
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			donor_id: id,
			donor_name: name,
			donor_address: address,
			donor_phone_number: phone_number,
			donor_username: username,
			donor_password: password
		}),
		success: function (data) {
			alert(data.status);
		},
		error: function (e) {
			alert("Error Occured.");
		}
	});
}

function edit_donor(id, name, address, phone_number) {
	$.ajax({
		url: 'http://localhost:8000/donor',
		type: "PUT",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			donor_id: id,
			donor_name: name,
			donor_address: address,
			donor_phone_number: phone_number
		}),
		success: function (data) {
			alert(data.status);
		},
		error: function (e) {
			alert("Error Occured.");
		}
	});
}

function del_donor(id) {
	$.ajax({
		url: 'http://localhost:8000/donor/' + id,
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

function search_donor(id) {
	$.ajax({
				url: 'http://localhost:8000/donor/'+ id,
				type:"GET",
				dataType: "json",
				success: function(resp) {
					$("#display").remove();
					$("#display-search").append("<tr>"+
					"<td width='185px'>"+resp.donor_id+"</td>"+
					"<td width='350px'>"+resp.donor_name+"</td>"+
					"<td width='255px'>"+resp.donor_address+"</td>"+
					"<td width='255px'>"+resp.donor_phone_number+"</td>"+
					"<td width='200px'>"+resp.donor_username+"</td>"+"</tr>");
				},
				error: function (e) {
					alert("Please fill in the search box.");
				   },
				   beforeSend: function (xhrObj){
					 xhrObj.setRequestHeader("Authorization",
						   "Basic " + btoa("Zaide:Zaide001"));
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
var Add = document.getElementById("Add-donor");
var Clear = document.getElementById("Clear");
var Edit = document.getElementById("Edit-donor");
var Delete = document.getElementById("Delete-donor");
var Search = document.getElementById("Search-donor");

logout_user.addEventListener('click', function(){
	logout();
})

Add.addEventListener('click', function(){
	var id = document.getElementById("donor-id").value;
	var name = document.getElementById("donor-name").value;
	var address = document.getElementById("donor-address").value;
	var phone_number = document.getElementById("phone-number").value;
	var username = document.getElementById("donor-username").value;
	var password = document.getElementById("donor-password").value;
	if (id == '' || name == '' || address == '' || phone_number =='' || username == '' || password == ''){
		alert("Please fill in the blank");
	} else {
		donor_registration(id, name, address, phone_number, username, password);
	}
})

Edit.addEventListener('click', function(){
	var id_edit = document.getElementById("dropdown").value;
	var name = document.getElementById("name-edit").value;
	var address = document.getElementById("address-edit").value;
	var phone_number = document.getElementById("phone-number-edit").value;
	var username = document.getElementById("username-edit").value;
	if (id_edit == '' || name == '' || address == '' || phone_number ==''){
		alert("Please fill in the blank");
	} else {
		edit_donor(id_edit, name, address, phone_number);
	}
})

Delete.addEventListener('click', function(){
	var id = document.getElementById("id-delete").value;
	if (id == ''){
		alert("Please select Customer ID to be deleted");
	} else {
		del_donor(id);
	}
})

Search.addEventListener('click', function(){
	var id = document.getElementById("search-id").value;
	search_donor(id);
})