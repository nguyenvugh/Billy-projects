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
    text: "Quản lý sản phẩm",
    icon: <RiHomeLine fontSize={24} color="#ffffff" />,
    childrens: [
      {
        to: urlProduct,
        text: "Sản phẩm",
        component: ProductRouter,
        key: keyProduct,
      },
      {
        to: urlProductCategory,
        text: "Danh mục sản phẩm",
        component: ProductCategoryRouter,
        key: keyProductCategory,
      },
      {
        to: urlProductReview,
        text: "Đánh giá",
        component: ProductReviewRouter,
        key: keyProductReview,
      },
    ],
  },
  {
    to: "",
    text: "Quản lý kho hàng",
    icon: <RiPictureInPictureLine fontSize={24} color="#ffffff" />,
    childrens: [
      {
        to: urlWarehouse,
        text: "Kho hàng",
        component: Warehouse,
        key: keyWarehouse,
      },
      {
        to: urlWarehouseReceipt,
        text: "Phiếu nhập kho",
        component: WarehouseReceipt,
        key: keyWarehouseReceipt,
      },
    ],
  },
  {
    to: "/stores-managing",
    text: "Quản lý cửa hàng",
    icon: <RiStore2Line fontSize={24} color="#ffffff" />,
    childrens: [
      {
        to: urlStore,
        text: "Hệ thống cửa hàng",
        component: StoresRouter,
        key: keyStore,
      },
      {
        to: urlBranch,
        text: "Văn phòng đại diện",
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
        text: "Kêu gọi",
        component: Charity,
        key: keyCharity,
      },
    ],
  },
  {
    to: "/customer-managing",
    text: "Quản lý người dùng",
    icon: <FiUsers fontSize={24} color="#ffffff" />,
    childrens: [
      {
        to: urlUserProfile,
        text: "Tài khoản người dùng",
        component: UserProfileRouter,
        key: keyUserProfile,
      },
      {
        to: urlUserContact,
        text: "Liên hệ",
        component: UserContactRouter,
        key: keyUserContact,
      },
      {
        to: urlEmailRegister,
        text: "Email đăng kí",
        component: UserEmailRegister,
        key: keyEmailRegister,
      },
    ],
  },
  {
    to: "/news-managing",
    text: "Quản lý tin tức",
    icon: <RiFile3Line fontSize={24} color="#ffffff" />,
    childrens: [
      {
        to: urlNewsCategory,
        text: "Chuyên mục tin tức",
        component: NewsCategory,
        key: keyNewsCategory,
      },
      {
        to: urlNews,
        text: "Tin tức",
        component: NewsRouter,
        key: keyNews,
      },
      {
        to: urlStaticPage,
        text: "Trang tĩnh",
        component: StaticPage,
        key: keyStaticPage,
      },
    ],
  },
  {
    to: "/users-managing",
    text: "Quản lý tài khoản",
    icon: <RiSettings5Line fontSize={24} color="#ffffff" />,
    childrens: [
      {
        to: urlAdmin,
        text: "Tài khoản",
        component: AdminRouter,
        key: keyAdmin,
      },
      {
        to: urlPermission,
        text: "Phân quyền",
        component: Authorization,
        key: keyPermission,
      },
    ],
  },
];
