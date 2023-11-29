
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        const taskCheck = document.createElement('input');
        taskCheck.type = 'checkbox';
        taskCheck.className = 'task-check';
        taskCheck.checked = task.completed;
        taskCheck.addEventListener('change', () => toggleComplete(index));

        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.innerText = task.text;
        taskText.style.textDecoration = task.completed ? 'line-through' : '';

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => deleteTask(index));

        taskItem.appendChild(taskCheck);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteBtn);

        taskList.appendChild(taskItem);
    });
}

function addTask(text) {
    const newTask = {
        text: text,
        completed: false
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}


function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function clearTasks() {
    tasks = [];
    saveTasks();
    renderTasks();
}


document.getElementById('add-btn').addEventListener('click', () => {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    }
});

document.getElementById('clear-btn').addEventListener('click', clearTasks);

renderTasks();

