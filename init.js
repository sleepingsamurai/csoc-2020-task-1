function getTasks() {
    /***
     * @todo Fetch the tasks created by the user and display them in the dom.
     */
     $.ajax({
        headers: {
            Authorization: 'Token ' + localStorage.getItem('token'),
        },
        url: API_BASE_URL + 'todo/',
        method: 'GET',
        success: function(data,status,xhr){
            if(data.length === 0){
                $('#taskList').replaceWith('<ul class="list-group todo-available-tasks" id="taskList"><span class="badge badge-primary badge-pill todo-available-tasks-text">No Tasks Inserted</span></ul>');
            }else{
                $('#taskList').replaceWith('<ul class="list-group todo-available-tasks" id="taskList"><span class="badge badge-primary badge-pill todo-available-tasks-text">Available Tasks</span></ul>');
            }

            var insertdata = '<li class="list-group-item d-flex justify-content-between align-items-center"><input id="input-button-{{id}}" type="text" class="form-control todo-edit-task-input hideme" placeholder="Edit The Task"><div id="done-button-{{id}}"  class="input-group-append hideme"><button class="btn btn-outline-secondary todo-update-task" type="button" onclick="updateTask({{id}})">Done</button></div><div id="task-{{id}}" class="todo-task">{{title}}</div><span id="task-actions-{{id}}"><button style="margin-right:5px;" type="button" onclick="editTask({{id}})"class="btn btn-outline-warning"><img src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png"width="18px" height="20px"></button><button type="button" class="btn btn-outline-danger" onclick="deleteTask({{id}})"><img src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg"width="18px" height="22px"></button></span></li>';

            for(var i = 0; i < data.length; i++){
                var step = insertdata.replace(/{{id}}/g,data[i].id);
                step = step.replace(/{{title}}/g,data[i].title);
                document.getElementById('taskList').insertAdjacentHTML('beforeend',step);
            } 
        }
     })
}

$.ajax({
    headers: {
        Authorization: 'Token ' + localStorage.getItem('token'),
    },
    url: API_BASE_URL + 'auth/profile/',
    method: 'GET',
    success: function(data, status, xhr) {
        document.getElementById('avatar-image').src = 'https://ui-avatars.com/api/?name=' + data.name + '&background=fff&size=33&color=007bff';
        document.getElementById('profile-name').innerHTML = data.name;
        getTasks();
    }
})
