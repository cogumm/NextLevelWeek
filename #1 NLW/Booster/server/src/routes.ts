import express from "express";
import { celebrate, Joi } from "celebrate";

import multer from "multer";
import multerConfig from "./config/multer";

// import celebrateConfig from "./config/celebrate";

const routes = express.Router();
const upload = multer(multerConfig);

/**
 * Rota /
 */
routes.get("/", (req, res) => {
    return res.json({
        app: "#1 NLW - Next Level Week",
        author: 'Gabriel "CoGUMm" Vilar',
        mail: "gabriel@cogumm.net",
    });
});

/**
 * Rota "points"
 */
import PointsController from "./controllers/PointsController";
const pointsController = new PointsController();
routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);

// Validação utilizando o celebrate.
routes.post(
    "/points",
    upload.single("image"),
    celebrate(
        {
            body: Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().required().email(),
                whatsapp: Joi.number().required(),
                latitude: Joi.number().required(),
                longitude: Joi.number().required(),
                uf: Joi.string().required().max(2),
                city: Joi.string().required(),
                items: Joi.string().required(),
            }),
        },
        {
            abortEarly: false,
        }
    ),
    pointsController.create
);

/**
 * Rota "items"
 */
import ItemsController from "./controllers/ItemsController";
const itemsController = new ItemsController();
routes.get("/items", itemsController.index);

export default routes;
