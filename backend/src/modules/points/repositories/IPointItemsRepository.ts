export default interface IPointsRepository {
  deleteByPointId(point_id: string): Promise<void>;
}
