import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import * as yup from "yup";

import { UsersRepository } from "../repositories/UsersRepository";

export default class UserController {
    async create(req: Request, res: Response) {
        // console.log(req.body)
        const { name, email } = req.body;

        // Validação via Yup.
        const schema = yup.object().shape({
            name: yup.string().required("Nome obrigatório."),
            email: yup.string().email().required("E-mail obrigatório."),
        });

        // if (!(await schema.isValid(req.body))) {
        //     return res.status(400).json({
        //         error: "Validation failed!",
        //     });
        // }

        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({
                error: err,
            });
        }

        const usersRepository = getCustomRepository(UsersRepository);

        // Verificando se o e-mail já existe.
        const userAlreadyExists = await usersRepository.findOne({ email });
        // Se já existir retorna:
        if (userAlreadyExists) {
            return res.status(400).json({ error: "User already exists!" });
        }

        const user = usersRepository.create({
            name,
            email,
        });

        await usersRepository.save(user);

        return res.status(201).json(user);
    }
}
