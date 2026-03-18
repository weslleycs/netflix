const express = require("express");
const db = require("../db");

const router = express.Router();

// POST /genre/register - Criar gênero
router.post("/register", async (req, res) => {
  try {
    const { name, description } = req.body;

    await db.query(
      "INSERT INTO genres (name, description, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())",
      [name, description]
    );

    res.json({ message: "Genre Register" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao registrar gênero" });
  }
});

module.exports = router;
