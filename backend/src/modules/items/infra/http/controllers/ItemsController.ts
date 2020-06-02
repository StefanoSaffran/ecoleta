import { Request, Response } from 'express';
import knex from '@shared/infra/sqlite';

export default class ItemsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const items = await knex('items').select('*');

    const serializedItems = items.map(({ id, title, image }) => ({
      id,
      title,
      image_url: `http://localhost:3333/uploads/${image}`,
    }));

    return response.json(serializedItems);
  }
}
