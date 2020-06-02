import { Request, Response } from "express";
import knex from "../database/connection";

class PointController {
    /**
     * Listar vários points.
     */
    async index(req: Request, res: Response) {
        const { city, uf, items } = req.query;

        /**
         * Convertando os items em array.
         */
        const parsedItems = String(items)
            .split(",")
            .map((item) => Number(item.trim()));

        const points = await knex("points")
            .join("point_items", "points.idPoints", "=", "point_items.point_id")
            .whereIn("point_items.item_id", parsedItems)
            .where("city", String(city))
            .where("uf", String(uf))
            .distinct()
            .select("points.*");

        return res.json(points);
    }

    /**
     * Listando os pontos de uma coleta específico.
     */
    async show(req: Request, res: Response) {
        const { id } = req.params;

        const point = await knex("points").where("idPoints", id).first();

        if (!point) {
            return res.status(400).json({ message: "Point not found." });
        }

        const items = await knex("items")
            .join("point_items", "items.idItems", "=", "point_items.item_id")
            .where("point_items.point_id", id)
            .select("items.title");

        return res.json({ point, items });
    }

    /**
     * Criando um ponto coleta.
     */
    async create(req: Request, res: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items,
        } = req.body;

        /**
         * Transaction
         */
        const trx = await knex.transaction();

        const point = {
            image:
                "https://www.varchev.com/wp-content/uploads/2016/06/121703465-wxtv8fqi-_s8e7084_nishiki_market_kyoto-1.jpg",
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        };

        const insertedIds = await trx("points").insert(point);

        /**
         * Inserindo os items na tabela point_items.
         */
        const point_id = insertedIds[0];
        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id,
            };
        });

        await trx("point_items").insert(pointItems);

        /**
         * Fazendo REALMENTE os inserts.
         */
        await trx.commit();

        return res.json({
            id: point_id,
            ...point,
        });
    }
}

export default PointController;
