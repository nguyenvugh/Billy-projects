import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { LangEnum } from '../../common/constants/global.constant';
import { File } from './file.entity';

@Entity('image_translations')
export class ImageTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: LangEnum })
  lang: LangEnum;

  @Column({ type: 'varchar', length: 255 })
  alt: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ManyToOne(() => File, (file: File) => file.imageTranslates)
  @JoinColumn({ name: 'file_id' })
  file: File;

  @Column({ type: 'integer', name: 'file_id' })
  fileId: number;
}
