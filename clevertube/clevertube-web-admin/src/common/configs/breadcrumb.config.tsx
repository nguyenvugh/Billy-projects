import { DashboardIcon } from "../assets/icons/dashboard";
import { DictionaryIcon } from "../assets/icons/dictionary";
import { LevelIcon } from "../assets/icons/level";
import { TopicIcon } from "../assets/icons/topic";
import { YoutubeIcon } from "../assets/icons/youtube";
import { PodcastIcon } from "../assets/icons/podcast";
import { ROUTER } from "../constants/routes.constants";

const {
  HOME_PAGE,
  DICTIONARY_PAGE,
  TOPIC_PAGE,
  LEVEL_PAGE,
  PODCAST_PAGE,
  ADD_PODCAST_PAGE,
  VIDEO_PAGE,
  ADDVIDEO_PAGE,
  EDITVIDEO_PAGE,
} = ROUTER;

export const BREAD_CRUMB = {
  [HOME_PAGE]: {
    data: [
      {
        label: "Dashboard",
      },
      {
        label: "Dashboard",
      },
    ],
    icon: <DashboardIcon boxSize={5} stroke="#292D32" />,
  },
  [DICTIONARY_PAGE]: {
    data: [
      {
        label: "Dictionary",
      },
      {
        label: "Add new",
        link: DICTIONARY_PAGE,
      },
    ],
    icon: <DictionaryIcon boxSize={5} stroke="#292D32" />,
  },
  [TOPIC_PAGE]: {
    data: [
      {
        label: "Topic",
      },
      {
        label: "Topic list",
      },
    ],
    icon: <TopicIcon boxSize={5} stroke="#292D32" />,
  },
  [LEVEL_PAGE]: {
    data: [
      {
        label: "Level",
      },
      {
        label: "Level list",
      },
    ],
    icon: <LevelIcon boxSize={5} stroke="#292D32" />,
  },
  [PODCAST_PAGE]: {
    data: [
      {
        label: "Podcasts",
      },
      {
        label: "All Podcast",
        link: PODCAST_PAGE,
      },
    ],
    icon: <PodcastIcon boxSize={5} stroke="#292D32" />,
  },
  [ADD_PODCAST_PAGE]: {
    data: [
      {
        label: "Podcasts",
        link: PODCAST_PAGE,
      },
      {
        label: "Add new",
      },
    ],
    icon: <PodcastIcon boxSize={5} stroke="#292D32" />,
  },
  [VIDEO_PAGE]: {
    data: [
      {
        label: "Video",
      },
      {
        label: "Video list",
        link: VIDEO_PAGE,
      },
    ],
    icon: <YoutubeIcon boxSize={5} stroke="#292D32" />,
  },
  [ADDVIDEO_PAGE]: {
    data: [
      {
        label: "Video",
      },
      {
        label: "Add video",
      },
    ],
    icon: <YoutubeIcon boxSize={5} stroke="#292D32" />,
  },
  [EDITVIDEO_PAGE]: {
    data: [
      {
        label: "Video",
        link: VIDEO_PAGE,
      },
      {
        label: "Edit video",
      },
    ],
    icon: <YoutubeIcon boxSize={5} stroke="#292D32" />,
  },
};

// export const BREAD_CRUMB_DASHBOARD: BreadcrumbsType[] = [
//   {
//     label: "Dashboard",
//   },
//   {
//     label: "Dashboard",
//   },
// ];

// export const BREAD_CRUMB_DICTIONARY: BreadcrumbsType[] = [
//   {
//     label: "Dictionary",
//     link: USER_INFO,
//   },
//   {
//     label: "Add new",
//     link: LOGIN_PAGE,
//   },
// ];

// export const BREAD_CRUMB_TOPIC: BreadcrumbsType[] = [
//   {
//     label: "Topic",
//   },
//   {
//     label: "Topic list",
//   },
// ];
// export const BREAD_CRUMB_LEVEL: BreadcrumbsType[] = [
//   {
//     label: "Level",
//   },
//   {
//     label: "Level list",
//   },
// ];
// export const BREAD_CRUMB_VIDEO: BreadcrumbsType[] = [
//   {
//     label: "Video",
//     link: USER_INFO,
//   },
//   {
//     label: "Video list",
//     link: VIDEO_PAGE,
//   },
// ];
// export const BREAD_CRUMB_ADD_VIDEO: BreadcrumbsType[] = [
//   {
//     label: "Video",
//     link: VIDEO_PAGE,
//   },
//   {
//     label: "Add video",
//   },
// ];
// export const BREAD_CRUMB_EDIT_VIDEO: BreadcrumbsType[] = [
//   {
//     label: "Video",
//     link: VIDEO_PAGE,
//   },
//   {
//     label: "Edit video",
//   },
// ];
