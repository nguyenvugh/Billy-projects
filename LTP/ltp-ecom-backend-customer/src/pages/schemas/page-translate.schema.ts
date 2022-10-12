import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Index,
  JoinColumn,
} from 'typeorm';
import { Page } from './page.schema';

@Entity({
  name: 'page_translates',
})
export class PageTranslate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'page', type: 'int' })
  page: number;

  @ManyToOne(() => Page, (page) => page.translates)
  @Index()
  @JoinColumn([
    {
      name: 'page',
      referencedColumnName: 'id',
    },
  ])
  page_obj: Page;

  @Column({ length: 10, type: 'varchar' })
  language_code: string;

  @Column({ length: 255, type: 'varchar' })
  language_field: string;

  @Column({ type: 'mediumtext' })
  language_value: string;
}
