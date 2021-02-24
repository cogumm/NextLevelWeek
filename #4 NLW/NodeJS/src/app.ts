import "reflect-metadata";
import express from "express";
import routes from "./routes";

import "./database";

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
