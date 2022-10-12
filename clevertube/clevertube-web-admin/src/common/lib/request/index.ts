import { customHistory } from "src/CustomBrowserRouter";
import { createStandaloneToast } from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL } from "src/common/constants/urlAPI";
import { toQueryString } from "../common.lib";
import { ROUTER } from "../../constants/routes.constants";

export const execute = axios.create({
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
      // lang: getLang(),
    };
  }
  //   if (["get", "delete"].includes(config.method || "")) {
  //     config.data = get(config, "data", {});
  //   }
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
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      customHistory.push(ROUTER.LOGIN_PAGE);
    }
    if (err.response.status === 403) {
      const toast = createStandaloneToast();
      toast({
        title: "Thông tin đăng nhập sai",
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      customHistory.push(ROUTER.LOGIN_PAGE);
    }
    return Promise.reject(err.response);
  }
);
