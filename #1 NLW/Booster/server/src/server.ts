require("dotenv").config();
import express from "express";
import path from "path";
import routes from "./routes";
import cors from "cors";
import { errors } from "celebrate";

const server = express();

// Cors da aplicação.
server.use(cors());

/**
 * Utilizando o express para converter o JSON em objeto do JS/TS.
 */
server.use(express.json());

/**
 * Rotas da aplicação.
 */
server.use(routes);

/**
 * Rota pública para ser acessada de forma direta.
 */
server.use(
    "/uploads",
    express.static(path.resolve(__dirname, "..", "uploads"))
);

/**
 * Utiliza o Celebrate para lidar com os erros da forma com que eles retornam para o frontend.
 */
server.use(errors());

/**
 * Rodando o servidor back-end.
 */
server.listen(process.env.PORT_APP || 3000, () => {
    console.log(
        "Servidor backend inicializado com sucesso na porta " +
            process.env.PORT_APP || 3000
    );
});
