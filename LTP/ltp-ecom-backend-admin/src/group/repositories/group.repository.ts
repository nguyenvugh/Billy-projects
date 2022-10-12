import { EntityRepository, Repository } from 'typeorm';
import { Group } from '../schemas/group.schema';

@EntityRepository(Group)
export class GroupRepository extends Repository<Group> { }
