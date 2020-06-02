require("dotenv").config();
import express from "express";
import knex from "./database/connection";

const routes = express.Router();

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
 * Rota para listar todos os items da aplicação.
 */
routes.get("/items", async (req, res) => {
    const items = await knex("items").select("*");

    /**
     * Processo de virtualização dos campos do banco.
     */
    const serializedItems = items.map((item) => {
        return {
            title: item.title,
            image_url: `${process.env.HOST_APP}:${process.env.PORT_APP}/uploads/${item.image}`,
        };
    });

    return res.json(serializedItems);
});

export default routes;
