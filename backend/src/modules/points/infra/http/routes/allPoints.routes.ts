import { Router } from 'express';

import ListAllPointsController from '../controllers/ListAllPointsController';

const allPointsRouter = Router();
const listAllPointsController = new ListAllPointsController();

allPointsRouter.get('/', listAllPointsController.index);

export default allPointsRouter;
