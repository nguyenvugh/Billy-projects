import { EntityRepository, Repository } from 'typeorm';
import { Admin } from '../schemas/admin.schema';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> { }
