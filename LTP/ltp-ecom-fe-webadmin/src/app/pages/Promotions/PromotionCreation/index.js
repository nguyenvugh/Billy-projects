import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  makeStyles,
  Paper,
} from "@material-ui/core";
import ImagePicker from "app/components/ImagePicker";
import AlertModal from "app/components/AlertModal";
import {
  createPromotion as _createPromotion,
  updatePromotion as _updatePromotion,
} from "app/services/promotion";
import LanguageSelector from "app/components/LanguageSelector";
import { getProductList as _getProductList } from "app/services/flashsale";
import { formatVND, isNumeric, numberWithCommas } from "app/utils/common";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CalendarPicker from "../../../components/CalendarPicker";
import Autocomplete from "../components/Autocomplete";
import Breadcrumbs from "../components/Breadcrumbs";
import Input from "../components/Input";
import Select from "../components/Select";
import Switch from "../components/Switch";
import Textarea from "../components/Textarea";
import {
  LABELS_EN,
  LABELS_VI,
  promotionForms,
  PROMOTION_EN_TYPES,
  PROMOTION_TYPES,
} from "../definition";
import { apiUploadImage } from "app/axios/urlApi";
import { postImage } from "app/services/axios";
import { formatDateTime, isEmpty } from "app/utils/validate";
import { urlPromotion } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import TextFields from "app/components/TextFields";

