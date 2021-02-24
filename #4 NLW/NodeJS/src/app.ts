import "reflect-metadata";
import express from "express";
import routes from "./routes";

import createConnection from "./database";

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

export default app;
