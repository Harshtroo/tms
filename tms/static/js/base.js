
function postAjaxCall(url, csrfToken, resultData,redirectURL) {
  $.ajax({
    url: url,
    method: "POST",
    headers: { 'X-CSRFToken': csrfToken },
    data: resultData,
    success: function(response){
            callback(response, redirectURL)},
    error: function(reason, xhr) {
          callback({responseText: reason.responseText}, redirectURL)
    }
  });
}

var callback = function (context,redirectURL){
    if (context.status == "success") {
                            showMessage(context.success_message, "green");
                            setTimeout(function () {
                                window.location.href = redirectURL;
                            }, 5000);
                        } else {
                            showMessage(context.responseText, "red");
                        }
}

var showMessage = function (message, color) {

        var messageElement = $("<div>").text(message).css("color", color);
        $("#message-container").html(messageElement);
    };
