import { injectable, inject } from 'tsyringe';

import Point from '../infra/typeorm/entities/Point';
import IPointsRepository from '../repositories/IPointsRepository';

interface IRequest {
  city: string;
  uf: string;
  items: Array<string>;
}

@injectable()
class ListFilteredPointService {
  constructor(
    @inject('PointsRepository')
    private pointsRepository: IPointsRepository,
  ) {}

  public async execute({
    city,
    uf,
    items,
  }: IRequest): Promise<Point[] | undefined> {
    const points = await this.pointsRepository.findAllFilteredPoints({
      city,
      items,
      uf,
    });

    return points;
  }
}

export default ListFilteredPointService;
