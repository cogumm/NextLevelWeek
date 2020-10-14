import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';

import OrphanagesController from './controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadConfig);

/**
 * Rota Orfanatos
 */
routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

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
