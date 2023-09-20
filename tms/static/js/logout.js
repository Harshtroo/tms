
var logoutURL ="/logout/"
var homeURL = "http://127.0.0.1:8000/"

var showMessage = function (message, color) {
        var messageElement = $("<div>").text(message).css("color", color);
        $("#message-container").html(messageElement);
    };

$("#logout").on("click",function(event){
         event.preventDefault()
         var csrfToken = $('input[name="csrfmiddlewaretoken"]').val()
         var redirectURL = homeURL
         var resultData = {}
         var token = localStorage.getItem("token");
         var callback = function(response){
            showMessage(response.success_message, "green");
                setTimeout(function() {
                  window.location.href = redirectURL;
                }, 3000)
         }
         postTokenAjaxCall(logoutURL, csrfToken, token, callback, resultData, redirectURL)
})

