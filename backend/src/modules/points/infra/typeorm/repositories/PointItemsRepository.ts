import { getRepository, Repository } from 'typeorm';

import IPointItemsRepository from '@modules/points/repositories/IPointItemsRepository';
import PointItems from '../entities/PointItems';

class PointItemsRepository implements IPointItemsRepository {
  private ormRepository: Repository<PointItems>;

  constructor() {
    this.ormRepository = getRepository(PointItems);
  }

  public async deleteByPointId(point_id: string): Promise<void> {
    await this.ormRepository.delete({ point_id });
  }
}

export default PointItemsRepository;
