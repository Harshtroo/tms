
function getAjaxCall(url,data){

    $.ajax({
        url:url,
        method:"GET",
        success: data,
        error: function(xhr,status, error){
            console.log(error)
        }
    })
}


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
    dataType:"json",
    headers: { 'X-CSRFToken': csrfToken,"Authorization": "Token " + token },
    data: resultData,
    success: callback,
    error: function(reason, xhr) {
          showMessage(reason.responseText, "red");
    }
  });
}

/* this function for edit and delete api call*/
function patchDeleteAjaxCall(url, method, csrfToken, token, callback, resultData, redirectURL) {
  $.ajax({
    url: url,
    method: method,
    headers: { 'X-CSRFToken': csrfToken, "Authorization": "Token " + token },
    data: resultData,
    success: callback,
    error: function(reason, xhr) {
          showMessage(reason.responseText, "red");
    }
  });
}




