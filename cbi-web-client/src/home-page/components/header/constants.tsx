export const menu = [
  {
    name: "Trang chủ",
    id: 1,
    href: "/",
    listHref: ["/statics/privacy-policy", "/statics/faq", "/statics/terms-of-service"],
  },
  {
    name: "Giới thiệu",
    id: 2,
    href: "/introduce",
  },
  {
    name: "Đánh giá CEBI",
    id: 3,
    href: "/evaluate-cebi",
    listHref: ["/evaluate-cebi", "/evaluate-cebi/[slug]", "/introduce-evaluate-cebi"],
    childs: [],
  },
  {
    name: "Tài liệu",
    id: 4,
    href: "/climate-document",
  },
  {
    name: "Tin tức - sự kiện",
    id: 5,
    href: "/article",
    listHref: ["/article", "/news", "/news-detail/[slug]"],
    childs: [
      {
        name: "Danh sách Tin tức",
        href: "/news?categoryId=36",
        id: 7,
      },
      {
        name: "Danh sách Sự kiện",
        href: "/news?categoryId=37",
        id: 8,
      },
    ],
  },
  {
    name: "Tài khoản",
    id: 6,
    href: "/climate-account",
  },
];

export const listProfile = [
  {
    name: "Chỉnh sửa hồ sơ",
    href: "/climate-account",
  },
  {
    name: "Trả lời trắc nghiệm",
    href: "/evaluate-cebi",
  },
  {
    name: "Kết quả của tôi",
    href: "/climate-account?activeMenu=RESULT_EVALUATE",
  },
];
