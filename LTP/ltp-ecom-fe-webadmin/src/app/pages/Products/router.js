import { urlProduct } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import { Route, Switch } from "react-router-dom";
import Products from 'app/pages/Products';
import ProductCreation from 'app/pages/Products/ProductCreation';
import ProductDetail from 'app/pages/Products/ProductDetail';

const ProductRouter = () => {
  return (
    <Switch>
      <Route exact path={urlProduct} component={Products} />
      <Route exact path={`${urlProduct}/create`} component={ProductCreation} />
      <Route exact path={`${urlProduct}/edit/:id`} component={ProductCreation} />
      <Route exact path={`${urlProduct}/:id`} component={ProductDetail} />
    </Switch>
  )
}

export default ProductRouter;