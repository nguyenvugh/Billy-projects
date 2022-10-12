import { EntityRepository, Repository } from 'typeorm';
import { DocumentsTranslation } from '../entities/documents-translation.entity';

@EntityRepository(DocumentsTranslation)
export class DocumentTranslationRepository extends Repository<DocumentsTranslation> {}
