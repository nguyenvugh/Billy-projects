import { createStandaloneToast } from "@chakra-ui/react";
import axios from "axios";
import { get } from "lodash";
import { ROUTE_LOGIN } from "src/common/constants/routes.constants";
import { BASE_URL } from "src/common/services/urlAPI";
import { getLang } from "src/common/utils/common.util";
import { customHistory } from "src/CustomBrowserRouter";
import { toQueryString } from "../common.lib";

const execute = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (param) => toQueryString(param),
  baseURL: BASE_URL,
});

execute.interceptors.request.use(async (config) => {
  // Handle anything before request (as add token)
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
      lang: getLang(),
    };
  }
  if (["get", "delete"].includes(config.method || "")) {
    config.data = get(config, "data", {});
  }
  return {
    ...config,
  };
});
execute.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    // must return Promise rejection here
    if (err.response.status === 401) {
      const toast = createStandaloneToast();
      toast({
        title: "Hết  hạn  phiên  đăng  nhập!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      customHistory.push(ROUTE_LOGIN);
    }

    return Promise.reject(err.response);
  },
);

export { execute };
