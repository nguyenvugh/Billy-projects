import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserToGroupPolicies } from '../../casl/entities/user-to-group-policies.entity';
import { File } from '../../file/entities/file.entity';
import { Admin } from '../admin/entities/admin.entity';
import { Client } from '../client/entities/client.entity';
import { UserType } from './user-type.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'varchar', name: 'user_type' })
  userTypeKey: string;

  @ManyToOne(() => UserType, (userType) => userType.key, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_type' })
  userType: UserType;

  @Column({ nullable: true })
  firId: string;

  @OneToOne(() => Client, (client) => client.user)
  client: Client;

  @OneToOne(() => Admin, (admin) => admin.user, { cascade: ['insert'] })
  admin: Admin;

  @OneToOne(() => File, (file) => file.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'avatar_id' })
  avatar: File;

  @OneToMany(
    () => UserToGroupPolicies,
    (userToGroupPolicies) => userToGroupPolicies.user,
    { cascade: ['insert'] },
  )
  userToGroupPolicies: UserToGroupPolicies[];
}
