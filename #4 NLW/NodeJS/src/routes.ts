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

/**
 * Rota de pesquisa
 */
import SurveysController from "./controllers/SurveysController";
const surveysController = new SurveysController();
routes.post("/surveys", surveysController.create);
routes.get("/surveys", surveysController.show);

/**
 * Rota envio de e-mail.
 */
import SendMailController from "./controllers/SendMailController";
const sendMailController = new SendMailController();
routes.post("/sendmail", sendMailController.execute);

/**
 * Rota das respostas.
 */
import AnswerController from "./controllers/AnswerController";
const answerController = new AnswerController();
routes.get("/answers/:value", answerController.execute);

/**
 * Rota NPS.
 */
import NpsController from "./controllers/NpsController";
const npsController = new NpsController();
routes.get("/nps/:survey_id", npsController.execute);

export default routes;
