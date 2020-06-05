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

@Entity('points')
class Point {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => PointItems, pointItems => pointItems.point, {
    cascade: ['insert', 'remove', 'update'],
    eager: true,
  })
  point_items: PointItems[];

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  whatsapp: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  city: string;

  @Column()
  uf: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Point;
