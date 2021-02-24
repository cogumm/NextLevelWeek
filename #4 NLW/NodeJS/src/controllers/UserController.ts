import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import { UsersRepository } from "../repositories/UsersRepository";

export default class UserController {
    async create(req: Request, res: Response) {
        // console.log(req.body)
        const { name, email } = req.body;

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
