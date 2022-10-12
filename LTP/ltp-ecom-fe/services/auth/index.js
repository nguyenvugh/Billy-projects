/* eslint-disable no-param-reassign */
/* eslint-disable implicit-arrow-linebreak */
import client from "@ltp/services/auth/client";
import axios from "@ltp/services/axios";
import {
  urlForgetPassword,
  urlLoginAuth,
  urlRegisterAuth,
  urlSetNewPasswordForget,
  urlVerifyEmail,
} from "@ltp/services/urlAPI";

export const loginAuth = async (params = {}) =>
  new Promise((resolve, reject) => {
    client
      .post(`${urlLoginAuth}`, params, {
        validateStatus: (status) => status >= 200 && status < 500,
      })
      .then((s) => {
        if (s?.status < 300) resolve(s?.data);
        else {
          const message = s.data?.message;
          if (message?.includes("Sai thông tin đăng nhập")) {
            s.data.message = "Tài khoản hoặc mật khẩu của bạn không đúng. Vui lòng thử lại";
          }
          if (message?.includes("Người dùng chưa được kích hoạt")) {
            s.data.message = "Tài khoản của bạn đã bị khóa";
          }
          reject(s?.data);
        }
      })
      .catch(() => {
        reject(
          new Error("Đã có lỗi xảy ra, xin vui lòng thử lại hoặc dùng phương thức đăng ký khác."),
        );
      });
  });
export const registerAuth = async (params = {}) =>
  new Promise((resolve, reject) => {
    client
      .post(`${urlRegisterAuth}`, params, {
        validateStatus: (status) => status >= 200 && status < 500,
      })
      .then((s) => {
        if (s?.status < 300) resolve(s?.data);
        else reject(s?.data);
      })
      .catch((e) => reject(e));
  });
export const verifyEmail = async (params) =>
  new Promise((resolve, reject) => {
    client
      .post(`${urlVerifyEmail}`, params)
      .then((s) => {
        if (s?.status === 201) resolve(s.data);
        else reject(s);
      })
      .catch(() => {
        reject(
          new Error("Đã có lỗi xảy ra, xin vui lòng thử lại hoặc dùng phương thức đăng ký khác."),
        );
      });
  });

export const forgetPassword = (data) => axios.post(urlForgetPassword, data);

export const setNewPasswordForget = (data) => axios.post(urlSetNewPasswordForget, data);
