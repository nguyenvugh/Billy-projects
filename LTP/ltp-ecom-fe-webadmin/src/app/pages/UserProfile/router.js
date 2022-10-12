import { urlUserProfile } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import { Route, Switch } from "react-router-dom";
import UserProfile from "app/pages/UserProfile";
import UserProfileDetail from "app/pages/UserProfile/UserProfileDetail";
import UserOrderDetail from "app/pages/UserProfile/UserOrderDetail";
import UserProfileEdit from "app/pages/UserProfile/UserProfileEdit";

const UserProfileRouter = () => {
  return (
    <Switch>
      <Route exact path={urlUserProfile} component={UserProfile} />
      <Route exact path={`${urlUserProfile}/:id`} component={UserProfileDetail} />
      <Route exact path={`${urlUserProfile}/:id/order/:orderId`} component={UserOrderDetail} />
      <Route exact path={`${urlUserProfile}/edit/:id`} component={UserProfileEdit} />
    </Switch>
  )
}

export default UserProfileRouter;