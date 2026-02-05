// ---------------------------
// ROTA POST /login
// ---------------------------
// Rota que recebe dados de login (email e password)
function login(req, res) {
  // Desestrutura os dados que vieram no body da requisição
  const { email, password } = req.body;

  // Validação: se email ou password não foram enviados
  if (!email || !password) {
    // Retorna erro 400 (erro do cliente)
    return res.status(400).send({
      message: "Email e password são obrigatórios",
    });
  }

  // Se passou na validação, retorna sucesso
  return res.status(200).send({
    message: "Login recebido com sucesso",
    email: email,
  });
}

module.exports = {
  login,
};
