// ✅ Correct element references (fixed typo in 'addToBuutton')
const todoInput = document.getElementById("todoInput")
const addTodoButton = document.getElementById("addButton")
const todoList = document.getElementById("todoList")

// ✅ Add click event listener to button
addTodoButton.addEventListener("click", addTodo)

// ✅ Add keypress event for Enter key
todoInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTodo()
  }
})

// ✅ Function to add a todo item
function addTodo() {
  const todoText = todoInput.value.trim()

  if (todoText !== "") {
    const li = document.createElement("li")
    li.textContent = todoText

    // Add to the list
    todoList.appendChild(li)

    // Clear input field
    todoInput.value = ""
  }
}
