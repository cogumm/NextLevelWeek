import express from 'express';

// Conexão com o bando de dados
import './database/connection';

// Importando as rotas
import './routes';
import routes from './routes';

const server = express();

server.use(express.json());
server.use(routes);

/**
 * Rodando o servidor back-end.
 */
server.listen(3001, () => {
    console.log('Servidor backend inicializado com sucesso na porta ' + 3001)
});
