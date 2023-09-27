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
$("#add-project").on("click",function(){
    $(".create-project").modal("show")
})

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
                  `;
            }

            tableHTML += `
                </tbody>
              </table>
            `
            table.innerHTML = tableHTML;

            /* edit button functionality */
             $(".edit-project-btn").on("click",function(){
                var projectId = $(this).val()
                var projectEditURL = "projects/" + projectId +"/"

                getAjaxCall(projectEditURL,function(response){
                     var projectDetails = jQuery.map(data.results,function(project_details){
                        return project_details
                     })

                     for (var project_no = 0; project_no < projectDetails.length; project_no++) {
                         $("#edit-project-name").val(projectDetails[project_no].name);
                         $("#edit-summernote").val(projectDetails[project_no].description)
                     }
                     $(document).ready(function() {
                           $('#edit-summernote').summernote();
                           height: 200;
                           focus: true
                     });
                     $('.edit-modal').modal('show');
                })
                /* edit save button event handle */
                $("#edit_project").on("click",function(){
                    var redirectURL = ""
                    var resultData = {"name": $("#edit-project-name").val(),
                                      "description":$("#edit-summernote").val()}
                    var csrfToken = $('input[name="csrfmiddlewaretoken"]').val()
                    var token = localStorage.getItem("token");
                    var callback = function(response){
                        showMessage("Project successfully Edit", "green");
                            setTimeout(function() {
                              window.location.href = redirectURL;
                            }, 2000)
                    }
                    patchAjaxCall(projectEditURL, csrfToken, token, callback, resultData, redirectURL)
                })

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





