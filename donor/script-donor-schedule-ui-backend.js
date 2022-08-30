function display_schedule_by_donor_id()
{
$.ajax({
    		url: 'http://localhost:8000/donor/schedule',
    		type:"GET",
    		dataType: "json",
    		success: function(resp) {
				$("#display").html("");
				if (resp.status  == 'OK') {
				   for (i = 0; i < resp.size; i++)
					{
						sched_id = resp.tasks[i].sched_id;
                	    time = resp.tasks[i].time;
                        date = resp.tasks[i].date;
                        donor_id = resp.tasks[i].donor_id;
                        donor_info = resp.tasks[i].donor_info;
            	        rider_id = resp.tasks[i].rider_id;
                        item = resp.tasks[i].item_id;
						$("#display").append("<tr>"+
						"<td width='170px'>"+sched_id+"</td>"+
						"<td width='155px'>"+date+"</td>"+
						"<td width='157px'>"+time+"</td>"+
                        "<td width='166px'>"+donor_id+"</td>"+
                        "<td width='260px'>"+donor_info+"</td>"+
                        "<td width='167px'>"+rider_id+"</td>"+
                        "<td width='167px'>"+item+"</td>"+"</tr>");
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

var logout_user = document.getElementById("logout-user");

logout_user.addEventListener('click', function(){
  logout_donor();
})