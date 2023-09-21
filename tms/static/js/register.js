
var registerURL = "/register/"

var showMessage = function (message, color) {
        var messageElement = $("<div>").text(message).css("color", color);
        $("#message-container").html(messageElement);
    };

$("#user_register").on("submit",function(event){
     event.preventDefault()
     var csrfToken = $('input[name="csrfmiddlewaretoken"]').val()
     var resultData = {"first_name":$("#first_name").val(),
                        "last_name" :$("#last_name").val(),
                        "username" :$("#username").val(),
                        "email":$("#email").val(),
                        "groups":$("#groups").val(),
                        "password":$("#password").val(),
                        "password_confirm":$("#password_confirm").val()}

     var redirectURL = "/login_page/"
     var callback = function(response){
            showMessage(response.success_message, "green");
                            setTimeout(function () {
                                window.location.href = redirectURL;
                            }, 3000);
     }
     postAjaxCall(registerURL, csrfToken, resultData,callback)
})


