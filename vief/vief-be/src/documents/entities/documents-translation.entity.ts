import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LangEnum } from '../../common/constants/global.constant';
import { BaseEntity } from '../../common/entities/base.entity';
import { Documents } from './documents.entity';

@Entity('documents_translation')
export class DocumentsTranslation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: LangEnum })
  lang: LangEnum;

  @Column({ type: 'text', nullable: true })
  shortDesc: string;

  @ManyToOne(() => Documents, (documents: Documents) => documents.translates, {
    onDelete: 'CASCADE',
  })
  documents: Documents;
}
