import express from 'express';
import { getRepository } from 'typeorm';
import Orphanages from './database/models/Orphanage';

// Conexão com o bando de dados
import './database/connection';

const server = express();

server.use(express.json());

/**
 * Rota Orfanatos
 */
server.post('/orphanages', async (req, res) => {
    const { name, latitude, longitude, about, instructions, opening_hours, open_on_weekends } = req.body;

    const orphanagesRepository = getRepository(Orphanages);

    const orphanages = orphanagesRepository.create({
        name, latitude, longitude, about, instructions, opening_hours, open_on_weekends
    });

    await orphanagesRepository.save(orphanages);

    return res.json({ message: "ok" });
});

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
