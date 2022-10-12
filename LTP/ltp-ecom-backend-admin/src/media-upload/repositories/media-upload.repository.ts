import { EntityRepository, Repository, Not, AbstractRepository } from 'typeorm';
import { CreateMediaDto } from '../dto/create-media.dto';
import { MediaUpload } from '../schemas/media-upload.schema';

@EntityRepository(MediaUpload)
export class MediaUploadRepository extends AbstractRepository<MediaUpload> {
  async findOne(id: number) {
    const result = await this.repository.findOne(id);
    return result;
  }

  async create(createMediaDto: CreateMediaDto) {
    const newRecord = this.repository.create(createMediaDto);
    const created = await this.repository.save(newRecord);
    return created;
  }

  async findByIds(ids: number[]) {
    return this.repository.findByIds(ids);
  }

  async removeOne(id: number) {
    return await this.repository.delete(id);
  }
}
