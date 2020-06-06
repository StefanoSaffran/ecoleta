import { container } from 'tsyringe';

import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import ItemsRepository from '@modules/items/infra/typeorm/repositories/ItemsRepository';

import IPointsRepository from '@modules/points/repositories/IPointsRepository';
import PointsRepository from '@modules/points/infra/typeorm/repositories/PointsRepository';

container.registerSingleton<IItemsRepository>(
  'ItemsRepository',
  ItemsRepository,
);

container.registerSingleton<IPointsRepository>(
  'PointsRepository',
  PointsRepository,
);
