function submitTodo() {
    //get value from text field
    var input = document.getElementById("newTask").value;
    //check input must not empty
    if (input != "" || input) {
        var xhr = new XMLHttpRequest();
        var url = "http://localhost:8080/api/todo-list/create";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("created");
                //Clear TextField
                document.getElementById("newTask").value = "";
                //Refresh data todo list
                fetchTodoList();
            }
        };
        //Create requestBody for Call Post
        var data = JSON.stringify({
            task: input,
        });
        xhr.send(data);
    }
}

function fetchTodoList() {
    document.querySelector("#tasks").innerHTML = "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = xhttp.responseText;
            let taskList = JSON.parse(response).todoList;
            taskList.forEach((ele) => {
                getTaskHtml(ele.task, ele.id);
            });
        }
    };
    xhttp.open("GET", "http://localhost:8080/api/todo-list", true);
    xhttp.send();
}

function getTaskHtml(task, id) {
    let element =
        "<div class='row'>" +
        "<div class='col-md-6'><span id='task'>" +
        task +
        "</span></div>" +
        "<div class='col-md-6 text-right'>" +
        '<button type="button" class="btn btn-danger" onclick="removeBy(\'' +
        id +
        "')\">Remove</button>" +
        "</div>" +
        "</div>";
    document.querySelector("#tasks").innerHTML += element;
}

function removeBy(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Removed");
            fetchTodoList();
        }
    };
    xhttp.open(
        "GET",
        "http://localhost:8080/api/todo-list/remove?id=" + id,
        true
    );
    xhttp.send();
}

function clearAll() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Clear all");
            fetchTodoList();
        }
    };
    xhttp.open(
        "GET",
        "http://localhost:8080/api/todo-list/clear",
        true
    );
    xhttp.send();
}
