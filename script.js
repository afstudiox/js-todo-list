// Seleciona os elementos necessários
const inputTask = document.getElementById('texto-tarefa');
const listTasks = document.getElementById('lista-tarefas');
const btnCreateTask = document.getElementById('criar-tarefa');
const btnDeleteTasks = document.getElementById('apaga-tudo');
const btnRemoveCompleted = document.getElementById('remover-finalizados');
const btnSaveTasks = document.getElementById('salvar-tarefas');
const btnMoveUp = document.getElementById('mover-acima');
const btnMoveDown = document.getElementById('mover-abaixo');

let currentTask = null;

// SELECT TASK FUNCTION
function selectTask(taskElement){
  document.querySelectorAll('li').forEach(li => li.classList.remove('bg-color-grey'));
  taskElement.classList.add('bg-color-grey');
  currentTask = taskElement;
};

// MOVE UP FUNCTION
function moveUp(){
  if (currentTask){
    let prevTask = currentTask.previousElementSibling;
    if (prevTask) {
      currentTask.parentNode.insertBefore(currentTask, prevTask);
    }
  }
};

// MOVE DOWN FUNCTION
function moveDown(){
  if (currentTask){
    let nextTask = currentTask.nextElementSibling;
    if (nextTask){
      currentTask.parentNode.insertBefore(nextTask, currentTask);
    }
  }
};

// CREATE TASK FUNCTION
function createTask(text, completed=false){
  const newTask = document.createElement('li');
  newTask.textContent = text;

  if (completed){
    newTask.classList.add('completed');
  }

  newTask.addEventListener('click', () => selectTask(newTask));
  
  newTask.addEventListener('dblclick', () => newTask.classList.toggle('completed'));

  listTasks.appendChild(newTask);  
};

// SAVE TASKS FUNCTION
function saveTasks(){
  const tasks = [];
  document.querySelectorAll('li').forEach(task => {
    tasks.push({
      text: task.textContent,
      completed: task.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// LOAD TASKS FUNCTION
function loadTasks(){
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks){
    JSON.parse(savedTasks).forEach(task => {
      createTask(task.text, task.completed);
    });
  }
};

// CLICK CREATE TASK
btnCreateTask.addEventListener('click', function() {
  const textTask = inputTask.value.trim();
  if (textTask !== ""){
    createTask(textTask);
    inputTask.value ="";
  }
});

// CLICK DELETE TASKS
btnDeleteTasks.addEventListener('click', function(){
  listTasks.innerHTML = "";
  localStorage.removeItem('tasks');
});

// CLICK REMOVE COMPLETED
btnRemoveCompleted.addEventListener('click', function(){
  document.querySelectorAll('.completed').forEach(task => task.remove());
  saveTasks();
});

// CLICKS SAVE TASKS
btnSaveTasks.addEventListener('click', saveTasks);

// CLICK MOVE UP
btnMoveUp.addEventListener('click', moveUp);

// CLICK MOVE DOWN
btnMoveDown.addEventListener('click', moveDown);

// WINDOW LOAD
window.addEventListener('load', loadTasks);