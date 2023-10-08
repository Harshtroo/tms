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
$("#create-project-btn").on("click",function(){
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
        var trTag = document.getElementById("project-tr")
        $("#message-container").fadeIn()
        setTimeout(function() {
            $("#message-container").fadeOut();
        }, 2000);
        const tableBodyRowCount = $("#project-table-body tr").length
        var newRow =
         `
        <tr>
            <td>${tableBodyRowCount + 1}</td>
            <td>${response.data.name}</td>
            <td><p class="btn create-task-btn" value="${response.data.id}" >+</p></td>
            <td>
                <button type="button" class="btn btn-primary edit-project-btn" data-bs-toggle="modal" data-bs-target="#project_edit" value="${response.data.id}">Edit
                </button>
            </td>
            <td>
                <button type="button" class="btn btn-primary delete-project-btn" value="${response.data.id}">Delete</button>
            </td>
        </tr>
         `
        $("#project-table-body").append(newRow)
        $("#project_name").val("");
        $("#summernote").val("");
    };
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
var table = $("#project-table")
var createProjectButton = $("#create-project-btn")
table.hide()
createProjectButton.hide()
$("#selector").on("click",function(){

      var url = projectURL
      if (table.is(":visible")) {
        table.hide();
        createProjectButton.hide();
      }else{
        table.show();
        createProjectButton.show();

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
                    var currentRow = $(this).closest("tr");

                    var callback = function(response){
                        showMessage("Project deleted successfully", "green");
                        currentRow.remove();
                        $("#message-container").fadeIn()
                        setTimeout(function() {
                            $("#message-container").fadeOut();
                        }, 2000);
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

var taskTable = $("#task-list-table")
var createTaskButton = $("#create-task-btn")
taskTable.hide()
createTaskButton.hide()



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
              <td><i class="fas fa-edit" style="color: red;"></i></td>
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