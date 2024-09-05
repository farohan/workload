document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById('taskForm');
    const taskContainer = document.getElementById('taskContainer');

    // Load stored tasks from localStorage on page load
    loadTasks();

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const assignmentName = document.getElementById('assignmentName').value;
        const subject = document.getElementById('subject').value;
        const timeEstimate = document.getElementById('timeEstimate').value;
        const dueDate = document.getElementById('dueDate').value;

        // Allow decimal values for time and treat them as minutes
        const task = {
            name: assignmentName,
            subject: subject,
            time: parseFloat(timeEstimate).toFixed(2),  // Parse and ensure it's stored as a number with 2 decimal places
            due: dueDate
        };

        saveTask(task);
        renderTasks();  // Render all tasks including the newly added one

        taskForm.reset();
    });

    function saveTask(task) {
        let tasks = localStorage.getItem('tasks');
        if (tasks) {
            tasks = JSON.parse(tasks);
        } else {
            tasks = [];
        }

        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        renderTasks();
    }

    function deleteTask(taskIndex) {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.splice(taskIndex, 1);  // Remove the task from the array
        localStorage.setItem('tasks', JSON.stringify(tasks));  // Update localStorage
        renderTasks();  // Instantly re-render the task list
    }

    function renderTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskContainer.innerHTML = '';  // Clear the container before re-rendering

        tasks.forEach((task, index) => {
            const taskCard = document.createElement('div');
            taskCard.classList.add('task-card');
            
            taskCard.innerHTML = `
                <h3>${task.name}</h3>
                <p>Subject: ${task.subject}</p>
                <p class="time-estimate">Estimated Time: ${task.time} minutes</p>
                <p class="due-date">Due: ${task.due}</p>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;

            taskCard.querySelector('.delete-btn').addEventListener('click', function() {
                deleteTask(index);  // Instantly delete task and re-render
            });

            taskContainer.appendChild(taskCard);
        });
    }
});
