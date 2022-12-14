import {
  RiCoupon4Line,
  RiFile3Line,
  RiHomeLine,
  RiLayout5Line,
  RiPictureInPictureLine,
  RiSettings5Line,
  RiStore2Line,
} from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import {
  urlAdmin,
  urlPermission,
  urlBranch,
  urlCharity,
  urlCombo,
  urlCoupon,
  urlFlashSale,
  urlNews,
  urlNewsCategory,
  urlOrders,
  urlProductCategory,
  urlProductReview,
  urlProduct,
  urlPromotion,
  urlStaticPage,
  urlStore,
  urlUserContact,
  urlEmailRegister,
  urlUserProfile,
  urlWarehouse,
  urlWarehouseReceipt,
} from "./Sidebar/url";

import {
  keyAdmin,
  keyPermission,
  keyBranch,
  keyCharity,
  keyCombo,
  keyCoupon,
  keyFlashSale,
  keyNews,
  keyNewsCategory,
  keyOrders,
  keyProductCategory,
  keyProductReview,
  keyProduct,
  keyPromotion,
  keyStaticPage,
  keyStore,
  keyUserContact,
  keyEmailRegister,
  keyUserProfile,
  keyWarehouse,
  keyWarehouseReceipt,
} from "app/pages/Authorization/AddEditAuthorization/key";

import ProductRouter from "app/pages/Products/router";
import ProductCategoryRouter from "app/pages/ProductCategories/router";
import ProductReviewRouter from "app/pages/ProductReview/router";
import Warehouse from "app/pages/Warehouse";
import WarehouseReceipt from "app/pages/WarehouseReceipt";
import StoresRouter from "app/pages/Stores/router";
import BranchRouter from "app/pages/BranchesDepartment/router";
import Orders from "app/pages/Orders";
import FlashSaleRouter from "app/pages/FlashSales/router";
import Charity from "app/pages/Charity";
import Combo from "app/pages/Combo";
import Coupon from "app/pages/Coupon";
import PromotionRouter from "app/pages/Promotions/router";
import UserProfileRouter from "app/pages/UserProfile/router";
import UserContactRouter from "app/pages/UserContact/router";
import UserEmailRegister from "app/pages/UserEmailRegister";
import NewsCategory from "app/pages/NewsCategories";
import NewsRouter from "app/pages/News/router";
import StaticPage from "app/pages/StaticPage";
import AdminRouter from "app/pages/Admin/router";
import Authorization from "app/pages/Authorization";

export const HOME_ROUTER = [
  // {
  //   to: urlDashboard,
  //   text: 'Dashboard',
  //   icon: <RiLayout5Line fontSize={24} color="#ffffff" />,
  //   component: Dashboard,
  //   key: "dashboard",
  // },
  {
    to: "/products-managing",
    text: "Qu???n l?? s???n ph???m",
    icon: <RiHomeLine fontSize={24} color="#ffffff" />,
    childrens: [
      {
        to: urlProduct,
        text: "S???n ph???m",
        component: ProductRouter,
        key: keyProduct,
      },
      {
        to: urlProductCategory,
        text: "Danh m???c s???n ph???m",
        component: ProductCategoryRouter,
        key: keyProductCategory,
      },
      {
        to: urlProductReview,
        text: "????nh gi??",
        component: ProductReviewRouter,
        key: keyProductReview,
      },
    ],
  },
  {
    to: "",
    text: "Qu???n l?? kho h??ng",
    icon: <RiPictureInPictureLine fontSize={24} color="#ffffff" />,
    childrens: [
      {
        to: urlWarehouse,
        text: "Kho h??ng",
        component: Warehouse,
        key: keyWarehouse,
      },
      {
        to: urlWarehouseReceipt,
        text: "Phi???u nh???p kho",
        component: WarehouseReceipt,
        key: keyWarehouseReceipt,
      },
    ],
  },
  {
    to: "/stores-managing",
    text: "Qu???n l?? c???a h??ng",
    icon: <RiStore2Line fontSize={24} color="#ffffff" />,
    childrens: [
      {
        to: urlStore,
        text: "H??? th???ng c???a h??ng",
        component: StoresRouter,
        key: keyStore,
      },
      {
        to: urlBranch,
        text: "V??n ph??ng ?????i di???n",
        component: BranchRouter,
        key: keyBranch,
      },
    ],
  },
  {
    to: urlOrders,
    text: "Orders",
    icon: <RiPictureInPictureLine fontSize={24} color="#ffffff" />,
    component: Orders,
    key: keyOrders,
  },
  {
    to: "/promos",
    text: "Promo",
    icon: <RiCoupon4Line fontSize={24} color="#ffffff" />,
    childrens: [
      {
        to: urlFlashSale,
        text: "Flashsale",
        component: FlashSaleRouter,
        key: keyFlashSale,
      },
      {
        to: urlPromotion,
        text: "Promotion Slider",
        component: PromotionRouter,
        key: keyPromotion,
      },
      {
        to: urlCoupon,
        text: "Coupon",
        component: Coupon,
        key: keyCoupon,
      },
      {
        to: urlCombo,
        text: "Combo",
        component: Combo,
        key: keyCombo,
      },
      {
        to: urlCharity,
        text: "K??u g???i",
        component: Charity,
        key: keyCharity,
      },
    ],
  },
  {
    to: "/customer-managing",
    text: "Qu???n l?? ng?????i d??ng",
    icon: <FiUsers fontSize={24} color="#ffffff" />,
    childrens: [
      {
        to: urlUserProfile,
        text: "T??i kho???n ng?????i d??ng",
        component: UserProfileRouter,
        key: keyUserProfile,
      },
      {
        to: urlUserContact,
        text: "Li??n h???",
        component: UserContactRouter,
        key: keyUserContact,
      },
      {
        to: urlEmailRegister,
        text: "Email ????ng k??",
        component: UserEmailRegister,
        key: keyEmailRegister,
      },
    ],
  },
  {
    to: "/news-managing",
    text: "Qu???n l?? tin t???c",
    icon: <RiFile3Line fontSize={24} color="#ffffff" />,
    childrens: [
      {
        to: urlNewsCategory,
        text: "Chuy??n m???c tin t???c",
        component: NewsCategory,
        key: keyNewsCategory,
      },
      {
        to: urlNews,
        text: "Tin t???c",
        component: NewsRouter,
        key: keyNews,
      },
      {
        to: urlStaticPage,
        text: "Trang t??nh",
        component: StaticPage,
        key: keyStaticPage,
      },
    ],
  },
  {
    to: "/users-managing",
    text: "Qu???n l?? t??i kho???n",
    icon: <RiSettings5Line fontSize={24} color="#ffffff" />,
    childrens: [
      {
        to: urlAdmin,
        text: "T??i kho???n",
        component: AdminRouter,
        key: keyAdmin,
      },
      {
        to: urlPermission,
        text: "Ph??n quy???n",
        component: Authorization,
        key: keyPermission,
      },
    ],
  },
];
