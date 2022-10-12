import { EntityRepository, Repository } from 'typeorm';
import { UserDocument } from '../entities/user-document.entity';

@EntityRepository(UserDocument)
export class UserDocumentRepository extends Repository<UserDocument> {}
