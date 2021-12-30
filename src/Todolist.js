const todos = getLocalStorage() ?? [
  { todoText: "This could be your done todo!", completed: true },
];
displayTodos();

// TOGGLE A TODO
const toggleAllButton = document.querySelector("#toggle__all__button");
toggleAllButton.addEventListener("click", toggleAll);
function toggle(event) {
  const checkboxes = document.querySelectorAll(".completed");
  const paragraphs = document.querySelectorAll("p");
  const checkbox = checkboxes[event.target.id];
  const paragraph = paragraphs[event.target.id];
  if (checkbox.checked) {
    todos[event.target.id].completed = true;
    paragraph.classList.add("done");
  } else {
    todos[event.target.id].completed = false;
    paragraph.classList.remove("done");
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
    removeButton.innerText = "❌";
    listItem.append(removeButton);
    removeButton.id = index;
    removeButton.addEventListener("click", remove);

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    listItem.append(editButton);
    editButton.id = index;
    editButton.addEventListener("click", edit);
  });

  const checkboxes = document.querySelectorAll(".completed");
  checkboxes.forEach((checkbox, index) => {
    const paragraphs = document.querySelectorAll("p");
    const paragraph = paragraphs[index];

    checkbox.id = index;
    if (todos[index].completed === true) {
      checkbox.checked = true;
      paragraph.classList.add("done");
    } else {
      checkbox.checked = false;
      paragraph.classList.remove("done");
    }
    checkbox.addEventListener("change", toggle);
  });
  saveToLocalStorage();
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
function saveToLocalStorage() {
  localStorage.setItem("_TODOS", JSON.stringify(todos));
}

// GET LOCAL STORAGE
function getLocalStorage() {
  return JSON.parse(localStorage.getItem("_TODOS"));
}
