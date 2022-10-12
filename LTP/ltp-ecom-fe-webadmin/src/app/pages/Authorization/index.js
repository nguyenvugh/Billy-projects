import { Route, Switch, BrowserRouter } from "react-router-dom";
import AddEditAdmin from "./AddEditAuthorization";
import AdminList from "./AuthorizationList";
import { urlPermission } from "app/Layouts/AuthenticatedLayout/Sidebar/url";

const Authorization = () => {
  return (
    <BrowserRouter basename={urlPermission}>
      <Switch>
        <Route exact path="/">
          <AdminList />
        </Route>
        <Route exact path="/add">
          <AddEditAdmin />
        </Route>
        <Route exact path="/:id">
          <AddEditAdmin />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Authorization;
