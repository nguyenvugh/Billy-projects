import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'evdict' })
export class EvDict extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  idx: number;

  @Column({ length: 50, unique: true })
  word: string;

  @Column()
  detail: string;

  @Column({
    nullable: true
  })
  example: string;
}
