// 1. Get our HTML elements so we can use them in JavaScript
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// 2. Create an empty list (array) to hold our tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 3. Function to save tasks to the computer's memory (localStorage)
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 4. Function to display the tasks on the screen
function renderTasks() {
    taskList.innerHTML = ""; // Clear the list before redrawing

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        
        // If the task is completed, add a line-through effect
        if (task.completed) {
            li.style.textDecoration = "line-through";
            li.style.opacity = "0.6";
        }

        // Set up the content inside our task row
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="toggleTask(${index})" style="background: #007bff; margin-right: 5px; padding: 5px 10px;">
                    ${task.completed ? "Undo" : "Done"}
                </button>
                <button onclick="deleteTask(${index})" style="background: #dc3545; padding: 5px 10px;">❌</button>
            </div>
        `;
        
        taskList.appendChild(li);
    });
}

// 5. Function to add a new task when clicking the button
addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Add the new task to our array
    tasks.push({ text: taskText, completed: false });

    saveTasks();   // Save it
    renderTasks(); // Update screen
    taskInput.value = ""; // Clear input box
});

// 6. Function to mark a task as Done or Undo
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// 7. Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// 8. Run this immediately when the page opens to show any saved tasks
renderTasks();