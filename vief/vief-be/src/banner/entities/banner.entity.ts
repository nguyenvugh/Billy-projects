import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DEPARTMENT_NAME } from '../../common/constants/global.constant';
import { BaseEntity } from '../../common/entities/base.entity';
import { File } from '../../file/entities/file.entity';
import { BannerTranslation } from './banner-translation.entity';

@Entity('banners')
export class Banner extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', name: 'image_id' })
  imageId: number;

  @OneToOne(() => File, (file) => file.id, { cascade: true })
  @JoinColumn({ name: 'image_id' })
  image: File;

  @Column({ enum: DEPARTMENT_NAME })
  @Index()
  group: DEPARTMENT_NAME;

  @Column({ type: 'integer', unsigned: true, default: 1 })
  sorting: number;

  @OneToMany(
    () => BannerTranslation,
    (bannerTranslate: BannerTranslation) => bannerTranslate.banner,
    {
      cascade: true,
    },
  )
  translates: BannerTranslation[];
}
