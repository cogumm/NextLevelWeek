require("dotenv").config();
import express from "express";

const server = express();

/**
 * Rota /
 */
server.get("/", (req, res) => {
  return res.json({
    app: "#1 NLW - Dia 1",
    author: 'Gabriel "CoGUMm" Vilar',
    mail: "gabriel@cogumm.net",
  });
});

/**
 * Rodando o servidor back-end.
 */
server.listen(process.env.PORT_APP || 3000, () => {
  console.log(
    "Servidor backend inicializado com sucesso na porta " +
      process.env.PORT_APP || 3000
  );
});
