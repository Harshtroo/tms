
function postAjaxCall(url, csrfToken, resultData,  callback) {
  $.ajax({
    url: url,
    method: "POST",
    headers: { 'X-CSRFToken': csrfToken },
    data: resultData,
    success: callback,
    error: function(reason, xhr) {
          console.log("error in processing your request", reason.responseText);
    }
  });
}


var showMessage = function (message, color) {
        var messageElement = $("<div>").text(message).css("color", color);
        $("#message-container").html(messageElement);
        setTimeout(function () {
            messageElement.fadeOut(500, function () {
                $(this).remove();
            });
        }, 3000);
    };