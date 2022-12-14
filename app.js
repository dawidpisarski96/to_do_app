let toDoInput;
let errorInfo;
let addBtn;
let ulList;
let newTask;

// popup

let popup;
let popupInfo;
let todoToEdit;
let popupInput;
let popupAddBtn;
let popupCloseBtn;

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

const prepareDOMElements = () => {
  toDoInput = document.querySelector(".todo-input");
  errorInfo = document.querySelector(".error-info");
  addBtn = document.querySelector(".btn-add");
  ulList = document.querySelector(".todolist ul");
  //   popup elements

  popup = document.querySelector(".popup");
  popupInfo = document.querySelector(".popup-info");
  popupInput = document.querySelector(".popup-input");
  popupAddBtn = document.querySelector(".accept");
  popupCloseBtn = document.querySelector(".cancel");
};

const prepareDOMEvents = () => {
  addBtn.addEventListener("click", addNewTask);
  ulList.addEventListener("click", checkClick);
  popupCloseBtn.addEventListener("click", closePopup);
  popupAddBtn.addEventListener("click", changeTodoText);
  toDoInput.addEventListener("keyup", enterKeyCheck);
};

const addNewTask = () => {
  if (toDoInput.value !== "") {
    newTask = document.createElement("li");
    newTask.textContent = toDoInput.value;

    createToolsArea();

    ulList.append(newTask);
    toDoInput.value = "";
    errorInfo.textContent = "";
  } else {
    errorInfo.textContent = "Wpisz treść zadania";
  }
};

const createToolsArea = () => {
  const toolsPanel = document.createElement("div");
  toolsPanel.classList.add("tools");
  newTask.append(toolsPanel);

  const completeBtn = document.createElement("button");
  completeBtn.classList.add("complete");
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.textContent = "EDIT";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

  toolsPanel.append(completeBtn, editBtn, deleteBtn);
};

const checkClick = (e) => {
  if (e.target.matches(".complete")) {
    e.target.closest("li").classList.toggle("completed");
    e.target.classList.toggle("completed");
  } else if (e.target.matches(".edit")) {
    editTodo(e);
  } else if (e.target.matches(".delete")) {
    deleteTask(e);
  }
};

const editTodo = (e) => {
  todoToEdit = e.target.closest("li");

  popupInput.value = todoToEdit.firstChild.textContent;

  console.log(todoToEdit.firstChild);
  popup.style.display = "flex";
};

const closePopup = () => {
  popup.style.display = "none";
  popupInfo.textContent = "";
};

const changeTodoText = () => {
  if (popupInput.value !== "") {
    todoToEdit.firstChild.textContent = popupInput.value;
    popup.style.display = "none";
    popupInfo.textContent = "";
  } else {
    popupInfo.textContent = "! musisz podać jakąś treść !";
  }
};

const deleteTask = (e) => {
  e.target.closest("li").remove();

  const allTodos = document.querySelectorAll("li");
  if (allTodos.length === 0) {
    errorInfo.textContent = "Brak zadań na liście";
  }
};

const enterKeyCheck = (e) => {
  if (e.key === "Enter") {
    addNewTask();
  }
};

document.addEventListener("DOMContentLoaded", main);
