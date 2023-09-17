
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


function postTokenAjaxCall(url, csrfToken, callback, resultData,redirectURL) {
  $.ajax({
    url: url,
    method: "POST",
    headers: { 'X-CSRFToken': csrfToken,"Authorization": "Token " + token },
    data: resultData,
    success: callback,
    error: function(reason, xhr) {
          callback({responseText: reason.responseText}, redirectURL)
    }
  });
}



