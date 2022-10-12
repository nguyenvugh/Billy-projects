import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user_types')
export class UserType {
  @PrimaryColumn()
  key: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  description: string;

  @OneToMany(() => User, (user) => user.userTypeKey)
  users: User[];
}
