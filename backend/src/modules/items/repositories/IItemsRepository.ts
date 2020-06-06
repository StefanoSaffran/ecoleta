import Item from '../infra/typeorm/entities/Item';

import ICreateItemDTO from '../dtos/ICreateItemDTO';

export default interface IItemsRepository {
  create(data: ICreateItemDTO): Promise<Item>;
  findByTitle(title: string): Promise<Item | undefined>;
  findAllItems(): Promise<Item[] | undefined>;
  findByPointId(id: string): Promise<Item[] | undefined>;
  findAllById(items: Array<string>): Promise<Item[]>;
}
