import { urlStaticPage } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import FooterConfig from "./FooterConfig";
import StaticPageDetail from "./StaticPageDetail";
import StaticPageList from "./StaticPageList";

const StaticPage = () => {
  return (
    <BrowserRouter basename={urlStaticPage}>
      <Switch>
        <Route exact path="/">
          <StaticPageList />
        </Route>
        <Route exact path="/config/footer">
          <FooterConfig />
        </Route>
        <Route exact path="/:id">
          <StaticPageDetail />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default StaticPage;