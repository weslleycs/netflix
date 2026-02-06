require("dotenv").config();

// Importa a biblioteca Express
// Express é quem cria o servidor HTTP
const express = require("express");

// Cria a aplicação Express (o servidor)
const app = express();

// Middleware que permite o servidor entender JSON
// Sem isso, req.body vem vazio em requisições POST
app.use(express.json());

// ---------------------------
// IMPORTA ROTAS
// ---------------------------
const authRoutes = require("./src/routes/auth.routes");

// Usa rotas
app.use("/auth", authRoutes);

// ---------------------------
// ROTA GET /
// ---------------------------
// Rota de teste para saber se o servidor está funcionando
app.get("/", (req, res) => {
  res.send("Api Netflix funcionando");
});

// ---------------------------
// INICIAR O SERVIDOR
// ---------------------------
// SEMPRE fica por último
// O servidor começa a escutar a porta 3000
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
