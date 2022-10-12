import { CONFIGS } from "src/common/services/urlAPI";
import { execute } from "src/common/lib/request";
import { Config, ConfigKeys, ConfigValue, UpdateConfig } from "./interfaces";

export const getListConfigsService = () => {
  return execute.get<Config[]>(CONFIGS);
};

export const editConfig = (data: UpdateConfig) => {
  return execute.patch(CONFIGS, data);
};

export const getDetailConfig = (key: ConfigKeys) => {
  return execute.get<ConfigValue>(CONFIGS + "/" + key);
};
