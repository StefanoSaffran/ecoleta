import { Router } from 'express';

import ItemsController from '../controllers/ItemsController';

const itemsRouter = Router();
const itemsController = new ItemsController();

itemsRouter.get('/', itemsController.index);
itemsRouter.post('/', itemsController.create);

export default itemsRouter;
