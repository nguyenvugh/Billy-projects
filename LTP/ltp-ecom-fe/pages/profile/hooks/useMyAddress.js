import useTranslation from "@ltp/hooks/useTranslation";
import { isPhone } from "@ltp/utils/validate";
import { useEffect, useState } from "react";
import {
  createMyAddress,
  deleteMyAddress,
  getMyAddress,
  updateAddressDefault,
  updateMyAddress,
} from "services/profile";

const EMPTY_MESSAGE_ERROR = {
  name: "Vui lòng nhập tên người nhận",
  phone: "Vui lòng nhập số điện thoại",
  address: "Vui lòng nhập địa chỉ",
  city: "Vui lòng chọn tỉnh/thành phố",
  district: "Vui lòng chọn quận/huyện",
  ward: "Vui lòng chọn phường/xã",
};
const __ADDRESS = {
  name: "",
  alias: "",
  phone: "",
  address: "",
  country: "",
  city: "",
  district: "",
  ward: "",
};

const __POPUP = {
  title: "Khởi tạo thành công",
  subTitle: "Đã thêm địa chỉ mới thành công!",
  textButton: "Ok",
  type: "success",
  visible: false,
};
const __POPUPEN = {
  title: "Successfully added",
  subTitle: "New address added successfully!",
  textButton: "Ok",
  type: "success",
  visible: false,
};
const useMyAddress = (props) => {
  const { t, locale } = useTranslation();
  const [addressList, setAddressList] = useState(null);
  const [form, setForm] = useState(__ADDRESS);
  const [errors, setErrors] = useState(__ADDRESS);
  const [shouldCallApi, setShouldCallApi] = useState(false);
  const [popup, setPopup] = useState(locale === "vi" ? __POPUP : __POPUPEN);
  useEffect(() => {
    initialData();
  }, []);

  useEffect(() => {
    setShouldCallApi(false);

    if (!shouldCallApi) return;

    const isValid = validateForm();
    if (!isValid) return;

    props?.address?.id ? updateAddress() : createAddress();
  }, [shouldCallApi]);

  const initialData = () => {
    getMyAddresses();
    setForm((prevState) => ({
      ...prevState,
      name: props?.address?.name || "",
      phone: props?.address?.phone_number || "",
      address: props?.address?.address || "",
      alias: props?.address?.alias || "",
    }));
  };

  const getMyAddresses = async () => {
    try {
      const request = await getMyAddress();
      const { data } = await request;
      setAddressList(data.results);
    } catch (error) {
      throw new Error(error);
    }
  };

  const createAddress = async () => {
    try {
      const { name, alias, phone, address, country, city, district, ward } = form;
      const params = {
        name,
        alias,
        address,
        phone_number: phone,
        countryId: country,
        cityId: city,
        districtId: district,
        wardId: ward,
      };
      await createMyAddress(params);
      props.successCallback && props.successCallback({ isCreate: true, isSuccess: true });
    } catch (error) {
      showPopup(true, false);
    }
  };

  const updateAddress = async () => {
    try {
      if (!props?.address?.id) return;
      const { name, alias, phone, address, country, city, district, ward } = form;
      const params = {
        id: !props?.address?.id,
        name,
        alias,
        address,
        phone_number: phone,
        countryId: country,
        cityId: city,
        districtId: district,
        wardId: ward,
      };
      await updateMyAddress(props?.address?.id, params);
      props.successCallback && props.successCallback({ isCreate: false, isSuccess: true });
    } catch (error) {
      showPopup(false, false);
    }
  };

  const deleteAddress = async (id) => {
    try {
      if (!id) return;
      await deleteMyAddress(id);
      await getMyAddresses();
    } catch (error) {
      throw new Error(error);
    }
  };

  const updateMyAddressDefault = async (id) => {
    try {
      if (!id) return;
      await updateAddressDefault(id);
    } catch (error) {
      throw new Error(error);
    }
  };

  const showPopup = (isCreate = true, isSuccess = true) => {
    isSuccess &&
      setPopup((prevState) => ({
        ...prevState,
        title: isCreate ? __POPUP.title : t("updateSuccess"),
        type: isSuccess ? "success" : "fail",
        visible: true,
      }));

    !isSuccess &&
      setPopup((prevState) => ({
        ...prevState,
        title: isCreate ? "Khởi tạo thất bại" : "Cập nhật thất bại",
        subTitle: isCreate ? "Thêm địa chỉ mới thất bại!" : "Cập nhật địa chỉ mới thất bại!",
        type: isSuccess ? "success" : "fail",
        visible: true,
      }));
  };

  const hidePopup = () => {
    setPopup((prevState) => ({ ...prevState, visible: false }));
  };

  const handleChangeField = (field, event) => {
    const { value } = event.target;
    setForm((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleClickConfirm = async (addressId) => {
    setForm((prevState) => ({ ...prevState, ...addressId }));
    setShouldCallApi(true);
  };

  const validateForm = () => {
    let isValid = true;
    const exceptFields = ["alias"];
    const isEmpty = Object.keys(form).every((key) => {
      if (exceptFields.includes(key)) return true;
      return form[key] && String(form[key]).length > 0;
    });

    if (!isEmpty) {
      const errorMessages = Object.keys(form).reduce((obj, key) => {
        if (exceptFields.includes(key)) return { ...obj, [key]: true };
        return { ...obj, [key]: !form[key] && EMPTY_MESSAGE_ERROR[key] };
      }, {});
      setErrors(errorMessages);
      isValid = false;
    }

    if (form.phone && !isPhone(form.phone)) {
      setErrors((prevState) => ({
        ...prevState,
        phone: "Số điện thoại không hợp lệ",
        phone_en: "An invalid phone number",
      }));
      isValid = false;
    }
    return isValid;
  };

  return {
    addressList,
    errors,
    popup,
    showPopup,
    getMyAddresses,
    updateMyAddressDefault,
    deleteAddress,
    hidePopup,
    handleClickConfirm,
    handleChangeField,
  };
};

export default useMyAddress;
