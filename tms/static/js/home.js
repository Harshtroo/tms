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
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
            `;
            for (var project_no = 0; project_no < projectDict.length; project_no++) {
                var projectName = projectDict[project_no].name;
                var projectId = projectDict[project_no].id

                tableHTML += `
                    <tr>
                      {{id}}
                      <td>${project_no + 1}</td>
                      <td>${projectName}</td>
                      <td><button type="button" class="btn btn-primary edit-project-btn" data-bs-toggle="modal" data-bs-target="#project_edit" value="${projectId}">Edit</button></td>
                      <td><button type="button" class="btn btn-primary delete-project-btn"  value="${projectId}">Delete</button></td>
                    </tr>
                  `
                }

                tableHTML += `
                    </tbody>
                  </table>
                `
                table.innerHTML = tableHTML;

                /* edit button functionality */
                 $(".edit-project-btn").on("click",function(){
                    $('.edit-modal').modal('show');
                    debugger
                    var projectId = $(this).val()
                    var redirectURL = ""
                    var resultData = {"name": $("#project_name").val(),
                      "description":$("#summernote").val()}
                    var projectEditURL = "projects/" + projectId +"/"
                    var csrfToken = $('input[name="csrfmiddlewaretoken"]').val()
                    var token = localStorage.getItem("token");
                    var callback = function(response){

                        showMessage("Project successfully edit", "green");
                            setTimeout(function() {
                              window.location.href = redirectURL;
                            }, 2000)
                    }
                    putAjaxCall(projectEditURL, csrfToken, token, callback, resultData, redirectURL)
                })



                /* delete button functionality */
                $(".delete-project-btn").on("click",function(){
                    var resultData = $(this).val()
                    var csrfToken = $('input[name="csrfmiddlewaretoken"]').val()
                    var projectDeleteURL = "projects/" + resultData +"/"
                    var redirectURL = homeURL
                    var token = localStorage.getItem("token");
                    var callback = function(response){
                        showMessage("Project deleted successfully", "green");
                            setTimeout(function() {
                              window.location.href = redirectURL;
                            }, 2000)
                    }
                    deleteAjaxCall(projectDeleteURL, csrfToken,token, callback, resultData,redirectURL)
                })
            })
})





