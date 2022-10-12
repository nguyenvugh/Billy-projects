import { EntityRepository, Repository } from 'typeorm';
import { Branch } from '../schemas/branch.schema';

@EntityRepository(Branch)
export class BranchRepository extends Repository<Branch> { }
