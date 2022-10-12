import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';

@Entity({
  name: 'groups',
})
export class Group extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'json',
  })
  permissions: string;

  @Column({
    type: 'tinyint',
  })
  count: number;

  @Column({
    type: 'tinyint',
  })
  is_super: number;

  @Column({
    type: 'tinyint',
  })
  deleted: number;

  @Column({
    type: 'timestamp',
  })
  deleted_at: Date;

  @Column({
    type: 'int',
  })
  deleted_by: number;
}
