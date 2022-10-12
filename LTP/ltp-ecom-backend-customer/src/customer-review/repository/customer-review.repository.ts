import { EntityRepository, Repository, Not } from 'typeorm';
import { CustomerReview } from '../schema/customer-review.schema';

@EntityRepository(CustomerReview)
export class CustomerReviewRepository extends Repository<CustomerReview> {}
