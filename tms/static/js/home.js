
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

/* this code for create project */

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


/* this code project list show */

$("#selector").on("click",function(){
      var table = document.getElementById("table")
      var url = projectURL

      getAjaxCall(url,function(data){
            var projectDict  = jQuery.map(data.results,function(val){
                return val
            })

            var tbody = document.getElementsByTagName("tbody")
            var tableHTML = `
              <table class="table justify-content-center">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Project name</th>
                  </tr>
                </thead>
                <tbody>
            `;
            for (var i = 0; i < projectDict.length; i++) {
                var projectName = projectDict[i].name;
                tableHTML += `
                    <tr>
                      <td>${i + 1}</td>
                      <td>${projectName}</td>
                    </tr>
                  `;
                }
                tableHTML += `
                    </tbody>
                  </table>
                `;
                table.innerHTML = tableHTML;
      })

})


