const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares básicos
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Health check
app.get("/ping", (req, res) => {
  res.send("pong");
});

// Rotas
app.use("/auth", require("./routes/auth"));
app.use("/movie", require("./routes/movies"));
app.use("/serie", require("./routes/series"));
app.use("/genre", require("./routes/genres"));
app.use("/genreMovie", require("./routes/genreMovie"));
app.use("/comment", require("./routes/comments"));

// Tratamento de erro genérico
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ error: err.message || "Erro interno" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
