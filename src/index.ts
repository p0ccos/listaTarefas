type Tarefa = {
  titulo: string;
  data: string;
};

let listElement = document.querySelector("#app ul") as HTMLUListElement;
let inputElement = document.querySelector("#app input[type=text]") as HTMLInputElement;
let dataElement = document.querySelector("#app input[type=date]") as HTMLInputElement;
let buttonElement = document.querySelector("#app button") as HTMLElement;

// Carrega as tarefas salvas
let listaSalva: string | null = localStorage.getItem("@listagem_tarefas");
let tarefas: Tarefa[] = listaSalva !== null ? JSON.parse(listaSalva) : [];

// Lista todas as tarefas
function listarTarefas() {
  listElement.innerHTML = "";

  tarefas.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

  tarefas.forEach((item, index) => {
    let todoElement = document.createElement("li");
    let hoje = new Date().toISOString().split("T")[0];
    let atrasada = item.data < hoje;

    let partes = item.data.split("-");
    let dataObj = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
    let dataFormatada = dataObj.toLocaleDateString("pt-BR");
    let tarefaText = document.createTextNode(`${item.titulo} - ${dataFormatada}`);

    if (atrasada) {
      todoElement.style.color = "red";
    }

    let linkElement = document.createElement("a");
    linkElement.setAttribute("href", "#");
    linkElement.setAttribute("style", "margin-left: 10px;");
    linkElement.setAttribute("onclick", `deletarTarefa(${index})`);

    let linkText = document.createTextNode("Excluir");
    linkElement.appendChild(linkText);

    todoElement.appendChild(tarefaText);
    todoElement.appendChild(linkElement);
    listElement.appendChild(todoElement);
  });
}

// Adiciona nova tarefa
function adicionarTarefa() {
  if (inputElement.value.trim() === "") {
    alert("Digite alguma tarefa!");
    return;
  }

  let novaTarefa: Tarefa = {
    titulo: inputElement.value,
    data: dataElement.value || new Date().toISOString().split("T")[0]
  };

  tarefas.push(novaTarefa);
  inputElement.value = "";
  dataElement.value = "";
  listarTarefas();
  salvarDados();
}

// Remove tarefa
function deletarTarefa(posicao: number) {
  tarefas.splice(posicao, 1);
  listarTarefas();
  salvarDados();
}

// Salva no localStorage
function salvarDados() {
  localStorage.setItem("@listagem_tarefas", JSON.stringify(tarefas));
}

// Inicia a lista
listarTarefas();
buttonElement.onclick = adicionarTarefa;
