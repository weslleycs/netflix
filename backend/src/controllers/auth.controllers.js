const prisma = require("../database/prisma");

// ---------------------------
// ROTA POST /register
// ---------------------------
async function register(req, res) {
  const { name, email, password } = req.body;

  // 1) validação básica
  if (!name || !email || !password) {
    return res.status(400).send({
      message: "name, email e password são obrigatórios",
    });
  }

  // 2) checar se email já existe
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    return res.status(409).send({
      message: "Email já cadastrado",
    });
  }

  // 3) criar usuário no banco
  // (por enquanto senha pura; no próximo passo a gente coloca hash com bcrypt)
  const user = await prisma.user.create({
    data: { name, email, password },
    select: { id: true, name: true, email: true, createdAt: true },
  });

  // 4) resposta
  return res.status(201).send({
    message: "Usuário criado com sucesso",
    user,
  });
}

module.exports = { register };
