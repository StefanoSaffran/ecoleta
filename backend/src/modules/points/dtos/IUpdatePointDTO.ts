import Point from '../infra/typeorm/entities/Point';

export default interface IUpdatePointDTO {
  point: Point;
  items: string[];
}
