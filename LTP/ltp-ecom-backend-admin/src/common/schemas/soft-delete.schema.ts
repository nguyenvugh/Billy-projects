import { Column, DeleteDateColumn, Index } from 'typeorm';
import { DeletedConst } from '../constants';

export class SoftDelete {
  @Column({
    type: 'tinyint',
    default: DeletedConst.NOT_DELETE,
  })
  @Index()
  deleted: DeletedConst;

  @DeleteDateColumn({
    nullable: true,
    select: false,
  })
  deleted_at: Date;

  @Column({
    nullable: true,
    select: false,
    type: 'int',
  })
  @Index()
  deleted_by: number;
}
