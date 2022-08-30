function display_not_received_by_donor_id()
{
$.ajax({
    		url: 'http://localhost:8000/donor/item/notreceived',
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
						"<td width='231px'>"+item_id+"</td>"+
						"<td width='283px'>"+donor_id+"</td>"+
						"<td width='446px'>"+donation_type+"</td>"+
						"<td width='285px'>"+quantity+"</td>"+"</tr>");
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

function display_donor_user() {
	$.ajax({
		url: 'http://localhost:8000/donor/user',
		type:"GET",
		dataType: "json",
		success: function(resp) {
			$("#donor-name").html("");
			if (resp.status  == 'OK') {
			   for (i = 0; i < resp.size; i++)
					{
						donor_name = resp.tasks[i].donor_name;
						donor_username = resp.tasks[i].donor_username;
						$("#donor-name").append("<p style='margin: 0; padding: 1em; background-color: #00acee; text-align: center; color: white;'>"+donor_username+"</p>");
						$("#donor-name2").append("<h3>"+donor_name+"</h3>");
						$(".donor-name3").append("<p style='display:inline; font-size: 16px;'>"+donor_name+"▾"+"</p>");
									
					}
			} else
			{
				$("#donor-name").html("");
				alert(resp.status);
			}
		},
		error: function (e) {
			alert("danger");
		   }
	}); 
}

function logout_donor() {
	$.ajax({
		url: 'http://localhost:8000/donor/logout',
		type:"POST",
    	dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function (resp) {
			alert(resp.Message);
			location.replace("login-donor.html");
		},
		error: function (e) {
			alert("Error Occured.");
		}
	});
}

var Donate = document.getElementById("donate-item");
var logout_user = document.getElementById("logout-user");

logout_user.addEventListener('click', function(){
  logout_donor();
})

Donate.addEventListener('click', function(){
	var item_id = document.getElementById("item-id").value;
	var donation_type = document.getElementById("donation-type").value;
	var quantity = document.getElementById("total-item").value;
	if (item_id == '' || donation_type == '' || quantity == ''){
		alert("Please fill in the blank");
	} else {
		donate_item(item_id, donation_type, quantity);
	}
})
