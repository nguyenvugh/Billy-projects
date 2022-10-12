import { errorPassword, isPassword } from "@ltp/utils/validate";
import { useEffect, useState } from "react";
import { updatePassword as _updatePassword } from "services/profile";

const __PASSWORD = {
  old_password: "",
  new_password: "",
  confirm_password: "",
  server: "",
};

const FIELD = {
  old_password: {
    label: "mật khẩu hiện tại",
  },
  new_password: {
    label: "mật khẩu mới",
  },
  confirm_password: {
    label: "xác nhận mật khẩu",
  },
};

const __POPUP = {
  title: "Đổi mật khẩu thành công",
  subTitle: "Đã đổi mật khẩu thành công",
  visible: false,
};

const useChangePassword = () => {
  const [password, setPassword] = useState(__PASSWORD);
  const [errors, setErrors] = useState(__PASSWORD);
  const [popup, setPopup] = useState(__POPUP);
  useEffect(() => {}, []);

  const updatePassword = async () => {
    try {
      const params = { ...password };

      delete params.confirm_password;
      delete params.server;

      await _updatePassword(params);

      setPopup({ ...__POPUP, visible: true });
      setPassword(__PASSWORD);
      setErrors(__PASSWORD);
    } catch (error) {
      setErrors({ server: error.message });
      setPopup({
        title: "Đổi mật khâu thất bại",
        subTitle: "Đổi mất mật khẩu thất bại, vui lòng thử lại sau.",
        visible: true,
      });
    }
  };
  const closePopup = () => {
    setPopup({
      title: "",
      subTitle: "",
      visible: false,
    });
  };

  const handleChangeFields = (field, event) => {
    setPassword((prevPassword) => ({
      ...prevPassword,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    const isValid = validateFields();
    if (!isValid) return;
    setErrors(__PASSWORD);
    updatePassword();
  };

  const validateFields = () => {
    const { new_password, confirm_password } = password;
    let isValid = true;
    const isEmpty = Object.keys(password).every((key) => {
      if (key == "server") return true;
      return password[key] && password[key].length > 0;
    });
    if (!isEmpty) {
      const emptyMessage = Object.keys(password).reduce(
        (obj, key) => ({
          ...obj,
          [key]: !password[key] && `Vui lòng nhập ${FIELD[key]?.label}`,
        }),
        {},
      );
      setErrors(emptyMessage);
      isValid = false;
    }

    if (new_password && !isPassword(new_password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        new_password: errorPassword,
      }));
      isValid = false;
    }

    if (confirm_password && new_password !== confirm_password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirm_password: "Mật khẩu và Mật khẩu xác nhận không giống nhau",
      }));
      isValid = false;
    }

    return isValid;
  };

  return {
    password,
    errors,
    popup,
    closePopup,
    handleChangeFields,
    handleSubmit,
  };
};

export default useChangePassword;
