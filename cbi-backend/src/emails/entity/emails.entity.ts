import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('emails')
export class Emails extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  email: string;
}
