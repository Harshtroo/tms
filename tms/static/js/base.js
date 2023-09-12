
function postAjaxCall(url, csrfToken, resultData,redirectURL) {
  $.ajax({
    url: url,
    method: "POST",
    headers: { 'X-CSRFToken': csrfToken },
    data: resultData,
    success: function(response){
            callback(response, redirectURL)},
    error: function(reason, xhr) {
          console.log("error in processing your request", reason.responseText);
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
                            showMessage("Error: " + context.errors, "red");
                        }
}

var showMessage = function (message, color) {

        var messageElement = $("<div>").text(message).css("color", color);
        $("#message-container").html(messageElement);
    };
