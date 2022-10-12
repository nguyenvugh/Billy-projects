import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from '../../article/entities/article.entity';
import {
  BooleanEnum,
  DEPARTMENT_NAME,
  SECTIONS_NAME,
} from '../../common/constants/global.constant';
import { BaseEntity } from '../../common/entities/base.entity';
import { File } from '../../file/entities/file.entity';
import { CategoryTranslation } from './category-translation.entity';

@Entity('categories')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: SECTIONS_NAME })
  type: SECTIONS_NAME;

  @OneToOne(() => File, (file) => file.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'image_id' })
  thumbnail: File;

  @Column({ enum: BooleanEnum })
  isFeature: BooleanEnum;

  @Column({ enum: DEPARTMENT_NAME })
  field: DEPARTMENT_NAME;

  @Column()
  path: string;

  @OneToMany(
    () => CategoryTranslation,
    (categoryTranslate: CategoryTranslation) => categoryTranslate.category,
    {
      cascade: true,
    },
  )
  translates: CategoryTranslation[];

  @OneToMany(() => Article, (article: Article) => article.category)
  articles: Article[];
}
