const express = require("express");
const db = require("../db");

const router = express.Router();

// POST /genreMovie/register - Associar gêneros a um filme
router.post("/register", async (req, res) => {
  try {
    const { movieId, genreId } = req.body; // genreId é um array de IDs

    // Remove associações antigas
    await db.query("DELETE FROM movies_genres WHERE movieId = ?", [movieId]);

    // Cria novas associações
    for (const gId of genreId) {
      await db.query(
        "INSERT INTO movies_genres (movieId, genreId, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())",
        [movieId, gId]
      );
    }

    res.json({ message: "Genre Movie Register" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao associar gênero ao filme" });
  }
});

module.exports = router;
