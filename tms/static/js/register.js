
var registerURL = baseURL + '/register/'

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

     var showMessage = function (message, color) {
        var messageElement = $("<div>").text(message).css("color", color);
        $("#message-container").html(messageElement);
        setTimeout(function () {
            messageElement.fadeOut(500, function () {
                $(this).remove();
            });
        }, 5000);
    };
     var callback = function(response) {
                        debugger
                        if (response.status === "success") {
                            showMessage("Registration successful!", "green");
                            window.location.href = baseURL + "/login/";
                        } else if (response.status === "error") {
                            showMessage("Error: " + response.message, "red");
                        }
                      };

     postAjaxCall(registerURL, csrfToken, resultData,  callback)
})
