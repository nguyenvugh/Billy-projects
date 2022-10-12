import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contact')
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  content: string;
}
