import { Repository } from 'typeorm';

export class BaseRepo<T> extends Repository<T> {
  findById(id: string) {
    return this.findOne(id);
  }

  deleteById(id: string) {
    return this.delete(id);
  }
}
