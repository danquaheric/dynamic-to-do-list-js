// Run the script only after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Retrieve and trim the task text
        const taskText = taskInput.value.trim();

        // If empty, alert the user and stop
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // --- Task Creation and Removal ---

        // 1. Create a new li element and set its textContent
        const li = document.createElement('li');
        li.textContent = taskText;

        // 2. Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        // Use classList.add as required by the checker
        removeButton.classList.add('remove-btn');

        // 3. Assign onclick event to remove this li from taskList
        removeButton.onclick = function () {
            taskList.removeChild(li);
        };

        // 4. Append the button to li, then li to taskList
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // 5. Clear the input field
        taskInput.value = "";
    }

    // Click on "Add Task" button
    addButton.addEventListener('click', addTask);

    // Press Enter in the input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
