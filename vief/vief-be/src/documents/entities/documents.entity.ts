import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DEPARTMENT_NAME } from '../../common/constants/global.constant';
import { BaseEntity } from '../../common/entities/base.entity';
import { File } from '../../file/entities/file.entity';
import { DocumentsTranslation } from './documents-translation.entity';

@Entity('documents')
export class Documents extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => File, (file) => file.id)
  @JoinColumn({ name: 'file_id' })
  file: File;

  @Column({ enum: DEPARTMENT_NAME })
  field: DEPARTMENT_NAME;

  @OneToMany(
    () => DocumentsTranslation,
    (documentTranslate: DocumentsTranslation) => documentTranslate.documents,
    {
      cascade: true,
    },
  )
  translates: DocumentsTranslation[];
}
