import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Index,
  JoinColumn,
} from 'typeorm';
import { Charity } from './charity.schema';

@Entity({
  name: 'charity_translates',
})
export class CharityTranslate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'charity', type: 'int' })
  charity: number;

  @ManyToOne(() => Charity, (charity) => charity.translates)
  @Index()
  @JoinColumn([
    {
      name: 'charity',
      referencedColumnName: 'id',
    },
  ])
  charity_obj: Charity;

  @Column({ length: 10, type: 'varchar' })
  language_code: string;

  @Column({ length: 255, type: 'varchar' })
  language_field: string;

  @Column({ type: 'mediumtext' })
  language_value: string;
}
