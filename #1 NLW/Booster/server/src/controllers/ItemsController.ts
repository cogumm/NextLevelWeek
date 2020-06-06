require("dotenv").config();
import { Request, Response } from "express";
import knex from "../database/connection";

class ItemsController {
    /**
     * Listar vários items.
     */
    async index(req: Request, res: Response) {
        const items = await knex("items").select("*");

        /**
         * Processo de serialização dos campos do banco.
         */
        const serializedItems = items.map((item) => {
            return {
                id: item.idItems,
                title: item.title,
                image_url: `${process.env.HOST_APP}:${process.env.PORT_APP}/uploads/${item.image}`,
            };
        });

        return res.json(serializedItems);
    }
}

export default ItemsController;
