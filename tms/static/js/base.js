
function postAjaxCall(url, csrfToken, resultData, callback) {
  $.ajax({
    url: url,
    method: "POST",
    headers: { 'X-CSRFToken': csrfToken },
    data: resultData,
    success:callback,
    error: function(reason, xhr) {
        showMessage(reason.responseText, "red");
    }
  });
}


function postTokenAjaxCall(url, csrfToken, token, callback, resultData,redirectURL) {
  $.ajax({
    url: url,
    method: "POST",
    dataType:"application/json",
    headers: { 'X-CSRFToken': csrfToken,"Authorization": "Token " + token },
    data: resultData,
    success: callback,
    error: function(reason, xhr) {
            debugger
          showMessage(reason.responseText, "red");
    }
  });
}



$("#add-project").on("click",function(){
    $('.modal').modal('show')

})


var homeURL = "http://127.0.0.1:8000/"
var projectURL = "/create_project/"

$("#create_project").on("click",function(){

    var csrfToken = $('input[name="csrfmiddlewaretoken"]').val()
    var redirectURL = homeURL
    var resultData = {"name": $("#project_name").val()}
    var redirectURL = homeURL
    var callback = function(response){
        console.log("response-------",response)
    }
    debugger

    postTokenAjaxCall(projectURL, csrfToken, token, callback, resultData,redirectURL)
})