const checkBreadCrumbs = (isEdit, id) => {
  let breadcrumbs = [
    {
      href: isEdit ? "/promotions/create" : `/promotions/edit/${id}`,
      label: isEdit ? "Chỉnh sửa" : "Thêm mới",
    },
  ];
  if (isEdit) {
    breadcrumbs = [
      {
        href: isEdit ? `/promotions/${id}` : urlPromotion,
        label: isEdit ? "Chi tiết văn phòng" : "",
      },
      {
        href: isEdit ? "/promotions/create" : `/promotions/edit/${id}`,
        label: isEdit ? "Chỉnh sửa" : "Thêm mới",
      },
    ];
  }
  return breadcrumbs;
};
function PromotionCreation({ match }) {
  const classes = useStyles();
  const id = match.params.id;
  const history = useHistory();
  const { state } = useLocation();

  const [productList, setProductList] = useState([]);
  const [error, setError] = useState(promotionForms[PROMOTION_TYPES[2]]);
  const [form, setForm] = useState(null);
  const [enForm, setEnForm] = useState(null);
  const [languageCode, changeLanguageCode] = useState("vi");

  const [modal, setModal] = useState({
    title: "",
    visible: false,
  });

  // fields
  const [labels, setLabels] = useState(LABELS_VI);

  // boolean
  const isEdit = history.location.pathname.includes("/promotions/edit");
  const [isOpenImagePicker, setIsOpenImagePicker] = useState(false);
  const isVietnamese = languageCode == "vi";
  const _form = isVietnamese ? form : enForm;
  const isCampaignType = isVietnamese
    ? form && PROMOTION_TYPES[form.promo_type] == PROMOTION_TYPES[1]
    : form && PROMOTION_EN_TYPES[form.promo_type] == PROMOTION_EN_TYPES[1];

  const breadcrumbs = checkBreadCrumbs(isEdit, id);

  useEffect(() => {
    setInitialData();
  }, []);

  useEffect(() => {
    handleSwitchLanguage();
  }, [languageCode]);

  const uploadImage = async (image) => {
    try {
      if (image instanceof Blob) {
        const formData = new FormData();
        formData.append("file", image);
        const request = await postImage(apiUploadImage, formData);
        const response = await request;

        if (response) {
          return response.id;
        }
        return;
      }
      return state.defaultData.promo_imageId;
    } catch (error) {
      console.error("[Promotion] uploadImage", error);
    }
  };

  const getProductList = async () => {
    try {
      const request = await _getProductList();
      const { data } = await request.data;
      const listStructure =
        data.length > 0
          ? data.map((item) => ({
              id: item.id,
              title: item.translates[0].name,
              price: item.price,
            }))
          : [];
      setProductList(listStructure);
    } catch (error) {
      console.log(error);
    }
  };

  const setEditData = () => {
    if (!state.defaultData) return;
    const {
      promo_type,
      promo_name,
      promo_button,
      promo_startDate,
      promo_endDate,
      promo_description,
      promo_image,
      promo_active,
      promo_product,
      promo_price,
      promo_discount,
      promo_reducePrice,
      promo_reducedPrice,
      promo_productId,
      promo_link,
    } = state.defaultData;
    const commonStructure = {
      promo_startDate,
      promo_endDate,
      promo_image,
      promo_type,
      promo_active,
      promo_name: promo_name.vi,
      promo_button: promo_button.vi,
      promo_description: promo_description.vi,
    };

    if (PROMOTION_TYPES[promo_type] == PROMOTION_TYPES[1]) {
      const campaignStructure = {
        ...commonStructure,
        promo_link,
      };
      setForm(campaignStructure);
      setEnForm({
        ...campaignStructure,
        promo_name: promo_name.en,
        promo_button: promo_button.en,
        promo_description: promo_description.en,
      });
      return;
    }

    const productStructure = {
      ...commonStructure,
      promo_product: promo_product.vi,
      promo_productId,
      promo_price,
      promo_discount,
      promo_reducePrice,
      promo_reducedPrice,
    };
    setForm(productStructure);
    setEnForm({ ...productStructure, promo_product: promo_product.en });
  };

  const setInitialData = () => {
    getProductList();

    if (isEdit) {
      setEditData();
    } else {
      handleChangeFormType(2);
    }
  };

  const handleSwitchLanguage = () => {
    setLabels(isVietnamese ? LABELS_VI : LABELS_EN);
    fillForm();
  };

  const fillForm = () => {
    if (!form) return;
    if (isVietnamese) {
      const tmpForm = { ...form };
      tmpForm.promo_name = form.promo_name || "";
      tmpForm.promo_button = form.promo_button || "";
      tmpForm.promo_description = form.promo_description || "";

      if (isCampaignType) {
        tmpForm.promo_link = form.promo_link || "";
      }
      setForm(tmpForm);
      return;
    }
    const tmpForm = { ...form };
    tmpForm.promo_name = enForm.promo_name || "";
    tmpForm.promo_button = enForm.promo_button || "";
    tmpForm.promo_description = enForm.promo_description || "";

    if (isCampaignType) {
      tmpForm.promo_link = enForm.promo_link || "";
    }
    setEnForm(tmpForm);
  };

  const handleChange = (key, value) => {
    switch (key) {
      case "promo_link":
        setForm((prevForm) => ({ ...form, [key]: value.trim() }));
        break;
      case "promo_active":
        setForm((prevForm) => ({ ...prevForm, [key]: value }));
        break;
      case "promo_discount":
        calcDiscount(form.promo_price, value);
        break;
      case "promo_type":
        handleChangeFormType(value);
        break;
      case "promo_image":
        setForm((prevForm) => ({ ...prevForm, [key]: value }));
        break;
      case "promo_product":
        if (!value || !value.title) return;
        if (isVietnamese) {
          setForm((prevState) => ({
            ...form,
            promo_product: value.title,
            promo_price: value.price || prevState.promo_price,
            promo_productId: value.id || prevState.promo_productId,
          }));
        } else {
          setEnForm((prevState) => ({
            ...form,
            promo_product: value.title,
            promo_price: value.price || prevState.promo_price,
            promo_productId: value.id || prevState.promo_productId,
          }));
        }

        calcDiscount(value.price, form.promo_discount);
        break;
      default:
        if (isVietnamese) {
          setForm((prevForm) => ({ ...form, [key]: value.trim() }));
          return;
        }
        setEnForm((prevForm) => ({ ...enForm, [key]: value.trim() }));
        break;
    }
  };

  const handleSave = () => {
    const isValid = validationForm();
    if (!isValid) return;
    isEdit ? updatePromotion() : createPromotion();
  };

  const handleCancel = () => {
    history.push(urlPromotion);
  };

  const createPromotion = async () => {
    try {
      const imageId = await uploadImage(form.promo_image);
      const params = formatParams(imageId);
      const request = await _createPromotion(params);
      history.push(urlPromotion);
    } catch (error) {
      errorApi(error.response.data.errorCode);
    }
  };

  const updatePromotion = async () => {
    try {
      const imageId = await uploadImage(form.promo_image);
      const params = formatParams(imageId);
      const updateParams = {
        ...params,
        id: Number(id),
      };
      const request = await _updatePromotion(match.params.id, updateParams);
      const response = await request.data;
      history.replace(urlPromotion);
    } catch (error) {
      errorApi(error.response.data.errorCode);
    }
  };

  const errorApi = (errorCode) => {
    let errorText = "";
    switch (errorCode) {
      case "slider::011":
        errorText = "Sản phẩm đang giảm giá trong chương trình khác";
        break;

      default:
        errorText = "Không thể tạo sản phẩm";
        break;
    }
    setModal({
      title: errorText,
      visible: true,
    });
  };

  const handleChangeFormType = (type) => {
    const formType = {
      ...promotionForms[PROMOTION_TYPES[type]],
      promo_type: type,
    };

    setForm({
      ...formType,
      promo_image: form?.promo_image || "",
      promo_startDate: form?.promo_startDate || "",
      promo_endDate: form?.promo_endDate || "",
    });
    setEnForm(formType);
    setError(formType);
  };

  const handleCloseModal = () => {
    setModal({ title: "", visible: false });
  };

  const formatParams = (imageId) => {
    const structContentParams = (
      language_code,
      language_field,
      language_value
    ) => ({ language_code, language_field, language_value });
    const convertDateTime = (dateTime) => {
      const date = dateTime.split(" ")[0].split("/").join("-");
      const time = dateTime.split(" ")[1];
      return { date, time };
    };
    const params = {
      thumbnail_id: imageId,
      type: form.promo_type,
      product_id: form.promo_productId,
      percentage: Number(form.promo_discount),
      is_active: +form.promo_active,
      link: form.promo_link,
      start_date: convertDateTime(formatDateTime(form.promo_startDate, false))
        .date,
      end_date: convertDateTime(formatDateTime(form.promo_endDate, false)).date,
      start_time: convertDateTime(formatDateTime(form.promo_startDate, false))
        .time,
      end_time: convertDateTime(formatDateTime(form.promo_endDate, false)).time,
      contents: [
        structContentParams("vi", "name", form.promo_name),
        structContentParams("vi", "description", form.promo_description),
        structContentParams("vi", "create_by", "admin"),
        structContentParams("vi", "button", form.promo_button),
        structContentParams(
          "en",
          "name",
          isEmpty(enForm.promo_name) ? form.promo_name : enForm.promo_name
        ),
        structContentParams(
          "en",
          "description",
          isEmpty(enForm.promo_description)
            ? form.promo_description
            : enForm.promo_description
        ),
        structContentParams("en", "create_by", "admin"),
        structContentParams(
          "en",
          "button",
          isEmpty(enForm.promo_button) ? form.promo_button : enForm.promo_button
        ),
      ],
    };

    if (isCampaignType) {
      params.percentage = 10;
      delete params.product_id;
    } else {
      delete params.link;
    }
    return params;
  };

  function calcDiscount(price, discount = 0, isSetForm = true) {
    let productDiscount = discount;
    const isValidNumber = isNumeric(productDiscount || 0);
    if (!isValidNumber) return;
    if (parseInt(productDiscount) > 100) {
      productDiscount = "100";
    } else {
      productDiscount = discount;
    }

    let priceReduce = price * (productDiscount / 100);
    let priceReduced = price - priceReduce;

    isSetForm &&
      setForm((prevState) => ({
        ...prevState,
        promo_discount: productDiscount,
        promo_reducePrice:
          (price && priceReduce) || prevState.promo_reducePrice,
        promo_reducedPrice:
          (price && priceReduced) || prevState.promo_reducedPrice,
      }));

    return {
      promo_price: productDiscount,
      promo_reducePrice: price && priceReduce,
      promo_reducedPrice: price && priceReduced,
    };
  }

  const validationForm = () => {
    let isValid = true;
    const campaignTypeRule = (key) =>
      key == "promo_name" ||
      key == "promo_type" ||
      key == "promo_active" ||
      key == "promo_productId" ||
      key == "promo_button" ||
      key == "promo_link" ||
      key == "promo_description";
    const productTypeRule = (key) =>
      key == "promo_name" ||
      key == "promo_type" ||
      key == "promo_active" ||
      key == "promo_productId" ||
      key == "promo_button" ||
      key == "promo_link" ||
      key == "promo_description";

    const isEmpty = Object.keys(form).every((key, val, arr) => {
      if (isCampaignType) if (campaignTypeRule(key)) return true;
      if (productTypeRule(key)) return true;
      return form[key] && String(form[key]).length > 0;
    });

    if (!isEmpty) {
      const emptyFields = Object.keys(form).reduce((obj, key, index) => {
        if (isCampaignType)
          if (campaignTypeRule(key)) return { ...obj, [key]: true };
        if (productTypeRule(key)) return { ...obj, [key]: true };
        return {
          ...obj,
          [key]:
            !form[key] &&
            `${labels[key].label} ${
              isVietnamese ? "được yêu cầu" : "required"
            }`,
        };
      }, {});
      setError(emptyFields);
      isValid = false;
    }

    if (new Date(form.promo_startDate) > new Date(form.promo_endDate)) {
      setError((prevState) => ({
        ...prevState,
        promo_endDate: isVietnamese
          ? "Ngày kết thúc không hợp lệ"
          : "Invalid end date",
      }));
      isValid = false;
    }
    if (form.promo_discount > 100) {
      setError((prevState) => ({
        ...prevState,
        promo_discount: "Phần trăm giảm không hợp lệ",
      }));
      isValid = false;
    }

    return isValid;
  };

  const renderForm = () => {
    if (isCampaignType) return renderCampaignForm();
    return renderProductForm();
  };

  const renderCampaignForm = () => {
    return (
      <Grid container item xs={12} spacing={3}>
        <Grid item xs>
          <Input
            error={error.promo_link}
            onChange={(val) => handleChange("promo_link", val)}
            placeholder={labels.promo_link.placeholder}
            labelName={labels.promo_link.label}
            defaultValue={form.promo_link}
          />
        </Grid>

        <Grid item xs>
          <Input
            error={error.promo_button}
            onChange={(val) => handleChange("promo_button", val)}
            placeholder={labels.promo_button.label}
            labelName={labels.promo_button.placeholder}
            defaultValue={
              isVietnamese ? form.promo_button : enForm.promo_button
            }
          />
        </Grid>
      </Grid>
    );
  };

  const renderProductForm = () => {
    return (
      <>
        <Grid container item xs={12} spacing={4}>
          <Grid item xs>
            <Autocomplete
              required
              error={error.promo_product}
              defaultValue={form.promo_product}
              data={productList}
              id="product"
              labelName={labels.promo_product.label}
              placeholder={labels.promo_product.placeholder}
              onChange={(val) => handleChange("promo_product", val)}
            />
          </Grid>

          <Grid item xs>
            <Input
              error={error.promo_button}
              onChange={(val) => handleChange("promo_button", val)}
              labelName={labels.promo_button.label}
              placeholder={labels.promo_button.placeholder}
              defaultValue={
                isVietnamese ? form.promo_button : enForm.promo_button
              }
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} spacing={4}>
          <Grid item xs>
            <Input
              required
              readOnly
              error={error.promo_price}
              id="price"
              defaultValue={
                form.promo_price && formatVND(form.promo_price, false)
              }
              labelName={labels.promo_price.label}
              placeholder={labels.promo_price.placeholder}
              type="number"
              inputSuffix="VND"
              onChange={(val) => handleChange("promo_price", val)}
            />
          </Grid>

          <Grid item xs>
            <TextFields
              label="Phần trăm giảm"
              required
              placeholder="Nhập %"
              endAdornment={
                <InputAdornment position="end">
                  <Box color="#3A3A3A" fontWeight="bold">
                    %
                  </Box>
                </InputAdornment>
              }
              value={form.promo_discount || ""}
              onChange={(e) => handleChange("promo_discount", e.target.value)}
              error={error.promo_discount}
              inputProps={{ maxLength: 5 }}
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} spacing={4}>
          <Grid item xs>
            <Input
              required
              readOnly
              id="reduce"
              error={error.promo_reducePrice}
              defaultValue={
                form.promo_reducePrice &&
                numberWithCommas((form.promo_reducePrice | 0).toFixed())
              }
              labelName={labels.promo_reducePrice.label}
              placeholder={labels.promo_reducePrice.placeholder}
              type="number"
              inputSuffix="VND"
              onChange={(val) => handleChange("promo_priceReduce", val)}
            />
          </Grid>

          <Grid item xs>
            <Input
              required
              readOnly
              id="reduced"
              error={error.promo_reducedPrice}
              defaultValue={numberWithCommas(
                (form.promo_reducedPrice | 0).toFixed()
              )}
              labelName={labels.promo_reducedPrice.label}
              type="number"
              placeholder={labels.promo_reducedPrice.placeholder}
              inputSuffix="VND"
              onChange={(val) => handleChange("promo_priceReduced", val)}
            />
          </Grid>
        </Grid>
      </>
    );
  };

  if (!form) return null;

  return (
    <div className={classes.root}>
      <Grid
        container
        alignItems="center"
        spacing={2}
        className={classes.header}
      >
        <div>
          <Breadcrumbs links={breadcrumbs} />
        </div>
        <div>
          <Button
            variant="outlined"
            classes={{
              root: classes.cancelButton,
              label: classes.labelCancelButton,
            }}
            onClick={handleCancel}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSave}
            disableElevation
            variant="contained"
            classes={{
              root: classes.saveButton,
              label: classes.labelSaveButton,
            }}
          >
            Lưu lại
          </Button>
        </div>
      </Grid>
      <Paper elevation={0} className={classes.inner}>
        <div className={classes.nav}>
          <h5 className={classes.title}>Promotion slider</h5>
          <LanguageSelector onChange={changeLanguageCode} />
        </div>
        <Divider />

        <Grid container spacing={4} style={{ marginTop: 12 }}>
          <Grid item xs={8}>
            {/* 1 */}
            <Grid container item xs={12} spacing={4}>
              <Grid item xs>
                <Select
                  data={isVietnamese ? PROMOTION_TYPES : PROMOTION_EN_TYPES}
                  defaultValue={
                    isVietnamese
                      ? PROMOTION_TYPES[form.promo_type]
                      : PROMOTION_EN_TYPES[form.promo_type]
                  }
                  error={error.promo_type}
                  onChange={({ value, index }) =>
                    handleChange("promo_type", index)
                  }
                  placeholder={form.promo_type}
                  labelName={labels.promo_type.label}
                />
              </Grid>

              <Grid item xs>
                <Input
                  onChange={(val) => handleChange("promo_name", val)}
                  labelName={labels.promo_name.label}
                  placeholder={labels.promo_name.placeholder}
                  defaultValue={
                    isVietnamese ? form.promo_name : enForm.promo_name
                  }
                />
              </Grid>
            </Grid>

            {renderForm()}

            <Grid
              container
              item
              xs={12}
              spacing={4}
              style={{ position: "relative" }}
            >
              <Grid item xs>
                <Textarea
                  labelName={labels.promo_description.label}
                  placeholder={labels.promo_description.placeholder}
                  defaultValue={
                    isVietnamese
                      ? form.promo_description
                      : enForm.promo_description
                  }
                  onChange={(val) => handleChange("promo_description", val)}
                />
              </Grid>
            </Grid>
            {/* 2 */}
            <Grid
              container
              item
              xs={12}
              spacing={4}
              style={{ position: "relative" }}
            >
              <Grid item xs>
                <CalendarPicker
                  required
                  displayValue={formatDateTime(form.promo_startDate)}
                  labelName={labels.promo_startDate.label}
                  placeholder={labels.promo_startDate.placeholder}
                  type="datetime-local"
                  error={error.promo_startDate}
                  defaultValue={form.promo_startDate}
                  onChange={(val) => handleChange("promo_startDate", val)}
                />
              </Grid>
              <span className={classes.chain} />
              <Grid item xs>
                <CalendarPicker
                  error={error.promo_endDate}
                  displayValue={formatDateTime(form.promo_endDate)}
                  placeholder={labels.promo_endDate.placeholder}
                  type="datetime-local"
                  defaultValue={form.promo_endDate}
                  onChange={(val) => handleChange("promo_endDate", val)}
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              spacing={4}
              style={{ position: "relative" }}
            >
              <Grid item xs>
                <Switch
                  checked={form.promo_active}
                  labelName={labels.promo_active.label}
                  onChange={(val) => handleChange("promo_active", val)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs>
            <ImagePicker
              required
              labelName={labels.promo_image.label}
              error={error.promo_image}
              isOpen={isOpenImagePicker}
              uploadTitle={labels.promo_image.placeholder.split("/")[0]}
              uploadDesc={labels.promo_image.placeholder.split("/")[1]}
              onChange={(val) =>
                handleChange("promo_image", val?.target?.files[0] || "")
              }
              defaultValue={form.promo_image}
            />
          </Grid>
        </Grid>
      </Paper>

      <AlertModal title="Lỗi" isOpen={modal.visible} onClose={handleCloseModal}>
        <span>{modal.title}</span>
      </AlertModal>
    </div>
  );
}

