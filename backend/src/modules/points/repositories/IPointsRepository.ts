import Point from '../infra/typeorm/entities/Point';

import ICreatePointDTO from '../dtos/ICreatePointDTO';
import IUpdatePointDTO from '../dtos/IUpdatePointDTO';
import IFindAllFilteredPoints from '../dtos/IFindAllFilteredPointsDTO';

export default interface IPointsRepository {
  create(data: ICreatePointDTO): Promise<Point>;
  update(data: IUpdatePointDTO): Promise<Point>;
  delete(point: Point): Promise<void>;
  findAllFilteredPoints(data: IFindAllFilteredPoints): Promise<Point[]>;
  findById(id: string): Promise<Point | undefined>;
  findAll(): Promise<Point[] | undefined>;
}
