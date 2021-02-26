import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import routes from "./routes";

import createConnection from "./database";
import { AppError } from "./errors/AppError";

/**
 * Inicializando a aplicação no banco de dados de produção OU de teste.
 */
createConnection();

/**
 * Instâncianado a aplicação utilizando o express.
 */
const app = express();

/**
 * Utilizando o express para converter o JSON em objeto do JS/TS.
 */
app.use(express.json());

/**
 * Rotas da aplicação.
 */
app.use(routes);

/**
 * Tratando os erros.
 */
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }

    return res.status(500).json({
        status: "Error",
        message: `Internal server error ${err.message}`,
    });
});

export default app;
