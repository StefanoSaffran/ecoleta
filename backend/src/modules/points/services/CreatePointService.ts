import { injectable, inject } from 'tsyringe';
import fs from 'fs';
import path from 'path';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';

import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import Point from '../infra/typeorm/entities/Point';
import IPointsRepository from '../repositories/IPointsRepository';

interface IRequest {
  name: string;
  email: string;
  image: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
  items: Array<string>;
}

@injectable()
class CreatePointService {
  constructor(
    @inject('PointsRepository')
    private pointsRepository: IPointsRepository,

    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  public async execute({
    name,
    image,
    email,
    whatsapp,
    latitude,
    longitude,
    uf,
    city,
    items,
  }: IRequest): Promise<Point> {
    const checkItemsExists = await this.itemsRepository.findAllById(items);

    if (items.length !== checkItemsExists.length)
      throw new AppError('Item not found');

    const point = await this.pointsRepository.create({
      city,
      image,
      email,
      latitude,
      longitude,
      name,
      uf,
      whatsapp,
      itemsId: items,
    });

    await fs.promises.rename(
      path.resolve(uploadConfig.uploadsFolder, image),
      path.resolve(uploadConfig.photosFolder, image),
    );

    return point;
  }
}

export default CreatePointService;
