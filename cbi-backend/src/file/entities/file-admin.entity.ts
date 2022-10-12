import { BooleanEnum, FileType } from '../../common/constants/global.constant';
import { BaseEntity } from '../../common/entities/base.entity';
import {
  AfterLoad,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from 'src/article-module/article/entity/article.entity';
import { User } from 'src/auth/entities/user.entity';
import { CbiEntity } from '../../cbi/cbi/entity/cbi.entity';
import { UserDocument } from 'src/auth/entities/user-document.entity';

@Entity('file-admin')
export class FileAdmin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @Index()
  key: string;

  @Column()
  bucket: string;

  @Column({ enum: FileType, default: FileType.IMAGE })
  type: FileType;

  @Column({ default: 0 })
  size: number;

  @Column({ enum: BooleanEnum, default: BooleanEnum.FALSE })
  verified: BooleanEnum;

  @Column({ name: 'uploader_id' })
  uploaderId: string;

  @ManyToOne(() => User, (user) => user.files)
  @JoinColumn({ name: 'uploader_id' })
  uploader: User;

  @OneToMany(() => Article, (article) => article.thumbnail)
  articles: Article[];

  @OneToMany(() => CbiEntity, (cbi) => cbi.thumbnail)
  cbis: CbiEntity[];

  @OneToOne(() => User, (user) => user.avatar)
  avatarUser: User;

  @OneToOne(() => UserDocument, (userDocument) => userDocument.file)
  userDocument: UserDocument;

  url: string;
}
