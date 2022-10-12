/* eslint-disable react-hooks/exhaustive-deps */
import {
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import usFlag from "app/assets/us.png";
import viFlag from "app/assets/vi.png";
import {
  PRODUCT_SCREEN_CREATION_MODE,
  PRODUCT_SCREEN_EDIT_MODE,
} from "app/constants/products";
import Input from "app/pages/Stores/components/Input";
import {
  addNewCate,
  getProductCategory,
  postImage,
  updateCate,
} from "app/services/axios";
import { LANG_EN, LANG_VI } from "app/utils/constant";
import { isEmpty, isValidUrlSlug } from "app/utils/validate";
import lodash from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import * as AppURL from "../../../services/urlAPI";
import * as Utils from "../../../utils";
import Content from "./components/Content";
import PhotosBox from "./components/PhotosBox";
import ThumbnailBox from "./components/ThumbnailBox";
import Toolbar from "./components/Toolbar";
import { initialState, ProductCreationContext, reducer } from "./context";

const useStyles = makeStyles((theme) => ({
  main: {
    padding: "20px",
    backgroundColor: "#ffffff",
  },
  grid: {
    padding: "10px 0",
    // fontSize: '14px'
  },
  gridItemLeft: {
    padding: "0px 10px 0px 0px",
    margin: "auto",
  },
  gridItemRight: {
    padding: "0px 0px 0px 10px",
  },
  featureProductCount: {
    color: "#ED0017",
    fontWeight: "italic",
  },
  thumbnail: {
    padding: "0px 0px 0px 20px",
  },
  notetxt: {
    fontStyle: "italic",
    color: "#ED0017",
    fontSize: "12px",
  },
  imgFlag: {
    width: "20px",
    height: "14px",
    marginRight: "5px",
  },
}));

const creationFormErrorMessagesInitialState = {
  product_code: "",
  product_status: "",
  product_name: "",
  product_name_en: "",
  product_quantity: "",
  product_category: "",
  product_price: "",
  short_desc: "",
  short_desc_en: "",
  product_description: "",
  product_description_en: "",
  product_thumbnail: "",
  is_feature: "",
  contact_nlt: "",
  size: "",
  weight: "",
  product_slug: "",
  product_slug_en: "",
  title_seo: "",
  description_seo: "",
  title_seo_en: "",
  description_seo_en: "",
  redirect_slug_302: "",
  redirect_slug_302_en: "",
  redirect_slug: "",
  redirect_slug_en: "",
};

export default function ProductCreation() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const [state, dispatch] = useReducer(reducer, initialState);
  const [mode, setMode] = useState(PRODUCT_SCREEN_CREATION_MODE);
  const [creationFormErrorMessages, setCreationFormErrorMessages] = useState(
    lodash.cloneDeep(creationFormErrorMessagesInitialState)
  );
  const [fileThumbnail, setFileThumbnail] = useState(null);
  const [listChildCate, setListChildCate] = useState([]);
  const [currentParent, setCurrentParent] = useState("");
  const [totalFeatures, setTotalFeatures] = useState(0);
  const [featureIsUpdated, setFeatureIsUpdated] = useState(false);
  const [lan, setLan] = useState("vi");
  const [product, setProduct] = useState();

  useEffect(async () => {
    try {
      await getProductCategory(AppURL.getAllChildProductCategory).then(
        (res) => {
          const results = Utils.getSafeValue(res, "results", []);
          setListChildCate(results);
        }
      );
      const getFeaturesUrl = Utils.replaceStrUrl(
        AppURL.getAllFeaturedProducts,
        [100]
      );
      await getProductCategory(getFeaturesUrl).then((res) => {
        const numFeatures = Utils.getSafeValue(res, "total", 0);
        setTotalFeatures(numFeatures);
      });
    } catch (error) {
      console.log(error);
    }

    if (id) {
      setMode(PRODUCT_SCREEN_EDIT_MODE);
      try {
        const url = Utils.replaceStrUrl(AppURL.getProductDetail, [id]);
        await getProductCategory(url).then(async (res) => {
          const result = await getProductCategory(
            AppURL.getAllChildProductCategory
          );
          const results = Utils.getSafeValue(result, "results", []);
          setListChildCate(results);
          const id = Utils.getSafeValue(res, "id", 0);
          const product_code = Utils.getSafeValue(res, "code", "");
          const translates = Utils.getSafeValue(res, "translates", []);
          const product_name = Utils.getObjByLanguage(translates, "vi", "name");
          const short_desc = Utils.getObjByLanguage(
            translates,
            "vi",
            "short_desc"
          );
          const product_category_obj = Utils.getSafeValue(
            res,
            "category_obj",
            {}
          );
          const product_category = Utils.getSafeValue(
            product_category_obj,
            "id",
            0
          );
          let product_quantity = 0;
          if (Array.isArray(res?.product_inventory)) {
            product_quantity = res.product_inventory.reduce(
              (value, item) => item?.remaining_number + value,
              0
            );
          }
          const product_price = Utils.getSafeValue(res, "price", 0);
          const product_feature = Utils.getSafeValue(res, "is_feature", 0);
          const product_contact_nlt = Utils.getSafeValue(res, "contact_nlt", 0);
          const product_status =
            Utils.getSafeValue(res, "status_display", 0) === 1 ? true : false;
          const images = Utils.getSafeValue(res, "images", []);
          const width = Utils.getSafeValue(res, "width", null);
          const height = Utils.getSafeValue(res, "height", null);
          const length = Utils.getSafeValue(res, "length", null);
          const weight = Utils.getSafeValue(res, "weight", null);
          const allow_cod = Utils.getSafeValue(res, "allow_cod", null);
          const thumbnailObj = lodash.find(images, {
            is_thumbnail: 1,
          });
          const product_thumbnail = Utils.getSafeValue(
            thumbnailObj,
            "image.url",
            ""
          );
          if (thumbnailObj) setFileThumbnail(thumbnailObj?.image.id);
          const normalImages = images.filter((image) => {
            return image.is_thumbnail === -1;
          });
          const parentObj = lodash.find(results, {
            id: product_category,
          });
          const parent_obj = Utils.getSafeValue(parentObj, "parent_obj", {});
          const parent_translates = Utils.getSafeValue(
            parent_obj,
            "translates",
            []
          );
          const product_parent_category = Utils.getField(
            parent_translates,
            "vi",
            "name"
          );
          setCurrentParent(product_parent_category);
          const product_description = Utils.getObjByLanguage(
            translates,
            "vi",
            "description"
          );
          const product_name_en = Utils.getObjByLanguage(
            translates,
            "en",
            "name"
          );
          const short_desc_en = Utils.getObjByLanguage(
            translates,
            "en",
            "short_desc"
          );
          const product_description_en = Utils.getObjByLanguage(
            translates,
            "en",
            "description"
          );
          const num_sold = Utils.getSafeValue(res, "num_sold", 89);
          const num_like = Utils.getSafeValue(res, "num_like", 125);
          const avg_rating = Utils.getSafeValue(res, "avg_rating", 4.5);
          const product_slug = Utils.getObjByLanguage(translates, "vi", "slug");
          const product_slug_en = Utils.getObjByLanguage(
            translates,
            "en",
            "slug"
          );
          const title_seo = Utils.getObjByLanguage(
            translates,
            "vi",
            "title_seo"
          );
          const title_seo_en = Utils.getObjByLanguage(
            translates,
            "en",
            "title_seo"
          );
          const description_seo = Utils.getObjByLanguage(
            translates,
            "vi",
            "description_seo"
          );
          const description_seo_en = Utils.getObjByLanguage(
            translates,
            "en",
            "description_seo"
          );
          const redirect_slug_302 = Utils.getObjByLanguage(
            translates,
            "vi",
            "redirect_slug_302"
          );
          const redirect_slug_302_en = Utils.getObjByLanguage(
            translates,
            "en",
            "redirect_slug_302"
          );
          const redirect_slug = Utils.getObjByLanguage(
            translates,
            "vi",
            "redirect_slug"
          );
          const redirect_slug_en = Utils.getObjByLanguage(
            translates,
            "en",
            "redirect_slug"
          );
          const productDetail = {
            id,
            product_code,
            product_name,
            product_category,
            product_quantity,
            product_price,
            product_feature,
            product_contact_nlt,
            product_status,
            short_desc,
            product_thumbnail,
            product_description,
            product_parent_category,
            num_sold,
            num_like,
            avg_rating,
            width,
            height,
            length,
            weight,
            allow_cod,
            product_description_en,
            product_name_en,
            short_desc_en,
            product_slug,
            product_slug_en,
            title_seo,
            title_seo_en,
            description_seo,
            description_seo_en,
            redirect_slug_302,
            redirect_slug_302_en,
            redirect_slug,
            redirect_slug_en,
          };
          setProduct({ ...productDetail });
          dispatch({
            type: "updateDetail",
            payload: productDetail,
          });
          const imgArr = normalImages.map((img) => {
            const image = Utils.getSafeValue(img, "image", {});
            return image;
          });
          dispatch({
            type: "updatePhotos",
            payload: imgArr,
          });
        });
      } catch (error) {}
    }
  }, [id]);

  const handleSubmit = async () => {
    const { detail, photos } = state;
    let errorMessage = lodash.cloneDeep(creationFormErrorMessagesInitialState);
    let errorsCount = 0;
    if (isEmpty(detail.product_code)) {
      errorMessage.product_code = "Mã danh mục được yêu cầu";
      errorsCount = errorsCount + 1;
    }
    if (isEmpty(detail.product_name)) {
      errorMessage.product_name = "Tên danh mục được yêu cầu";
      errorsCount = errorsCount + 1;
    }
    if (isEmpty(detail.short_desc)) {
      errorMessage.short_desc = "Mô tả ngắn được yêu cầu";
      errorsCount = errorsCount + 1;
    }
    if (isEmpty(detail.product_description)) {
      errorMessage.product_description = "Mô tả chi tiết được yêu cầu";
      errorsCount = errorsCount + 1;
    }
    if (typeof detail.product_category !== "number") {
      errorMessage.product_category = "Danh mục con được yêu cầu";
      errorsCount = errorsCount + 1;
    }
    const priceNum = parseInt(detail.product_price);
    if (!(priceNum > 0)) {
      errorMessage.product_price = "Giá bán phải lớn hơn 0";
      errorsCount = errorsCount + 1;
    }
    if (isEmpty(detail.product_price?.toString())) {
      errorMessage.product_price = "Giá bán được yêu cầu";
      errorsCount = errorsCount + 1;
    }
    if (detail.product_thumbnail === "") {
      errorMessage.product_thumbnail = "Ảnh thumbnail được yêu cầu";
      errorsCount = errorsCount + 1;
    }
    if (detail.title_seo.length > 60) {
      errorMessage.title_seo = "Tiêu đề SEO phải dưới 60 ký tự";
      errorsCount = errorsCount + 1;
    }
    if (detail.title_seo_en.length > 60) {
      errorMessage.title_seo_en = "Title SEO must be less than 60 characters";
      errorsCount = errorsCount + 1;
    }
    if (detail.description_seo.length > 165) {
      errorMessage.description_seo = "Mô tả SEO phải dưới 165 ký tự";
      errorsCount = errorsCount + 1;
    }
    if (detail.description_seo_en.length > 165) {
      errorMessage.description_seo_en =
        "Description SEO must be less than 165 characters";
      errorsCount = errorsCount + 1;
    }
    const floatWidth = Utils.safeParseFloat(detail.width);
    const floatLength = Utils.safeParseFloat(detail.length);
    const floatHeight = Utils.safeParseFloat(detail.height);
    if (floatWidth <= 0 || floatHeight <= 0 || floatLength <= 0) {
      errorMessage.size = "Kích thước phải lớn hơn 0";
      errorsCount = errorsCount + 1;
    }
    if (floatWidth > 5000 || floatHeight > 5000 || floatLength > 5000) {
      errorMessage.size = "Kích thước tối đa là 5000";
      errorsCount = errorsCount + 1;
    }
    if (!detail.width || !detail.height || !detail.length) {
      errorMessage.size = "Kích thước được yêu cầu";
      errorsCount = errorsCount + 1;
    }
    const floatWeight = Utils.safeParseFloat(detail.weight);
    if (floatWeight <= 0) {
      errorMessage.weight = "Khối lượng phải lớn hơn 0";
      errorsCount = errorsCount + 1;
    }
    if (floatWeight > 500) {
      errorMessage.weight = "Khối lượng tối đa là 500";
      errorsCount = errorsCount + 1;
    }
    if (!detail.weight) {
      errorMessage.weight = "Khối lượng được yêu cầu";
      errorsCount = errorsCount + 1;
    }
    if (detail.product_slug !== "" && !isValidUrlSlug(detail.product_slug)) {
      errorMessage.product_slug = "Slug chỉ bao gồm chữ thường, -, và chữ số";
      errorsCount = errorsCount + 1;
    }
    if (
      detail.product_slug_en !== "" &&
      !isValidUrlSlug(detail.product_slug_en)
    ) {
      errorMessage.product_slug_en =
        "Slug only contains lowercase letters, -, and numbers";
      errorsCount = errorsCount + 1;
    }
    if (
      !(
        (!detail.product_name_en &&
          !detail.short_desc_en &&
          !detail.product_description_en) ||
        (detail.product_name_en &&
          detail.short_desc_en &&
          detail.product_description_en)
      )
    ) {
      if (!detail.product_name_en) {
        errorMessage.product_name_en = "Tên danh mục được yêu cầu";
        errorsCount = errorsCount + 1;
      }
      if (!detail.short_desc_en) {
        errorMessage.short_desc_en = "Mô tả ngắn được yêu cầu";
        errorsCount = errorsCount + 1;
      }
      if (!detail.product_description_en) {
        errorMessage.product_description_en = "Mô tả chi tiết được yêu cầu";
        errorsCount = errorsCount + 1;
      }
    }

    if (errorsCount > 0) {
      setCreationFormErrorMessages(errorMessage);
      const arr = Object.keys(errorMessage).filter(
        (key) => errorMessage[key] !== ""
      );

      if (arr[0]?.includes("en")) {
        setLan(LANG_EN);
      } else {
        setLan(LANG_VI);
      }
      return;
    }

    try {
      if (mode === PRODUCT_SCREEN_CREATION_MODE) {
        let formData = new FormData();
        let images = [];
        if (photos.length > 0) {
          if (photos.length > 1) {
            const listPromise = photos.map((it) => {
              let formData = new FormData();
              formData.append("file", it.file);
              return postImage(AppURL.uploadImg, formData);
            });
            await Promise.all([...listPromise]).then((res) => {
              images.push(
                ...res.map((img, index) => ({
                  media_upload_id: img.id,
                  translates: photos[index]?.translates || [],
                }))
              );
            });
          } else {
            await formData.append("file", photos[0].file);
            await postImage(AppURL.uploadImg, formData).then((res) => {
              images.push({
                media_upload_id: res.id,
                translates: photos[0]?.translates || [],
              });
            });
          }
        }
        let formThumbnail = new FormData();
        let thumbnailId;
        formThumbnail.append("file", fileThumbnail);
        await postImage(AppURL.uploadImg, formThumbnail).then((res) => {
          thumbnailId = res.id;
        });
        let is_feature_filter;
        if (detail.product_feature === false) is_feature_filter = -1;
        else if (detail.product_feature === true) is_feature_filter = 1;
        else is_feature_filter = detail.product_feature;

        let is_contact_nlt;
        if (detail.product_contact_nlt === false) is_contact_nlt = -1;
        else if (detail.product_contact_nlt === true) is_contact_nlt = 1;
        else is_contact_nlt = detail.product_contact_nlt;

        let params = {
          code: detail.product_code,
          is_popular: -1,
          is_feature: is_feature_filter,
          contact_nlt: is_contact_nlt,
          status_display: detail.product_status ? 1 : -1,
          price: detail.product_price,
          category: detail.product_category,
          stock: detail.product_quantity,
          images,
          thumbnail: thumbnailId,
          width: Utils.safeParseFloat(detail.width),
          height: Utils.safeParseFloat(detail.height),
          length: Utils.safeParseFloat(detail.length),
          weight: Utils.safeParseFloat(detail.weight),
          allow_cod: detail.allow_cod ? 1 : -1,
          translates: [],
        };
        if (!isEmpty(detail.product_name)) {
          params.translates.push({
            language_code: "vi",
            language_field: "name",
            language_value: detail.product_name,
          });
        }
        if (!isEmpty(detail.short_desc)) {
          params.translates.push({
            language_code: "vi",
            language_field: "short_desc",
            language_value: detail.short_desc,
          });
        }
        if (!isEmpty(detail.product_description)) {
          params.translates.push({
            language_code: "vi",
            language_field: "description",
            language_value: detail.product_description,
          });
        }
        if (!isEmpty(detail.product_name_en)) {
          params.translates.push({
            language_code: "en",
            language_field: "name",
            language_value: detail.product_name_en,
          });
        }
        if (!isEmpty(detail.short_desc_en)) {
          params.translates.push({
            language_code: "en",
            language_field: "short_desc",
            language_value: detail.short_desc_en,
          });
        }
        if (!isEmpty(detail.product_description_en)) {
          params.translates.push({
            language_code: "en",
            language_field: "description",
            language_value: detail.product_description_en,
          });
        }
        if (detail.product_slug) {
          params.translates.push({
            language_code: "vi",
            language_field: "slug",
            language_value: detail.product_slug,
          });
        }
        if (detail.product_slug_en) {
          params.translates.push({
            language_code: "en",
            language_field: "slug",
            language_value: detail.product_slug_en,
          });
        }
        if (detail.title_seo) {
          params.translates.push({
            language_code: "vi",
            language_field: "title_seo",
            language_value: detail.title_seo,
          });
        }
        if (detail.title_seo_en) {
          params.translates.push({
            language_code: "en",
            language_field: "title_seo",
            language_value: detail.title_seo_en,
          });
        }
        if (detail.description_seo) {
          params.translates.push({
            language_code: "vi",
            language_field: "description_seo",
            language_value: detail.description_seo,
          });
        }
        if (detail.description_seo_en) {
          params.translates.push({
            language_code: "en",
            language_field: "description_seo",
            language_value: detail.description_seo_en,
          });
        }
        if (detail.redirect_slug_302) {
          params.translates.push({
            language_code: "vi",
            language_field: "redirect_slug_302",
            language_value: detail.redirect_slug_302,
          });
        }
        if (detail.redirect_slug_302_en) {
          params.translates.push({
            language_code: "en",
            language_field: "redirect_slug_302",
            language_value: detail.redirect_slug_302_en,
          });
        }
        if (detail.redirect_slug) {
          params.translates.push({
            language_code: "vi",
            language_field: "redirect_slug",
            language_value: detail.redirect_slug,
          });
        }
        if (detail.redirect_slug_en) {
          params.translates.push({
            language_code: "en",
            language_field: "redirect_slug",
            language_value: detail.redirect_slug_en,
          });
        }
        addNewCate(AppURL.addProduct, params)
          .then((res) => {
            console.log(res);
            history.goBack();
          })
          .catch((error) => {
            const err = error.response?.data;
            let message = Utils.getSafeValue(err, "message", "");
            if (message.includes("Conflict Resource Exception")) {
              errorMessage.product_code = "Mã sản phẩm đã bị trùng";
            }
            if (message.includes("Tên sản phẩm đã bị trùng")) {
              errorMessage.product_name = "Tên sản phẩm đã bị trùng";
            }
            if (message.includes("Slug sản phẩm bị trùng")) {
              errorMessage.product_slug = "Slug sản phẩm đã bị trùng";
            }
            if (message.includes("Số lượng Feature sản phẩm đã đủ")) {
              errorMessage.is_feature = "Số lượng Feature sản phẩm đã đủ";
            } else {
              // setMessageError(message[1] || "")
            }
            setCreationFormErrorMessages(errorMessage);
            setLan(LANG_VI);
          });
      } else {
        const { detail, photos } = state;
        let numFile = 0;
        for (let i = 0; i < photos.length; i++) {
          if (!photos[i].id) numFile++;
        }
        let formData = new FormData();
        let images = [];
        const listNewPhoto = [];
        if (photos.length > 0) {
          if (photos.length > 1) {
            await photos.map((photo) => {
              if (photo.id) {
                images.push({
                  media_upload_id: photo.id,
                  translates: photo?.translates || [],
                });
              } else {
                if (numFile === 1) {
                  formData.append("file", photo.file);
                  formData.append(
                    "translates",
                    JSON.stringify(photo?.translates || [])
                  );
                } else listNewPhoto.push(photo);
              }
            });
            if (photos.length !== images.length) {
              if (numFile === 1) {
                const translates = JSON.parse(
                  formData.get("translates") || "[]"
                );
                await postImage(AppURL.uploadImg, formData).then((res) => {
                  images.push({
                    media_upload_id: res.id,
                    translates,
                  });
                });
              } else {
                const listPromise = listNewPhoto.map((it) => {
                  let formData = new FormData();
                  formData.append("file", it.file);
                  return postImage(AppURL.uploadImg, formData);
                });
                await Promise.all([...listPromise]).then((res) => {
                  images.push(
                    ...res.map((img, index) => ({
                      media_upload_id: img.id,
                      translates: listNewPhoto[index]?.translates || [],
                    }))
                  );
                });
              }
            }
          } else {
            if (photos[0].id) {
              images.push({
                media_upload_id: photos[0].id,
                translates: photos[0]?.translates || [],
              });
            } else {
              await formData.append("file", photos[0].file);
              await postImage(AppURL.uploadImg, formData).then((res) => {
                images.push({
                  media_upload_id: res.id,
                  translates: photos[0]?.translates || [],
                });
              });
            }
          }
        }
        let thumbnailId;
        if (typeof fileThumbnail === "number") {
          thumbnailId = fileThumbnail;
        } else {
          let formThumbnail = new FormData();
          formThumbnail.append("file", fileThumbnail);
          await postImage(AppURL.uploadImg, formThumbnail).then((res) => {
            thumbnailId = res.id;
          });
        }
        let params = {
          code: detail.product_code,
          is_popular: -1,
          is_feature: detail.product_feature,
          contact_nlt: detail.product_contact_nlt,
          status_display: detail.product_status ? 1 : -1,
          price: detail.product_price,
          category: detail.product_category,
          stock: detail.product_quantity,
          images,
          thumbnail: thumbnailId,
          width: Utils.safeParseFloat(detail.width),
          height: Utils.safeParseFloat(detail.height),
          length: Utils.safeParseFloat(detail.length),
          weight: Utils.safeParseFloat(detail.weight),
          allow_cod: detail.allow_cod ? 1 : -1,
          translates: [],
        };
        if (!isEmpty(detail.product_description)) {
          params.translates.push({
            language_code: "vi",
            language_field: "description",
            language_value: detail.product_description,
          });
        }
        if (!isEmpty(detail.short_desc)) {
          params.translates.push({
            language_code: "vi",
            language_field: "short_desc",
            language_value: detail.short_desc,
          });
        }
        if (!isEmpty(detail.product_name)) {
          params.translates.push({
            language_code: "vi",
            language_field: "name",
            language_value: detail.product_name,
          });
        }
        if (!isEmpty(detail.product_name_en)) {
          params.translates.push({
            language_code: "en",
            language_field: "name",
            language_value: detail.product_name_en,
          });
        }
        if (!isEmpty(detail.short_desc_en)) {
          params.translates.push({
            language_code: "en",
            language_field: "short_desc",
            language_value: detail.short_desc_en,
          });
        }
        if (!isEmpty(detail.product_description_en)) {
          params.translates.push({
            language_code: "en",
            language_field: "description",
            language_value: detail.product_description_en,
          });
        }
        if (detail.product_slug) {
          params.translates.push({
            language_code: "vi",
            language_field: "slug",
            language_value: detail.product_slug,
          });
        }
        if (detail.product_slug_en) {
          params.translates.push({
            language_code: "en",
            language_field: "slug",
            language_value: detail.product_slug_en,
          });
        }
        if (detail.title_seo) {
          params.translates.push({
            language_code: "vi",
            language_field: "title_seo",
            language_value: detail.title_seo,
          });
        }
        if (detail.title_seo_en) {
          params.translates.push({
            language_code: "en",
            language_field: "title_seo",
            language_value: detail.title_seo_en,
          });
        }
        if (detail.description_seo) {
          params.translates.push({
            language_code: "vi",
            language_field: "description_seo",
            language_value: detail.description_seo,
          });
        }
        if (detail.description_seo_en) {
          params.translates.push({
            language_code: "en",
            language_field: "description_seo",
            language_value: detail.description_seo_en,
          });
        }
        if (detail.redirect_slug_302) {
          params.translates.push({
            language_code: "vi",
            language_field: "redirect_slug_302",
            language_value: detail.redirect_slug_302,
          });
        }
        if (detail.redirect_slug_302_en) {
          params.translates.push({
            language_code: "en",
            language_field: "redirect_slug_302",
            language_value: detail.redirect_slug_302_en,
          });
        }
        if (detail.redirect_slug) {
          params.translates.push({
            language_code: "vi",
            language_field: "redirect_slug",
            language_value: detail.redirect_slug,
          });
        }
        if (detail.redirect_slug_en) {
          params.translates.push({
            language_code: "en",
            language_field: "redirect_slug",
            language_value: detail.redirect_slug_en,
          });
        }
        const url = Utils.replaceStrUrl(AppURL.deleteProduct, [id]);
        updateCate(url, params)
          .then((res) => {
            history.goBack();
          })
          .catch((error) => {
            const err = error.response?.data;
            let message = Utils.getSafeValue(err, "message", "");
            if (message.includes("Conflict Resource Exception")) {
              errorMessage.product_code = "Mã sản phẩm đã bị trùng";
            }
            if (message.includes("Tên sản phẩm đã bị trùng")) {
              errorMessage.product_name = "Tên sản phẩm đã bị trùng";
            }
            if (message.includes("Slug sản phẩm bị trùng")) {
              errorMessage.product_slug = "Slug sản phẩm đã bị trùng";
            }
            if (message.includes("Số lượng Feature sản phẩm đã đủ")) {
              errorMessage.is_feature = "Số lượng Feature sản phẩm đã đủ";
            } else {
            }
            setCreationFormErrorMessages(errorMessage);
            setLan(LANG_VI);
          });
      }
    } catch (error) {
      console.log(error);
      history.goBack();
    }
  };

  const handleSetProductFeature = (evt) => {
    dispatch({
      type: "updateDetailInput",
      payload: {
        key: "product_feature",
        value: evt.target.checked ? 1 : -1,
      },
    });
    setCreationFormErrorMessages({
      ...creationFormErrorMessages,
      is_feature: "",
    });
    setFeatureIsUpdated(!featureIsUpdated);
  };

  const handleSetContactNtl = (evt) => {
    dispatch({
      type: "updateDetailInput",
      payload: {
        key: "product_contact_nlt",
        value: evt.target.checked ? 1 : -1,
      },
    });
    setCreationFormErrorMessages({
      ...creationFormErrorMessages,
      contact_nlt: "",
    });
  };

  const handleChangeLan = (e) => {
    setLan(e.target.value);
  };

  return (
    <ProductCreationContext.Provider value={{ state, dispatch }}>
      <Toolbar
        onSubmit={handleSubmit}
        mode={mode}
        goBack={() => history.goBack()}
        detail={product}
      />
      <Grid container className={classes.main}>
        <Grid container>
          <Grid item xs={8}>
            <Grid container className={classes.grid}>
              <Grid item xs={6} className={classes.gridItemLeft}>
                <FormControlLabel
                  style={{
                    marginRight: "5px",
                  }}
                  control={
                    <Checkbox
                      checked={
                        state.detail.product_contact_nlt === -1 ? false : true
                      }
                      onChange={handleSetContactNtl}
                    />
                  }
                  label="Sản phẩm đặc biệt"
                />
                <span className={classes.notetxt}>
                  (Liên hệ Long thành để lấy thông tin)
                </span>
                {creationFormErrorMessages.contact_nlt !== "" && (
                  <div
                    style={{
                      fontSize: 12,
                      color: "red",
                      marginTop: 3,
                      marginLeft: 15,
                    }}
                  >
                    {creationFormErrorMessages.contact_nlt}
                  </div>
                )}
              </Grid>
              <Grid item xs={6} className={classes.gridItemRight}>
                <FormControlLabel
                  style={{
                    marginRight: "5px",
                  }}
                  control={
                    <Checkbox
                      checked={
                        state.detail.product_feature === -1 ? false : true
                      }
                      onChange={handleSetProductFeature}
                      disabled={
                        mode === PRODUCT_SCREEN_CREATION_MODE
                          ? totalFeatures === 4
                            ? true
                            : false
                          : totalFeatures === 4 &&
                            state.detail.product_feature === -1 &&
                            !featureIsUpdated
                          ? true
                          : false
                      }
                    />
                  }
                  label="Sản phẩm nổi bật"
                />
                <span className={classes.notetxt}>
                  (Ẩn khi đã đủ danh mục nổi bật)
                </span>
                {creationFormErrorMessages.is_feature !== "" && (
                  <div
                    style={{
                      fontSize: 12,
                      color: "red",
                      marginTop: 3,
                      marginLeft: 15,
                    }}
                  >
                    {creationFormErrorMessages.is_feature}
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <div style={{ textAlign: "right" }}>
              <TextField
                name="lan"
                select
                value={lan}
                onChange={handleChangeLan}
                SelectProps={{
                  MenuProps: {
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left",
                    },
                    getContentAnchorEl: null,
                  },
                }}
                InputProps={{
                  disableUnderline: true,
                }}
              >
                <MenuItem value={"vi"}>
                  <img className={classes.imgFlag} src={viFlag} /> Tiếng Việt
                </MenuItem>
                <MenuItem value={"en"}>
                  <img className={classes.imgFlag} src={usFlag} /> Tiếng Anh
                </MenuItem>
              </TextField>
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={8}>
            <Content
              listChildCate={listChildCate}
              currentParent={currentParent}
              setCurrentParent={setCurrentParent}
              creationFormErrorMessages={creationFormErrorMessages}
              setCreationFormErrorMessages={setCreationFormErrorMessages}
              lan={lan}
            />
          </Grid>
          <Grid item xs={4} className={classes.thumbnail}>
            <ThumbnailBox
              setFileThumbnail={setFileThumbnail}
              fileThumbnail={fileThumbnail}
              creationFormErrorMessages={creationFormErrorMessages}
              setCreationFormErrorMessages={setCreationFormErrorMessages}
              lan={lan}
            />
            <PhotosBox lan={lan} />
          </Grid>
        </Grid>
      </Grid>
    </ProductCreationContext.Provider>
  );
}
