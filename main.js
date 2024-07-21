let submit = document.querySelector(".newTaskBtn");
let tasksdiv = document.getElementById("tasksdiv");
let tasksArray = [];

//localStorage.clear();
window.onload = loadTasks;

function removeTask(index) {
  tasksArray.splice(index, 1);
  saveTasks();
  loadTasks();
}
function renderTasks() {
  tasksDiv.innerHTML = "";

  for (let i = 0; i < tasksArray.length; i++) {
    let task = createTask(tasksArray[i], i);
    tasksDiv.appendChild(task);
  }
}
function loadTasks() {
  let savedTasks = localStorage.getItem("tasks");
  tasksArray = savedTasks ? JSON.parse(savedTasks) : [];
  renderTasks();
}
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}
function createTask(taskText, index) {
  //create tsak elements
  let taskConstainer = document.createElement(`div`);
  let taskConstainerText = document.createElement(`span`);
  let deleteBtn = document.createElement(`button`);

  //assign texts to elements
  taskConstainerText.innerText = taskText;
  taskConstainerText.id = "task-text";
  deleteBtn.innerText = `Delete`;

  //add class to delete button
  deleteBtn.className = "removeBtn";

  //css elements
  taskConstainer.style.cssText = `display:flex; justify-content:space-between;padding:6px;margin:5px;background-color:white; border-radius:4px;`;
  taskConstainerText.style.cssText = `color:black;font-weight:18px;`;
  deleteBtn.style.cssText = `background-color: red;border: none;color: white;padding:3px;border-radius:2px;`;
  deleteBtn.setAttribute("data-index", index);

  //append elements to main container
  taskConstainer.appendChild(taskConstainerText);
  taskConstainer.appendChild(deleteBtn);

  return taskConstainer;
}
function addTask(taskText) {
  let taskText = document.querySelector("input[type=text]").value;
  if (taskText !== "") {
    let taskElement = createTask(taskText);
    if (tasksdiv) {
      tasksdiv.appendChild(taskElement);
    } else {
      console.error("Task container not found");
    }
    tasksArray.push(taskText);
    saveTasks();
    document.querySelector("input[type=text]").value = "";
  }
}
document.addEventListener("click", function (e) {
  if (e.target.className === "removeBtn") {
    removeTask(e.target.getAttribute("data-index"));
  }
});

submit.onclick = addTask;
