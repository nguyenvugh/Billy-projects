import React from "react";
// import pathName
import { HOME_PAGE, NEW_USER, USER_INFO } from "../constants/routes.constants";

import { RoutesConfig } from "../interfaces/common.interfaces";
// import lazy loading components
export const HomePageLazy = React.lazy(() => import("src/home-page/components"));
const NewUserLazy = React.lazy(() => import("src/new-user/components/index"));
const UserInfoLazy = React.lazy(() => import("src/new-user/components/UserInfo"));

export const ROUTES_CONFIG: RoutesConfig[] = [
  {
    pathName: HOME_PAGE,
    resource: "hello",
    component: HomePageLazy,
    routes: [],
  },
  {
    pathName: NEW_USER,
    resource: "hello",
    component: NewUserLazy,
    routes: [],
  },
  {
    pathName: USER_INFO,
    resource: "hello",
    component: UserInfoLazy,
    routes: [],
  },
];
