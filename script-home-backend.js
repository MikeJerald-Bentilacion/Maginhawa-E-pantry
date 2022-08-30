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