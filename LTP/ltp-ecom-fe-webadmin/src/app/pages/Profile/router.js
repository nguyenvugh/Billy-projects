import { urlProfile } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import { Route, Switch } from "react-router-dom";
import Profile from 'app/pages/Profile';
import ProfileEdit from 'app/pages/Profile/ProfileEdit';

const ProfileRouter = () => {
  return (
    <Switch>
      <Route exact path={urlProfile} component={Profile} />
      <Route exact path={`${urlProfile}/edit`} component={ProfileEdit} />
    </Switch>
  )
}

export default ProfileRouter;