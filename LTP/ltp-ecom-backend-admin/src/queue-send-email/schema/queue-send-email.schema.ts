import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({
  name: 'queue_send_emails',
})
export class QueueSendEmail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, type: 'varchar' })
  email: string;

  @Column({ length: 255, type: 'varchar' })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ length: 255, type: 'varchar', nullable: true })
  template: string;

  @Column({ type: 'text', nullable: true })
  data: string;

  @Column({ type: 'timestamp', default: 'NOW()' })
  send_at: Date;
}
