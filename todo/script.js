const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let todos = [];

loadTodos();
addBtn.addEventListener('click', addTodo);

function addTodo() {
  const newTodo = todoInput.value.trim();
  if (newTodo !== "") {
    todos.push(newTodo);
    saveToStorage();
    renderTodos();
    todoInput.value = "";
  }
}

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((atodo, index) => {
    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.addEventListener('click', () => deleteTodo(index));

    li.innerHTML = `
      <div class="post-it">
        <span>${atodo}</span>
      </div>
    `;
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveToStorage();
  renderTodos();
}

/* localStorage */
function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todos));
}

function loadTodos() {
  const storedTodos = localStorage.getItem('todoList');
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
    renderTodos();
  }
}
