import { urlPromotion } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import Promotions from 'app/pages/Promotions';
import PromotionCreation from 'app/pages/Promotions/PromotionCreation';
import PromotionDetail from 'app/pages/Promotions/PromotionDetail';
import { Route, Switch } from "react-router-dom";

const PromotionRouter = () => {
  return (
    <Switch>
      <Route exact path={urlPromotion} component={Promotions} />
      <Route exact path={`${urlPromotion}/page/:page`} component={Promotions} />
      <Route exact path={`${urlPromotion}/create`} component={PromotionCreation} />
      <Route exact path={`${urlPromotion}/edit/:id`} component={PromotionCreation} />
      <Route exact path={`${urlPromotion}/:id`} component={PromotionDetail} />
    </Switch>
  )
}

export default PromotionRouter;