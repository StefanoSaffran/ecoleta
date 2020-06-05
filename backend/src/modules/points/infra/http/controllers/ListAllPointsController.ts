import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListPointsService from '@modules/points/services/ListPointsServices';

export default class ListAllPointsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listPointsService = container.resolve(ListPointsService);
    const points = await listPointsService.execute();

    const serializedPoints = points
      ? points.map(point => ({
          ...point,
          image_url: `http://192.168.0.185:3333/uploads/photos/${point.image}`,
        }))
      : points;

    return response.json(serializedPoints);
  }
}
