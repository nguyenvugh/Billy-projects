import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getProductCategory, postImage, putApi } from 'app/services/axios';
import lodash from 'lodash';
import { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import * as AppURL from '../../../services/urlAPI';
import * as Utils from '../../../utils';
import Content from './components/Content';
import Toolbar from './components/Toolbar';

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
  name: '',
  sex: '',
  birthday: '',
  city: '',
  district: '',
  ward: '',
  address: '',
}

export default function UserProfileDetail() {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();

  const [currentForm, setCurrentForm] = useState(location.state);
  const [listCity, setListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [creationFormErrorMessages, setCreationFormErrorMessages] = useState(lodash.cloneDeep(creationFormErrorMessagesInitialState));

  useEffect(() => {
    getProductCategory(AppURL.getListCity).then((res) => {
      const listCity = Utils.getSafeValue(res, 'results', []);
      setListCity(listCity);
    })
  }, []);

  useEffect(() => {
    if (currentForm.city !== 0) {
      const url = Utils.replaceStrUrl(AppURL.getListDistrict, [currentForm.city]);
      getProductCategory(url).then((res) => {
        const listDistrict = Utils.getSafeValue(res, 'results', []);
        setListDistrict(listDistrict);
        if (isUpdated) {
          setListWard([]);
          setCurrentForm({
            ...currentForm,
            district: 0,
            ward: 0
          })
        }
      })
    }
  }, [currentForm.city]);

  useEffect(() => {
    if (currentForm.district !== 0) {
      const url = Utils.replaceStrUrl(AppURL.getListWard, [currentForm.district]);
      getProductCategory(url).then((res) => {
        const listWard = Utils.getSafeValue(res, 'results', []);
        setListWard(listWard);
        if (isUpdated) {
          setCurrentForm({
            ...currentForm,
            ward: 0
          })
        }
      })
    }
  }, [currentForm.district]);

  useEffect(() => {
    if (id && currentForm.district !== 0) {
      const districtUrl = Utils.replaceStrUrl(AppURL.getListDistrict, [currentForm.city]);
      getProductCategory(districtUrl).then((res) => {
        const listDistrict = Utils.getSafeValue(res, 'results', []);
        setListDistrict(listDistrict);
      });
      const wardUrl = Utils.replaceStrUrl(AppURL.getListWard, [currentForm.district]);
      getProductCategory(wardUrl).then((res) => {
        const listWard = Utils.getSafeValue(res, 'results', []);
        setListWard(listWard);
      })
    }
  }, []);

  const handleUpdateCustomer = async () => {
    console.log(currentForm);
    let errorMessage = lodash.cloneDeep(creationFormErrorMessagesInitialState);
    let errorsCount = 0;
    if (currentForm.name === '') {
      errorMessage.name = 'Tên người dùng được yêu cầu';
      errorsCount = errorsCount + 1;
    }
    if (currentForm.city === 0) {
      errorMessage.city = 'Tỉnh/Thành phố được yêu cầu';
      errorsCount = errorsCount + 1;
    }
    if (currentForm.district === 0 || !currentForm.district) {
      errorMessage.district = 'Quận/Huyện được yêu cầu';
      errorsCount = errorsCount + 1;
    }
    if (currentForm.ward === 0 || !currentForm.ward) {
      errorMessage.ward = 'Phường/Xã được yêu cầu';
      errorsCount = errorsCount + 1;
    }
    if (currentForm.address === '') {
      errorMessage.address = 'Địa chỉ được yêu cầu';
      errorsCount = errorsCount + 1;
    }
    if (currentForm.birthday === '') {
      errorMessage.birthday = 'Ngày sinh được yêu cầu';
      errorsCount = errorsCount + 1;
    }
    if (currentForm.password || currentForm.confirmPassword) {
      if (currentForm.password === '') {
        errorMessage.password = 'Mật khẩu được yêu cầu';
        errorsCount = errorsCount + 1;
      } else {
        if (!currentForm.password.match(/^(?=.*[0-9])(?=.*[A-Z]).{10,}$/)) {
          errorMessage.password = 'Phải có ít nhất 10 kí tự, một chữ hoa và một chữ số';
          errorsCount = errorsCount + 1;
        } else {
          if (currentForm.confirmPassword !== currentForm.password) {
            errorMessage.confirmPassword = 'Mật khẩu không khớp';
            errorsCount = errorsCount + 1;
          }
        }
      }
      if (currentForm.confirmPassword === '') {
        errorMessage.confirmPassword = 'Mật khẩu không khớp';
        errorsCount = errorsCount + 1;
      }
    }
    if (errorsCount > 0) {
      setCreationFormErrorMessages(errorMessage);
      return;
    };
    try {
      let thumbnailId;
      if (currentForm.avatarId && currentForm.avatarId !== 0 && !thumbnailFile) {
        thumbnailId = currentForm.avatarId;
      } else {
        let formThumbnail = new FormData();
        formThumbnail.append('file', thumbnailFile);
        await postImage(AppURL.uploadImg, formThumbnail).then(res => {
          thumbnailId = res.id
        })
      }
      const params = {
        avatar: thumbnailId,
        fullname: currentForm.name,
        country: 1,
        city: currentForm.city,
        district: currentForm.district,
        ward: currentForm.ward,
        address: currentForm.address,
        birthday: currentForm.birthday,
        sex: currentForm.sex,
        password: currentForm.password,
        alias: currentForm.alias || ''
      }
      const url = Utils.replaceStrUrl(AppURL.customerDetail, [id]);
      await putApi(url, params).then(res => {
        console.log(res);
        history.goBack(2);
      })
    } catch (error) {

    }
  }

  return (
    <div>
      <Toolbar id={id} handleUpdateCustomer={handleUpdateCustomer} data={location.state} />
      <Grid container className={classes.main}>
        <Grid item xs={12}>
          <Content
            currentForm={currentForm}
            setCurrentForm={setCurrentForm}
            listCity={listCity}
            listDistrict={listDistrict}
            listWard={listWard}
            setIsUpdated={setIsUpdated}
            setThumbnailFile={setThumbnailFile}
            creationFormErrorMessages={creationFormErrorMessages}
            setCreationFormErrorMessages={setCreationFormErrorMessages}
          />
        </Grid>
      </Grid>
    </div>
  )
}