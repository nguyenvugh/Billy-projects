import { Switch, Route } from "react-router-dom";
import { urlFlashSale } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import FlashSales from "app/pages/FlashSales";
import FlashSaleDetail from "app/pages/FlashSales/FlashSaleDetail";

const FlashSaleRouter = () => {
  return (
    <Switch>
      <Route exact path={urlFlashSale} component={FlashSales} />
      <Route exact path={`${urlFlashSale}/page/:page`} component={FlashSales} />
      <Route exact path={`${urlFlashSale}/:id`} component={FlashSaleDetail} />
      <Route exact path={`${urlFlashSale}/:id/page/:page`} component={FlashSaleDetail} />
    </Switch>
  )
}

export default FlashSaleRouter;