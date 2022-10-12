import { urlNews } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import News from 'app/pages/News';
import NewCreation from 'app/pages/News/NewCreation';
import { Route, Switch } from "react-router-dom";
import NewDetail from 'app/pages/News/NewDetail';

const NewsRouter = () => {
  return (
    <Switch>
      <Route exact path={urlNews} component={News} />
      <Route exact path={`${urlNews}/create`} component={NewCreation} />
      <Route exact path={`${urlNews}/edit/:id`} component={NewCreation} />
      <Route exact path={`${urlNews}/:id`} component={NewDetail} />
    </Switch>
  )
}

export default NewsRouter;