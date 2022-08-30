function display_item()
{
$.ajax({
    		url: 'http://localhost:8000/item',
    		type:"GET",
    		dataType: "json",
    		success: function(resp) {
				$("#display").html("");
				if (resp.status  == 'OK') {
				   for (i = 0; i < resp.size; i++)
                        {
                            item_id = resp.tasks[i].item_id;
                	        donation_type = resp.tasks[i].donation_type;
                            quantity = resp.tasks[i].quantity;
                            donor_id = resp.tasks[i].donor_id;
							$("#display").append("<tr>"+
							"<td width='234px'>"+item_id+"</td>"+
							"<td width='323px'>"+donor_id+"</td>"+
							"<td width='427px'>"+donation_type+"</td>"+
                            "<td width='260px'>"+quantity+"</td>"+"</tr>");
										
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