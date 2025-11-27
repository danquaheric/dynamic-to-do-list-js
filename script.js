// Run the script only after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // 1. Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // 2. Function to add a new task
    function addTask() {
        // Get and trim the value from the input
        const taskText = taskInput.value.trim();

        // If the input is empty, alert the user
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new <li> element for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a "Remove" button for this task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // When the remove button is clicked, remove this task from the list
        removeButton.onclick = function () {
            taskList.removeChild(li);
        };

        // Append the remove button to the <li>
        li.appendChild(removeButton);

        // Append the <li> to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";
    }

    // 3. Add click event listener to the "Add Task" button
    addButton.addEventListener('click', addTask);

    // 4. Add keypress listener to allow adding tasks with the Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
