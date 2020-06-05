import { injectable, inject } from 'tsyringe';
import fs from 'fs';
import path from 'path';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import Point from '../infra/typeorm/entities/Point';
import IPointsRepository from '../repositories/IPointsRepository';

interface IRequest {
  point_id: string;
  photoFilename: string;
}

@injectable()
class UpdatePointPhotoService {
  constructor(
    @inject('PointsRepository')
    private pointsRepository: IPointsRepository,
  ) {}

  public async execute({ point_id, photoFilename }: IRequest): Promise<Point> {
    const point = await this.pointsRepository.findById(point_id);

    if (!point) throw new AppError('Point not found');

    if (point.image) {
      const filePath = path.resolve(uploadConfig.photosFolder, point.image);

      try {
        await fs.promises.stat(filePath);
      } catch {
        throw new AppError('File not found');
      }
      await fs.promises.unlink(filePath);
    }

    await fs.promises.rename(
      path.resolve(uploadConfig.uploadsFolder, photoFilename),
      path.resolve(uploadConfig.photosFolder, photoFilename),
    );

    point.image = photoFilename;

    return this.pointsRepository.save(point);
  }
}

export default UpdatePointPhotoService;
