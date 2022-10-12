import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TimestampWithoutSoftDeleteEntity } from '../../../common/entities/base.entity';
import { FileAdmin } from '../../../file/entities/file-admin.entity';
import { CbiLevelEntity } from '../../cbi-level/entity/cbi-level.entity';
import { CbiUserEntity } from '../../../cbi-user/cbi-user/entity/cbi-user.entity';

@Entity('cbis')
export class CbiEntity extends TimestampWithoutSoftDeleteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  @Index()
  name: string;

  @Column({ name: 'slug', type: 'varchar', length: 255, nullable: true })
  @Index({
    unique: true,
  })
  slug: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'total_levels', type: 'smallint', default: 0 })
  total_levels: number;

  @Column({ name: 'thumbnail_id' })
  thumbnail_id: string;

  @ManyToOne(() => FileAdmin)
  @JoinColumn({ name: 'thumbnail_id' })
  thumbnail: FileAdmin;

  @OneToMany(() => CbiLevelEntity, (cbiLevel) => cbiLevel.cbi)
  levels: CbiLevelEntity[];

  @OneToMany(() => CbiUserEntity, (cbiUserEntity) => cbiUserEntity.cbi)
  cbi_users: CbiUserEntity[];
}
