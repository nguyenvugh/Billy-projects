import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { PageTranslate } from './page-translate.schema';

@Entity({
  name: 'pages',
})
export class Page extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  slug: string;

  @OneToMany(() => PageTranslate, (pageTranslate) => pageTranslate.page_obj, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  translates: PageTranslate[];
}
