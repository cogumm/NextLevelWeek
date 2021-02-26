import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

export default class NpsController {
    /**
     * 1 2 3 4 5 6 7 8 9 10
     * Detratores => 0 - 6
     * Passivos => 7 - 8
     * Promotores => 9 - 10
     * (Número de promotores — número de detratores) / (número de respondentes) x 100
     */
    async execute(req: Request, res: Response) {
        const { survey_id } = req.params;

        const surveysUsersRepository = getCustomRepository(
            SurveysUsersRepository
        );

        const surveysUsers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull()),
        });

        // Dentro dessa resposta vamos filtrar os que são detratores, passivos ou promotores;
        const detractor = surveysUsers.filter(
            (survey) => survey.value >= 0 && survey.value <= 6
        ).length;

        const passive = surveysUsers.filter(
            (survey) => survey.value >= 7 && survey.value <= 8
        ).length;

        const promoters = surveysUsers.filter(
            (survey) => survey.value >= 9 && survey.value <= 10
        ).length;

        // Total de respostas.
        const totalAnswers = surveysUsers.length;

        const calculate = Number(
            (((promoters - detractor) / totalAnswers) * 100).toFixed(2)
        );

        return res.json({
            detractor,
            passive,
            promoters,
            totalAnswers,
            nps: calculate,
        });
    }
}
