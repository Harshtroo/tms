
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



$("#dropdownMenuButton1").on("click",function(){
      var url = projectURL
      getAjaxCall(url,function(data){
            console.log("data-----------------",data)
            var projectDict  = jQuery.map(data,function(val){
                console.log("val--------------",val)
                return val
            })
            var dropdownMenu = $(".dropdown-menu");
            dropdownMenu.empty();
            for (var i = 0; i < projectDict.length; i++) {
                var projectName = projectDict[i].name;
                console.log("Project Name:", projectName);
                var listItem = $("<li>").append($("<a>").addClass("dropdown-item").attr("href", "#").text(projectName));
                dropdownMenu.append(listItem);

            }

      })

})



//const dropdownButton = document.getElementById('dropdownMenuButton1');
//const dropdownMenu = document.querySelector('.dropdown-menu');
//
//dropdownButton.addEventListener('click', function() {
//  dropdownMenu.classList.toggle('show');
//
//});
