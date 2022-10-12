import { dispatch } from 'src/redux/store';
import { setAccessToken, setLogin } from '../auth.slice';
import { getAuth } from '../service';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { ILoginCallback } from '../interface';
export const useAuthlogin = (callback: ILoginCallback) => {
  const navigate = useNavigate();
  return {
    ...useMutation(getAuth, {
      onSuccess: (data, context) => {
        const { accessToken } = data.data;
        dispatch(setAccessToken(accessToken));
        dispatch(setLogin(true));
        callback.onSuccess && callback.onSuccess();
        
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};

