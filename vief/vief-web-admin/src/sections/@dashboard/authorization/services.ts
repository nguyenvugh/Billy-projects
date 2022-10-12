import { API_AUTHORIZATION } from 'src/common/constants/apis';
import axiosInstance from 'src/utils/axios';

export const getAuthorizationList = async () => axiosInstance.get(API_AUTHORIZATION);
