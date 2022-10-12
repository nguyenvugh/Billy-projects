import { ElementType, lazy, Suspense } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';
import path from 'path';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isAuthenticated } = useAuth();

  const isDashboard = pathname.includes('/dashboard') && isAuthenticated;

  return (
    <Suspense fallback={<LoadingScreen isDashboard={isDashboard} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'new-password', element: <NewPassword /> },
        { path: 'verify', element: <VerifyCode /> },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralApp /> },
        { path: 'ecommerce', element: <GeneralEcommerce /> },
        { path: 'analytics', element: <GeneralAnalytics /> },
        { path: 'banking', element: <GeneralBanking /> },
        { path: 'booking', element: <GeneralBooking /> },

        {
          path: 'e-commerce',
          children: [
            { element: <Navigate to="/dashboard/e-commerce/shop" replace />, index: true },
            { path: 'shop', element: <EcommerceShop /> },
            { path: 'product/:name', element: <EcommerceProductDetails /> },
            { path: 'list', element: <EcommerceProductList /> },
            { path: 'product/new', element: <EcommerceProductCreate /> },
            { path: 'product/:name/edit', element: <EcommerceProductEdit /> },
            { path: 'checkout', element: <EcommerceCheckout /> },
          ],
        },
        {
          path: 'enterprise',
          children: [
            { element: <Navigate to="/dashboard/enterprise/articles" replace />, index: true },
            { path: 'articles', element: <ArticleList /> },
            { path: 'add-new-article', element: <ArticleAddNew /> },
            { path: 'article-edit/:id', element: <ArticleEdit /> },

            { path: 'category/list', element: <CategoryEnterpriseList /> },
            { path: 'category/add-new', element: <CategoryEnterpriseAddNew /> },
            { path: 'category/edit/:id', element: <CategoryEnterpriseEdit /> },
          ],
        },
        {
          path: 'category',
          children: [
            { element: <Navigate to="/dashboard/category/categories" replace />, index: true },
            { path: 'categories', element: <CategoryPolicy /> },
            { path: 'add-new-category', element: <CategoryAddNew /> },
            { path: ':categoryId', element: <CategoryEdit /> },
          ],
        },

        {
          path: 'authorization',
          children: [
            { element: <Navigate to="/dashboard/authorization/list" replace />, index: true },
            { path: 'list', element: <AuthorizationList /> },
            { path: 'create', element: <AuthorizationCreate /> },
          ],
        },

        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'profile', element: <UserProfile /> },
            { path: 'cards', element: <UserCards /> },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <UserCreate /> },
            { path: ':name/edit', element: <UserCreate /> },
            { path: 'account', element: <UserAccount /> },
          ],
        },
        {
          path: 'invoice',
          children: [
            { element: <Navigate to="/dashboard/invoice/list" replace />, index: true },
            { path: 'list', element: <InvoiceList /> },
            { path: ':id', element: <InvoiceDetails /> },
            { path: ':id/edit', element: <InvoiceEdit /> },
            { path: 'new', element: <InvoiceCreate /> },
          ],
        },
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
            { path: 'posts', element: <BlogPosts /> },
            { path: 'post/:title', element: <BlogPost /> },
            { path: 'new', element: <BlogNewPost /> },
          ],
        },
        {
          path: 'setup',
          children: [
            { element: <Navigate to="/dashboard/setup/banner" replace />, index: true },
            { path: 'banner', element: <Banner /> },
          ],
        },
        {
          path: '',
          children: [
            { element: <Navigate to="/dashboard/events" replace />, index: true },
            { path: 'events', element: <EventList /> },
            { path: 'event/new', element: <AddEvent /> },
            { path: 'event/:eventId', element: <EditEvent /> },
            { path: 'register-event/:eventId', element: <RegisterEventList /> },
          ],
        },
        {
          path: '',
          children: [
            { element: <Navigate to="/dashboard/policies" replace />, index: true },
            { path: 'policies', element: <PolicyList /> },
            { path: 'policy/new', element: <AddPolicy /> },
            { path: 'policy/:policyId', element: <EditPolicy /> },
          ],
        },
        {
          path: '',
          children: [
            { element: <Navigate to="/dashboard/documents" replace />, index: true },
            { path: 'documents', element: <DocumentList /> },
          ],
        },
        { path: 'about-us', element: <AboutUs /> },
        {
          path: '',
          children: [
            { element: <Navigate to="/dashboard/admin-account" replace />, index: true },
            { path: 'admin-account', element: <AdminAccountList /> },
            { path: 'admin-account/add-new', element: <AdminAddNewAccount /> },
            { path: 'admin-account/:editId', element: <AdminAccountEdit />}
          ],
        },
        {
          path: 'mail',
          children: [
            { element: <Navigate to="/dashboard/mail/all" replace />, index: true },
            { path: 'label/:customLabel', element: <Mail /> },
            { path: 'label/:customLabel/:mailId', element: <Mail /> },
            { path: ':systemLabel', element: <Mail /> },
            { path: ':systemLabel/:mailId', element: <Mail /> },
          ],
        },
        {
          path: 'chat',
          children: [
            { element: <Chat />, index: true },
            { path: 'new', element: <Chat /> },
            { path: ':conversationKey', element: <Chat /> },
          ],
        },
        { path: 'calendar', element: <Calendar /> },
        { path: 'kanban', element: <Kanban /> },
        { path: 'permission-denied', element: <PermissionDenied /> },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: 'pricing', element: <Pricing /> },
        { path: 'payment', element: <Payment /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    // {
    //   path: '/',
    //   // element: <MainLayout />,
    //   children: [
    //     { element: <HomePage />, index: true },
    //     { path: 'about-us', element: <About /> },
    //     { path: 'contact-us', element: <Contact /> },
    //     { path: 'faqs', element: <Faqs /> },
    //   ],
    // },
    {
      path: '/',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const NewPassword = Loadable(lazy(() => import('../pages/auth/NewPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));

// DASHBOARD

// GENERAL
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const GeneralEcommerce = Loadable(lazy(() => import('../pages/dashboard/GeneralEcommerce')));
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));
const GeneralBanking = Loadable(lazy(() => import('../pages/dashboard/GeneralBanking')));
const GeneralBooking = Loadable(lazy(() => import('../pages/dashboard/GeneralBooking')));

// ECOMMERCE
const EcommerceShop = Loadable(lazy(() => import('../pages/dashboard/EcommerceShop')));
const EcommerceProductDetails = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceProductDetails'))
);
const EcommerceProductList = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceProductList'))
);
const EcommerceProductCreate = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceProductCreate'))
);
const EcommerceProductEdit = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceProductEdit'))
);
const EcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/EcommerceCheckout')));

