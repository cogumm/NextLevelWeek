import express from 'express';
import path from 'path';
import cors from 'cors';

import 'express-async-errors';

// Conexão com o bando de dados
import './database/connection';

// Importando as rotas
import './routes';
import routes from './routes';

// Error handler
import errorHandler from './errors/handler';

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
 * Rota pública do upload de imagens.
 */
server.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

/**
 * Lidando com exceção
 */
server.use(errorHandler);

/**
 * Rodando o servidor back-end.
 */
server.listen(3001, () => {
    console.log('Servidor backend inicializado com sucesso na porta ' + 3001)
});
