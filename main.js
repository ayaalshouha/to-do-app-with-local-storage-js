let taskBtn = document.querySelector(".newTaskBtn");
let tasksArray = [];

// localStorage.clear();

window.onload = retrieveArray;

function removeitem(index) {
  tasksArray.splice(index, 1);
  updateLocalStorage();
  retrieveArray();
}

function displayArray() {
  let tasksDiv = document.getElementById("tasksdiv");
  tasksDiv.innerHTML = "";

  for (let i = 0; i < tasksArray.length; i++) {
    let task = document.createElement("div");
    task.style.cssText = `display:flex; justify-content:space-between;padding:6px;margin:5px;background-color:white; border-radius:4px;`;
    task.innerHTML = tasksArray[i];

    let removeBtn = task.querySelector("button");
    removeBtn.className = "removeBtn";

    tasksDiv.appendChild(task);
  }
}

function retrieveArray() {
  let jsonArr = localStorage.getItem("myArray");
  if (jsonArr) {
    tasksArray = JSON.parse(jsonArr);
    displayArray();
  } else {
    console.log("No previous tasks found in local storage.");
  }
}

function updateLocalStorage() {
  let jsonArray = JSON.stringify(tasksArray);
  localStorage.setItem("myArray", jsonArray);
}
function createTask(taskText) {
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

  //append elements to main container
  taskConstainer.appendChild(taskConstainerText);
  taskConstainer.appendChild(deleteBtn);

  return taskConstainer;
}

function addTask(taskText) {
  let tasksdiv = document.getElementById("tasksdiv");
  let taskElement = createTask(taskText);
  if (tasksdiv) {
    tasksdiv.appendChild(taskElement);
  } else {
    console.error("Task container not found");
  }

  return taskElement;
}

function addTaskPrrocess() {
  let taskText = document.querySelector("input[type=text]").value;
  if (taskText !== "") {
    let task = addTask(taskText);
    tasksArray.push(task.innerHTML);
    updateLocalStorage();
  }
}

document.addEventListener("click", function (e) {
  if (e.target.className === "removeBtn") {
    removeitem(e.index);
  }
});

taskBtn.onclick = addTaskPrrocess;
