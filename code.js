const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");
const numberOfTasks = document.querySelector("h1 span");
let listElements = [...document.querySelectorAll(".task")];
let liArray = [];

const showColor = () => {
  numberOfTasks.classList.toggle("blue1");
  numberOfTasks.classList.toggle("blue2");
};
const updateTasksNumbers = () => {
  numberOfTasks.textContent = liArray.length;
};

const removeTask = (e) => {
  liArray.forEach((li) => {
    ul.appendChild(li);
  });
  e.target.parentNode.remove();
  listElements = [...document.querySelectorAll(".task")];
  liArray = listElements;
  console.log(liArray);
  updateTasksNumbers();
};

const addTask = (e) => {
  e.preventDefault();
  if (input.value === "") {
    return;
  }
  showColor();
  const element = document.createElement("li");
  element.className = "task";
  element.classList.add("blue1");
  element.innerHTML = input.value + "  <button>Delete</button>";
  // console.log(element)
  let sameTask = false;
  liArray.forEach((li) => {
    if (li.textContent === element.textContent) {
      return (sameTask = true);
    }
  });
  if (sameTask === true) {
    alert(`Task ${input.value} already exist`);
    return;
  }
  ul.appendChild(element);
  liArray.push(element);
  input.value = "";
  const allButtons = [...document.querySelectorAll(".task button")];
  listElements = [...document.querySelectorAll(".task")];
  // console.log(liArray)
  updateTasksNumbers();
  if (input.value === "") {
    const tasks = liArray;
    tasks.forEach((task) => {
      ul.appendChild(task);
      updateTasksNumbers();
    });
  }
  // console.log(allButtons)
  allButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      removeTask(e);
      showColor();
    });
  });
};

form.addEventListener("submit", addTask);

const searchTask = (e) => {
  if (input.value === "") {
    const tasks = liArray;
    // console.log(tasks);
    tasks.forEach((task) => {
      ul.appendChild(task);
      updateTasksNumbers();
      showColor();
    });
  }
  showColor();
  // console.log(liArray);
  const search = e.target.value.toLowerCase();
  let tasks = liArray;
  tasks = tasks.filter((liElement) => {
    return liElement.textContent.toLowerCase().includes(search);
  });
  ul.textContent = "";
  tasks.forEach((liElement) => {
    ul.appendChild(liElement);
    updateTasksNumbers();
  });
  // console.log(liArray);
  if (input.value === "") {
    const tasks = liArray;
    tasks.forEach((task) => {
      ul.appendChild(task);
      updateTasksNumbers();
    });
  }
};
input.addEventListener("input", searchTask);
