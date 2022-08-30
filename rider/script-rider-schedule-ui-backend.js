function display_schedule_by_rider_id()
{
$.ajax({
    		url: 'http://localhost:8000/rider/schedule',
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

logout_user.addEventListener('click', function(){
  logout_rider();
})