import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { resolve } from "path";

import { UsersRepository } from "../repositories/UsersRepository";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import SendMailServices from "../services/SendMailService";
import { AppError } from "../errors/AppError";

export default class SendMailController {
    async execute(req: Request, res: Response) {
        const { email, survey_id } = req.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(
            SurveysUsersRepository
        );

        const user = await usersRepository.findOne({ email });

        if (!user) {
            throw new AppError("User does not exists");
        }

        const survey = await surveysRepository.findOne({
            id: survey_id,
        });

        if (!survey) {
            throw new AppError("Survey does not exists");
        }

        // Caminho completo para o arquivo de template de email.
        const mailTemplatePath = resolve(
            __dirname,
            "..",
            "views",
            "templates",
            "sendmail.hbs"
        );

        // Varificando se alguma pesquisa já foi respondida pelo usuário.
        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: { user_id: user.id, value: null, survey_id: survey_id },
            relations: ["user", "survey"],
        });

        // Variáveis que são enviadas para o handlebars
        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL,
        };

        if (surveyUserAlreadyExists) {
            variables.id = surveyUserAlreadyExists.id;
            await SendMailServices.execute(
                email,
                survey.title,
                variables,
                mailTemplatePath
            );
            return res.json(surveyUserAlreadyExists);
        }

        const surveyUser = surveysUsersRepository.create({
            user_id: user.id,
            survey_id,
        });

        await surveysUsersRepository.save(surveyUser);

        variables.id = surveyUser.id;

        await SendMailServices.execute(
            email,
            survey.title,
            variables,
            mailTemplatePath
        );

        return res.json(surveyUser);
    }
}
