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
    createProduct(produto);
    console.log("[INFO] Produto Cadastrado com sucesso!");
    closeModal();
  }
};
// Trazendo dados preenchidos a tabela do Front
const createRow = (produto) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
      <td>${produto.categoria}</td>
      <td>${produto.nome}</td>
      <td>R$ ${produto.preco}</td>
      <td>${produto.quantidade}</td>
      <td>
          <button type="button" class="button green">Editar</button>
          <button type="button" class="button red" >Excluir</button>
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
updateTable();

// Eventos
document
  .getElementById("cadastrarCliente")
  .addEventListener("click", openModal);

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("btnSalvar").addEventListener("click", saveProduct);
