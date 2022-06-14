"use strict";

const openModal = () =>
  document.getElementById("modal").classList.add("active");

const closeModal = () => {
  document.getElementById("modal").classList.remove("active");

  clearFields();
};

/*const tempClient = {
  categoria: "Televisão",
  nome: "TV Smart Samsung",
  preco: "2500",
  Quantidade: "50",
};*/

const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_produto")) ?? [];

const setLocalStorage = (db_produto) =>
  localStorage.setItem("db_produto", JSON.stringify(db_produto));

//CRUD
/* Create (Envia os Dados)*/
const createProduct = (produto) => {
  const db_produto = getLocalStorage();
  db_produto.push(produto);
  setLocalStorage(db_produto);
};
/* Read */
const readProduct = () => getLocalStorage();
/* Update */
const updateProduct = (index, produto) => {
  const db_produto = readProduct();
  db_produto[index] = produto;
  setLocalStorage(db_produto);
};
/* Delete */
const deleteProduct = (index) => {
  const db_produto = readProduct();
  db_produto.splice(index, 1);
  setLocalStorage(db_produto); // Manda para o banco
};

// Vinculando com o Front
/* Verifica se os itens obrigatórios estão preenchidos */
const isValidFields = () => {
  return document.getElementById("form").reportValidity();
};
/* Limpando os campos do form após o cadastro*/
const clearFields = () => {
  const camposForm = document.querySelectorAll(".modal-field");
  camposForm.forEach((camposForm) => (camposForm.value = ""));
};
/* Dados preenchidos do form sendo enviados ao banco de dados atráves do ID*/
const saveProduct = () => {
  if (isValidFields()) {
    const produto = {
      categoria: document.getElementById("categoria").value,
      nome: document.getElementById("nome").value,
      preco: document.getElementById("preco").value,
      quantidade: document.getElementById("quantidade").value,
    };
    const index = document.getElementById("categoria").dataset.index;
    if (index == "new") {
      createProduct(produto);
      console.log("[INFO] Produto Cadastrado com sucesso!");
      updateTable();
      closeModal();
    } else {
      updateProduct(index, produto);
      updateTable();
      closeModal();
      console.log("[INFO] Editando Produto!");
    }
  }
};
// Trazendo dados preenchidos a tabela do Front
const createRow = (produto, index) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
      <td>${produto.categoria}</td>
      <td>${produto.nome}</td>
      <td>R$ ${produto.preco}</td>
      <td>${produto.quantidade}</td>
      <td>
          <button type="button" class="button green" id="edit-${index}">Editar</button>
          <button type="button" class="button red"
          id="delete-${index}">Excluir</button>
      </td>
  `;
  document.querySelector("#tableProdutos>tbody").appendChild(newRow);
};
// Apagando os Dados da Tabela
const clearTable = () => {
  const rows = document.querySelectorAll("#tableProdutos>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

//Atualizando
const updateTable = () => {
  const db_produto = readProduct();
  clearTable();
  db_produto.forEach(createRow);
};

// Apagando e Editando pelos campos do Front
const editProduto = (index) => {
  const produto = readProduct()[index];
  produto.index = index;
  fillFields(produto);
  openModal();
};

const fillFields = (produto) => {
  document.getElementById("categoria").value = produto.categoria;
  document.getElementById("nome").value = produto.nome;
  document.getElementById("preco").value = produto.preco;
  document.getElementById("quantidade").value = produto.quantidade;
  document.getElementById("categoria").dataset.index = produto.index;
};

const editDelete = (event) => {
  if (event.target.type == "button") {
    const [action, index] = event.target.id.split("-");

    if (action == "edit") {
      editProduto(index);
      console.log("[INFO] Produto alterado!");
    } else {
      const produto = readProduct()[index];
      const response = confirm(
        `Você quer mesmo excluir a categoria ${produto.categoria}?`
      );
      if (response) {
        deleteProduct(index);
        updateTable();
      }
    }
  }
};
updateTable();

// Eventos
document
  .getElementById("cadastrarCliente")
  .addEventListener("click", openModal);

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("btnSalvar").addEventListener("click", saveProduct);
document
  .querySelector("#tableProdutos>tbody")
  .addEventListener("click", editDelete);
document.getElementById("btnCancelar").addEventListener("click", closeModal);
