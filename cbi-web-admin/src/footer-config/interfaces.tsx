import { BaseResponse } from "src/common/interfaces/common.interface";
export enum ConfigKeys {
  "FOOTER_CONFIG" = "FOOTER_CONFIG",
  "PAGE_HOME" = "PAGE_HOME",
  "PAGE_INTRO" = "PAGE_INTRO",
  "PAGE_POLICIES" = "PAGE_POLICIES",
  "PAGE_CONDITIONS" = "PAGE_CONDITIONS",
}

export enum ConfigTypes {
  "FORM" = "FORM",
  "PAGE" = "PAGE",
}

export interface ConfigValue {
  address: string;
  companyName: string;
  email: string;
  hotline: string;
  content?: string;
}

export interface Config extends BaseResponse {
  key: ConfigKeys;
  name: string;
  type: ConfigTypes;
  value?: ConfigValue;
}

export interface UpdateConfig {
  key: ConfigKeys;
  value: Partial<ConfigValue>;
}

// Home page configs
type BaseHomePageConfig = {
  title: string;
  description: string;
};
export interface MainSection extends BaseHomePageConfig {
  textBtn: string;
  extraText: string;
  bgThumnailUrl: string;
}

export interface IntroduceItem extends BaseHomePageConfig {
  iconUrl: string;
}
export interface IntroduceSection extends BaseHomePageConfig {
  textBtn: string;
  items: IntroduceItem[];
}
export interface CommentItem {
  comment: string;
  commentorName: string;
  position: string;
  avatarUrl: string;
}
export interface CommentorsSection extends BaseHomePageConfig {
  comments: CommentItem[];
}
export interface DonorsSection extends BaseHomePageConfig {
  donorAvatarUrls: string[];
}
export interface HomePageConfigI {
  main: MainSection;
  introduce: IntroduceSection;
  commentors: CommentorsSection;
  donors: DonorsSection;
}

export type HomeConfigProps = {
  homeConfigJson: HomePageConfigI;
  handleUpdateConfig: (_path: string, _value: string) => void;
  handleAddMore: (_path: string, _value?: string) => void;
  handleRemoveItem: (_path: string, _index: number) => void;
  handleUpdateImg: (_path: string, _file?: File) => void;
  handleUpdateLogo: (_file?: File) => void;
};
