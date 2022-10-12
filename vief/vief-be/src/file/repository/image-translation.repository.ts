import { EntityRepository, Repository } from 'typeorm';
import { ImageTranslation } from '../entities/image-translation.entity';

@EntityRepository(ImageTranslation)
export class ImageTranslationRepository extends Repository<ImageTranslation> {}
