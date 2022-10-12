import { BooleanStatusEnum } from 'src/common/constants/global.constant';
import { BaseEntity } from 'src/common/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_companies')
export class UserCompany extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  position: string;

  @Column({ name: 'number_employees', type: 'bigint', default: 0 })
  numberEmployees: string;

  @Column({ type: 'bigint', default: 0 })
  revenue: string;

  @Column({ nullable: true })
  address: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  website: string;

  @Column({ name: 'work_field' })
  workField: string;

  @Column({
    name: 'date_create_company',
    type: 'timestamptz',
    nullable: true,
  })
  dateCreateCompany: Date;

  @Column({ name: 'num_unofficial_employees', default: 0 })
  numUnofficialEmployees: number;

  @Column({ name: 'model_manufactoring', nullable: true })
  modelManufactoring: string;

  @Column({ name: 'size_manufactoring', nullable: true })
  sizeManufactoring: string;

  @Column({ name: 'material_area', nullable: true })
  materialArea: string;

  @Column({ name: 'is_apply_working_diary', default: BooleanStatusEnum.FALSE })
  isApplyWorkingDiary: BooleanStatusEnum;

  @Column({ name: 'is_apply_digital', default: BooleanStatusEnum.FALSE })
  isapplyDigital: BooleanStatusEnum;

  @OneToOne(() => User, (user) => user.userCompany, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
