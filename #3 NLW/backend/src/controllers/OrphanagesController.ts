import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Orphanages from '../models/Orphanage';

export default {
    async create(req: Request, res: Response) {
        const { name, latitude, longitude, about, instructions, opening_hours, open_on_weekends } = req.body;

        const orphanagesRepository = getRepository(Orphanages);

        const orphanages = orphanagesRepository.create({
            name, latitude, longitude, about, instructions, opening_hours, open_on_weekends
        });

        await orphanagesRepository.save(orphanages);

        return res.status(201).json(orphanages);
    }
}
