import { useState, useEffect, useReducer } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider } from '@material-ui/core';
import { ADMIN_SCREEN_CREATION_MODE, ADMIN_SCREEN_EDIT_MODE } from 'app/constants/admin';
import * as Utils from 'app/utils';
import * as AppURL from 'app/services/urlAPI';
import { getProductCategory, addNewCate, postImage, putApi } from 'app/services/axios';
import { AdminCreationContext, reducer, initialState } from './context';
import lodash from 'lodash';

import Toolbar from './components/Toolbar';
import Content from './components/Content';

const useStyles = makeStyles((theme) => ({
  thumbnail: {
    padding: '0px 0px 0px 20px',
  },
  titleHeader: {
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: '400',
    fontStyle: 'normal',
    color: '#000000'
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  imgFlag: {
    width: '20px',
    height: '14px'
  },
  marginBottom: {
    marginBottom: '20px'
  }
}));

const creationFormErrorMessagesInitialState = {
  username: '',
  group: '',
  status: '',
  fullname: '',
  national_id: '',
  phone_number: '',
  password: '',
  confirmPassword: '',
}

export default function AdminCreation() {
  const classes = useStyles();
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  const [state, dispatch] = useReducer(reducer, initialState);

  const [creationFormErrorMessages, setCreationFormErrorMessages] = useState(lodash.cloneDeep(creationFormErrorMessagesInitialState));
  const [mode, setMode] = useState(ADMIN_SCREEN_CREATION_MODE);
  const [enablePassword, setEnablePassword] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(async () => {
    try {
      if (id) {
        setMode(ADMIN_SCREEN_EDIT_MODE);
        const detail = location.state;
        const username = Utils.getSafeValue(detail, 'username', '');
        const group = Utils.getSafeValue(detail, 'group', 0);
        const status = Utils.getSafeValue(detail, 'status', 0);
        const fullname = Utils.getSafeValue(detail, 'fullname', '');
        const sex = Utils.getSafeValue(detail, 'sex', 0);
        const national_id = Utils.getSafeValue(detail, 'national_id', '');
        const phone_number = Utils.getSafeValue(detail, 'phone_number', '');
        const address = Utils.getSafeValue(detail, 'address', '');
        const groups = Utils.getSafeValue(detail, 'groups', []);
        setGroups(groups);
        const payload = {
          username,
          group,
          status,
          fullname,
          sex,
          national_id,
          phone_number,
          address,
          password: '',
          confirmPassword: '',
        };
        dispatch({
          type: 'updateDetail',
          payload
        })
      } else {
        await getProductCategory(AppURL.getAdminGroup).then(res => {
          if (res.code === 200) {
            const data = Utils.getSafeValue(res, 'data', {});
            const groups = Utils.getSafeValue(data, "results", []);
            setGroups(groups);
          }
        })
      }
    } catch (error) {

    }
  }, [id]);

  const handleSubmit = async () => {
    const { detail } = state;
    let errorMessage = lodash.cloneDeep(creationFormErrorMessagesInitialState);
    console.log(errorMessage, 'error message')
    let errorsCount = 0;
    if (detail.username === '') {
      errorMessage.username = 'Tên đăng nhập yêu cầu';
      errorsCount = errorsCount + 1;
    } else if (detail.username.length > 50) {
      errorMessage.username = 'Tên đăng nhập không được quá 50 ký tự';
      errorsCount = errorsCount + 1;
    }
    if (detail.fullname !== '' && detail.fullname.length > 50) {
      errorMessage.fullname = 'Họ và tên không được quá 50 ký tự';
      errorsCount = errorsCount + 1;
    }
    if (detail.national_id !== '' && detail.national_id.length !== 12 && detail.national_id.length !== 9) {
      errorMessage.national_id = 'Căn cước không hợp lệ';
      errorsCount = errorsCount + 1;
    }
    const val_phone_regex = /((09|03|07|08|05)+([0-9]{8})\b)$/g;
    if (detail.phone_number !== ''
      && (detail.phone_number.length !== 10 || !detail.phone_number.match(val_phone_regex))) {
      errorMessage.phone_number = 'Số điện thoại không hợp lệ';
      errorsCount = errorsCount + 1;
    }
    if (detail.group === 0) {
      errorMessage.group = 'Tên nhóm được yêu cầu';
      errorsCount = errorsCount + 1;
    }
    if (detail.status === 0) {
      errorMessage.status = 'Trạng thái được yêu cầu';
      errorsCount = errorsCount + 1;
    }
    if (mode === ADMIN_SCREEN_CREATION_MODE) {
      if (detail.password === '') {
        errorMessage.password = 'Mật khẩu được yêu cầu';
        errorsCount = errorsCount + 1;
      } else {
        if (!detail.password.match(/^(?=.*[0-9])(?=.*[A-Z]).{10,}$/)) {
          errorMessage.password = 'Phải có ít nhất 10 kí tự, một chữ hoa và một chữ số';
          errorsCount = errorsCount + 1;
        } else {
          if (detail.confirmPassword !== detail.password) {
            errorMessage.confirmPassword = 'Mật khẩu không khớp';
            errorsCount = errorsCount + 1;
          }
        }
      }
      if (detail.confirmPassword === '') {
        errorMessage.confirmPassword = 'Mật khẩu không khớp';
        errorsCount = errorsCount + 1;
      }
    } else if (mode === ADMIN_SCREEN_EDIT_MODE && enablePassword) {
      if (detail.password === '') {
        errorMessage.password = 'Mật khẩu được yêu cầu';
        errorsCount = errorsCount + 1;
      } else {
        if (!detail.password.match(/^(?=.*[0-9])(?=.*[A-Z]).{10,}$/)) {
          errorMessage.password = 'Phải có ít nhất 10 kí tự, một chữ hoa và một chữ số';
          errorsCount = errorsCount + 1;
        } else {
          if (detail.confirmPassword !== detail.password) {
            errorMessage.confirmPassword = 'Mật khẩu không khớp';
            errorsCount = errorsCount + 1;
          }
        }
      }
      if (detail.confirmPassword === '') {
        errorMessage.confirmPassword = 'Mật khẩu không khớp';
        errorsCount = errorsCount + 1;
      }
    }
    if (errorsCount > 0) {
      setCreationFormErrorMessages(errorMessage);
      return;
    };
    try {
      if (mode === ADMIN_SCREEN_CREATION_MODE) {
        let params = {
          group_id: detail.group,
          username: detail.username,
          password: detail.password,
          fullname: detail.fullname,
          address: detail.address,
          phone_number: detail.phone_number,
          national_id: detail.national_id,
          status: detail.status,
          sex: detail.sex,
        };
        addNewCate(AppURL.createAdminAccount, params).then(res => {
          history.goBack();
        })
          .catch(error => {
            const err = error.response?.data;
            if (err.errorCode === 'admin::004') {
              errorMessage.username = 'Tên đăng nhập đã tồn tại';
              setCreationFormErrorMessages(errorMessage);
            }
          })
      } else {
        let params = {
          group_id: detail.group,
          username: detail.username,
          fullname: detail.fullname,
          address: detail.address,
          phone_number: detail.phone_number,
          national_id: detail.national_id,
          status: detail.status,
          sex: detail.sex,
        };
        if (detail.password !== '') {
          params = {
            ...params,
            password: detail.password
          }
        }
        const url = Utils.replaceStrUrl(AppURL.updateAdminAccount, [id]);
        putApi(url, params).then(res => {
          if (res.code === 200)
            history.go(-2);
        })
          .catch(error => {
            const err = error.response?.data;
            if (err.errorCode === 'admin::004') {
              errorMessage.username = 'Tên đăng nhập đã tồn tại';
              setCreationFormErrorMessages(errorMessage);
            }
          })
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <AdminCreationContext.Provider value={{ state, dispatch }}>
      <Toolbar
        onSubmit={handleSubmit}
        mode={mode}
        detail={location?.state}
      />
      <Divider />
      <Grid container>
        <Grid item xs={12}>
          <Content
            creationFormErrorMessages={creationFormErrorMessages}
            setCreationFormErrorMessages={setCreationFormErrorMessages}
            mode={mode}
            enablePassword={enablePassword}
            setEnablePassword={setEnablePassword}
            groups={groups}
          />
        </Grid>
      </Grid>
    </AdminCreationContext.Provider>
  )
}