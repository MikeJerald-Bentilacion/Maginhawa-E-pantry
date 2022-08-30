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

function display_rider_user() {
	$.ajax({
		url: 'http://localhost:8000/rider/user',
		type:"GET",
		dataType: "json",
		success: function(resp) {
			$("#rider-name").html("");
			if (resp.status  == 'OK') {
			   for (i = 0; i < resp.size; i++)
					{
						rider_name = resp.tasks[i].rider_name;
						rider_username = resp.tasks[i].rider_username;
						$("#rider-name").append("<p style='margin: 0; padding: 1em; background-color: #00acee; text-align: center; color: white;'>"+rider_username+"</p>");
						$("#rider-name2").append("<h3>"+rider_name+"</h3>");
						$(".rider-name3").append("<p style='display:inline; font-size: 16px;'>"+rider_name+"▾"+"</p>");
									
					}
			} else
			{
				$("#rider-name").html("");
				alert(resp.status);
			}
		},
		error: function (e) {
			alert("danger");
		   }
	}); 
}

function donation_received(item_id) {
	$.ajax({
		url: 'http://localhost:8000/item/received',
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			item_id: item_id
		}),
		success: function (data) {
			alert(data.status);
		},
		error: function (e) {
			alert("Error Occured.");
		}
	});
}

function donation_not_received(item_id) {
	$.ajax({
		url: 'http://localhost:8000/item/not_received',
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			item_id: item_id
		}),
		success: function (data) {
			alert(data.status);
		},
		error: function (e) {
			alert("Error Occured.");
		}
	});
}

function logout_rider() {
	$.ajax({
		url: 'http://localhost:8000/rider/logout',
		type:"POST",
    	dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function (resp) {
			alert(resp.Message);
			location.replace("login-rider.html");
		},
		error: function (e) {
			alert("Error Occured.");
		}
	});
}

var logout_user = document.getElementById("logout-user");
var received = document.getElementById("donation-received");
var not_received = document.getElementById("donation-not-received");

logout_user.addEventListener('click', function(){
  logout_rider();
})

received.addEventListener('click', function(){
	var item_id = document.getElementById("item-id-received").value;
	if (item_id == '') {
		alert("Please fill in the blank");
	} else {
		donation_received(item_id);
	}
})

not_received.addEventListener('click', function(){
	var item_id = document.getElementById("item-id-not-received").value;
	if (item_id == '') {
		alert("Please fill in the blank");
	} else {
		donation_not_received(item_id);
	}
})