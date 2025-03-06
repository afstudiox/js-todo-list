// Seleciona os elementos necessários
const criarTarefaButton = document.getElementById('criar-tarefa');
const textoTarefaInput = document.getElementById('texto-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');


// Adiciona o evento de clique no botão
criarTarefaButton.addEventListener('click', function() {
  // Verifica se o campo de input não está vazio
  const textoTarefa = textoTarefaInput.value.trim();

  if (textoTarefa !== "") {
    // Cria um novo item de lista <li>
    const novaTarefa = document.createElement('li');
    novaTarefa.textContent = textoTarefa;
    novaTarefa.addEventListener('click', function(){
      novaTarefa.classList.toggle('bg-color-grey');
    })
    
    // Adiciona o novo item ao final da lista
    listaTarefas.appendChild(novaTarefa);

    
    // Limpa o campo de input
    textoTarefaInput.value = "";
  }
});
