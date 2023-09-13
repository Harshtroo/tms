
var loginURL = "/login/"
var homeURL = "http://127.0.0.1:8000/"
$("#login").on("submit",function(event){
     event.preventDefault()
     var csrfToken = $('input[name="csrfmiddlewaretoken"]').val()
     var resultData = {"username":$("#username").val(),
                        "password":$("#password").val()}
     var redirectURL = homeURL
     postAjaxCall(loginURL, csrfToken, resultData, redirectURL)
})