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
} from "./key";

export const RoleTree = [
  {
    id: "QLSP",
    label: "Quản lý sản phẩm",
    key: "QLSP",
    checked: false,
    child: [
      {
        id: "product",
        label: "Sản phẩm",
        key: keyProduct,
        checked: false
      },
      {
        id: "product_category",
        label: "Danh mục sản phẩm",
        key: keyProductCategory,
        checked: false
      },
      {
        id: "product_review",
        label: "Đánh giá",
        key: keyProductReview,
        checked: false
      }
    ]
  },
  {
    id: "QLCH",
    label: "Quản lý cửa hàng",
    key: "QLCH",
    checked: false,
    child: [
      {
        id: "store",
        label: "Hệ thống cửa hàng",
        key: keyStore,
        checked: false
      },
      {
        id: "branch",
        label: "Văn phòng đại diện",
        key: keyBranch,
        checked: false
      }
    ]
  },

  {
    id: "QLKH",
    label: "Quản lý kho hàng",
    key: "QLKH",
    checked: false,
    child: [
      {
        id: "inventory",
        label: "Kho hàng",
        key: keyWarehouse,
        checked: false
      },
      {
        id: "inventory_receipt",
        label: "Phiếu nhập kho",
        key: keyWarehouseReceipt,
        checked: false
      }
    ]
  },
  {
    id: "order",
    label: "Đơn hàng",
    key: keyOrders,
    checked: false
  },
  {
    id: "QLPR",
    label: "Quản lý promo",
    key: "QLPR",
    checked: false,
    child: [
      {
        id: "flash_sale",
        label: "Flash sale",
        key: keyFlashSale,
        checked: false
      },
      {
        id: "slider",
        label: "Promotion slider",
        key: keyPromotion,
        checked: false
      },
      {
        id: "coupon",
        label: "Coupon",
        key: keyCoupon,
        checked: false
      },
      {
        id: "product_combo",
        label: "Combo",
        key: keyCombo,
        checked: false
      },
      {
        id: "charity",
        label: "Kêu gọi",
        key: keyCharity,
        checked: false
      }
    ]
  },
  {
    id: "QLND",
    label: "Quản lý người dùng",
    key: "QLND",
    checked: false,
    child: [
      {
        id: "customer",
        label: "Tài khoản người dùng",
        key: keyUserProfile,
        checked: false
      },
      {
        id: "contact",
        label: "Liên hệ",
        key: keyUserContact,
        checked: false
      },
      {
        id: "subscriber",
        label: "Email đăng ký",
        key: keyEmailRegister,
        checked: false
      }
    ]
  },
  {
    id: "QLTT",
    label: "Quản lý tin tức",
    key: "QLTT",
    checked: false,
    child: [
      {
        id: "news_category",
        label: "Chuyên mục tin tức",
        key: keyNewsCategory,
        checked: false
      },
      {
        id: "news",
        label: "Tin tức",
        key: keyNews,
        checked: false
      },
      {
        id: "page",
        label: "Page riêng",
        key: keyStaticPage,
        checked: false
      }
    ]
  },
  {
    id: "QLTK",
    label: "Quản lý tài khoản",
    key: "QLTK",
    checked: false,
    child: [
      {
        id: "admin",
        label: "Tài khoản",
        key: keyAdmin,
        checked: false
      },
      {
        id: "group",
        label: "Phân quyền",
        key: keyPermission,
        checked: false
      }
    ]
  }
];

export const RoleArrayWithKey = [
  {
    id: "product",
    label: "Sản phẩm",
    key: keyProduct,
    checked: false
  },
  {
    id: "product_category",
    label: "Danh mục sản phẩm",
    key: keyProductCategory,
    checked: false
  },
  {
    id: "product_review",
    label: "Đánh giá",
    key: keyProductReview,
    checked: false
  },
  {
    id: "store",
    label: "Hệ thống cửa hàng",
    key: keyStore,
    checked: false
  },
  {
    id: "branch",
    label: "Văn phòng đại diện",
    key: keyBranch,
    checked: false
  },
  {
    id: "flash_sale",
    label: "Flash sale",
    key: keyFlashSale,
    checked: false
  },
  {
    id: "slider",
    label: "Promotion slider",
    key: keyPromotion,
    checked: false
  },
  {
    id: "customer",
    label: "Tài khoản người dùng",
    key: keyUserProfile,
    checked: false
  },
  {
    id: "contact",
    label: "Liên hệ",
    key: keyUserContact,
    checked: false
  },
  {
    id: "subscriber",
    label: "Email đăng ký",
    key: keyEmailRegister,
    checked: false
  },
  {
    id: "news_category",
    label: "Chuyên mục tin tức",
    key: keyNewsCategory,
    checked: false
  },
  {
    id: "news",
    label: "Tin tức",
    key: keyNews,
    checked: false
  },
  {
    id: "page",
    label: "Page riêng",
    key: keyStaticPage,
    checked: false
  },
  {
    id: "admin",
    label: "Tài khoản",
    key: keyAdmin,
    checked: false
  },
  {
    id: "group",
    label: "Phân quyền",
    key: keyPermission,
    checked: false
  },
  {
    id: "order",
    label: "Đơn hàng",
    key: keyOrders,
    checked: false
  },
  {
    id: "coupon",
    label: "Coupon",
    key: keyCoupon,
    checked: false
  },
  {
    id: "product_combo",
    label: "Combo",
    key: keyCombo,
    checked: false
  },
  {
    id: "charity",
    label: "Kêu gọi",
    key: keyCharity,
    checked: false
  },
  {
    id: "inventory",
    label: "Kho hàng",
    key: keyWarehouse,
    checked: false
  },
  {
    id: "inventory_receipt",
    label: "Phiếu nhập kho",
    key: keyWarehouseReceipt,
    checked: false
  }
];

export const RoleObject = {
  [keyAdmin]: false,
  [keyPermission]: false,
  [keyBranch]: false,
  [keyCharity]: false,
  [keyCombo]: false,
  [keyCoupon]: false,
  [keyFlashSale]: false,
  [keyNews]: false,
  [keyNewsCategory]: false,
  [keyOrders]: false,
  [keyProductCategory]: false,
  [keyProductReview]: false,
  [keyProduct]: false,
  [keyPromotion]: false,
  [keyStaticPage]: false,
  [keyStore]: false,
  [keyUserContact]: false,
  [keyEmailRegister]: false,
  [keyUserProfile]: false,
  [keyWarehouse]: false,
  [keyWarehouseReceipt]: false,
};
