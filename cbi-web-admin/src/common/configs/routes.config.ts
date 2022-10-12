import {
  ROUTE_ADD_NEWS,
  ROUTE_ADMIN_ACCOUNT,
  ROUTE_CONFIG,
  ROUTE_DETAIL_CONFIG,
  ROUTE_DETAIL_NEWS,
  ROUTE_DOCUMENT,
  ROUTE_DOCUMENT_ADD,
  ROUTE_QUESTIONS,
  ROUTE_QUESTIONS_DETAILS,
  ROUTE_QUESTIONS_DETAILS_LEVEL,
  ROUTE_QUESTIONS_DETAILS_LEVEL_ADD,
  ROUTE_SUBMITTED_ANSWER,
  ROUTE_SUBMITTED_ANSWER_DETAIL,
  ROUTE_SUBMITTED_ANSWER_UNCHECKED,
  ROUTE_SUBMITTED_ANSWER_UNCHECKED_DETAIL,
} from "./../constants/routes.constants";
import React from "react";
import {
  ROUTE_ADD_NEW_ACCOUNT,
  ROUTE_ADD_NEW_AUTHOR,
  ROUTE_AUTHORIZATION,
  ROUTE_CATEGORY,
  ROUTE_CONTACT,
  ROUTE_DETAIL_ACCOUNT,
  ROUTE_DETAIL_AUTHOR,
  ROUTE_DETAIL_CONTACT,
  ROUTE_EMAIL_REGISTRATION,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_NEWS,
  ROUTE_PROFILE,
  ROUTE_USER_ACCOUNT,
  ROUTE_USER_ACCOUNT_DETAIL,
  ROUTE_USER_HISTORY_ANSWER,
} from "../constants/routes.constants";
import { RoutesConfig } from "../interfaces/common.interface";

const HomeLazy = React.lazy(() => import("src/home").then(({ Home }) => ({ default: Home })));
const NewsLazy = React.lazy(() => import("src/news").then(({ News }) => ({ default: News })));
const AddNewsLazy = React.lazy(() =>
  import("src/news/AddNews").then(({ AddNews }) => ({ default: AddNews })),
);
const DetailNewsLazy = React.lazy(() =>
  import("src/news/DetailNews").then(({ DetailNews }) => ({ default: DetailNews })),
);
export const LoginLazy = React.lazy(() =>
  import("src/login").then(({ Login }) => ({ default: Login })),
);
const CategoryLazy = React.lazy(() =>
  import("src/category").then(({ Category }) => ({ default: Category })),
);
const ProfileLazy = React.lazy(() =>
  import("src/profile").then(({ Profile }) => ({ default: Profile })),
);
const AuthorizationLazy = React.lazy(() =>
  import("src/authorization").then(({ Authorization }) => ({ default: Authorization })),
);
const AuthorizationNewAccountLazy = React.lazy(() =>
  import("src/authorization/components/AddNewItems").then(({ AddNewItems }) => ({
    default: AddNewItems,
  })),
);
const AuthorizationDetailLazy = React.lazy(() =>
  import("src/authorization/components/AuthorizationDetail").then(({ AuthorizationDetail }) => ({
    default: AuthorizationDetail,
  })),
);
const AdminAccountLazy = React.lazy(() =>
  import("src/admin-account/index").then(({ AdminAccount }) => ({ default: AdminAccount })),
);
const AdminNewAccount = React.lazy(() =>
  import("src/admin-account/components/NewItems").then(({ NewItems }) => ({ default: NewItems })),
);
const AdminDetailLazy = React.lazy(() =>
  import("src/admin-account/components/AccountDetail").then(({ AccountDetail }) => ({
    default: AccountDetail,
  })),
);
const ContactLazy = React.lazy(() =>
  import("src/contact/index").then(({ Contact }) => ({
    default: Contact,
  })),
);
const ContactDetailLazy = React.lazy(() =>
  import("src/contact/ContactDetail").then(({ ContactDetail }) => ({
    default: ContactDetail,
  })),
);
const EmailRegistrationLazy = React.lazy(() =>
  import("src/email-registration/index").then(({ EmailRegistration }) => ({
    default: EmailRegistration,
  })),
);
const UserAccountLazy = React.lazy(() =>
  import("src/user-account/index").then(({ UserAccount }) => ({
    default: UserAccount,
  })),
);
const UserAccountDetailLazy = React.lazy(() =>
  import("src/user-account/components/UserAccountDetail").then(({ UserAccountDetail }) => ({
    default: UserAccountDetail,
  })),
);
const UserHistoryAnswerLazy = React.lazy(() =>
  import("src/user-history-answers/index").then(({ UserHistoryAnswer }) => ({
    default: UserHistoryAnswer,
  })),
);
const CbiLazy = React.lazy(() => import("src/cbi").then(({ Cbi }) => ({ default: Cbi })));
const CbiDetailLazy = React.lazy(() =>
  import("src/cbi/components/details").then(({ QuestionDetail }) => ({ default: QuestionDetail })),
);
const CbiDetailLevelLazy = React.lazy(() =>
  import("src/cbi/components/question-manager/ListQuestion").then(({ ListQuestion }) => ({
    default: ListQuestion,
  })),
);
const CbiDetailLevelAddQuestionLazy = React.lazy(() =>
  import("src/cbi/components/question-manager/AddQuestion").then(({ AddQuestion }) => ({
    default: AddQuestion,
  })),
);

