import { EntityRepository, Repository } from 'typeorm';
import { Documents } from '../entities/documents.entity';

@EntityRepository(Documents)
export class DocumentsRepository extends Repository<Documents> {}
