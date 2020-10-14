import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Orphanages from '../models/Orphanage';

export default {
    async index(req: Request, res: Response) {
        const orphanagesRepository = getRepository(Orphanages);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return res.status(200).json(orphanages);
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const orphanagesRepository = getRepository(Orphanages);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return res.status(200).json(orphanage);
    },

    async create(req: Request, res: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body

        const orphanagesRepository = getRepository(Orphanages);

        // console.log(req.files);

        // Upload de múltiplos arquivos
        const reqImages = req.files as Express.Multer.File[];
        const images = reqImages.map(image => {
            return { path: image.filename }
        });


        const orphanages = orphanagesRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        });

        await orphanagesRepository.save(orphanages);

        return res.status(201).json(orphanages);
    }
}
