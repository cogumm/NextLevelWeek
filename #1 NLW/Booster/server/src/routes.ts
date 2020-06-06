import express from "express";

import multer from "multer";
import multerConfig from "./config/multer";

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
routes.post("/points", upload.single("image"), pointsController.create);
routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);

/**
 * Rota "items"
 */
import ItemsController from "./controllers/ItemsController";
const itemsController = new ItemsController();
routes.get("/items", itemsController.index);

export default routes;
