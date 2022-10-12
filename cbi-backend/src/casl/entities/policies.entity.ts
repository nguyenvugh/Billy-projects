import { NameConstraintEntity } from 'src/common/constants/global.constant';
import { Action } from 'src/common/enums/action.enum';
import { ActionAbility } from 'src/common/enums/actionAbility.enum';
import { Resource } from 'src/common/enums/resource.enum';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { GroupToPolicies } from './group-to-policies.entity';

@Entity()
@Unique(NameConstraintEntity.UQ_POLICIES, [
  'action',
  'resource',
  'actionAbility',
])
export class Policies {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: Action })
  action: Action;

  @Column({ type: 'enum', enum: Resource })
  resource: Resource;

  @Column({ type: 'enum', enum: ActionAbility, name: 'action_ability' })
  actionAbility: ActionAbility;

  @Column({ unique: true })
  name: string;

  @OneToMany(
    () => GroupToPolicies,
    (groupToPolicies) => groupToPolicies.policies,
    { cascade: ['insert'] },
  )
  groupToPolicies: GroupToPolicies[];
}
