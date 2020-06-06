/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePointService from '@modules/points/services/CreatePointService';
import UpdatePointService from '@modules/points/services/UpdatePointService';
import ListFilteredPointsService from '@modules/points/services/ListFilteredPointsService';
import ListPointProfileService from '@modules/points/services/ShowPointProfileService';
import DeletePointService from '@modules/points/services/DeletePointService';

export default class PointsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => item.trim());

    const listFilteredPointsService = container.resolve(
      ListFilteredPointsService,
    );

    const points = await listFilteredPointsService.execute({
      city: String(city),
      uf: String(uf),
      items: parsedItems,
    });

    const serializedPoints = points
      ? points.map(point => ({
          ...point,
          image_url: `http://192.168.0.185:3333/uploads/photos/${point.image}`,
        }))
      : points;

    return response.json(serializedPoints);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listPointProfileService = container.resolve(ListPointProfileService);

    const point = await listPointProfileService.execute({
      id,
    });

    return response.json(point);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items: stringItems,
    } = request.body;

    const createPoint = container.resolve(CreatePointService);

    const items = stringItems.split(',').map((item: string) => item.trim());

    const point = await createPoint.execute({
      name,
      email,
      image: request.file.filename,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    });

    return response.json(point);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items: stringItems,
    } = request.body;

    const { id } = request.params;

    const updatePoint = container.resolve(UpdatePointService);

    const items = stringItems.split(',').map((item: string) => item.trim());

    const updatedPoint = await updatePoint.execute({
      id,
      image: request.file?.filename || '',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    });

    return response.json(updatedPoint);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePointService = container.resolve(DeletePointService);

    await deletePointService.execute({
      id,
    });

    return response.status(204).send();
  }
}
