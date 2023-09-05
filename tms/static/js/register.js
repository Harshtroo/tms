
var registerURL = baseURL + '/register/'

$("#user_register").on("submit",function(event){

     event.preventDefault()
     var csrfToken = $('input[name="csrfmiddlewaretoken"]').val()
     var resultData = $(this).serialize();
     var contentType = "application/json"
     var processData = true
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
                        if (response.status === "success") {
                            showMessage("Registration successful!", "green");
                            window.location.href = baseURL + "/login/";
                        } else if (response.status === "error") {
                            showMessage("Error: " + response.message, "red");
                        }
                      };

     postAjaxCall(registerURL, csrfToken, resultData,  callback, contentType, processData)
})
