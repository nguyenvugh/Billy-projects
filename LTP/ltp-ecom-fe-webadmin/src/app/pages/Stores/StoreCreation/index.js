import { Divider, Grid, makeStyles, Paper } from '@material-ui/core';
import DefaultButton from 'app/components/Button/DefaultButton';
import PrimaryButton from 'app/components/Button/PrimaryButton';
import { urlStore } from 'app/Layouts/AuthenticatedLayout/Sidebar/url';
import { ACTION_TYPE as ACTION_TYPE_ADDRESS } from 'app/reducers/address';
import { ACTION_TYPE } from 'app/reducers/shop';
import { ACTION_TYPE as ACTION_TYPE_UPLOAD } from 'app/reducers/upload-file';
import { isEmail, isHours } from 'app/utils/common';
import { ERROR_LAT, ERROR_LNG, isEmpty, isFax, isLat, isLng, isPhoneNumber, ERROR_PHONE, MIN_LENGTH_PHONE, ERROR_FAX, REGEX_PHONE } from 'app/utils/validate';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ImagePicker from '../../../components/ImagePicker';
import Breadcrumbs from '../components/Breadcrumbs';
import Input from '../components/Input';
import Select from '../components/Select';

function StoreCreation({ location: { state }, match: { params } }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const isEdit = history.location.pathname.includes(`${urlStore}/edit`);
  const shop = useSelector((store) => store.shop.shop);
  const cityList = useSelector((store) => store.address.cityList);
  const districtList = useSelector((store) => store.address.districtList);
  const wardList = useSelector((store) => store.address.wardList);
  const [city, setCity] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [fax, setFax] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [email, setEmail] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDay, setStartDay] = useState(dayList[0]);
  const [endDay, setEndDay] = useState(dayList[6]);
  const [thumbnail, setThumbnail] = useState("");
  const [files, setFiles] = useState("");
  const [submit, setSubmit] = useState(false);

  const editBreadcrumb = [
    {
      href: `${urlStore}/${params.id}`,
      label: shop?.name,
    }, {
      href: `${urlStore}/create`,
      label: "Ch???nh s???a",
    }];
  const creationBreadcrumb = [{
    href: "#",
    label: "Th??m m???i",
  }];

  const breadcrumbsLinks = isEdit ? editBreadcrumb : creationBreadcrumb;
  const handleCancel = () => {
    history.push(urlStore);
  };

  useEffect(() => {
    dispatch({
      type: ACTION_TYPE_ADDRESS.GET_COUNTRY_LIST_REQUEST,
      success: (response) => {
        let countryList = response?.data?.results;
        if (Array.isArray(countryList)) {
          let vi = countryList.find(item => item?.code === "vi");
          if (vi?.id) {
            dispatch({
              type: ACTION_TYPE_ADDRESS.GET_CITY_LIST_REQUEST,
              params: { country: vi.id }
            })
          }
        }
      }
    })
    dispatch({
      type: ACTION_TYPE_ADDRESS.GET_DISTRICT_LIST_SUCCESS,
      payload: { results: [] }
    })
    dispatch({
      type: ACTION_TYPE_ADDRESS.GET_WARD_LIST_SUCCESS,
      payload: { results: [] }
    })
  }, [dispatch])

  useEffect(() => {
    if (isEdit) {
      if (shop?.id?.toString() !== params?.id) {
        history.push(urlStore);
        return;
      }
      if (shop?.id) {
        setCity(shop?.city);
        setDistrict(shop?.district);
        setWard(shop?.ward);
        setAddress(shop?.address);
        setName(shop?.name);
        setPhoneNumber(shop?.phone_number);
        setFax(shop?.fax);
        setLat(shop?.lat);
        setLong(shop?.long);
        setEmail(shop?.email);
        setStartTime(shop?.start_working_time);
        setEndTime(shop?.end_working_time);
        setStartDay(dayList.find(item => item?.id === shop?.start_working_date));
        setEndDay(dayList.find(item => item?.id === shop?.end_working_date));
        setThumbnail(shop?.thumbnail_obj?.url);
      }
    }
  }, [isEdit, params?.id, shop])

  const addEditShop = (thumbnail_id) => {
    dispatch({
      type: isEdit ? ACTION_TYPE.EDIT_SHOP_REQUEST : ACTION_TYPE.ADD_SHOP_REQUEST,
      id: shop?.id,
      data: {
        thumbnail_id,
        name,
        phone_number,
        email,
        fax,
        city: city?.id,
        district: district?.id,
        ward: ward?.id,
        address,
        lat,
        long,
        start_working_time: startTime,
        end_working_time: endTime,
        start_working_date: startDay?.id,
        end_working_date: endDay?.id,
      },
      success: () => {
        history.push(urlStore);
      },
      error: (e) => {
        if (e?.message?.includes("shop already existed")) {
          setErrorName("T??n c???a h??ng ???? t???n t???i");
        }
      }
    })
  }

  const handleSave = () => {
    if (isEmpty(name) ||
      isEmpty(address) ||
      !city?.id ||
      !district?.id ||
      !ward?.id ||
      !(phone_number?.length >= MIN_LENGTH_PHONE) ||
      !(fax?.length >= MIN_LENGTH_PHONE) ||
      !isLat(lat) ||
      !isLng(long) ||
      !isEmail(email) ||
      validateStartTime() !== "" ||
      validateEndTime() !== "" ||
      validateStartDay() !== "" ||
      validateEndDay() !== ""
    ) {
      setSubmit(true);
      return;
    }
    if (files?.length > 0) {
      dispatch({
        type: ACTION_TYPE_UPLOAD.UPLOAD_FILE_MULTI_REQUEST,
        data: [files[0]],
        success: (response) => {
          addEditShop(response?.[0]?.data?.id);
        }
      })
    } else {
      addEditShop(shop?.thumbnail_obj?.id);
    }
  };

  useEffect(() => {
    if (city?.id) {
      dispatch({
        type: ACTION_TYPE_ADDRESS.GET_DISTRICT_LIST_REQUEST,
        params: { city: city.id },
      })
    }
  }, [dispatch, city?.id]);
  useEffect(() => {
    if (district?.id) {
      dispatch({
        type: ACTION_TYPE_ADDRESS.GET_WARD_LIST_REQUEST,
        params: { district: district.id },
      })
    }
  }, [dispatch, district?.id]);
  const onChangeCity = (city) => {
    setCity(city);
    setDistrict();
    setWard();
  }
  const onChangeDistrict = (district) => {
    setDistrict(district);
    setWard();
  }
  const onChangeName = (value) => {
    setName(value);
    setErrorName("");
  }

  const validateStartTime = () => {
    if (isEmpty(startTime)) {
      return "Gi??? b???t ?????u ???????c y??u c???u";
    }
    if (!isHours(startTime)) {
      return "Gi??? b???t ?????u kh??ng h???p l???";
    }
    if (isHours(endTime) && endTime <= startTime) {
      return "Gi??? ho???t ?????ng kh??ng h???p l???";
    }
    return "";
  }
  const validateEndTime = () => {
    if (isEmpty(endTime)) {
      return "Gi??? k???t th??c ???????c y??u c???u";
    }
    if (!isHours(endTime)) {
      return "Gi??? k???t th??c kh??ng h???p l???";
    }
    if (isHours(startTime) && endTime <= startTime) {
      return "Gi??? ho???t ?????ng kh??ng h???p l???";
    }
    return "";
  }
  const validateStartDay = () => {
    if (!startDay?.id) {
      return "Ng??y b???t ?????u ???????c y??u c???u";
    }
    if (endDay?.id && endDay?.id < startDay?.id) {
      return "Ng??y ho???t ?????ng kh??ng h???p l???";
    }
    return "";
  }
  const validateEndDay = () => {
    if (!endDay?.id) {
      return "Ng??y k???t th??c ???????c y??u c???u";
    }
    if (startDay?.id && endDay?.id < startDay?.id) {
      return "Ng??y ho???t ?????ng kh??ng h???p l???";
    }
    return "";
  }


  return (
    <div className={classes.root}>
      <div className="page-header">
        <div className="page-title">
          <Breadcrumbs links={breadcrumbsLinks} />
        </div>
        <DefaultButton onClick={handleCancel} >
          H???y
        </DefaultButton>
        <PrimaryButton onClick={handleSave}>
          L??u l???i
        </PrimaryButton>
      </div>
      <Paper elevation={0} className={classes.inner}>
        <Grid container>
          <h5 className={classes.title}>C???a h??ng</h5>
        </Grid>
        <Divider />
        <Grid container spacing={4} style={{ marginTop: 12 }}>
          <Grid item xs={8}>
            {/* 1 */}
            <Grid container item xs={12} spacing={4}>
              <Grid item xs>
                <Input
                  required
                  error={(submit && isEmpty(name) && "T??n c???a h??ng ???????c y??u c???u") || errorName}
                  value={name}
                  onChange={onChangeName}
                  placeholder='C???a h??ng ABC'
                  labelName='T??n c???a h??ng'
                />
              </Grid>

              <Grid item xs>
                <Select
                  data={cityList}
                  error={submit && !city?.id && "T???nh/Th??nh Ph??? ???????c y??u c???u"}
                  value={city}
                  onChange={onChangeCity}
                  placeholder='-Ch???n T???nh/ th??nh ph???-'
                  labelName='T???nh/ th??nh ph???'
                />
              </Grid>
            </Grid>
            {/* 2 */}
            <Grid container item xs={12} spacing={4} >
              <Grid item xs>
                <Input
                  required
                  error={submit && ((isEmpty(phone_number) && "S??? ??i???n tho???i ???????c y??u c???u") || (!(phone_number?.length >= MIN_LENGTH_PHONE) && ERROR_PHONE))}
                  value={phone_number}
                  onChange={(value) => setPhoneNumber(value.replace(REGEX_PHONE, ''))}
                  placeholder='Nh???p s??? ??i???n tho???i'
                  labelName='??i???n tho???i'
                />
              </Grid>

              <Grid item xs>
                <Select
                  data={districtList}
                  error={submit && !district?.id && "Qu???n/ Huy???n ???????c y??u c???u"}
                  value={district}
                  onChange={onChangeDistrict}
                  placeholder='-Ch???n Qu???n/ huy???n-'
                  labelName='Qu???n/ huy???n'
                />
              </Grid>
            </Grid>
            {/* 3 */}
            <Grid container item xs={12} spacing={4}>
              <Grid item xs>
                <Input
                  required
                  error={submit && (isEmpty(email) ? "Email ???????c y??u c???u" : !isEmail(email) && "Email kh??ng h???p l???")}
                  value={email}
                  onChange={setEmail}
                  placeholder='Nh???p email'
                  labelName='Email'
                />
              </Grid>

              <Grid item xs>
                <Select
                  data={wardList}
                  error={submit && !ward?.id && "Ph?????ng/ X?? ???????c y??u c???u"}
                  value={ward}
                  onChange={setWard}
                  placeholder='-Ch???n Ph?????ng/ x??-' labelName='Ph?????ng/ x??'
                />
              </Grid>
            </Grid>
            {/* 4 */}
            <Grid container item xs={12} spacing={4}>
              <Grid item xs>
                <Input
                  required
                  error={submit && ((isEmpty(fax) && "S??? fax kh??ng h???p l???") || (!(fax?.length >= MIN_LENGTH_PHONE) && ERROR_FAX))}
                  value={fax}
                  onChange={(value) => setFax(value.replace(REGEX_PHONE, ''))}
                  placeholder='Nh???p s??? fax'
                  labelName='Fax'
                />
              </Grid>

              <Grid item xs>
                <Input
                  required
                  error={submit && isEmpty(address) && "?????a ch??? ???????c y??u c???u"}
                  value={address}
                  onChange={setAddress}
                  placeholder='Nh???p ?????a ch???'
                  labelName='?????a ch???'
                />
              </Grid>
            </Grid>
            {/* 5 */}
            <Grid container item xs={12} spacing={4}>
              <Grid item xs>
                <Grid container item xs>
                  <Grid item xs style={{ marginRight: 30 }}>
                    <Input
                      required
                      error={submit && validateStartTime()}
                      type='hour'
                      value={startTime}
                      onChange={setStartTime}
                      inputProps={{ maxLength: 5 }}
                      labelName='Gi??? ho???t ?????ng'
                      placeholder='--:--'
                    />
                  </Grid>
                  <Grid item xs>
                    <Input
                      error={submit && validateEndTime()}
                      type='hour'
                      value={endTime}
                      onChange={setEndTime}
                      inputProps={{ maxLength: 5 }}
                      placeholder='--:--'
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs>
                <Grid container item xs>
                  <Grid item xs style={{ marginRight: 30 }}>
                    <Select
                      required
                      data={dayList}
                      error={submit && validateStartDay()}
                      value={startDay}
                      onChange={setStartDay}
                      placeholder='T??? th???'
                      labelName='Ng??y ho???t ?????ng'
                    />
                  </Grid>
                  <Grid item xs>
                    <Select
                      data={dayList}
                      error={submit && validateEndDay()}
                      value={endDay}
                      onChange={setEndDay}
                      placeholder='?????n th???'
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* 6 */}
            <Grid container item xs={12} spacing={4}>
              <Grid item xs>
                <Input
                  required
                  value={long}
                  onChange={setLong}
                  error={submit && (isEmpty(long) ? "Kinh ????? ???????c y??u c???u" : !isLng(long) && ERROR_LNG)}
                  type='latLng'
                  placeholder='Nh???p kinh ?????'
                  labelName='Kinh ?????'
                />
              </Grid>

              <Grid item xs>
                <Input
                  required
                  error={submit && (isEmpty(lat) ? "V?? ????? ???????c y??u c???u" : !isLat(lat) && ERROR_LAT)}
                  value={lat}
                  onChange={setLat}
                  type='latLng'
                  placeholder='Nh???p v?? ?????'
                  labelName='V?? ?????'
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs>
            <ImagePicker
              labelName='???nh c???a h??ng (kh??ng b???t bu???c)'
              uploadDesc='(K??ch th?????c ???nh: 1066x582)'
              isOpen={false}
              defaultValue={thumbnail}
              onChange={(val) => setFiles(Array.from(val?.target?.files || []))}
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}



