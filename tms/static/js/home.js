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


/* create task function */
function createTask(){
    var createTaskURL = "/create_task/"
    var csrfToken = $('input[name="csrfmiddlewaretoken"]').val()
    var redirectURL = homeURL
    var resultData = {"project":$("#select_project").val(),
                       "name":$("#task-name").val(),
                       "assignee":$("#select_user").val(),
                       "due_date":$("#due-date").val(),
                       "priority":$("#select-priority").val(),
                       "status":$("#select-status").val(),
                       "description":$("#create-task-summernote").val()}
    var token = localStorage.getItem("token")
    var callback = function(response){
        showMessage(response.success_message, "green");
                                $(".modal").modal("hide")
                                setTimeout(function () {
                                    window.location.href = redirectURL;
                                }, 2000);
        }
    postTokenAjaxCall(createTaskURL, csrfToken, token, callback, resultData, redirectURL)
}


/* this code project list show */

$("#selector").on("click",function(){
      var table = document.getElementById("table")
      var url = projectURL
      var isVisible = table.style.display !== "none";

      if (isVisible) {
        table.style.display = "none"; // Hide the table
      }else{
        table.style.display = "block"

          getAjaxCall(url,function(data){

                var projectDict  = jQuery.map(data.results,function(val){
                    return val
                })

                var tbody = document.getElementsByTagName("tbody")
                var tableHTML = `
                  <table class="table justify-content-center">
                    <thead>var resultData
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Project name</th>
                        <th scope="col">Add Task</th>
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
                          <td>${project_no + 1}</td>
                          <td>${projectName}</td>
                          <td><p class="btn create-task-btn" value="${projectId}">+</p></td>
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

                /* project list in create task*/
                $(".create-task-btn").on("click",function(){
                    $(document).ready(function() {
                               $("#create-task-summernote").summernote();
                               height: 200;
                               focus: true
                         });
                    $(".create-task").modal("show")
                })

                /* edit button functionality */
                 $(".edit-project-btn").on("click",function(){

                    var projectGetId = $(this).val()
                    var projectEditURL = "projects/" + projectGetId +"/"

                    getAjaxCall(projectEditURL,function(response){

                         var projectDetails = jQuery.map(response,function(project_details){
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

                        var method = "PATCH"
                        var redirectURL = ""
                        var resultData = {"name": $("#edit-project-name").val(),
                                          "description":$("#edit-summernote").val()}
                        var csrfToken = $('input[name="csrfmiddlewaretoken"]').val()
                        var token = localStorage.getItem("token");
                        var callback = function(response){
                            showMessage("Project successfully Edit", "green");
                                $('.edit-modal').modal('hide')
                                setTimeout(function() {
                                  window.location.href = redirectURL;
                                }, 2000)
                        }
                        patchDeleteAjaxCall(projectEditURL, method, csrfToken, token, callback, resultData, redirectURL)
                    })

                })

                /* delete button functionality */
                $(".delete-project-btn").on("click",function(){
                    var method = "DELETE"
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
                    patchDeleteAjaxCall(projectDeleteURL, method, csrfToken,token, callback, resultData,redirectURL)
                })
          })
      }
})


/* create task JS */
$("#create-task").on("click",function(){
    $(document).ready(function() {
           $("#create-task-summernote").summernote();
           height: 200;
           focus: true
    });
    $(".create-task").modal("show")
})

/* nav bar create task */
$("#task_create").on("click",function(event){
    event.preventDefault()
    createTask()
})


/* task list show */
$("#task-list").on("click", function() {
  var tableContainer = document.getElementById("task-list-table");
  var taskListURL = "/create_task/";
  var isVisible = tableContainer.style.display !== "none";
  if (isVisible) {
    tableContainer.style.display = "none";
  } else {
    tableContainer.style.display = "block";

    getAjaxCall(taskListURL, function(data) {
      var taskDict = jQuery.map(data.results, function(val) {
        return val;
      });

      var taskGroups = {};
      for (var task_no = 0; task_no < taskDict.length; task_no++) {
        var project = taskDict[task_no].project;
        debugger
        if (!taskGroups[project]) {
          taskGroups[project] = [];
        }
        taskGroups[project].push(taskDict[task_no]);
      }
      tableContainer.innerHTML = "";

      for (var project in taskGroups) {
        var tasks = taskGroups[project];
        var tableHTML = `
          <table class="table justify-content-center">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Project name</th>
                <th scope="col">Task name</th>
                <th scope="col">Assignee</th>
                <th scope="col">Due date</th>
                <th scope="col">Priority</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
        `;

        for (var task_no = 0; task_no < tasks.length; task_no++) {
          var task = tasks[task_no];
          var taskName = task.name;
          var taskId = task.id
          var assigneeId = task.assignee_username;
          var dueDate = task.due_date;
          var priority = task.priority;
          var projectName = task.project_name
          var dateArr = dueDate.split("-")
          var formateDate = dateArr[2]+'-'+dateArr[1]+'-'+dateArr[0];

          tableHTML += `
            <tr>
              <td>${task_no + 1}</td>
              <td id="project-name-${task_no}">${projectName}</td>
              <td>${taskName}</td>
              <td>${assigneeId}</td>
              <td>${formateDate}</td>
              <td>${priority}</td>
              <td><button class="edit-task-btn" data-task-id="${taskId}" style="background: none; border: none;"><i class="fas fa-edit" style="color: red;"></i></button></td>
            </tr>
          `;
        }

        tableHTML += `
          </tbody>
        </table>
        `;
        var tableDiv = document.createElement("div");
        tableDiv.innerHTML = tableHTML;
        tableContainer.appendChild(tableDiv);
      }
    });
  }
});