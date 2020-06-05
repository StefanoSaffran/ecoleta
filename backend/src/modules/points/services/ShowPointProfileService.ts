import { injectable, inject } from 'tsyringe';

import ItemsRepository from '@modules/items/repositories/IItemsRepository';
import AppError from '@shared/errors/AppError';
import Item from '@modules/items/infra/typeorm/entities/Item';
import Point from '../infra/typeorm/entities/Point';
import IPointsRepository from '../repositories/IPointsRepository';

interface IRequest {
  id: string;
}

interface IResponse {
  point: Point;
  items: Item[] | undefined;
}

@injectable()
class ShowPointProfileService {
  constructor(
    @inject('PointsRepository')
    private pointsRepository: IPointsRepository,

    @inject('ItemsRepository')
    private itemsRepository: ItemsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse | undefined> {
    const checkPointExists = await this.pointsRepository.findById(id);

    if (!checkPointExists) throw new AppError('Point not found');

    const items = await this.itemsRepository.findByPointId(checkPointExists.id);

    const point = {
      ...checkPointExists,
      image_url: `http://192.168.0.185:3333/uploads/photos/${checkPointExists.image}`,
    } as Point;

    return { point, items };
  }
}

export default ShowPointProfileService;
