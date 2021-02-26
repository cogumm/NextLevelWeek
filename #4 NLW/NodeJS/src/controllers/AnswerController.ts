import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

export default class AnswerController {
    async execute(req: Request, res: Response) {
        const { value } = req.params;
        const { u } = req.query;

        const surveysUsersRepository = getCustomRepository(
            SurveysUsersRepository
        );

        // Buscando de dentro do repositório se existe.
        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u),
        });

        // Se não existir retorna o erro.
        if (!surveyUser) {
            return res.status(400).json({
                error: "Survey user does not exists!",
            });
        }

        // Se existir, vamos sobrescrever o value.
        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return res.status(201).json(surveyUser);
    }
}
