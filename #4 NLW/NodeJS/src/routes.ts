import express from "express";

const routes = express.Router();

/**
 * Rota /
 */
routes.get("/", (req, res) => {
    return res.json({
        app: "#4 NLW - Next Level Week",
        author: 'Gabriel "CoGUMm" Vilar',
        mail: "gabriel@cogumm.net",
    });
});

/**
 * Rota dos usuários
 */
import UserController from "./controllers/UserController";
const userController = new UserController();
routes.post("/users", userController.create);

export default routes;
