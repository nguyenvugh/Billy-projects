import { useEffect, useReducer, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, FormControlLabel, Checkbox } from '@material-ui/core';
import lodash from 'lodash';
import * as Utils from 'app/utils';
import Toolbar from './components/Toolbar';
import Content from './components/Content';
import ConfirmModal from 'app/components/ConfirmModal';
import { ProfileEditContext, reducer, initialState } from './context';

import { postImage, addNewCate } from 'app/services/axios';
import * as AppURL from 'app/services/urlAPI';
import { urlProfile } from 'app/Layouts/AuthenticatedLayout/Sidebar/url';

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: "#ffffff",
    padding: '20px',
    marginBottom: '20px'
  },
  photos: {
    padding: '0px 0px 0px 20px',
  }
}));

const creationFormErrorMessagesInitialState = {
  fullname: '',
  sex: '',
  national_id: '',
  phone_number: '',
  address: '',
  avatar: '',
  oldPassword: '',
  password: '',
  confirmPassword: '',
}

export default function ProfileEdit() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const [state, dispatch] = useReducer(reducer, initialState);
  const [fileAvatar, setFileAvatar] = useState(null);
  const [creationFormErrorMessages, setCreationFormErrorMessages]
    = useState(lodash.cloneDeep(creationFormErrorMessagesInitialState));

  useEffect(() => {
    const data = location.state;
    const username = Utils.getSafeValue(data, 'username', '');
    const fullname = Utils.getSafeValue(data, 'fullname', '');
    const national_id = Utils.getSafeValue(data, 'national_id', '');
    const group = Utils.getSafeValue(data, 'group', '');
    const sex = Utils.getSafeValue(data, 'sex', 0);
    const phone_number = Utils.getSafeValue(data, 'phone_number', '');
    const address = Utils.getSafeValue(data, 'address', '');
    const thumbnail = Utils.getSafeValue(data, 'avatar_obj.url', '');
    const avatarId = Utils.getSafeValue(data, 'avatarId', 0);
    setFileAvatar(avatarId);
    const dataDispatch = {
      username,
      fullname,
      national_id,
      group,
      sex,
      phone_number,
      address,
      thumbnail
    };
    dispatch({
      type: 'updateDetail',
      payload: dataDispatch
    });
  }, []);

  const handleSaveProfile = async () => {
    const { detail } = state;
    console.log(detail);
    let errorMessage = lodash.cloneDeep(creationFormErrorMessagesInitialState);
    let errorsCount = 0;
    if (detail.fullname === '') {
      errorMessage.fullname = 'Họ và tên được yêu cầu';
      errorsCount = errorsCount + 1;
    }
    if (detail.national_id === '') {
      errorMessage.national_id = 'Chứng minh nhân dân được yêu cầu';
      errorsCount = errorsCount + 1;
    }
    if (detail.phone_number === '') {
      errorMessage.phone_number = 'Số điện thoại được yêu cầu';
      errorsCount = errorsCount + 1;
    }
    if (detail.address === '') {
      errorMessage.address = 'Địa chỉ được yêu cầu';
      errorsCount = errorsCount + 1;
    }
    if (!fileAvatar) {
      errorMessage.avatar = 'Avatar được yêu cầu';
      errorsCount = errorsCount + 1;
    }
    if (detail.password && detail.oldPassword && detail.confirmPassword &&
      (detail.password !== '' || detail.oldPassword !== '' || detail.confirmPassword !== '')) {
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
      console.log(creationFormErrorMessages);
      return;
    };
    try {
      let avatarId;
      if (typeof fileAvatar === "number") {
        avatarId = fileAvatar;
      } else {
        let formAvatar = new FormData();
        formAvatar.append('file', fileAvatar);
        await postImage(AppURL.uploadImg, formAvatar).then(res => {
          avatarId = res.id
        })
      }
      let params = {
        fullname: detail.fullname,
        sex: detail.sex,
        national_id: detail.national_id,
        phone_number: detail.phone_number,
        address: detail.address,
        avatar: avatarId,
      }
      if (detail.password) {
        params = {
          ...params,
          password: detail.password
        }
      }
      addNewCate(AppURL.updateAdminProfile, params).then(res => {
        if (res.code === 200) {
          history.push(urlProfile);
        }
      })

    } catch (error) {

    }
  }

  return (
    <ProfileEditContext.Provider value={{ state, dispatch }}>
      <Toolbar handleSaveProfile={handleSaveProfile} />
      <Grid container className={classes.main}>
        <Grid item xs={12}>
          <Content setFileAvatar={setFileAvatar} creationFormErrorMessages={creationFormErrorMessages}
            setCreationFormErrorMessages={setCreationFormErrorMessages} />
        </Grid>
      </Grid>
    </ProfileEditContext.Provider>
  )
}