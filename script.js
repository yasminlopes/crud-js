"use strict";

const openModal = () =>
  document.getElementById("modal").classList.add("active");

const closeModal = () =>
  document.getElementById("modal").classList.remove("active");

const tempClient = {
  nome: "Maria Paula",
  email: "bipolar@email.com",
  celular: "14999999990",
  cidade: "Marília",
};

const getLocaStorage = () =>
  JSON.parse(localStorage.getItem("db_client")) ?? [];

const setLocalStorage = (db_client) =>
  localStorage.setItem("db_client", JSON.stringify(db_client));

//CRUD
/* Create (Envia os Dados)*/
const createClient = (client) => {
  const db_client = getLocaStorage();
  db_client.push(client);
  setLocalStorage(db_client);
};
/* Read */
const readClient = () => getLocaStorage();
/* Update */
const updateClient = (index, client) => {
  const db_client = readClient();
  db_client[index] = client;
  setLocalStorage(db_client);
};
/* Delete */
const deleteClient = (index) => {
  const db_client = readClient();
  db_client.splice(index, 1);
  setLocalStorage(db_client); // Manda para o banco
};

// Eventos
document
  .getElementById("cadastrarCliente")
  .addEventListener("click", openModal);

document.getElementById("modalClose").addEventListener("click", closeModal);
