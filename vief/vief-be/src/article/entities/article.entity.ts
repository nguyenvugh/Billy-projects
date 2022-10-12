import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import {
  BooleanEnum,
  DEPARTMENT_NAME,
} from '../../common/constants/global.constant';
import { BaseEntity } from '../../common/entities/base.entity';
import { File } from '../../file/entities/file.entity';
import { ArticleTranslation } from './article-translation.entity';

@Entity('articles')
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @CreateDateColumn({ name: 'public_at', type: 'timestamptz' })
  publicAt: Date;

  @OneToOne(() => File, (file) => file.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'thumbnail_id' })
  thumbnail: File;

  @Column({ enum: BooleanEnum })
  isFeature: BooleanEnum;

  @Column({ enum: DEPARTMENT_NAME })
  field: DEPARTMENT_NAME;

  @OneToMany(() => File, (file: File) => file.article)
  images: File[];

  @ManyToOne(() => Category, (category: Category) => category.id)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(
    () => ArticleTranslation,
    (articleTranslate: ArticleTranslation) => articleTranslate.article,
    {
      cascade: true,
    },
  )
  translates: ArticleTranslation[];
}
