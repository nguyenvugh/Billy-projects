import { CustomerReviewStatus } from '../../common/constants/product.constant';
import PaginateDto from '../../common/dtos/paginate.dto';

export class FindProductReviewDto extends PaginateDto {
  q: string;
  status: CustomerReviewStatus;
  product_id: number;
}
