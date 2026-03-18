const express = require("express");
const db = require("../db");

const router = express.Router();

// POST /movie/register - Criar filme
router.post("/register", async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;

    await db.query(
      "INSERT INTO movies (title, description, imageUrl, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())",
      [title, description || null, imageUrl || null]
    );

    res.json({ message: "Movie Register" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao registrar filme" });
  }
});

// GET /movie/list - Listar todos os filmes (com paginação)
router.get("/list", async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 100;
    const page = Number(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const [movies] = await db.query(
      "SELECT * FROM movies ORDER BY createdAt DESC LIMIT ? OFFSET ?",
      [limit, offset]
    );

    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar filmes" });
  }
});

// GET /movie/title - Buscar filme por título
router.get("/title", async (req, res) => {
  try {
    const { title } = req.query;

    const [movies] = await db.query(
      "SELECT * FROM movies WHERE title LIKE ? ORDER BY createdAt DESC",
      [`%${title}%`]
    );

    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar filme" });
  }
});

// GET /movie/genre - Buscar filmes por gênero
router.get("/genre", async (req, res) => {
  try {
    const { genre } = req.query;

    const [movies] = await db.query(
      `SELECT m.* FROM movies m
       INNER JOIN movies_genres mg ON mg.movieId = m.id
       INNER JOIN genres g ON g.id = mg.genreId
       WHERE g.name = ?
       ORDER BY m.createdAt DESC`,
      [genre]
    );

    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar filmes por gênero" });
  }
});

// GET /movie/comments-rate - Comentários e média de avaliação de um filme
router.get("/comments-rate", async (req, res) => {
  try {
    const movieId = Number(req.query.movieId);

    // Busca comentários
    const [comments] = await db.query(
      "SELECT comment FROM comments WHERE movieId = ?",
      [movieId]
    );

    // Busca média das avaliações
    const [rateResult] = await db.query(
      "SELECT AVG(rate) as avgRate FROM rates WHERE movieId = ?",
      [movieId]
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

// PUT /movie/updater/:id - Atualizar filme
router.put("/updater/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, imageUrl } = req.body;

    // Monta o UPDATE dinamicamente só com os campos enviados
    const fields = [];
    const values = [];

    if (title) {
      fields.push("title = ?");
      values.push(title);
    }
    if (description) {
      fields.push("description = ?");
      values.push(description);
    }
    if (imageUrl) {
      fields.push("imageUrl = ?");
      values.push(imageUrl);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: "Nenhum campo para atualizar" });
    }

    fields.push("updatedAt = NOW()");
    values.push(id);

    await db.query(
      `UPDATE movies SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    res.json({ message: "Updater Ok" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar filme" });
  }
});

module.exports = router;