const DocumentLazy = React.lazy(() =>
  import("src/document").then(({ Document }) => ({
    default: Document,
  })),
);
const DocumentAddLazy = React.lazy(() =>
  import("src/document/AddDocument").then(({ AddDocument }) => ({
    default: AddDocument,
  })),
);

const FooterConfigLazy = React.lazy(() =>
  import("src/footer-config/index").then(({ FooterConfig }) => ({ default: FooterConfig })),
);
const DetailConfigLazy = React.lazy(() =>
  import("src/footer-config/DetailConfig").then(({ DetailConfig }) => ({
    default: DetailConfig,
  })),
);
const SubmittedAnswersConfigLazy = React.lazy(() =>
  import("src/submitted-answer/index").then(({ SubmittedAnswer }) => ({
    default: SubmittedAnswer,
  })),
);
const SubmittedAnswersCheckedConfigLazy = React.lazy(() =>
  import("src/submitted-answer/checkedAnswers").then(({ SubmittedAnswer }) => ({
    default: SubmittedAnswer,
  })),
);
const SubmittedAnswerDetailLazy = React.lazy(() =>
  import("src/submitted-answer/components/AnswerDetail").then(({ AnswerDetail }) => ({
    default: AnswerDetail,
  })),
);
const SubmittedAnswerCheckedDetailLazy = React.lazy(() =>
  import("src/submitted-answer/components/AnswerDetailUnchecked").then(({ AnswerDetail }) => ({
    default: AnswerDetail,
  })),
);
export const ROUTES_CONFIG: RoutesConfig[] = [
  // Login page
  {
    pathName: ROUTE_LOGIN,
    resource: "all",
    component: LoginLazy,
    routes: [],
  },
  // Home page
  {
    pathName: ROUTE_HOME,
    resource: "all",
    component: HomeLazy,
    routes: [
      {
        pathName: ROUTE_NEWS,
        resource: "news",
        component: NewsLazy,
        routes: [],
      },
      {
        pathName: ROUTE_ADD_NEWS,
        resource: "news",
        component: AddNewsLazy,
        routes: [],
      },
      {
        pathName: ROUTE_DETAIL_NEWS,
        resource: "news",
        component: DetailNewsLazy,
        routes: [],
      },
      {
        pathName: ROUTE_CATEGORY,
        resource: "news",
        component: CategoryLazy,
        routes: [],
      },
      {
        pathName: ROUTE_USER_ACCOUNT,
        resource: "user",
        component: UserAccountLazy,
        routes: [],
      },
      {
        pathName: ROUTE_USER_ACCOUNT_DETAIL,
        resource: "user",
        component: UserAccountDetailLazy,
        routes: [],
      },
      {
        pathName: ROUTE_USER_HISTORY_ANSWER,
        resource: "user",
        component: UserHistoryAnswerLazy,
        routes: [],
      },
      {
        pathName: ROUTE_CONTACT,
        resource: "user",
        component: ContactLazy,
        routes: [],
      },
      {
        pathName: ROUTE_DETAIL_CONTACT,
        resource: "user",
        component: ContactDetailLazy,
        routes: [],
      },
      {
        pathName: ROUTE_EMAIL_REGISTRATION,
        resource: "user",
        component: EmailRegistrationLazy,
        routes: [],
      },
      {
        pathName: ROUTE_AUTHORIZATION,
        resource: "admin",
        component: AuthorizationLazy,
        routes: [],
      },
      {
        pathName: ROUTE_ADD_NEW_AUTHOR,
        resource: "admin",
        component: AuthorizationNewAccountLazy,
        routes: [],
      },
      {
        pathName: ROUTE_DETAIL_AUTHOR,
        resource: "admin",
        component: AuthorizationDetailLazy,
        routes: [],
      },
      {
        pathName: ROUTE_ADMIN_ACCOUNT,
        resource: "admin",
        component: AdminAccountLazy,
        routes: [],
      },
      {
        pathName: ROUTE_ADD_NEW_ACCOUNT,
        resource: "admin",
        component: AdminNewAccount,
        routes: [],
      },
      {
        pathName: ROUTE_DETAIL_ACCOUNT,
        resource: "admin",
        component: AdminDetailLazy,
        routes: [],
      },
      {
        pathName: ROUTE_PROFILE,
        resource: "all",
        component: ProfileLazy,
        routes: [],
      },
      {
        pathName: ROUTE_QUESTIONS,
        resource: "cbi",
        component: CbiLazy,
        routes: [],
      },
      {
        pathName: ROUTE_SUBMITTED_ANSWER,
        resource: "cbi",
        component: SubmittedAnswersConfigLazy,
        routes: [],
      },
      {
        pathName: ROUTE_SUBMITTED_ANSWER_UNCHECKED,
        resource: "cbi",
        component: SubmittedAnswersCheckedConfigLazy,
        routes: [],
      },
      {
        pathName: ROUTE_SUBMITTED_ANSWER_UNCHECKED_DETAIL,
        resource: "cbi",
        component: SubmittedAnswerCheckedDetailLazy,
        routes: [],
      },
      {
        pathName: ROUTE_SUBMITTED_ANSWER_DETAIL,
        resource: "cbi",
        component: SubmittedAnswerDetailLazy,
        routes: [],
      },
      {
        pathName: ROUTE_QUESTIONS_DETAILS,
        resource: "cbi",
        component: CbiDetailLazy,
        routes: [],
      },
      {
        pathName: ROUTE_QUESTIONS_DETAILS_LEVEL,
        resource: "cbi",
        component: CbiDetailLevelLazy,
        routes: [],
      },
      {
        pathName: ROUTE_QUESTIONS_DETAILS_LEVEL_ADD,
        resource: "cbi",
        component: CbiDetailLevelAddQuestionLazy,
        routes: [],
      },
      {
        pathName: ROUTE_DOCUMENT,
        resource: "all",
        component: DocumentLazy,
        routes: [],
      },
      {
        pathName: ROUTE_DOCUMENT_ADD,
        resource: "all",
        component: DocumentAddLazy,
        routes: [],
      },
      {
        pathName: ROUTE_CONFIG,
        resource: "news",
        component: FooterConfigLazy,
        routes: [],
      },
      {
        pathName: ROUTE_DETAIL_CONFIG,
        resource: "news",
        component: DetailConfigLazy,
        routes: [],
      },
    ],
  },
];
