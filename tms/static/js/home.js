


$(document).ready(function() {
   $('#summernote').summernote();
   height: 200;
   focus: true
});

var content = $('#summernote').summernote('code');
var homeURL = ""
var projectURL = "/create_project/"

var showMessage = function (message, color) {
        var messageElement = $("<div>").text(message).css("color", color);
        $("#message-container").html(messageElement);
    };

$("#create_project").on("click",function(event){
    event.preventDefault()
    var csrfToken = $('input[name="csrfmiddlewaretoken"]').val()
    var redirectURL = homeURL
    var resultData = {"name": $("#project_name").val(),
                      "description":$("#summernote").val()}

    var token = localStorage.getItem("token")
    var callback = function(response){
        showMessage(response.success_message, "green");
                                $(".modal").modal("hide")
                                setTimeout(function () {
                                    window.location.href = redirectURL;
                                }, 2000);
     }
    postTokenAjaxCall(projectURL, csrfToken, token, callback, resultData,redirectURL)
})


var selectorBlock = false;

$("#selector").on("click",function(){
    if (selectorBlock) {
        return
    }
      var url = projectURL
      getAjaxCall(url,function(data){
            var projectDict  = jQuery.map(data.results,function(val){
                return val
            })

            for (var i = 0; i < projectDict.length; i++) {
                var projectName = projectDict[i].name;

                var ulTag = $(".project-list")
                var linkTag = `<li><a href='#'>${projectName}</a></li>`
                ulTag.append(linkTag);
            }
      })
selectorBlock = true;
})



$("ul").on("click", ".init", function() {
    $(this).closest("ul").children('li:not(.init)').toggle();
});

var allOptions = $("ul").children('li:not(.init)');
$("ul").on("click", "li:not(.init)", function() {
    allOptions.removeClass('selected');
    $(this).addClass('selected');

    allOptions.toggle();
});
