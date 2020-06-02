import express from "express";

const routes = express.Router();

/**
 * Rota /
 */
routes.get("/", (req, res) => {
  return res.json({
    app: "#1 NLW - Dia 1",
    author: 'Gabriel "CoGUMm" Vilar',
    mail: "gabriel@cogumm.net",
  });
});

export default routes;
