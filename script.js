// elements we need
const taskInput = document.getElementById("taskInput"); //Task input field
const addBtn = document.getElementById("addBtn"); //add button
const taskList = document.getElementById("taskList"); //tasklist in the ul
const errorMsg = document.getElementById("error"); //error message
const counter = document.getElementById("counter"); //counter for the tasks

// 2. Task counter
function updateCounter() {
  const total = taskList.children.length;
  const done = taskList.querySelectorAll(".completed").length;

  if (total === 0) {
    counter.textContent = "No tasks yet. Add your first one.";
    return;
  }

  counter.textContent = `${total} ${total === 1 ? "task" : "tasks"}, ${done} done`;
}

//  3. Add a task (with empty-input validation)
function addTask() {
  const text = taskInput.value.trim();

  // Validation: block empty or spaces-only tasks
  if (text === "") {
    errorMsg.textContent = "Please type a task before adding it.";
    taskInput.focus(); //focus the input field so the user can type again
    return;
  }

  errorMsg.textContent = "";

  // Create the elements
  const li = document.createElement("li");
  const taskText = document.createElement("span");
  const removeBtn = document.createElement("button");

  // Add text and classes
  taskText.textContent = text;
  taskText.classList.add("task-text");
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("remove-btn");

  // Put them together and add to the page
  li.append(taskText, removeBtn);
  taskList.appendChild(li);

  // Reset the input so the user can type the next task like the new task is added to the list and the input field is cleared for the next task. The focus is also set back to the input field for convenience.
  taskInput.value = "";
  taskInput.focus();

  updateCounter();
}

//Entry button click and Enter key press to add a task
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Hide the error as soon as the user starts typing again
taskInput.addEventListener("input", function () {
  errorMsg.textContent = "";
});

// ---------- 5. Event delegation: ONE listener on the list ----------
// Works for tasks that are added later, too.
taskList.addEventListener("click", function (event) {
  // Remove button clicked -> remove its task
  if (event.target.matches(".remove-btn")) {
    event.target.parentElement.remove();
    updateCounter();
  }
  // Task text clicked -> mark as done / not done
  else if (event.target.matches(".task-text")) {
    event.target.parentElement.classList.toggle("completed");
    updateCounter();
  }
});

// update the counter when the page loads, in case there are pre-existing tasks in the HTML
updateCounter();
