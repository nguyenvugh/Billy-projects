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
