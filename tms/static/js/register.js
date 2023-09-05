
var registerURL = baseURL + '/register/'

$("#user_register").on("submit",function(event){

     event.preventDefault()
     var csrfToken = $('input[name="csrfmiddlewaretoken"]').val()
     var resultData = $(this).serialize();

     var contentType =  "application/json"
     var processData =  true
     var callback = function(response) {

                         window.location.href = baseURL + "/login/";
                      };

     postAjaxCall(registerURL, csrfToken, resultData,  callback, contentType, processData)
})
