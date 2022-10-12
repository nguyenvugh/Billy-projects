import { useAppUserContext } from "@ltp/components/context/auth";
import { keyCache } from "@ltp/constants/data";
import useTranslation from "@ltp/hooks/useTranslation";
import {
  facebookProvider,
  firebaseSocialLinking,
  googleProvider,
} from "@ltp/services/auth/socialAuth";
import { saveCache } from "@ltp/services/datacache";
import { uploadImage } from "@ltp/services/media-upload";
import { SOCIAL_ACTION_TYPES, SOCIAL_TYPES } from "@ltp/utils/constant";
import { formatDate } from "@ltp/utils/date";
import { isPhone } from "@ltp/utils/validate";
import { useEffect, useState } from "react";
import {
  createSocialAccount,
  getProfile as _getProfile,
  updateProfile as _updateProfile,
} from "services/profile";
// definition
const __PROFILE = {
  name: "",
  phone_number: "",
  birthday: "",
  email: "",
  sex: 0,
  avatar: {
    id: "",
    name: "",
    url: "",
    file: "",
  },
  customer_socials: [],
};

const __POPUP = {
  title: "Cập nhật thành công",
  subTitle: "Đã cập nhật thông tin cá nhân thành công!",
  visible: false,
};

const __POPUPEN = {
  title: "Update successfully",
  subTitle: "Updated personal information successfully!",
  visible: false,
};

const useGeneralInfo = () => {
  const { t, locale } = useTranslation();
  const { userContext, setUserContext } = useAppUserContext();
  const [errors, setErrors] = useState(__PROFILE);
  const [profile, setProfile] = useState(__PROFILE);
  const [popup, setPopup] = useState(locale === "vi" ? __POPUP : __POPUPEN);
  const [enableLinkingButton, setEnableLinkingButton] = useState(true);

  useEffect(() => {
    initialData();
  }, []);

  const initialData = () => {
    getProfile();
  };

  const checkSocialAccountValid = (socialType) => {
    if (profile.customer_socials.length == 0) return false;
    const isValid = profile.customer_socials.every((type) => type.social_type == socialType);
    return isValid;
  };

  const onGetSocialAccountLinking = async (
    socialType = SOCIAL_TYPES.GOOGLE,
    action = SOCIAL_ACTION_TYPES.CONNECT,
  ) => {
    try {
      setEnableLinkingButton(false);
      if (!enableLinkingButton) return;

      const isSocialTypeValid = Object.values(SOCIAL_TYPES).includes(socialType);
      if (!isSocialTypeValid) return;

      let provider;
      if (socialType === SOCIAL_TYPES.GOOGLE) provider = googleProvider;
      if (socialType === SOCIAL_TYPES.FACEBOOK) provider = facebookProvider;

      const request = await firebaseSocialLinking(provider);
      const response = await request;
      await linkToSocialAccount(socialType, action, response);
    } catch (error) {
      setEnableLinkingButton(true);
    }
  };

  const linkToSocialAccount = async (socialType, action, userCredentials) => {
    try {
      const params = {
        type: socialType,
        uid: userCredentials.user.uid,
        oauthIdToken: userCredentials.credential.idToken,
        oauthAccessToken: userCredentials.credential.accessToken,
        action,
      };
      const request = await createSocialAccount(params);
      const { data } = await request;

      const birthday = formatBirthday(data.birthday);
      const _data = { ...data, birthday };

      setProfile(_data);
      setEnableLinkingButton(true);
    } catch (error) {
      setEnableLinkingButton(true);
      setPopup({
        title: `${
          action === SOCIAL_ACTION_TYPES.CONNECT ? "Liên kết" : "Huỷ liên kết"
        } tài khoản thất bại`,
        subTitle: `${
          action === SOCIAL_ACTION_TYPES.CONNECT ? "Liên kết" : "Huỷ liên kết"
        } tài khoản ${String(socialType).toLocaleUpperCase()} thất bại, hãy thử lại sau.`,
        visible: true,
      });
    }
  };

  const getProfile = async () => {
    try {
      const request = await _getProfile();
      const { status, data } = await request;
      if (status >= 200 && status < 300) {
        const birthday = formatBirthday(data.birthday);
        const _data = { ...data, birthday };
        setProfile(_data);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const updateProfile = async () => {
    try {
      const imageId = await (await uploadImage(profile.avatar.file, profile.avatar.id)).id;
      const params = formatParams(imageId, profile);
      const request = await _updateProfile({ ...params, sex: +params.sex });
      const { data } = request;
      const userDate = { ...userContext, ...data };
      saveCache(keyCache.UserInfo, userDate);
      setUserContext(userDate);
      if (locale === "vi") {
        setPopup({
          ...__POPUP,
          visible: true,
        });
      } else {
        setPopup({
          ...__POPUPEN,
          visible: true,
        });
      }
    } catch (error) {
      setPopup({
        title: t("updateFail"),
        subTitle: t("updatePersonalInfoFail"),
        visible: true,
        error: true,
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

  const formatBirthday = (birthday) => {
    if (!birthday) return null;
    const [day, month, year] = birthday.split("/");
    return `${year}-${month}-${day}`;
  };

  const formatParams = (imageId, _params) => {
    const params = { ..._params };
    const birthday = formatDate(params.birthday);

    delete params.status;
    delete params.avatar;
    delete params.customer_socials;

    params.birthday = birthday;
    params.avatar_id = imageId;

    return params;
  };

  const handleChangeField = (field, value) => {
    switch (field) {
      case "avatar":
        setProfile((prevProfile) => ({
          ...prevProfile,
          [field]: {
            url: value.base64,
            file: value.file,
          },
        }));
        break;

      default:
        setProfile((prevProfile) => ({ ...prevProfile, [field]: value }));
        if (field === "phone_number") {
          if (isPhone(value)) {
            setErrors((prevState) => ({
              ...prevState,
              phone_number: "",
            }));
          }
        }
        if (field === "name") {
          if (value.length >= 2) {
            setErrors((prevState) => ({
              ...prevState,
              name: "",
            }));
          }
        }
        break;
    }
  };

  const validateFields = () => {
    let isValid = true;
    const exceptFields = ["avatar", "sex", "customer_socials", "status"];
    const isEmpty = Object.keys(profile).every((key) => {
      if (exceptFields.includes(key)) return true;
      if (key == "birthday" && profile[key] == "undefined-undefined-undefined") return false;
      return profile[key] && String(profile[key]).length > 0;
    });
    if (!isEmpty) {
      isValid = false;
    }
    if (profile.name?.length < 2) {
      setErrors((prevState) => ({
        ...prevState,
        name: !profile.name ? t("fullNameRequired") : t("fullNameExceed"),
      }));
      isValid = false;
    }
    if (!isPhone(profile.phone_number)) {
      setErrors((prevState) => ({
        ...prevState,
        phone_number: !profile.phone_number ? t("phoneIsRequired") : t("phoneIsInvalid"),
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    const isValid = validateFields();
    if (!isValid) return;
    updateProfile();
  };

  return {
    enableLinkingButton,
    profile,
    errors,
    popup,
    closePopup,
    handleSubmit,
    handleChangeField,
    checkSocialAccountValid,
    onGetSocialAccountLinking,
  };
};

export default useGeneralInfo;
