const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const progress = document.getElementById("progress");
const themeBtn = document.getElementById("themeBtn");

// 📅 Date
document.getElementById("date").textContent =
  new Date().toDateString();

// Load tasks
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  createTask(text, false);
  saveTasks();
  taskInput.value = "";
}

function createTask(text, done) {
  const li = document.createElement("li");
  if (done) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = text;

  span.onclick = () => {
    li.classList.toggle("completed");
    saveTasks();
  };

  const del = document.createElement("button");
  del.textContent = "X";
  del.className = "delete";

  del.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.append(span, del);
  taskList.appendChild(li);
  updateProgress();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").textContent,
      done: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateProgress();
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(t => createTask(t.text, t.done));
}

function updateProgress() {
  const total = taskList.children.length;
  const done = document.querySelectorAll(".completed").length;
  progress.textContent = `${done} / ${total} Completed`;
}

// 🌙 Dark mode
themeBtn.onclick = () => {
  document.body.classList.toggle("dark");
};