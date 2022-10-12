import { urlProductReview } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import ProductReview from 'app/pages/ProductReview';
import ProductReviewDetail from 'app/pages/ProductReview/ProductReviewDetail';
import { Route, Switch } from "react-router-dom";

const ProductReviewRouter = () => {
  return (
    <Switch>
      <Route exact path={urlProductReview} component={ProductReview} />
      <Route exact path={`${urlProductReview}/:id`} component={ProductReviewDetail} />
    </Switch>
  )
}

export default ProductReviewRouter;