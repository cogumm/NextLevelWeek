import knex from "knex";

/**
 * Importando as configurações do KNEX.
 */
const configDB = require("../../knexfile");

const connection = knex(configDB.development);

export default connection;
