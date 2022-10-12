import { EntityRepository, Repository, Not } from 'typeorm';
import { MediaUpload } from '../schema/media-upload.schema';

@EntityRepository(MediaUpload)
export class MediaUploadRepository extends Repository<MediaUpload> {}
