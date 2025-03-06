// Seleciona os elementos necessários
const inputTask = document.getElementById('texto-tarefa');
const listTasks = document.getElementById('lista-tarefas');
const btnCreateTask = document.getElementById('criar-tarefa');
const btnDeleteTasks = document.getElementById('apaga-tudo');
const btnRemoveCompleted = document.getElementById('remover-finalizados');
const btnSaveTasks = document.getElementById('salvar-tarefas');

// CREATE TASK FUNCTION
function createTask(text, completed=false){
  const newTask = document.createElement('li');
  newTask.textContent = text;

  if (completed){
    newTask.classList.add('completed');
  }

  newTask.addEventListener('click', function (){
    document.querySelectorAll('li').forEach(li => li.classList.remove('bg-color-grey'));
    newTask.classList.add('bg-color-grey');
  });

  newTask.addEventListener('dblclick', function(){
    newTask.classList.toggle('completed');
  });

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

// WINDOW LOAD
window.addEventListener('load', loadTasks);