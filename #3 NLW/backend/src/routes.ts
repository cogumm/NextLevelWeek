import { Router } from 'express';

import OrphanagesController from './controllers/OrphanagesController';

const routes = Router();

/**
 * Rota Orfanatos
 */
routes.post('/orphanages', OrphanagesController.create);

/**
 * Rota /
 */
routes.get('/', (req, res) => {
    return res.json({
        app: '#3 NLW - Next Level Week - Happy',
        author: "Gabriel 'CoGUMm' Vilar",
        mail: 'gabriel@cogumm.net',
        github: 'https://github.com/cogumm/NextLevelWeek/blob/master/%233%20NLW/README.md'
    });
});

export default routes;
