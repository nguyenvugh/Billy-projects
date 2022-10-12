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
  name: 'page_slug_histories',
})
export class PageSlugHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'page', type: 'int' })
  page_id: number;

  @ManyToOne(() => Page, (page) => page.translates)
  @JoinColumn([
    {
      name: 'page',
    },
  ])
  page: Page;

  @Column({ length: 10, type: 'varchar' })
  language_code: string;

  @Column({ type: 'mediumtext' })
  slug: string;
}
