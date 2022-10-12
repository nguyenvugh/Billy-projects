import { Switch, Route } from "react-router-dom";
import Admin from "app/pages/Admin";
import AdminDetail from "app/pages/Admin/AdminDetail";
import AdminCreation from "app/pages/Admin/AdminCreation";
import { urlAdmin } from "app/Layouts/AuthenticatedLayout/Sidebar/url";

const AdminRouter = () => {
  return (
    <Switch>
      <Route exact path={urlAdmin} component={Admin} />
      <Route exact path={`${urlAdmin}/create`} component={AdminCreation} />
      <Route exact path={`${urlAdmin}/edit/:id`} component={AdminCreation} />
      <Route exact path={`${urlAdmin}/:id`} component={AdminDetail} />
    </Switch>
  )
}

export default AdminRouter;