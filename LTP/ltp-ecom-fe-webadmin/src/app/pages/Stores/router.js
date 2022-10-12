import { urlStore } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import Stores from 'app/pages/Stores';
import StoreCreation from 'app/pages/Stores/StoreCreation';
import StoreDetail from 'app/pages/Stores/StoreDetail';
import { Route, Switch } from "react-router-dom";

const StoresRouter = () => {
  return (
    <Switch>
      <Route exact path={urlStore} component={Stores} />
      <Route exact path={`${urlStore}/create`} component={StoreCreation} />
      <Route exact path={`${urlStore}/edit/:id`} component={StoreCreation} />
      <Route exact path={`${urlStore}/:id`} component={StoreDetail} />
    </Switch>
  )
}

export default StoresRouter;