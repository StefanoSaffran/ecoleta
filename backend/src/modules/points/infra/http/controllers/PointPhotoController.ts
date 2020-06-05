import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdatePointPhotoService from '@modules/points/services/UpdatePointPhotoService';

export default class ListAllPointsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const updatePointPhotoService = container.resolve(UpdatePointPhotoService);

    const point = await updatePointPhotoService.execute({
      point_id: id,
      photoFilename: request.file.filename,
    });

    return response.json(point);
  }
}