// INVOICE
const InvoiceList = Loadable(lazy(() => import('../pages/dashboard/InvoiceList')));
const InvoiceDetails = Loadable(lazy(() => import('../pages/dashboard/InvoiceDetails')));
const InvoiceCreate = Loadable(lazy(() => import('../pages/dashboard/InvoiceCreate')));
const InvoiceEdit = Loadable(lazy(() => import('../pages/dashboard/InvoiceEdit')));

// BLOG
const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/BlogPosts')));
const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/BlogNewPost')));

// USER
const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
const UserCards = Loadable(lazy(() => import('../pages/dashboard/UserCards')));
const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));

// APP
const Chat = Loadable(lazy(() => import('../pages/dashboard/Chat')));
const Mail = Loadable(lazy(() => import('../pages/dashboard/Mail')));
const Calendar = Loadable(lazy(() => import('../pages/dashboard/Calendar')));
const Kanban = Loadable(lazy(() => import('../pages/dashboard/Kanban')));

// ArticleList
const ArticleList = Loadable(lazy(() => import('../pages/dashboard/article/ArticleList')));
const ArticleAddNew = Loadable(lazy(() => import('../pages/dashboard/article/ArticleAddNew')));
const ArticleEdit = Loadable(lazy(() => import('../pages/dashboard/article/ArticleEdit')));

// TEST RENDER PAGE BY ROLE
const PermissionDenied = Loadable(lazy(() => import('../pages/dashboard/PermissionDenied')));

// MAIN
// const HomePage = Loadable(lazy(() => import('../pages/Home')));
// const About = Loadable(lazy(() => import('../pages/About')));
// const Contact = Loadable(lazy(() => import('../pages/Contact')));
// const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
const Payment = Loadable(lazy(() => import('../pages/Payment')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const Page403 = Loadable(lazy(() => import('../pages/Page403')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));

// SETTING
const Banner = Loadable(lazy(() => import('../pages/dashboard/banner/BannerList')));
const CategoryPolicy = Loadable(
  lazy(() => import('../pages/dashboard/categoryPolicy/ListCategory'))
);
const CategoryAddNew = Loadable(
  lazy(() => import('../pages/dashboard/categoryPolicy/AddCategory'))
);
const CategoryEdit = Loadable(lazy(() => import('../pages/dashboard/categoryPolicy/EditCategory')));

// category enterprise
const CategoryEnterpriseAddNew = Loadable(
  lazy(() => import('../pages/dashboard/categoryEnterprise/CategoryEnterpriseAddNew'))
);
const CategoryEnterpriseEdit = Loadable(
  lazy(() => import('../pages/dashboard/categoryEnterprise/CategoryEnterpriseEdit'))
);
const CategoryEnterpriseList = Loadable(
  lazy(() => import('../pages/dashboard/categoryEnterprise/CategoryEnterpriseList'))
);

const EventList = Loadable(lazy(() => import('../pages/dashboard/event/EventList')));
const AddEvent = Loadable(lazy(() => import('../pages/dashboard/event/AddEvent')));
const EditEvent = Loadable(lazy(() => import('../pages/dashboard/event/EditEvent')));
const RegisterEventList = Loadable(
  lazy(() => import('../pages/dashboard/event/RegisterEventList'))
);

const PolicyList = Loadable(lazy(() => import('../pages/dashboard/policy/PolicyList')));
const AddPolicy = Loadable(lazy(() => import('../pages/dashboard/policy/AddPolicy')));
const EditPolicy = Loadable(lazy(() => import('../pages/dashboard/policy/EditPolicy')));

// DOCUMENTS
const DocumentList = Loadable(lazy(() => import('../pages/dashboard/documents/DocumentList')));
const AboutUs = Loadable(lazy(() => import('../pages/dashboard/about-us/AboutUs')));

//ADMIN ACCOUNT
const AdminAccountList = Loadable(lazy(() => import('../pages/dashboard/admin-account/AdminAcountList')))
const AdminAddNewAccount = Loadable(lazy(() => import('../pages/dashboard/admin-account/AdminAddNewAccount')));
const AdminAccountEdit = Loadable(lazy(() => import('../pages/dashboard/admin-account/AdminAccountEdit')));
// AUTHORIZATION
const AuthorizationList = Loadable(
  lazy(() => import('../pages/dashboard/authorization/ListAuthorization'))
);
const AuthorizationCreate = Loadable(
  lazy(() => import('../pages/dashboard/authorization/CreateAuthorization'))
);
