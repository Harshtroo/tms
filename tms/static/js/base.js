
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

var callback = function (response,redirectURL){
    if (response.status == "success") {
                            document.location.href = redirectURL
                            showMessage(response.success_message, "green");
                        } else {
                            showMessage("Error: " + response.errors, "red");
                        }
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
