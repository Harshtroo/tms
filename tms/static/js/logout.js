
var logoutURL ="/logout/"
var homeURL = "http://127.0.0.1:8000/"


document.getElementById("logout").addEventListener("click",function(){
         var csrfToken = $('input[name="csrfmiddlewaretoken"]').val()
         var redirectURL = homeURL
         var resultData = ""
         postAjaxCall(logoutURL, csrfToken, resultData, redirectURL)
})


