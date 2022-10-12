// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  // Doanh nghiep
  enterprise: {
    root: path(ROOTS_DASHBOARD, '/enterprise'),
    articles: path(ROOTS_DASHBOARD, '/enterprise/articles'),
    article_create: path(ROOTS_DASHBOARD, '/enterprise/add-new-article'),
    article_edit: path(ROOTS_DASHBOARD, '/enterprise/article-edit/:id'),

    categories: path(ROOTS_DASHBOARD, '/enterprise/category/list'),
    categoryEnterprise_create: path(ROOTS_DASHBOARD, '/enterprise/category/add-new'),
    categoryEnterprise_edit: path(ROOTS_DASHBOARD, '/enterprise/category/edit/:id'),
  },

  authorization: {
    root: path(ROOTS_DASHBOARD, '/authorization'),
    authorization_list: path(ROOTS_DASHBOARD, '/authorization/list'),
    authorization_create: path(ROOTS_DASHBOARD, '/authorization/create'),
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    view: (title: string) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
  setup: {
    root: path(ROOTS_DASHBOARD, '/setup'),
    banner: path(ROOTS_DASHBOARD, '/setup/banner'),
  },
  event: {
    root: path(ROOTS_DASHBOARD, '/events'),
    list: path(ROOTS_DASHBOARD, '/events'),
    new: path(ROOTS_DASHBOARD, '/event/new'),
    edit: (eventId: number) => path(ROOTS_DASHBOARD, `/event/${eventId}`),
    register: (eventId: number) => path(ROOTS_DASHBOARD, `/register-event/${eventId}`),
  },
  policy: {
    root: path(ROOTS_DASHBOARD, '/policies'),
    list: path(ROOTS_DASHBOARD, '/policies'),
    new: path(ROOTS_DASHBOARD, '/policy/new'),
    edit: (policyId: number) => path(ROOTS_DASHBOARD, `/policy/${policyId}`),

    categories: path(ROOTS_DASHBOARD, '/category/categories'),
    category_create: path(ROOTS_DASHBOARD, '/category/add-new-category'),
    editCategory: (categoryId: number) => path(ROOTS_DASHBOARD, `/category/${categoryId}`),
  },
  documents: {
    root: path(ROOTS_DASHBOARD, '/documents'),
    list: path(ROOTS_DASHBOARD, '/documents'),
  },
  aboutUs: {
    add: path(ROOTS_DASHBOARD, '/about-us'),
  },
  admin: {
    root: path(ROOTS_DASHBOARD, '/admin-account'),
    list: path(ROOTS_DASHBOARD, '/admin-account'),
    new: path(ROOTS_DASHBOARD, '/admin-account/add-new'),
    editAccount: (editId: number) => path(ROOTS_DASHBOARD, `/admin-account/${editId}`),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
