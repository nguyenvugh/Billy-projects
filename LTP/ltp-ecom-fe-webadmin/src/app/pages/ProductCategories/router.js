import { urlProductCategory } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import { Route, Switch } from "react-router-dom";
import ProductCategories from "app/pages/ProductCategories";
import ChildrenProductCategories from "app/pages/ProductCategories/ChildrenProductCategories";
import GrandChildrenProductCategories from "./ChildrenProductCategories/GrandChildrenProductCategories";

const ProductCategoryRouter = () => {
  return (
    <Switch>
      <Route exact path={urlProductCategory} component={ProductCategories} />
      <Route
        exact
        path={`${urlProductCategory}/:id`}
        component={ChildrenProductCategories}
      />
      <Route
        exact
        path={`${urlProductCategory}/:id/:grandChildrenId`}
        component={GrandChildrenProductCategories}
      />
    </Switch>
  );
};

export default ProductCategoryRouter;
