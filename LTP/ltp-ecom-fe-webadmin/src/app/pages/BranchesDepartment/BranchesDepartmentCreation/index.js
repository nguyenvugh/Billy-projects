import { Divider, Grid, makeStyles, Paper } from '@material-ui/core';
import DefaultButton from 'app/components/Button/DefaultButton';
import PrimaryButton from 'app/components/Button/PrimaryButton';
import { urlBranch } from 'app/Layouts/AuthenticatedLayout/Sidebar/url';
import { ACTION_TYPE as ACTION_TYPE_ADDRESS } from 'app/reducers/address';
import { ACTION_TYPE } from 'app/reducers/branch';
import { ERROR_FAX, ERROR_LAT, ERROR_LNG, ERROR_PHONE, isEmpty, isLat, isLng, MIN_LENGTH_PHONE, REGEX_PHONE } from 'app/utils/validate';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import Input from '../components/Input';
import Select from '../components/Select';

function BranchesDepartmentCreation({ location: { state }, match: { params } }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const branch = useSelector((store) => store.branch.branch);
  const cityList = useSelector((store) => store.address.cityList);
  const districtList = useSelector((store) => store.address.districtList);
  const wardList = useSelector((store) => store.address.wardList);
  const history = useHistory();
  const isEdit = history.location.pathname.includes(`${urlBranch}/edit`);
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
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (isEdit) {
      if (branch?.id?.toString() !== params?.id) {
        history.push(urlBranch);
        return;
      }
      if (branch?.id) {
        setCity(branch?.city);
        setDistrict(branch?.district);
        setWard(branch?.ward);
        setAddress(branch?.address);
        setName(branch?.name);
        setPhoneNumber(branch?.phone_number);
        setFax(branch?.fax);
        setLat(branch?.lat);
        setLong(branch?.long);
      }
    }
  }, [isEdit, params?.id, branch])

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

  const editBreadcrumb = [
    {
      href: `${urlBranch}/${params.id}`,
      label: branch?.name,
    }, {
      href: "#",
      label: "Chỉnh sửa",
    }];

  const creationBreadcrumb = [{
    href: "#",
    label: "Thêm mới",
  }];

  const breadcrumbsLinks = isEdit ? editBreadcrumb : creationBreadcrumb;

  const handleCancel = () => {
    history.push(urlBranch);
  };

  const handleSave = () => {
    if (isEmpty(name) ||
      isEmpty(address) ||
      !city?.id ||
      !district?.id ||
      !ward?.id ||
      !(phone_number?.length >= MIN_LENGTH_PHONE) ||
      !(fax?.length >= MIN_LENGTH_PHONE) ||
      !isLat(lat) ||
      !isLng(long)) {
      setSubmit(true);
      return;
    }
    let type = isEdit ? ACTION_TYPE.EDIT_BRANCH_REQUEST : ACTION_TYPE.ADD_BRANCH_REQUEST;
    dispatch({
      type,
      data: {
        city: city?.id,
        district: district?.id,
        ward: ward?.id,
        name,
        phone_number,
        fax,
        address,
        lat,
        long,
      },
      id: params?.id,
      success: () => {
        if (isEdit) {
          dispatch({
            type: ACTION_TYPE.GET_BRANCH_REQUEST,
            id: branch?.id,
            success: () => {
              history.push(`${urlBranch}/${branch?.id}`);
            }
          })
        } else {
          history.push(urlBranch);
        }
      },
      error: (e) => {
        if (e?.message === "Branch already existed") {
          setErrorName("Tên văn phòng đã tồn tại");
        }
      }
    })
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

  return (
    <div className={classes.root}>
      <div className="page-header">
        <div className="page-title"><Breadcrumbs links={breadcrumbsLinks} /></div>
        <DefaultButton onClick={handleCancel}>
          Hủy
        </DefaultButton>
        <PrimaryButton onClick={handleSave}>
          Lưu lại
        </PrimaryButton>
      </div>
      <Paper elevation={0} className={classes.inner}>
        <Grid container>
          <h5 className={classes.title}>Văn phòng
          </h5>
        </Grid>
        <Divider />
        <Grid container spacing={4} style={{ marginTop: 12 }}>
          <Grid item xs>
            {/* 1 */}
            <Grid container item spacing={4}>
              <Grid item xs>
                <Input
                  required
                  error={(submit && isEmpty(name) && "Tên văn phòng được yêu cầu") || errorName}
                  value={name}
                  onChange={onChangeName}
                  placeholder='Nhập tên văn phòng'
                  labelName='Tên văn phòng'
                />
              </Grid>

              <Grid item xs>
                <Select
                  data={cityList}
                  error={submit && !city?.id && "Tỉnh/Thành Phố được yêu cầu"}
                  value={city}
                  onChange={onChangeCity}
                  placeholder='-Chọn Tỉnh/ thành phố-' labelName='Tỉnh/ thành phố'
                />
              </Grid>

              <Grid item xs>
                <Select
                  data={districtList}
                  error={submit && !district?.id && "Quận/ Huyện được yêu cầu"}
                  value={district}
                  onChange={onChangeDistrict}
                  placeholder='-Chọn Quận/ huyện-' labelName='Quận/ huyện'
                />
              </Grid>

            </Grid>
            {/* 2 */}
            <Grid container item spacing={4}>
              <Grid item xs>
                <Select
                  data={wardList}
                  error={submit && !ward?.id && "Phường/ Xã được yêu cầu"}
                  value={ward}
                  onChange={setWard}
                  placeholder='-Chọn Phường/ xã-' labelName='Phường/ xã'
                />
              </Grid>

              <Grid item xs>
                <Input
                  required
                  error={submit && isEmpty(address) && "Địa chỉ được yêu cầu"}
                  value={address}
                  onChange={setAddress}
                  placeholder='Nhập địa chỉ'
                  labelName='Địa chỉ'
                />
              </Grid>
              <Grid item xs>
                <Input
                  required
                  error={submit && ((isEmpty(phone_number) && "Số điện thoại được yêu cầu") || (!(phone_number?.length >= MIN_LENGTH_PHONE) && ERROR_PHONE))}
                  value={phone_number}
                  onChange={(value) => setPhoneNumber(value.replace(REGEX_PHONE, ''))}
                  placeholder='Nhập hotline'
                  labelName='Hotline'
                />
              </Grid>

            </Grid>
            {/* 3 */}
            <Grid container item spacing={4}>
              <Grid item xs>
                <Input
                  required
                  error={submit && ((isEmpty(fax) && "Số fax được yêu cầu") || (!(phone_number?.length >= MIN_LENGTH_PHONE)) && ERROR_FAX)}
                  value={fax}
                  onChange={(value) => setFax(value.replace(REGEX_PHONE, ''))}
                  placeholder='Nhập số fax'
                  labelName='Fax'
                />
              </Grid>

              <Grid item xs>
                <Input
                  required
                  value={long}
                  onChange={setLong}
                  error={submit && (isEmpty(long) ? "Kinh độ được yêu cầu" : !isLng(long) && ERROR_LNG)}
                  type='latLng'
                  placeholder='Nhập kinh độ'
                  labelName='Kinh độ'
                />
              </Grid>

              <Grid item xs>
                <Input
                  required
                  error={submit && (isEmpty(lat) ? "Vĩ độ được yêu cầu" : !isLat(lat) && ERROR_LAT)}
                  type='latLng'
                  value={lat}
                  onChange={setLat}
                  placeholder='Nhập vĩ độ'
                  labelName='Vĩ độ'
                />
              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}



BranchesDepartmentCreation.defaultProps = {
};


BranchesDepartmentCreation.propTypes = {
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


export default BranchesDepartmentCreation;