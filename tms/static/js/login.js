
var loginURL = "/login/"
var homeURL = "http://127.0.0.1:8000/"

var showMessage = function (message, color) {
        var messageElement = $("<div>").text(message).css("color", color);
        $("#message-container").html(messageElement);
    };


$("#login").on("submit",function(event){
     event.preventDefault()
     var csrfToken = $('input[name="csrfmiddlewaretoken"]').val()
     var resultData = {"username":$("#username").val(),
                        "password":$("#password").val()}
     var redirectURL = homeURL
     var callback = function(response){
         showMessage(response.success_message, "green");
                                setTimeout(function () {
                                    window.location.href = redirectURL;
                                }, 3000);
     }
     postAjaxCall(loginURL, csrfToken, resultData,callback)
})