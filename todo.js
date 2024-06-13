document.addEventListener("DOMContentLoaded", function(){
  let todoForm = document.getElementById("newTodoForm");
  let todolist = document.getElementById("todoList");

  todoForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let removeButton = document.createElement("button");
    removeButton.innerText = "X";

    let newTodo = document.createElement("li");
    newTodo.innerText = document.getElementById("task").value;
    
    todoList.appendChild(newTodo);
    newTodo.appendChild(removeButton);

    todoForm.reset();
  })

  todoList.addEventListener("click", function(e) {
    const targetTagToLowerCase = e.target.tagName.toLowerCase();
    if (targetTagToLowerCase === "li") {
      e.target.style.textDecoration = "line-through";
    } else if (targetTagToLowerCase === "button") {
      e.target.parentNode.remove();
    }
  })
})

const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
for (let i = 0; i < savedTodos.length; i++) {
  let newTodo = document.createElement("li");
  newTodo.innerText = savedTodos[i].task;
  newTodo.isCompleted = savedTodos[i].isCompleted ? true : false;
  if (newTodo.isCompleted) {
    newTodo.style.textDecoration = "line-through";
  }
  todoList.appendChild(newTodo);
}

todoForm.addEventListener("submit", function(e) {
  e.preventDefault();
  let newTodo = document.createElement("li");
  let taskValue = document.getElementById("task").value;
  newTodo.innerText = taskValue;
  newTodo.isCompleted = false;
  todoForm.reset();
  todoList.appendChild(newTodo);

  savedTodos.push({ task: newTodo.innerText, isCompleted: false });
  localStorage.setItem("todos", JSON.stringify(savedTodos));
});

todoList.addEventListener("click", function(e) {
  let clickedListItem = e.target;

  if (!clickedListItem.isCompleted) {
    clickedListItem.style.textDecoration = "line-through";
    clickedListItem.isCompleted = true;
  } else {
    clickedListItem.style.textDecoration = "none";
    clickedListItem.isCompleted = false;
  }

  for (let i = 0; i < savedTodos.length; i++) {
    if (savedTodos[i].task === clickedListItem.innerText) {
      savedTodos[i].isCompleted = !savedTodos[i].isCompleted;
      localStorage.setItem("todos", JSON.stringify(savedTodos));
    }
  }
});