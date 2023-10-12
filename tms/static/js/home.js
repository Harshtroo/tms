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
         `jQuery(".dname").find("td:eq(1)").text()
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
        $(".create-task-btn").on("click",function(event){
            $(".create-task").show()
            event.preventDefault()
            createTask()
        })
        $("edit-project-btn").on("click",function(){
            editProject()
        })
        $(".delete-project-btn").on("click",function(){
            projectDelete()
        })

    };
    postTokenAjaxCall(projectURL, csrfToken, token, callback, resultData,redirectURL)
})



/* project edit functionality */
function editProject(){
    var projectGetId = $(this).val()
    var projectEditURL = "projects/" + projectGetId +"/"

    getAjaxCall(projectEditURL,function(response){
         var projectDetails = jQuery.map(response,function(project_details){
            return project_details
         })
         $(document).ready(function() {
               $('#edit-summernote').summernote();
               height: 200;
               focus: true
         });
         for (var project_no = 1; project_no < projectDetails.length; project_no++) {
             if (projectDetails[project_no].id == projectGetId){
                 $("#edit-project-name").val(projectDetails[project_no].name);
                 $("#edit-summernote").val(projectDetails[project_no].description)
                 $('#edit-summernote').summernote('code', projectDetails[project_no].description);
                 break
             }
         }
         $('.edit-modal').modal('show');
    })

    /* edit save button event handle */
    $("#edit_project ").on("click",function(){
        var method = "PATCH"
        var resultData = {"name": $("#edit-project-name").val(),
                          "description":$("#edit-summernote").val()}
        var csrfToken = $('input[name="csrfmiddlewaretoken"]').val()
        var token = localStorage.getItem("token");
        var callback = function(response){
            showMessage("Project successfully Edit", "green");
            $('.edit-modal').modal('hide')
            $('.modal-backdrop').remove();
            $("#message-container").fadeIn()
            setTimeout(function() {
                $("#message-container").fadeOut();
            }, 2000);

            var updateProjectRow = `
            <tr data-project-id="${projectGetId}">
                <td>${projectGetId}</td>
                <td>${resultData.name}</td>
                <td><p class="btn create-task-btn" value="{{project_items.pk}}">+</p></td>
                <td>
                    <button type="button" class="btn btn-primary edit-project-btn" data-bs-toggle="modal"
                    data-bs-target="#project_edit" value="${resultData.id}">Edit
                    </button>
                </td>
                <td>
                    <button type="button" class="btn btn-primary delete-project-btn" value="${resultData.id}">Delete</button>
                </td>
            </tr>
            `

            var projectTableBody = $("#project-table-body");
            var projectRow = projectTableBody.find(`tr[data-project-id="${projectGetId}"]`)
            projectRow.replaceWith(updateProjectRow);
//            projectRow.find("td:eq(4)").text(resultData.description);
        }
        patchDeleteAjaxCall(projectEditURL, method, csrfToken, token, callback, resultData)
    })
}

/* project delete functionality */
function projectDelete(){
    $(".delete-project-btn").on("click",function(){
        var method = "DELETE"
        var resultData = $(this).val()
        var csrfToken = $('input[name="csrfmiddlewaretoken"]').val()
        var projectDeleteURL = "projects/" + resultData +"/"
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
        patchDeleteAjaxCall(projectDeleteURL, method, csrfToken,token, callback, resultData)

    })
}


/* this code project list show */
var table = $("#project-table")
var createProjectButton = $("#create-project-btn")
table.hide()
createProjectButton.hide()

$("#selector").on("click",function(){
      /* create project button */
      var url = projectURL
      if (table.is(":visible")) {
        table.hide();
        createProjectButton.hide();
      }else{
        table.show();
        createProjectButton.show();
          getAjaxCall(url,function(data){
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
                $(document).on("click", ".edit-project-btn", editProject)

                /* delete button functionality */
                $(".delete-project-btn").on("click",function(){

                    projectDelete()
                })
          })
      }
})

/* create task JS */
$("#create-task-btn").on("click",function(){
    $(document).ready(function() {
           $("#create-task-summernote").summernote();
           height: 200;
           focus: true
    });
    $(".create-task").modal("show")
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
        $(".create-task").hide()
        $('.modal-backdrop').remove();
        $("#message-container").fadeIn()
        setTimeout(function() {
            $("#message-container").fadeOut();
        }, 2000);

        const taskTableBodyRowCount = $("#task-table-body tr").length

        var newTaskRow =
        `jQuery(".dname").find("td:eq(1)").text()
         <tr>
            <td>${taskTableBodyRowCount + 1 }</td>
            <td>${response.data.project_name}</td>
            <td>${response.data.name}</td>
            <td>${response.data.assignee_username}</td>
            <td>${response.data.due_date}</td>
            <td>${response.data.priority}</td>
            <td>
                <button id="task-edit" value="${response.data.id}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                  </svg>
                </button>
            </td>
            <td>
                <button class="task-delete" value="${response.data.id}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                  </svg>
                </button>
            </td>
         </tr>
        `
        $("#task-table-body").append(newTaskRow)
        $("#create-task-btn").on("click",function(event){
            $(".create-task").modal("show")
            event.preventDefault()

        })

    }
    postTokenAjaxCall(createTaskURL, csrfToken, token, callback, resultData, redirectURL)
}



/* task list show */
var taskTable = $("#task-list-table")
var createTaskButton = $("#create-task-btn")
taskTable.hide()
createTaskButton.hide()
$("#task-list").on("click", function() {
  var tableContainer = document.getElementById("task-list-table");

  var taskListURL = "/create_task/";
  if (taskTable.is(":visible")) {
    taskTable.hide();
    createTaskButton.hide();
  } else {
    taskTable.show();
    createTaskButton.show();
    var taskURL = "/create_task/"
    getAjaxCall(taskURL,function(response){
        $("#task_create").on("click",function(){
            createTask()
        })
        $(document).on("click","#task-edit", taskEdit)
        $(document).on("click", ".task-delete", taskDelete)
    })

  }
});

/* task edit functionality */
function taskEdit(){
    var taskId = $(this).val()
    var taskEditURL = "tasks/" + taskId + "/"

    getAjaxCall(taskEditURL, function(response){
        taskDetails = jQuery.map(response,function(task_details){
            return task_details
        })
        $(document).ready(function() {
               $('#edit-create-task-summernote').summernote();
               height: 200;
               focus: true
         });
        for (task_no=1; task_no < taskDetails.length; task_no++){
            if (taskDetails[task_no].id == taskId){
                $("#edit-select_project").val(taskDetails[task_no].project)
                $("#edit-task-name").val(taskDetails[task_no].name)
                $("#edit-select_user").val(taskDetails[task_no].assignee)
                $("#edit-due-date").val(taskDetails[task_no].due_date)
                $("#edit-select-priority").val(taskDetails[task_no].priority)
                $("#edit-select-status").val(taskDetails[task_no].status)
                $("#edit-create-task-summernote").val(taskDetails[task_no].description)
            }
        }
        $(".edit-task").modal("show")
    })
    $("#edit-task_create").on("click",function(){
        var method = "PATCH"
        var resultData = {"project":$("#edit-select_project").val(),
                           "name":$("#edit-task-name").val(),
                           "assignee":$("#edit-select_user").val(),
                           "due_date":$("#edit-due-date").val(),
                           "priority":$("#edit-select-priority").val(),
                           "status":$("#edit-select-status").val(),
                           "description":$("#edit-create-task-summernote").val()}
        var csrfToken = $('input[name="csrfmiddlewaretoken"]').val()
        var token = localStorage.getItem("token");
        var callback = function(response){
            showMessage("Task successfully Edit", "green");
            $(".edit-task").modal("hide")
            $('.modal-backdrop').remove();
            $("#message-container").fadeIn()
            setTimeout(function() {
                $("#message-container").fadeOut();
            }, 2000);
            var updatedTaskRow = `
            <tr>
                <td></td>
                <td>${resultData.project}</td>
                <td>${resultData.name}</td>
                <td>${resultData.assignee}</td>
                <td>${resultData.due_date}</td>
                <td>${resultData.priority}</td>
                <td>${resultData.status}</td>
                <td>${resultData.description}</td>
                <td><button id="task-edit" value="${resultData.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                        </svg>
                    </button>
                </td>
                <td>
                    <button class="task-delete" value="${resultData.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                        </svg>
                    </button>
                </td>
            </tr>
            `

//            var updatedTaskRow = "<tr>" +
//            "<td>" + resultData.project + "</td>" +
//            "<td>" + resultData.name + "</td>" +
//            "<td>" + resultData.assignee + "</td>" +
//            "<td>" + resultData.due_date + "</td>" +
//            "<td>" + resultData.priority + "</td>" +
//            "<td>" + resultData.status + "</td>" +
//            "<td>" + resultData.description + "</td>" +
//            "</tr>";

            $("#task-list-table tbody tr[data-task-id='" + taskId + "']").replaceWith(updatedTaskRow);
        }
        patchDeleteAjaxCall(taskEditURL, method, csrfToken, token, callback, resultData)
    })
}



/* task delete functionality */
function taskDelete(){
    var method = "DELETE"
            var resultData = $(this).val()
            var csrfToken = $('input[name="csrfmiddlewaretoken"]').val()
            var taskDeleteURL = "tasks/" + resultData + "/"
            var token = localStorage.getItem("token");
            var currentRow = $(this).closest("tr");

            var callback = function(response){
                showMessage("Task deleted successfully", "green");
                currentRow.remove();

                $("#message-container").fadeIn()
                setTimeout(function() {
                    $("#message-container").fadeOut();
                }, 2000);
            }
            patchDeleteAjaxCall(taskDeleteURL, method, csrfToken,token, callback, resultData)

}
