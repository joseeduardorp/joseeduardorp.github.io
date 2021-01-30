let taskInput = document.getElementById("task-input");
let taskList = document.getElementById("task-list");
let tasks = [];

// carrega as tarefas na página
onload = function() {
    let taskParsed = JSON.parse(localStorage.getItem("task"));
    tasks = (taskParsed == null) ? [] : taskParsed;

    tasks.forEach(createElement);
}

// adiciona uma nova tarefa
function addTask() {
    if (!isEmpty()) {
        createElement(taskInput.value);
        saveTask(taskInput.value);
    }
    clear();
}

// cria o elemento(li) que vai armazenar a tarefa
let id = 0;
function createElement(taskValue) {
    let listItem = 
    `<li data-id=${id}>
        <span id="task">- ${taskValue} </span>
        <button id="btn-del" onclick="deleteTask(this)"> 
            <i class="far fa-trash-alt"></i> 
        </button>
    </li>`;
    
    taskList.insertAdjacentHTML("afterbegin", listItem);
    id++;
}

// salva as tarefas no local storage
function saveTask(task) {
    tasks.push(task);
    localStorage.setItem("task", JSON.stringify(tasks));
}

// apaga a tarefa da lista
function deleteTask(element) {
    let li = element.parentElement;
    let index = li.dataset.id;

    let parsedTasks = JSON.parse(localStorage.getItem("task"));
    parsedTasks.splice(index, 1);

    localStorage.setItem("task", JSON.stringify(parsedTasks));

    deleteElement(li);
}

// remove o elemento(li) da lista
function deleteElement(li) {
    li.remove();
}

// verifica se o valor enviado está vazio
function isEmpty() {
    let input = taskInput.value.trim().length;
    return (input === 0) ? true : false;
}

// limpa o input
function clear() {
    taskInput.value = "";
}
