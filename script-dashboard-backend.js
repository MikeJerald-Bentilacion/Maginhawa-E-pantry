function display_total()
{
    $.ajax({
        url: 'http://localhost:8000/item',
        type:"GET",
        dataType: "json",
        success: function(resp) {
            $("#item").append("<p style='margin-top: 0.5em; font-size: 1.5em;'>"+resp.size+"</p>");
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
            $("#donor").append("<p style='margin-top: 0.5em; font-size: 1.5em;'>"+resp.size+"</p>");
        },
        error: function (e) {
            alert("danger");
        }
    });
    $.ajax({
        url: 'http://localhost:8000/schedule',
        type:"GET",
        dataType: "json",
        success: function(resp) {
            $("#schedule").append("<p style='margin-top: 0.5em; font-size: 1.5em;'>"+resp.size+"</p>");
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
            $("#rider").append("<p style='margin-top: 0.5em; font-size: 1.5em;'>"+resp.size+"</p>");
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