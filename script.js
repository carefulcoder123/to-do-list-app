const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const toggleModeBtn = document.getElementById("toggle-mode");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "done" : "";
    li.innerHTML = `
      <span onclick="toggleComplete(${index})">${task.text}</span>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskText = input.value.trim();
  if (taskText !== "") {
    tasks.push({ text: taskText, completed: false });
    input.value = "";
    renderTasks();
  }
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
  toggleModeBtn.textContent = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
}

addBtn.addEventListener("click", addTask);
toggleModeBtn.addEventListener("click", toggleDarkMode);
renderTasks();
