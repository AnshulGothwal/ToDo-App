const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.querySelector(".tasks");

// Load saved tasks
taskList.innerHTML = localStorage.getItem("tasks") || "";
updateCount();

// Add Task
addBtn.addEventListener("click", () => {

    const taskText = input.value;

    if(taskText.trim() === ""){
        return;
    }

    const task = document.createElement("div");

    task.classList.add("task");

    task.innerHTML = `
        <input type="checkbox">
        <span>${taskText}</span>
        <button class="delete">🗑️</button>
    `;

    taskList.appendChild(task);

    input.value = "";

    updateCount();
    saveTasks();

});

// Delete Task
taskList.addEventListener("click", (e) => {

    if(e.target.classList.contains("delete")){

        e.target.parentElement.remove();

        updateCount();
        saveTasks();
    }

});

// Complete Task
taskList.addEventListener("change", (e) => {

    if(e.target.type === "checkbox"){

        const text = e.target.nextElementSibling;

        text.classList.toggle("completed");

        updateCount();
        saveTasks();
    }

});

// Counter
function updateCount(){

    const total = document.querySelectorAll(".task").length;

    const completed =
        document.querySelectorAll(".completed").length;

    document.querySelector("h3").textContent =
        `${completed} of ${total} tasks completed`;
}

// Save Tasks
function saveTasks(){

    localStorage.setItem(
        "tasks",
        taskList.innerHTML
    );
}