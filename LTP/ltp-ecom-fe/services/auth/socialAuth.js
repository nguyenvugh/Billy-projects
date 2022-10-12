/* eslint-disable no-param-reassign */
/* eslint-disable implicit-arrow-linebreak */
import client from "@ltp/services/auth/client";
import { urlSocialLoginAuth } from "@ltp/services/urlAPI";
import qs from "qs";
import firebase from "../firebase";

export const socialAuth = async (params = "") =>
  new Promise((resolve, reject) => {
    client
      .post(`${urlSocialLoginAuth}`, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        validateStatus: (status) => status >= 200 && status < 500,
      })
      .then((s) => {
        if (s?.status < 300) {
          resolve(s.data);
        } else {
          const message = s.data?.message;
          if (
            message?.includes(
              "An account already exists with the same email address but different sign-in credentials.",
            )
          ) {
            s.data.message =
              "Bạn đã tạo tài khoản với email này bằng phương thức đăng nhập khác, xin vui lòng đăng nhập lại bằng phương thức đó.";
          } else if (message?.includes("Người dùng chưa được kích hoạt")) {
            s.data.message = "Tài khoản của bạn đã bị khóa";
          }
          reject(s.data);
        }
      })
      .catch((e) => reject(e));
  });

const firebaseSocialAuth = async (provider) =>
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(async (res) => {
      let loginParams = {};
      if (provider === facebookProvider) {
        loginParams = {
          uid: res.user.uid,
          oauthAccessToken: res.credential.accessToken,
          type: "facebook",
        };
      } else if (provider === googleProvider) {
        loginParams = {
          uid: res.user.uid,
          oauthIdToken: res.credential.idToken,
          oauthAccessToken: res.credential.accessToken,
          type: "google",
        };
      }
      return await socialAuth(qs.stringify(loginParams));
    })
    .catch((err) => {
      throw err;
    });

export const firebaseSocialLinking = async (provider) =>
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });

export const firebaseSignOut = async () => firebase.auth().signOut();

export default firebaseSocialAuth;

export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
