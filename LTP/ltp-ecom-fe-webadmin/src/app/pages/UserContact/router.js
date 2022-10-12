import { urlUserContact } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import UserContact from 'app/pages/UserContact';
import UserContactDetail from 'app/pages/UserContact/UserContactDetail';
import { Route, Switch } from "react-router-dom";

const UserContactRouter = () => {
  return (
    <Switch>
      <Route exact path={urlUserContact} component={UserContact} />
      <Route exact path={`${urlUserContact}/:id`} component={UserContactDetail} />
    </Switch>
  )
}

export default UserContactRouter;