StoreCreation.defaultProps = {
};


StoreCreation.propTypes = {
  // defaultData: PropTypes.shape({
  //   id: PropTypes.string,
  //   promotion_name: PropTypes.string,
  //   promotion_thumbnail: PropTypes.string,
  //   promotion_type: PropTypes.string,
  //   promotion_description: PropTypes.string,
  //   promotion_fromDate: PropTypes.string,
  //   promotion_toDate: PropTypes.string,
  //   promotion_createBy: PropTypes.string,
  //   promotion_status: PropTypes.string,
  //   promotion_link: PropTypes.string,
  //   promotion_showDate: PropTypes.string
  // })
};

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 12
  },
  inner: {
    padding: '16px 24px',
  },
  title: {
    fontSize: '16px',
    fontWeight: 400,
    color: '#0000000',

    margin: '12px 0'
  },
  cancelButton: {
    width: '100%',
    backgroundColor: '#ffffff',
  },
  labelCancelButton: {
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  saveButton: {
    width: '100%',
    backgroundColor: '#3952D3',
  },
  labelSaveButton: {
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  chain: {
    display: 'flex',
    width: '10px',
    height: '2px',
    backgroundColor: '#000000',

    position: 'absolute',
    bottom: 0,
    left: '-5px'
  },
  editorContainer: {
    margin: 0
  },
  editImageButton: {
    display: 'flex',
    margin: '12px auto 0',
  },
  editImageLabelButton: {
    fontSize: '14px',
    fontWeight: 400,
    color: '#007BFF',
    textTransform: 'capitalize',
  },

  py0: {
    '& .MuiGrid-item': {
      // paddingTop: '0px',
      // paddingBottom: '0px',
    }
  },

  pb0: {
    '& .MuiGrid-item': {
      // paddingBottom: '0px',
    }
  }
}));

export default StoreCreation;

export const dayList = [{
  id: 1,
  name: "Th??? 2"
}, {
  id: 2,
  name: "Th??? 3"
}, {
  id: 3,
  name: "Th??? 4"
}, {
  id: 4,
  name: "Th??? 5"
}, {
  id: 5,
  name: "Th??? 6"
}, {
  id: 6,
  name: "Th??? 7"
}, {
  id: 7,
  name: "Ch??? nh???t"
}]