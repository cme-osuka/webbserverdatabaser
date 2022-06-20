const db = require("../database");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("students").del();

  await knex("students").insert([
    { id: 1, name: "Ryan Dahl", email: "ryan@dahl.dk" },
    { id: 2, name: "Bryan Dahl", email: "bryan@dahl.dk" },
    { id: 3, name: "Oscar Nilsson", email: "oscar@osuka.dev" },
  ]);
};
