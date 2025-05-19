document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const taskList = document.getElementById('taskList');
    const li = createTaskElement(taskText);

    taskList.appendChild(li);
    saveTask(taskText);

    taskInput.value = '';
}

function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.className = 'task-item';

    const span = document.createElement('span');
    span.textContent = taskText;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.onclick = () => editTask(li, span);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => deleteTask(li, taskText);

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    return li;
}

function editTask(li, span) {
    const newText = prompt('Edit your task:', span.textContent);
    if (newText !== null && newText.trim() !== '') {
        const oldText = span.textContent;
        span.textContent = newText.trim();
        updateTask(oldText, newText.trim());
    }
}

function deleteTask(li, taskText) {
    li.remove();
    removeTask(taskText);
}

function saveTask(taskText) {
    let tasks = getTasks();
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTask(oldText, newText) {
    let tasks = getTasks();
    tasks = tasks.map(task => task === oldText ? newText : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(taskText) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTasks() {
    const tasks = getTasks();
    const taskList = document.getElementById('taskList');

    tasks.forEach(task => {
        const li = createTaskElement(task);
        taskList.appendChild(li);
    });
}