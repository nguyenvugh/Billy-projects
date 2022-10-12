import React from "react";
import { ROUTER } from "../constants/routes.constants";
import { RoutesConfig } from "../interfaces/common.interfaces";
// import pathName

// import lazy loading components
export const LoginPage = React.lazy(() => import("src/login/components/index"));
const HomePage = React.lazy(() => import("src/home/components/index"));
const UserInfo = React.lazy(() => import("src/new-user/components/UserInfo"));
const Dictionary = React.lazy(() => import("src/dictionary/components/index"));
const Authorization = React.lazy(() => import("src/authorization/components/index"));
const Topic = React.lazy(() => import("src/topic/components/index"));
const Level = React.lazy(() => import("src/level-user/components/index"));
const Podcast = React.lazy(() => import("src/podcast/components/list-podcast/index"));
const AddPodcast = React.lazy(() => import("src/podcast/components/add-podcast/index"));
const Video = React.lazy(() => import("src/videos/components/list-video"));
const AddVideo = React.lazy(() => import("src/videos/components/add-video"));
const EditVideo = React.lazy(() => import("src/videos/components/edit-video"));

const {
  DICTIONARY_PAGE,
  LEVEL_PAGE,
  TOPIC_PAGE,
  VIDEO_PAGE,
  ADDVIDEO_PAGE,
  LOGIN_PAGE,
  HOME_PAGE,
  PODCAST_PAGE,
  ADD_PODCAST_PAGE,
  USER_INFO,
  AUTHORIZATION,
  EDITVIDEO_PAGE,
} = ROUTER;

export const ROUTES_CONFIG: RoutesConfig[] = [
  // Login page
  {
    pathName: LOGIN_PAGE,
    resource: "all",
    component: LoginPage,
    routes: [],
  },
  // Home page here...
  {
    pathName: HOME_PAGE,
    resource: "all",
    component: HomePage,
    routes: [
      {
        pathName: USER_INFO,
        resource: "all",
        component: UserInfo,
        routes: [],
      },
      {
        pathName: AUTHORIZATION,
        resource: "all",
        component: Authorization,
        routes: [],
      },
      {
        pathName: DICTIONARY_PAGE,
        resource: "all",
        component: Dictionary,
        routes: [],
      },
      {
        pathName: TOPIC_PAGE,
        resource: "all",
        component: Topic,
        routes: [],
      },
      {
        pathName: LEVEL_PAGE,
        resource: "all",
        component: Level,
        routes: [],
      },
      {
        pathName: PODCAST_PAGE,
        resource: "all",
        component: Podcast,
        routes: [],
      },
      {
        pathName: ADD_PODCAST_PAGE,
        resource: "all",
        component: AddPodcast,
        routes: [],
      },
      {
        pathName: VIDEO_PAGE,
        resource: "all",
        component: Video,
        routes: [],
      },
      {
        pathName: ADDVIDEO_PAGE,
        resource: "all",
        component: AddVideo,
        routes: [],
      },
      {
        pathName: EDITVIDEO_PAGE,
        resource: "all",
        component: EditVideo,
        routes: [],
      },
    ],
  },
];
