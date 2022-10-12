import axios from 'src/utils/axios';
import { IAuth } from './interface';
export const getAuth =(params:IAuth) => {
 const data = axios.post('admin/login',params);
return data
};
