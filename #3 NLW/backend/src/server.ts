import express from 'express';
// Conexão com o bando de dados
import './database/connection';

const server = express();

server.use(express.json());

/**
 * Rota /
 */
server.get('/', (req, res) => {
    return res.json({
        app: '#3 NLW - Next Level Week - Happy',
        author: "Gabriel 'CoGUMm' Vilar",
        mail: 'gabriel@cogumm.net',
        github: 'https://github.com/cogumm/NextLevelWeek/blob/master/%233%20NLW/README.md'
    });
});

/**
 * Rodando o servidor back-end.
 */
server.listen(3001, () => {
    console.log('Servidor backend inicializado com sucesso na porta ' + 3001)
});
