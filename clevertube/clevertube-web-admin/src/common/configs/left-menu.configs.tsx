import { LeftMenuConfig } from "src/common/interfaces/common.interfaces";
import { ROUTER } from "../constants/routes.constants";
import { YoutubeIcon } from "../assets/icons/youtube";
import { PodcastIcon } from "../assets/icons/podcast";
import { DictionaryIcon } from "../assets/icons/dictionary";
import { DashboardIcon } from "../assets/icons/dashboard";
import { TopicIcon } from "../assets/icons/topic";
import { LevelIcon } from "../assets/icons/level";

const {
  DICTIONARY_PAGE,
  LEVEL_PAGE,
  TOPIC_PAGE,
  PODCAST_PAGE,
  ADD_PODCAST_PAGE,
  VIDEO_PAGE,
  ADDVIDEO_PAGE,
} = ROUTER;

export const LEFT_MENU_CONFIG: LeftMenuConfig[] = [
  {
    label: "Dashboard",
    pathName: "/",
    authority: [],
    children: [],
    // icon: "/assets/icons/dashboard.svg",
    icon: <DashboardIcon boxSize={5} />,
  },
  {
    label: "Videos",
    // pathName: VIDEO_PAGE,
    authority: [],
    children: [
      {
        label: "All videos",
        pathName: VIDEO_PAGE,
        authority: [],
        children: [],
      },
      {
        label: "Add new",
        pathName: ADDVIDEO_PAGE,
        authority: [],
        children: [],
      },
    ],
    // icon: "/assets/icons/video-square.svg",
    icon: <YoutubeIcon boxSize={5} />,
  },
  {
    label: "Podcasts",
    // pathName: PODCAST_PAGE,
    authority: [],
    children: [
      {
        label: "All podcasts",
        pathName: PODCAST_PAGE,
        authority: [],
        children: [],
      },
      {
        label: "Add new",
        pathName: ADD_PODCAST_PAGE,
        authority: [],
        children: [],
      },
    ],
    // icon: "/assets/icons/video-square.svg",
    icon: <PodcastIcon boxSize={5} />,
  },
  {
    label: "Dictionary En-Vi",
    // pathName: DICTIONARY_PAGE,
    authority: [],
    children: [
      {
        label: "Add new",
        pathName: DICTIONARY_PAGE,
        authority: [],
        children: [],
      },
    ],
    // icon: "/assets/icons/dictionary.svg",
    icon: <DictionaryIcon boxSize={5} />,
  },
  {
    label: "Topic",
    pathName: TOPIC_PAGE,
    authority: [],
    children: [],
    // icon: "/assets/icons/topic.svg",
    icon: <TopicIcon boxSize={5} />,
  },
  {
    label: "Level User",
    pathName: LEVEL_PAGE,
    authority: [],
    children: [],
    // icon: "/assets/icons/level.svg",
    icon: <LevelIcon boxSize={5} />,
  },
];
