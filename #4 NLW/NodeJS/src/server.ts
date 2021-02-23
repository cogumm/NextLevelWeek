require("dotenv").config();
import "reflect-metadata";

import express from "express";
import routes from "./routes";

import "./database";

const server = express();

/**
 * Utilizando o express para converter o JSON em objeto do JS/TS.
 */
server.use(express.json());

/**
 * Rotas da aplicação.
 */
server.use(routes);

/**
 * Rodando o servidor back-end.
 */
server.listen(process.env.PORT_APP || 3000, () => {
    console.log(
        "Servidor backend inicializado com sucesso na porta " +
            process.env.PORT_APP || 3000
    );
});
