
var registerURL = "/register/"

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
     postAjaxCall(registerURL, csrfToken, resultData,redirectURL)
})
