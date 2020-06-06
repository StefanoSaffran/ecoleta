import { injectable, inject } from 'tsyringe';
import fs from 'fs';
import path from 'path';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';

import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import IPointsRepository from '../repositories/IPointsRepository';
import IPointItemsRepository from '../repositories/IPointItemsRepository';
import Point from '../infra/typeorm/entities/Point';

interface IRequest {
  id: string;
  name: string;
  image: string;
  email: string;
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

    @inject('PointItemsRepository')
    private pointItemsRepository: IPointItemsRepository,

    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
    image,
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

    const point = await this.pointsRepository.findById(id);

    if (!point) throw new AppError('Point not found');

    await this.pointItemsRepository.deleteByPointId(point.id);

    if (point.image && image) {
      const filePath = path.resolve(uploadConfig.photosFolder, point.image);

      try {
        await fs.promises.stat(filePath);
      } catch {
        throw new AppError('File not found');
      }
      await fs.promises.unlink(filePath);
    }

    if (image) {
      await fs.promises.rename(
        path.resolve(uploadConfig.uploadsFolder, image),
        path.resolve(uploadConfig.photosFolder, image),
      );

      point.image = image;
    }

    point.city = city;
    point.email = email;
    point.latitude = latitude;
    point.longitude = longitude;
    point.name = name;
    point.uf = uf;
    point.whatsapp = whatsapp;

    return this.pointsRepository.update({ point, items });
  }
}

export default CreatePointService;
