import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPointsRepository from '../repositories/IPointsRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeletePointService {
  constructor(
    @inject('PointsRepository')
    private pointsRepository: IPointsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const checkPointExists = await this.pointsRepository.findById(id);

    if (!checkPointExists) throw new AppError('Point not found');

    await this.pointsRepository.delete(checkPointExists);
  }
}

export default DeletePointService;
