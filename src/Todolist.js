const todos = getLocalStorage && [
  { todoText: "This could be your done todo!", completed: true },
];
displayTodos();

// TOGGLE A TODO
const toggleAllButton = document.querySelector("#toggle__all__button");
toggleAllButton.addEventListener("click", toggleAll);
function toggle(event) {
  const checkbox = document.getElementById(event.target.id);

  if (checkbox.checked) {
    todos[event.target.id].completed = true;
  } else {
    todos[event.target.id].completed = false;
  }

  saveToLocalStorage();
}

// ADD A TODO
const addInput = document.querySelector("#add__input");
addInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    add(addInput.value);
  }
});
function add(initialTodoText) {
  todos.push({ todoText: initialTodoText, completed: false });
  addInput.value = "";
  displayTodos();
}

// DISPLAY ALL TODOS
function displayTodos() {
  const todoList = document.querySelector("#todo__list");
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const listItem = document.createElement("li");
    todoList.appendChild(listItem);
    listItem.innerHTML = `<input type="checkbox" class="completed"> `;

    const todoText = document.createElement("p");
    todoText.id = index;
    todoText.innerText = todo.todoText;
    listItem.appendChild(todoText);

    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    listItem.append(removeButton);
    removeButton.id = index;
    removeButton.addEventListener("click", remove);

    /*     const allTodos = document.querySelectorAll("p");
    allTodos.forEach((todo) => {
      todo.addEventListener("dblclick", edit);
    }); */

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    listItem.append(editButton);
    editButton.id = index;
    editButton.addEventListener("click", edit);
  });

  const checkboxes = document.querySelectorAll(".completed");
  checkboxes.forEach((checkbox, index) => {
    checkbox.id = index;
    if (todos[index].completed === true) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
    checkbox.addEventListener("change", toggle);
  });
  saveToLocalStorage(todos);
}

// TOGGLE ALL TODOS
function toggleAll() {
  let completedTodos = 0;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].completed === true) {
      completedTodos++;
    }
  }

  if (completedTodos === todos.length) {
    for (let i = 0; i < todos.length; i++) {
      todos[i].completed = false;
    }
  } else {
    for (let i = 0; i < todos.length; i++) {
      todos[i].completed = true;
    }
  }
  displayTodos();
}

// EDIT ONE TODO
function edit(event) {
  const todoTexts = document.querySelectorAll("p");
  const todoText = todoTexts[event.target.id];
  todoText.innerHTML = `
      <input type='text' class='newInput' placeholder='Edit...'>`;

  const editedInput = document.querySelector(".newInput");
  editedInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      todoText.innerHTML = editedInput.value;
    }
  });
}

// REMOVE ONE TODO
function remove(event) {
  let position = event.target.id;
  todos.splice(position, 1);
  displayTodos();
}

// ADD LOCAL STORAGE
function saveToLocalStorage(todoList) {
  localStorage.setItem("_TODOS", JSON.stringify(todoList));
}

// GET LOCAL STORAGE
function getLocalStorage() {
  JSON.parse(localStorage.getItem("_TODOS"));
}
