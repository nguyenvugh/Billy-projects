import { FAVORITES, GENERAL_INFO, ORDERS } from "pages/profile";

export const ACCOUNT_DROPDOWN_LINK = [
  {
    path: `/profile?activeMenu=${GENERAL_INFO}`,
    text: "Tài khoản",
    textEn: "Account",
    icon: "user.svg",
  },
  {
    path: `/profile?activeMenu=${ORDERS}&page=1`,
    text: "Đơn hàng",
    textEn: "Orders",
    icon: "shopping-bag.svg",
  },
  {
    path: `/profile?activeMenu=${FAVORITES}&page=1`,
    text: "Yêu thích",
    textEn: "Favorites",
    icon: "heart.svg",
  },
];
