import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Article } from '../../article/entities/article.entity';
import {
  BooleanEnum,
  SupportFileType,
} from '../../common/constants/global.constant';
import { BaseEntity } from '../../common/entities/base.entity';
import { ImageTranslation } from './image-translation.entity';
import { Banner } from '../../banner/entities/banner.entity';

@Entity('files')
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Index()
  key: string;

  @Column()
  bucket: string;

  @Column({ name: 'file_name' })
  fileName: string;

  @Column({ enum: SupportFileType, default: SupportFileType.mp3 })
  type: SupportFileType;

  @Column({ default: 0 })
  size: number;

  @ManyToOne(() => Article, (article: Article) => article.id)
  @JoinColumn({ name: 'article_id' })
  article: Article;

  @Column({ enum: BooleanEnum, default: BooleanEnum.FALSE })
  verified: BooleanEnum;

  url: string;

  @OneToMany(
    () => ImageTranslation,
    (imageTranslation: ImageTranslation) => imageTranslation.file,
    {
      cascade: true,
    },
  )
  imageTranslates: ImageTranslation[];

  @OneToOne(() => Banner, (banner) => banner.image)
  banner: Banner;
}

export class ImageWithDownloadUrl extends File {
  url: string;
}
