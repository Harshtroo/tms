var baseURL = "http://127.0.0.1:8000"

function getData(url,resultData,callback){
    $.ajax({
    url : url,
    method : "GET",
    dataType : "json",
    data: resultData,
    success : callback,
    error : function (reason, xhr){
     console.log("error in processing your request", reason);
    }
   });
 }


function postAjaxCall(url, csrfToken, resultData,  callback, contentType, processData) {
  $.ajax({
    url: url,
    method: "POST",
    headers: { 'X-CSRFToken': csrfToken },
    contentType: contentType,
    processData: processData,
    data: resultData,
    success: callback,
    error: function(reason, xhr) {
      console.log("error in processing your request", reason);
    }
  });
}
