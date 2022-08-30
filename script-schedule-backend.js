function display_schedule()
{
$.ajax({
    		url: 'http://localhost:8000/schedule',
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
                            user_id = resp.tasks[i].user_id;
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
$.ajax({
	url: 'http://localhost:8000/rider',
	type:"GET",
	dataType: "json",
	success: function(resp) {
		$("#dropdown-rider").html("");
		if (resp.status  == 'OK') {
		   for (i = 0; i < resp.size; i++)
				{
					rider_id = resp.tasks[i].rider_id;
					$("#dropdown-rider").append("<option>" +
					rider_id + "</option>"
					);
				}
		} else
		{
			$("#dropdown-rider").html("");
			alert(resp.status);
		}
	},
	error: function (e) {
		alert("danger");
	   }
	}); 
$.ajax({
	url: 'http://localhost:8000/item',
	type:"GET",
	dataType: "json",
	success: function(resp) {
		$("#dropdown-item").html("");
		if (resp.status  == 'OK') {
		   for (i = 0; i < resp.size; i++)
				{
					item_id = resp.tasks[i].item_id;
					$("#dropdown-item").append("<option>" +
					item_id + "</option>"
					);
				}
		} else
		{
			$("#dropdown-item").html("");
			alert(resp.status);
		}
	},
	error: function (e) {
		alert("danger");
	   }
	}); 
//edit
$.ajax({
	url: 'http://localhost:8000/donor',
	type:"GET",
	dataType: "json",
	success: function(resp) {
		$("#dropdown-edit").html("");
		if (resp.status  == 'OK') {
		   for (i = 0; i < resp.size; i++)
				{
					donor_id = resp.tasks[i].donor_id;
					$("#dropdown-edit").append("<option>" +
					donor_id + "</option>"
					);
				}
		} else
		{
			$("#dropdown-edit").html("");
			alert(resp.status);
		}
	},
	error: function (e) {
		alert("danger");
	   }
	}); 
$.ajax({
	url: 'http://localhost:8000/rider',
	type:"GET",
	dataType: "json",
	success: function(resp) {
		$("#dropdown-rider-edit").html("");
		if (resp.status  == 'OK') {
		   for (i = 0; i < resp.size; i++)
				{
					rider_id = resp.tasks[i].rider_id;
					$("#dropdown-rider-edit").append("<option>" +
					rider_id + "</option>"
					);
				}
		} else
		{
			$("#dropdown-rider-edit").html("");
			alert(resp.status);
		}
	},
	error: function (e) {
		alert("danger");
	   }
	}); 
$.ajax({
	url: 'http://localhost:8000/item',
	type:"GET",
	dataType: "json",
	success: function(resp) {
		$("#dropdown-item-edit").html("");
		if (resp.status  == 'OK') {
		   for (i = 0; i < resp.size; i++)
				{
					item_id = resp.tasks[i].item_id;
					$("#dropdown-item-edit").append("<option>" +
					item_id + "</option>"
					);
				}
		} else
		{
			$("#dropdown-item-edit").html("");
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

function schedule_entry(id, date, time, donor_id, donor_info, rider_id, item_id) {
	$.ajax({
		url: 'http://localhost:8000/schedule',
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			sched_id: id,
			time: time,
			date: date,
			donor_id: donor_id,
			donor_info: donor_info,
			rider_id: rider_id,
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

function edit_schedule(id, date, time, donor_id, donor_info, rider_id, item_id) {
	$.ajax({
		url: 'http://localhost:8000/schedule',
		type: "PUT",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			sched_id: id,
			time: time,
			date: date,
			donor_id: donor_id,
			donor_info: donor_info,
			rider_id: rider_id,
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

function delete_schedule(id) {
	$.ajax({
		url: 'http://localhost:8000/schedule/' + id,
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

function search_schedule(id) {
	$.ajax({
				url: 'http://localhost:8000/schedule/'+ id,
				type:"GET",
				dataType: "json",
				success: function(resp) {
					$("#display").remove();
					$("#display-search").append("<tr>"+
					"<td width='170px'>"+resp.sched_id+"</td>"+
					"<td width='155px'>"+resp.date+"</td>"+
					"<td width='157px'>"+resp.time+"</td>"+
                    "<td width='166px'>"+resp.donor_id+"</td>"+
                    "<td width='260px'>"+resp.donor_info+"</td>"+
                    "<td width='167px'>"+resp.rider_id+"</td>"+
                    "<td width='167px'>"+resp.item_id+"</td>"+"</tr>");
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
var Add = document.getElementById("Add-schedule");
var Edit = document.getElementById("Edit-schedule");
var Delete = document.getElementById("Delete-schedule");
var Search = document.getElementById("Search-schedule");

logout_user.addEventListener('click', function(){
	logout();
})

Add.addEventListener('click', function(){
	var id = document.getElementById("schedule-id").value;
	var date = document.getElementById("date").value;
	var time = document.getElementById("time").value;
	var donor_id = document.getElementById("dropdown").value;
	var donor_info = document.getElementById("donor-information").value;
	var rider_id = document.getElementById("dropdown-rider").value;
	var item_id = document.getElementById("dropdown-item").value;
	if (id == '' || date == '' || time == '' || donor_id =='' || donor_info == '' || rider_id == '' || item_id == ''){
		alert("Please fill in the blank");
	} else {
		schedule_entry(id, date, time, donor_id, donor_info, rider_id, item_id);
	}
})

Edit.addEventListener('click', function(){
	var id_edit = document.getElementById("schedule-id-edit").value;
	var date = document.getElementById("date-edit").value;
	var time = document.getElementById("time-edit").value;
	var donor_id = document.getElementById("dropdown-edit").value;
	var donor_info = document.getElementById("donor-information-edit").value;
	var rider_id = document.getElementById("dropdown-rider-edit").value;
	var item_id = document.getElementById("dropdown-item-edit").value;
	if (id_edit == '' || date == '' || time == '' || donor_id =='' || donor_info == '' || rider_id == '' || item_id == ''){
		alert("Please fill in the blank");
	} else {
		edit_schedule(id_edit, date, time, donor_id, donor_info, rider_id, item_id);
	}
})

Delete.addEventListener('click', function(){
	var id = document.getElementById("id-delete").value;
	if (id == ''){
		alert("Please select Schedule ID to be deleted");
	} else {
		delete_schedule(id);
	}
})

Search.addEventListener('click', function(){
	var id = document.getElementById("search-id").value;
	search_schedule(id);
})