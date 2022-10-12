import { Box, Divider, Grid, OutlinedInput, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Breadcrumbs from "app/components/Breadcrumbs";
import DefaultButton from "app/components/Button/DefaultButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import TextFields from "app/components/TextFields";
import { ACTION_TYPE as ACTION_TYPE_ADDRESS } from "app/reducers/address";
import { ACTION_TYPE } from "app/reducers/warehouse";
import { LANG_VI } from "app/utils/constant";
import { ERROR_LAT, ERROR_LNG, ERROR_PHONE, isEmpty, isLat, isLng, MIN_LENGTH_PHONE, REGEX_PHONE } from "app/utils/validate";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const cityDefault = null;
const districtDefault = null;
const wardDefault = null;

const AddEditWarehouse = ({ warehouse, refreshList }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cityList = useSelector((store) => store.address.cityList);
  const districtList = useSelector((store) => store.address.districtList);
  const wardList = useSelector((store) => store.address.wardList);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [country_id, setCountryId] = useState();
  const [city, setCity] = useState(cityDefault);
  const [district, setDistrict] = useState(districtDefault);
  const [ward, setWard] = useState(wardDefault);
  const [submit, setSubmit] = useState("");

  useEffect(() => {
    if (!warehouse) {
      history.replace("/");
      return;
    }
    if (warehouse?.id) {
      setCode(warehouse?.code);
      setName(warehouse?.name);
      setPhoneNumber(warehouse?.phone_number);
      setAddress(warehouse?.address);
      setLat(warehouse?.lat);
      setLong(warehouse?.lng);
      setCountryId(warehouse?.country?.id);
      setCity(warehouse?.city);
      dispatch({
        type: ACTION_TYPE_ADDRESS.GET_DISTRICT_LIST_REQUEST,
        params: { city: warehouse?.city?.id },
      });
      setDistrict(warehouse?.district);
      dispatch({
        type: ACTION_TYPE_ADDRESS.GET_WARD_LIST_REQUEST,
        params: { district: warehouse?.district?.id },
      });
      setWard(warehouse?.ward);
    }
  }, [dispatch, history, warehouse])

  useEffect(() => {
    if (country_id) {
      dispatch({
        type: ACTION_TYPE_ADDRESS.GET_CITY_LIST_REQUEST,
        params: { country: country_id },
      });
    }
  }, [dispatch, country_id])

  useEffect(() => {
    dispatch({
      type: ACTION_TYPE_ADDRESS.GET_COUNTRY_LIST_REQUEST,
      success: (response) => {
        let countryList = response?.data?.results;
        if (Array.isArray(countryList)) {
          let vi = countryList.find(item => item?.code === LANG_VI);
          setCountryId(vi?.id);
        }
      }
    })
    return () => {
      dispatch({
        type: ACTION_TYPE_ADDRESS.GET_COUNTRY_LIST_SUCCESS,
        payload: { results: [] }
      });
      dispatch({
        type: ACTION_TYPE_ADDRESS.GET_DISTRICT_LIST_SUCCESS,
        payload: { results: [] }
      });
      dispatch({
        type: ACTION_TYPE_ADDRESS.GET_WARD_LIST_SUCCESS,
        payload: { results: [] }
      });
    }
  }, [dispatch])

  const onChangeCity = (e, value) => {
    if (city?.id !== value?.id) {
      setCity(value);
      if (value?.id) {
        dispatch({
          type: ACTION_TYPE_ADDRESS.GET_DISTRICT_LIST_REQUEST,
          params: { city: value?.id },
          success: () => {
            setDistrict(districtDefault);
            setWard(wardDefault);
            dispatch({
              type: ACTION_TYPE_ADDRESS.GET_WARD_LIST_SUCCESS,
              payload: { results: [] }
            });
          }
        });
      } else {
        setDistrict(districtDefault);
        setWard(wardDefault);
      }
    }
  }
  const onChangeDistrict = (e, value) => {
    if (district?.id !== value?.id) {
      setDistrict(value);
      if (value?.id) {
        dispatch({
          type: ACTION_TYPE_ADDRESS.GET_WARD_LIST_REQUEST,
          params: { district: value?.id },
          success: () => {
            setWard(wardDefault);
          }
        })
      } else {
        setWard(wardDefault);
      }
    }
  }
  const onChangeWard = (e, value) => {
    if (ward?.id !== value?.id) {
      setWard(value);
    }
  }
  const getOptionSelected = (option, value) => option?.id === value?.id;
  const getOptionLabel = (option) => (option?.name || "");
  const renderInput = (params, placeholder) => {
    return (
      <OutlinedInput
        ref={params.InputProps.ref}
        inputProps={{
          ...params.inputProps,
          autoComplete: 'new-password',
        }}
        className="text-input"
        placeholder={placeholder}
        fullWidth
        endAdornment={params.InputProps.endAdornment}
      />
    )
  }

  const onSubmit = () => {
    if (isEmpty(code) || isEmpty(name) || !(phone_number?.length >= MIN_LENGTH_PHONE) ||
      !city?.id || !district?.id || !ward?.id || isEmpty(address) ||
      !isLat(lat) || !isLng(long)) {
      setSubmit(true);
      return;
    }
    dispatch({
      type: warehouse?.id ? ACTION_TYPE.EDIT_WAREHOUSE_REQUEST : ACTION_TYPE.ADD_WAREHOUSE_REQUEST,
      id: warehouse?.id,
      data: {
        code, name, phone_number, address, lat, country_id,
        city_id: city?.id,
        district_id: district?.id,
        ward_id: ward?.id,
        lng: long,
      },
      success: () => {
        refreshList instanceof Function && refreshList();
        history.push("/");
      }
    })
  }

  return (
    <Fragment>
      <div className="page-header">
        <div className="page-title">
          <Breadcrumbs>
            <Link to="/">Quản lý kho hàng</Link>
            <Typography>{warehouse?.id ? "Chỉnh sửa" : "Thêm mới"}</Typography>
          </Breadcrumbs>
        </div>
        <DefaultButton component={Link} to="/">Huỷ</DefaultButton>
        <PrimaryButton onClick={onSubmit}>Lưu lại</PrimaryButton>
      </div>
      <div className="page-content">
        <Box fontSize={16} fontWeight={600}>Kho hàng</Box>
        <Box my={2}>
          <Divider />
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <TextFields
              label="Mã kho hàng"
              required
              placeholder="Nhập mã kho hàng"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              error={submit && isEmpty(code)}
              helperText="Mã kho hàng được yêu cầu"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextFields
              label="Tên kho hàng"
              required
              placeholder="Nhập tên kho hàng"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={submit && isEmpty(name)}
              helperText="Tên kho hàng được yêu cầu"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextFields
              label="Số điện thoại"
              required
              placeholder="Nhập số điện thoại"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value.replace(REGEX_PHONE, ''))}
              error={submit && !(phone_number?.length >= MIN_LENGTH_PHONE)}
              helperText={isEmpty(phone_number) ? "Số điện thoại được yêu cầu" : ERROR_PHONE}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <TextFields
              label="Tỉnh/thành phố"
              required
              error={submit && !city}
              helperText="Tỉnh/thành phố được yêu cầu"
            >
              <Autocomplete
                style={{ width: "100%" }}
                getOptionSelected={getOptionSelected}
                getOptionLabel={getOptionLabel}
                options={cityList}
                renderInput={(params) => renderInput(params, "Chọn tỉnh/thành phố")}
                value={city}
                onChange={onChangeCity}
              />
            </TextFields>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextFields
              label="Quận/huyện"
              required
              error={submit && !district}
              helperText="Quận/huyện phố được yêu cầu"
            >
              <Autocomplete
                style={{ width: "100%" }}
                getOptionSelected={getOptionSelected}
                getOptionLabel={getOptionLabel}
                options={districtList}
                renderInput={(params) => renderInput(params, "Chọn quận/huyện")}
                value={district}
                onChange={onChangeDistrict}
              />
            </TextFields>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextFields
              label="Phường/xã"
              required
              error={submit && !ward}
              helperText="Phường/xã phố được yêu cầu"
            >
              <Autocomplete
                style={{ width: "100%" }}
                getOptionSelected={getOptionSelected}
                getOptionLabel={getOptionLabel}
                options={wardList}
                renderInput={(params) => renderInput(params, "Chọn phường/xã")}
                value={ward}
                onChange={onChangeWard}
              />
            </TextFields>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <TextFields
              label="Địa chỉ"
              required
              placeholder="Nhập địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={submit && isEmpty(address)}
              helperText="Địa chỉ được yêu cầu"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextFields
              label="Kinh độ"
              required
              placeholder="Nhập kinh độ"
              value={long}
              onChange={(e) => setLong(e.target.value)}
              error={submit && !isLng(long)}
              helperText={isEmpty(long) ? "Kinh độ được yêu cầu" : ERROR_LNG}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextFields
              label="Vĩ độ"
              required
              placeholder="Nhập vĩ độ"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              error={submit && !isLat(lat)}
              helperText={isEmpty(lat) ? "Vĩ độ được yêu cầu" : ERROR_LAT}
            />
          </Grid>
        </Grid>
      </div>
    </Fragment >
  )
}

export default AddEditWarehouse;