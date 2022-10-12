import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'email_subscription',
})
export class EmailSubscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, type: 'varchar' })
  email: string;

  @DeleteDateColumn()
  deleted_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
