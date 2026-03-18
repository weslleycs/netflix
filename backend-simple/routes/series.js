const express = require("express");
const db = require("../db");

const router = express.Router();

// POST /serie/register - Criar série
router.post("/register", async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;

    await db.query(
      "INSERT INTO series (title, description, imageUrl, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())",
      [title, description || null, imageUrl || null]
    );

    res.json({ message: "Serie Register" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao registrar série" });
  }
});

// GET /serie/list - Listar todas as séries (com paginação)
router.get("/list", async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 100;
    const page = Number(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const [series] = await db.query(
      "SELECT * FROM series ORDER BY createdAt DESC LIMIT ? OFFSET ?",
      [limit, offset]
    );

    res.json(series);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar séries" });
  }
});

// GET /serie/title - Buscar série por título
router.get("/title", async (req, res) => {
  try {
    const { title } = req.query;
    const limit = Number(req.query.limit) || 100;
    const page = Number(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const [series] = await db.query(
      "SELECT * FROM series WHERE title LIKE ? ORDER BY createdAt DESC LIMIT ? OFFSET ?",
      [`%${title}%`, limit, offset]
    );

    res.json(series);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar série" });
  }
});

// GET /serie/comments-rate - Comentários e média de avaliação de uma série
router.get("/comments-rate", async (req, res) => {
  try {
    const serieId = Number(req.query.serieId);
    const limit = Number(req.query.limit) || 100;
    const page = Number(req.query.page) || 1;
    const offset = (page - 1) * limit;

    // Busca comentários com paginação
    const [comments] = await db.query(
      "SELECT comment FROM comments WHERE serieId = ? LIMIT ? OFFSET ?",
      [serieId, limit, offset]
    );

    // Busca média das avaliações
    const [rateResult] = await db.query(
      "SELECT AVG(rate) as avgRate FROM rates WHERE serieId = ?",
      [serieId]
    );

    res.json({
      rate: rateResult[0].avgRate || 0,
      comments: comments.map((c) => c.comment),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar comentários" });
  }
});

module.exports = router;
