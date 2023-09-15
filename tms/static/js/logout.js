//
//var logoutURL ="/logout/"
var homeURL = "http://127.0.0.1:8000/"
//
//
document.getElementById("logout").addEventListener("click",function(){
         var csrfToken = $('input[name="csrfmiddlewaretoken"]').val()
         var redirectURL = homeURL
         var resultData = ""
         postAjaxCall(logoutURL, csrfToken, resultData,redirectURL)
})
//
////
////document.getElementById("logout").addEventListener("click",function(){
////    var csrfToken = $('input[name="csrfmiddlewaretoken"]').val()
////    var resultData = ""
////    $.ajax({
////        url: logoutURL,
////        method: "POST",
////        headers: { 'X-CSRFToken': csrfToken },
////        data: resultData,
////        success: function(response){
////            window.location.href = redirectURL
////            console.log("response--------------",response)
////        },
////        error: function(reason, xhr) {
////
////          }
////    })
////})
//
