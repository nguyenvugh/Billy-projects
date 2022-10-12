import { BaseEntity } from 'src/common/entities/base.entity';
import { ConfigCebiType } from 'src/config-cebi/enums/configCebi.enum';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'config_oxfam' })
export class ConfigOxfam extends BaseEntity {
  @PrimaryColumn()
  key: string;

  // TypeORM auto convert object to json when inserted
  @Column({ type: 'jsonb' })
  value: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ConfigCebiType })
  type: ConfigCebiType;
}
