import { EntityRepository, Repository } from 'typeorm';
import { QueueSendEmail } from '../schema/queue-send-email.schema';

@EntityRepository(QueueSendEmail)
export class QueueSendEmailRepository extends Repository<QueueSendEmail> {}
