import express from "express";

const app = express();

// middlewares
app.use(express.json());

// rota teste
app.get("/health", (_req, res) => {
  return res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


