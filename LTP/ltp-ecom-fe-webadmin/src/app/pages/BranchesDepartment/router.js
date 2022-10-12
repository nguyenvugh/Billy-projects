import { Switch, Route } from "react-router-dom";
import BranchesDepartment from "app/pages/BranchesDepartment";
import BranchesDepartmentCreation from "app/pages/BranchesDepartment/BranchesDepartmentCreation";
import BranchesDepartmentDetail from "app/pages/BranchesDepartment/BranchesDepartmentDetail";
import { urlBranch } from "app/Layouts/AuthenticatedLayout/Sidebar/url";

const BranchRouter = () => {
  return (
    <Switch>
      <Route exact path={urlBranch} component={BranchesDepartment} />
      <Route exact path={`${urlBranch}/create`} component={BranchesDepartmentCreation} />
      <Route exact path={`${urlBranch}/edit/:id`} component={BranchesDepartmentCreation} />
      <Route exact path={`${urlBranch}/:id`} component={BranchesDepartmentDetail} />
    </Switch>
  )
}

export default BranchRouter;