const mysql = require("mysql2/promise");
require("dotenv").config();

// Cria um pool de conexões com o MySQL
// Pool = várias conexões prontas pra usar, sem precisar abrir/fechar toda hora
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
