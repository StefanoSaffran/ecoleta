import { injectable, inject } from 'tsyringe';

import Point from '../infra/typeorm/entities/Point';
import IPointsRepository from '../repositories/IPointsRepository';

@injectable()
class ListPointService {
  constructor(
    @inject('PointsRepository')
    private pointsRepository: IPointsRepository,
  ) {}

  public async execute(): Promise<Point[] | undefined> {
    const points = await this.pointsRepository.findAll();

    return points;
  }
}

export default ListPointService;
