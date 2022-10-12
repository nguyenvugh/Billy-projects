import { async } from '@firebase/util';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toQueryString } from 'src/common/constants/common.utils';
import { accessTokenSelector } from 'src/sections/auth/login/auth.slice';
// config
import { HOST_API } from '../config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  paramsSerializer: (param) => toQueryString(param),
  baseURL: HOST_API,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

axiosInstance.interceptors.request.use(async (config) => {
  const getPersist = localStorage.getItem('redux-root');
  if (getPersist) {
    try {
      const authLogin = JSON.parse(getPersist).authLogin;
      const token = JSON.parse(authLogin).accessToken;
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }catch(e){
       
    }
  }
  return {
    ...config,
  };
});
export default axiosInstance;
