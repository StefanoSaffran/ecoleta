import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateItemService from '@modules/items/services/CreateItemService';
import ListItemsService from '@modules/items/services/ListItemsService';

export default class ItemsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listItems = container.resolve(ListItemsService);

    const items = await listItems.execute();

    const serializedItems = items
      ? items.map(({ id, title, image }) => ({
          id,
          title,
          image_url: `http://192.168.0.185:3333/uploads/${image}`,
        }))
      : items;

    return response.json(serializedItems);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, image } = request.body;

    const createItem = container.resolve(CreateItemService);

    const item = await createItem.execute({
      title,
      image,
    });

    return response.json(item);
  }
}
