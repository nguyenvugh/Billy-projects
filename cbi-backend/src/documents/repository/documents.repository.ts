import { EntityRepository, Repository, In } from 'typeorm';
import { Documents } from '../entity/documents.entity';

@EntityRepository(Documents)
export class DocumentsRepository extends Repository<Documents> {
  async getAllDocument(searchText: string, offset: number, limit: number) {
    const [data, total] = await this.createQueryBuilder('docs')
      .leftJoinAndSelect('docs.createdBy', 'user')
      .innerJoinAndSelect('docs.file', 'file')
      .where((qb) => {
        if (searchText) {
          qb.andWhere('docs.title LIKE :q', {
            q: `%${searchText}%`,
          });
        }
      })
      .orderBy({
        'docs.createdAt': 'DESC',
      })
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    return { data, total };
  }

  async deleteDocument(ids: string[]) {
    return await this.softDelete({
      id: In(ids),
    });
  }
}
