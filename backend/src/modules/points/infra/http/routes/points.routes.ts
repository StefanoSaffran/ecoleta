import { Router } from 'express';

import PointsController from '../controllers/PointsController';

const itemsRouter = Router();
const pointsController = new PointsController();

itemsRouter.post('/', pointsController.create);

export default itemsRouter;
