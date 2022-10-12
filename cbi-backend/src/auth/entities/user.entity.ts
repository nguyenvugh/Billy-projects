import { Exclude } from 'class-transformer';
import { ArticleCategory } from 'src/article-module/article-category/entitiy/article_category.entity';
import { Article } from 'src/article-module/article/entity/article.entity';
import { EUserStatus } from 'src/common/constants/global.constant';
import { BaseEntity } from 'src/common/entities/base.entity';
import { FileAdmin } from 'src/file/entities/file-admin.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserCompany } from './user-company.entity';
import { UserDocument } from './user-document.entity';
import { UserType } from './user-type.entity';
import { UserType as EUserType } from 'src/common/constants/global.constant';
import { CbiUserEntity } from '../../cbi-user/cbi-user/entity/cbi-user.entity';
import { UserToGroupPolicies } from 'src/casl/entities/user-to-group-policies.entity';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true, type: 'text' })
  username: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ name: 'birthday', type: 'timestamptz', nullable: true })
  birthday: Date;

  @Column({ name: 'full_name', nullable: true })
  fullName: string;

  @Column({ nullable: true, name: 'encrypted_password' })
  encryptedPassword: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ name: 'lock_reason', nullable: true })
  lockReason: string;

  @Column({ type: 'enum', enum: EUserStatus, default: EUserStatus.PENDING })
  status: EUserStatus;

  @Column({ name: 'user_type_key', default: EUserType.CLIENT })
  userTypeKey: string;

  @Column({ name: 'company_code', nullable: true })
  companyCode: string;

  @OneToOne(() => FileAdmin, (file) => file.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'avatar_id' })
  avatar: FileAdmin;

  @OneToOne(() => UserCompany, (userCompany) => userCompany.user)
  userCompany: UserCompany;

  @OneToOne(() => UserDocument, (userDocument) => userDocument.user)
  userDocument: UserDocument;

  @ManyToOne(() => UserType, (userType) => userType.key, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_type_key' })
  userType: UserType;

  @OneToMany(() => ArticleCategory, (ac) => ac.creator)
  articleCategories: ArticleCategory[];

  @OneToMany(() => FileAdmin, (fileAdmin) => fileAdmin.uploader)
  files: FileAdmin[];

  @OneToMany(() => Article, (article) => article.creator)
  articles: Article[];

  @OneToMany(() => CbiUserEntity, (cbiUserEntity) => cbiUserEntity.user)
  cbis: CbiUserEntity[];

  @OneToMany(
    () => UserToGroupPolicies,
    (userToGroupPolicies) => userToGroupPolicies.user,
    { cascade: ['insert'] },
  )
  userToGroupPolicies: UserToGroupPolicies[];
}
