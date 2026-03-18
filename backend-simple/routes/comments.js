const express = require("express");
const db = require("../db");

const router = express.Router();

// POST /comment/serie - Comentar em uma série
router.post("/serie", async (req, res) => {
  try {
    const { comment, serieId, userId } = req.body;

    await db.query(
      "INSERT INTO comments (comment, serieId, userId, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())",
      [comment, serieId, userId]
    );

    res.json({ message: "comentario Ok" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao registrar comentário" });
  }
});

module.exports = router;
