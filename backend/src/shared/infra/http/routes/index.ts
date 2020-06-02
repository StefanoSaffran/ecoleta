import { Router } from 'express';
import itemsRouter from '@modules/items/infra/http/routes/items.routes';
import pointsRouter from '@modules/points/infra/http/routes/points.routes';

const routes = Router();

routes.use('/items', itemsRouter);
routes.use('/points', pointsRouter);

export default routes;
