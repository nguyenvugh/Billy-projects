import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { LangEnum } from '../../common/constants/global.constant';
import { Banner } from './banner.entity';

@Entity('banners_translation')
export class BannerTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: LangEnum })
  lang: LangEnum;

  @Column({ type: 'varchar', length: 255 })
  url: string;

  @Column({ type: 'varchar', length: 255, name: 'head_title' })
  headTitle: string;

  @Column({ type: 'varchar', length: 255, name: 'sub_title' })
  subTitle: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Banner, (banner: Banner) => banner.translates)
  @JoinColumn({ name: 'banner_id' })
  banner: Banner;

  @Column({ type: 'integer', name: 'banner_id' })
  bannerId: number;
}
