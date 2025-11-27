// Run the script only after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    /**
     * Add a new task to the list.
     * @param {string} taskText - The text of the task to add. If not provided, it will be read from the input.
     * @param {boolean} save - Whether to save this task to Local Storage (default: true).
     */
    function addTask(taskText, save = true) {
        // If no taskText was passed (user click/Enter), read from the input
        if (typeof taskText === 'undefined') {
            const inputText = taskInput.value.trim();

            // If empty, alert the user and stop
            if (inputText === "") {
                alert("Please enter a task.");
                return;
            }

            taskText = inputText;
        }

        // --- Task Creation and Removal ---

        // 1. Create a new li element and set its textContent
        const li = document.createElement('li');
        li.textContent = taskText;

        // 2. Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        // Use classList.add as required
        removeButton.classList.add('remove-btn');

        // 3. Assign onclick event to remove this li from taskList and Local Storage
        removeButton.onclick = function () {
            // Remove from DOM
            taskList.removeChild(li);

            // Remove from Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const index = storedTasks.indexOf(taskText);
            if (index !== -1) {
                storedTasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }
        };

        // 4. Append the button to li, then li to taskList
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // 5. Save to Local Storage if requested
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));

            // Clear the input field only when user added the task
            taskInput.value = "";
        }
    }

    /**
     * Load tasks from Local Storage and populate the list.
     */
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' to avoid re-saving
    }

    // Click on "Add Task" button
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Press Enter in the input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load any existing tasks from Local Storage when the page loads
    loadTasks();
});
