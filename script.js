// Seleciona os elementos necessários
const criarTarefaButton = document.getElementById('criar-tarefa');
const textoTarefaInput = document.getElementById('texto-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');
const apagarTarefaButton = document.getElementById('apaga-tudo');

// Adiciona o evento de clique no botão
criarTarefaButton.addEventListener('click', function() {
  // Verifica se o campo de input não está vazio
  const textoTarefa = textoTarefaInput.value.trim();

  if (textoTarefa !== "") {
    // Cria um novo item de lista <li>
    const novaTarefa = document.createElement('li');
    novaTarefa.textContent = textoTarefa;

    novaTarefa.addEventListener('click', function(){
      // Remove a classe de todos <li> existente.
      document.querySelectorAll('li').forEach(li => {
        li.classList.remove('bg-color-grey');
      });
      // Adiciona/remove a classe no item que foi clicado. 
      novaTarefa.classList.add('bg-color-grey');
    });

    novaTarefa.addEventListener('dblclick', function(){
      novaTarefa.classList.toggle('completed');
    });
    
    // Adiciona o novo item ao final da lista
    listaTarefas.appendChild(novaTarefa);

    
    // Limpa o campo de input
    textoTarefaInput.value = "";
  }
});

// Adiciona o evento de clique no botão
apagarTarefaButton.addEventListener('click', function(){
  listaTarefas.innerHTML = '';
});
