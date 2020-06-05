/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import PointItems from '@modules/points/infra/typeorm/entities/PointItems';

@Entity('items')
class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => PointItems, pointItems => pointItems.item, {
    cascade: ['insert'],
  })
  point_items: PointItems[];

  @Column()
  image: string;

  @Column()
  title: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Item;
