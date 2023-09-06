var baseURL = "http://127.0.0.1:8000"

function postAjaxCall(url, csrfToken, resultData,  callback) {
  $.ajax({
    url: url,
    method: "POST",
    headers: { 'X-CSRFToken': csrfToken },
    data: resultData,
    success: callback,
    error: function(reason, xhr) {
      console.log("error in processing your request", reason);
    }
  });
}
