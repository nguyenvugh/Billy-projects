import loading from "./loading";
import auth from "./auth";
import orders from "./orders";
import charity from "./charity";
import authorization from "./authorization";
import address from "./address";
import branch from "./branch";
import shop from "./shop";
import combo from "./combo";
import coupon from "./coupon";
import product from "./product";
import staticPage from "./static-page";
import warehouse from "./warehouse";
import warehouseReceipt from "./warehouse-receipt";
import profile from "./profile";
import email from "./email";
import contact from './contact'
const rootReducer = {
  loading,
  auth,
  orders,
  charity,
  authorization,
  address,
  branch,
  shop,
  combo,
  coupon,
  product,
  staticPage,
  warehouse,
  warehouseReceipt,
  profile,
  email,
  contact
};

export default rootReducer;
