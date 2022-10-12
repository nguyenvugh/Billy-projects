import { EntityRepository, Repository } from 'typeorm';
import { Page } from '../schemas/page.schema';

@EntityRepository(Page)
export class PageRepository extends Repository<Page> { }
