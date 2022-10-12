import axiosConfig from "@cbi/services/axiosConfig";
import { URL_CONFIG } from "@cbi/services/urlAPI";
import { ConfigKeys, ConfigValue } from "./interfaces";

export const getDetailConfigByKeyService = (configKey: ConfigKeys) => {
  return axiosConfig.get<ConfigValue>(URL_CONFIG + "/" + configKey);
};
