import { ProductReview } from '../../product-review/schema/product-review.schema';
import { roundNumber } from './util.helper';

export const calculateProductAvgRating = (data: ProductReview[]) => {
  if (!data || !data.length) {
    return 0;
  }
  const totalProductReviews = data.length;
  const totalProductRatings = data.reduce(function (a, b) {
    return a + b.rating;
  }, 0);
  return roundNumber(totalProductRatings / totalProductReviews, 1);
};
