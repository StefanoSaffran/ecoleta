import { injectable, inject } from 'tsyringe';

import Item from '../infra/typeorm/entities/Item';
import IItemsRepository from '../repositories/IItemsRepository';

interface IRequest {
  title: string;
  image: string;
}

@injectable()
class ListItemService {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  public async execute(): Promise<Item[] | undefined> {
    const items = await this.itemsRepository.findAllItems();

    return items;
  }
}

export default ListItemService;
