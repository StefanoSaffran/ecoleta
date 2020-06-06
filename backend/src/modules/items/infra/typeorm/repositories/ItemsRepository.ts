import { getRepository, Repository, In } from 'typeorm';

import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import ICreateItemDTO from '@modules/items/dtos/ICreateItemDTO';
import Item from '../entities/Item';

class ItemsRepository implements IItemsRepository {
  private ormRepository: Repository<Item>;

  constructor() {
    this.ormRepository = getRepository(Item);
  }

  public async create({ title, image }: ICreateItemDTO): Promise<Item> {
    const item = this.ormRepository.create({
      title,
      image,
    });

    await this.ormRepository.save(item);

    return item;
  }

  public async findByTitle(title: string): Promise<Item | undefined> {
    const findItem = await this.ormRepository.findOne({
      where: {
        title,
      },
    });

    return findItem;
  }

  public async findByPointId(id: string): Promise<Item[] | undefined> {
    const items = this.ormRepository
      .createQueryBuilder('items')
      .select('items.title')
      .innerJoin('items.point_items', 'point_items')
      .where('point_items.point_id = :id', { id })
      .getMany();

    return items;
  }

  public async findAllItems(): Promise<Item[] | undefined> {
    const items = await this.ormRepository.find();

    return items;
  }

  public async findAllById(items: Array<string>): Promise<Item[]> {
    const findAllItems = await this.ormRepository.find({
      id: In(items),
    });

    return findAllItems;
  }
}

export default ItemsRepository;
