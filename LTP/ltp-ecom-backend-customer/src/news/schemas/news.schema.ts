import {
  NewsFeaturesConst,
  NewsStatusConst,
} from '../../common/constants/news.constant';
import { MediaUpload } from '../../media-upload/schema/media-upload.schema';
import { NewsCategory } from '../../news-category/schemas/news-category.schema';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  ManyToOne,
  Index,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { NewsTranslate } from './news-translate.schema';

@Entity({
  name: 'news',
})
export class News extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  thumbnail: number;

  @OneToOne(() => MediaUpload)
  @JoinColumn({
    name: 'thumbnail',
  })
  thumbnail_obj: MediaUpload;

  @Column({
    type: 'int',
  })
  category: number;

  @Column({
    type: 'int',
    enum: [
      NewsStatusConst.DRAFT,
      NewsStatusConst.PUBLISHED,
      NewsStatusConst.SCHEDULED,
    ],
  })
  status: NewsStatusConst;

  @Column({
    type: 'int',
    enum: [
      NewsFeaturesConst.NONE,
      NewsFeaturesConst.PRIVATE,
      NewsFeaturesConst.PUBLIC,
      NewsFeaturesConst.PUBLIC_AND_PRIVATE,
    ],
  })
  features: NewsFeaturesConst;

  @Column({ length: 50, type: 'varchar', nullable: true })
  author: string;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  scheduled_at: Date;

  @ManyToOne(() => NewsCategory, (newsCategory) => newsCategory.news)
  @Index()
  @JoinColumn({
    name: 'category',
  })
  category_obj: NewsCategory;

  @OneToMany(() => NewsTranslate, (newsTranslate) => newsTranslate.news_obj, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  translates: NewsTranslate[];
}