PromotionCreation.defaultProps = {};

PromotionCreation.propTypes = {
  defaultData: PropTypes.shape({
    id: PropTypes.string,
    promotion_name: PropTypes.string,
    promotion_thumbnail: PropTypes.string,
    promotion_type: PropTypes.string,
    promotion_description: PropTypes.string,
    promotion_fromDate: PropTypes.string,
    promotion_toDate: PropTypes.string,
    promotion_createBy: PropTypes.string,
    promotion_status: PropTypes.string,
    promotion_link: PropTypes.string,
    promotion_showDate: PropTypes.string,
  }),
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 12,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    margin: "16px 0",
    "& > div": {
      display: "flex",
      flexDirection: "row",
      minWidth: 200,
      "& button": {
        width: "auto",
        padding: "5px 36px",
        display: "inline-block",
        marginRight: "10px",
      },
    },
  },
  inner: {
    padding: "16px 24px",
    marginTop: 14,
  },
  nav: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: "16px",
    fontWeight: 400,
    color: "#0000000",

    margin: "12px 0",
  },
  cancelButton: {
    width: "100%",
    backgroundColor: "#ffffff",
  },
  labelCancelButton: {
    fontSize: "14px",
    fontWeight: 600,
    textTransform: "capitalize",
  },
  saveButton: {
    width: "100%",
    backgroundColor: "#3952D3",
  },
  labelSaveButton: {
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 600,
    textTransform: "capitalize",
  },
  chain: {
    display: "flex",
    width: "10px",
    height: "2px",
    backgroundColor: "#000000",

    position: "absolute",
    top: 65,
    left: "calc(50% - 5px)",
  },
  editorContainer: {
    margin: 0,
  },
  editImageButton: {
    display: "flex",
    margin: "12px auto 0",
  },
  editImageLabelButton: {
    fontSize: "14px",
    fontWeight: 400,
    color: "#007BFF",
    textTransform: "capitalize",
  },
}));

export default PromotionCreation;
