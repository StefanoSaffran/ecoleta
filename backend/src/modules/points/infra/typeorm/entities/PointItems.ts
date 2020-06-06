/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Point from '@modules/points/infra/typeorm/entities/Point';
import Item from '@modules/items/infra/typeorm/entities/Item';

@Entity('point_items')
class PointItems {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Point, point => point.point_items)
  @JoinColumn({ name: 'point_id' })
  point: Point;

  @ManyToOne(() => Item, item => item.point_items, { eager: true })
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @Column()
  point_id: string;

  @Column()
  item_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default PointItems;
