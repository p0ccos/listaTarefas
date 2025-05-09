"use strict";
var listElement = document.querySelector("#app ul");
var inputElement = document.querySelector("#app input[type=text]");
var dataElement = document.querySelector("#app input[type=date]");
var buttonElement = document.querySelector("#app button");
// Carrega as tarefas salvas
var listaSalva = localStorage.getItem("@listagem_tarefas");
var tarefas = listaSalva !== null ? JSON.parse(listaSalva) : [];
// Lista todas as tarefas
function listarTarefas() {
    listElement.innerHTML = "";
    tarefas.forEach(function (item, index) {
        var todoElement = document.createElement("li");
        var hoje = new Date().toISOString().split("T")[0];
        var atrasada = item.data < hoje;
        var dataFormatada = new Date(item.data).toLocaleDateString("pt-BR");
        var tarefaText = document.createTextNode("".concat(item.titulo, " - at\u00E9 ").concat(dataFormatada));
        if (atrasada) {
            todoElement.style.color = "red";
        }
        var linkElement = document.createElement("a");
        linkElement.setAttribute("href", "#");
        linkElement.setAttribute("style", "margin-left: 10px;");
        linkElement.setAttribute("onclick", "deletarTarefa(".concat(index, ")"));
        var linkText = document.createTextNode("Excluir");
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
    var novaTarefa = {
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
function deletarTarefa(posicao) {
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
