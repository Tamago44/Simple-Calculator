document.addEventListener('DOMContentLoaded', function () {

    //these are the html elments
    const taskInput = document.getElementById('taskInput');
    const addTskBtn = document.getElementById('addTskBtn');
    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    addTskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') return;
        const newTask = {
            id: Date.now(),
            text: taskText,
            complete: false
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks();

        taskInput.value = '';
        taskInput.focus();
    }
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = 'flex items-center justify-between mb-3';
            if (task.completed) {
                taskItem.classList.add('completed',);
            }
            taskItem.innerHTML = `
                <div class="flex items-center">
                    <input class="h-4 w-4 mr-3 doneTask" type="checkbox" ${task.completed ? 'checked' : ''}>
                    <p>${task.text}</p>
                </div>
                <button class="cursor-pointer delete-btn">
                    <i class="fa-regular fa-xmark"></i>
                </button>
            `;
            // Checkbox event
            const checkbox = taskItem.querySelector('.doneTask');
            checkbox.addEventListener('click', () => toggleTask(task.id));
            // Delete button event
            const deleteBtn = taskItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => deleteTask(task.id));
            taskList.appendChild(taskItem);
        });
    }
    function toggleTask(taskId){
        tasks = tasks.map(task => task.id === taskId ? {...task, completed: !task.completed} : task);
        saveTasks();
        renderTasks();
    }
    function deleteTask(taskId) {
        tasks =tasks.filter(task => task.id !== taskId);
        saveTasks();
        renderTasks();
    }
    function saveTasks(){
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }
});