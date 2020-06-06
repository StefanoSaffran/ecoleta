import { Router } from 'express';
import multer from 'multer';
import { celebrate, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import PointsController from '../controllers/PointsController';

const pointsRouter = Router();
const pointsController = new PointsController();
const upload = multer(uploadConfig);

pointsRouter.post(
  '/',
  upload.single('image'),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    },
  ),
  pointsController.create,
);
pointsRouter.get('/', pointsController.index);
pointsRouter.get('/:id', pointsController.show);
pointsRouter.put(
  '/:id',
  upload.single('image'),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    },
  ),
  pointsController.update,
);
pointsRouter.delete('/:id', pointsController.delete);

export default pointsRouter;
