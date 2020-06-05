import { getRepository, Repository } from 'typeorm';

import IPointsRepository from '@modules/points/repositories/IPointsRepository';
import ICreatePointDTO from '@modules/points/dtos/ICreatePointDTO';
import IUpdatePointDTO from '@modules/points/dtos/IUpdatePointDTO';
import IFindAllFilteredPointsDTO from '@modules/points/dtos/IFindAllFilteredPointsDTO';
import Point from '../entities/Point';

class PointsRepository implements IPointsRepository {
  private ormRepository: Repository<Point>;

  constructor() {
    this.ormRepository = getRepository(Point);
  }

  public async create({
    city,
    image,
    email,
    latitude,
    longitude,
    name,
    uf,
    whatsapp,
    itemsId,
  }: ICreatePointDTO): Promise<Point> {
    const point = this.ormRepository.create({
      city,
      image,
      email,
      latitude,
      longitude,
      name,
      uf,
      whatsapp,
      point_items: itemsId.map(item => ({
        item_id: item,
      })),
    });

    await this.ormRepository.save(point);

    return point;
  }

  public async update({ point, items }: IUpdatePointDTO): Promise<Point> {
    return this.ormRepository.save({
      ...point,
      point_items: items.map(item => ({
        item_id: item,
      })),
    });
  }

  public async delete(point: Point): Promise<void> {
    await this.ormRepository.remove(point);
  }

  public async findById(id: string): Promise<Point | undefined> {
    const point = await this.ormRepository.findOne(id);

    return point;
  }

  public async findAll(): Promise<Point[] | undefined> {
    const points = await this.ormRepository.find();

    return points;
  }

  public async findAllFilteredPoints({
    city,
    uf,
    items,
  }: IFindAllFilteredPointsDTO): Promise<Point[]> {
    const points = this.ormRepository
      .createQueryBuilder('points')
      .innerJoin(
        'points.point_items',
        'point_items',
        'point_items.item_id IN (:...items)',
        { items },
      )
      .where('points.uf = :uf', { uf })
      .where('points.city = :city', { city })
      .getMany();

    return points;

    /* const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*'); */
  }
}

export default PointsRepository;
