import { Avatar, Button, Checkbox, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Image as ImageIcon } from "@material-ui/icons";
import BasicModal from "app/components/BasicModal";
import SelectLang from "app/components/SelectLang";
import TextEditors from "app/components/TextEditors";
import TextFields from "app/components/TextFields";
import {
  PRODUCT_CATEGORIES_SCREEN_CREATION_MODE,
  PRODUCT_CATEGORIES_SCREEN_EDIT_MODE,
} from "app/constants/product-categories";
import { handleFixLinkEditorOnModal } from "app/pages/Profile/product-cate-constants";
import { addNewCate, postImage, updateCate } from "app/services/axios";
import { LANG_EN, LANG_VI } from "app/utils/constant";
import { isEmpty, isValidUrlSlug, validateStatus } from "app/utils/validate";
import lodash from "lodash";
import { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import * as AppURL from "../../../services/urlAPI";
import * as Utils from "../../../utils";

const useStyles = makeStyles((theme) => ({
  upload: {
    marginTop: "20px",
  },
  avatar: {
    width: "100px",
    height: "100px",
  },
  uploadBtnGroup: {
    marginTop: "20px",
  },
  uploadBtn: {
    color: "#2154FF",
  },
  uploadNoti: {
    fontSize: "10px",
    fontStyle: "italic",
    lineHeight: "0px",
  },
  hidden: {
    display: "none",
  },
  notetxt: {
    fontStyle: "italic",
    color: "#ED0017",
    fontSize: "12px",
  },
  flex: {
    marginBottom: 12,
    display: "flex",
    justifyContent: "space-between",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  imgFlag: {
    width: "20px",
    height: "14px",
  },
}));

const creationFormErrorMessagesInitialState = {
  product_category_name: "",
  product_category_name_en: "",
  product_category_code: "",
  product_category_thumbnail: "",
  product_category_slug: "",
  product_category_slug_en: "",
  title_seo: "",
  title_seo_en: "",
  description_seo: "",
  description_seo_en: "",
  redirect_slug_302: "",
  redirect_slug_302_en: "",
  redirect_slug: "",
  redirect_slug_en: "",
};

export default function CreationModal({
  title,
  isOpen,
  onClose,
  onSave,
  form,
  mode,
  isFeature,
  setIsFeature,
  setUpdate,
  update,
  totalFeatures,
  setTotalFeatures,
}) {
  const classes = useStyles();
  console.log(form);

  const [creationForm, setCreationForm] = useState(form);
  const [creationFormErrorMessages, setCreationFormErrorMessages] = useState(
    lodash.cloneDeep(creationFormErrorMessagesInitialState)
  );
  const [file, setFile] = useState(null);
  const [lan, setLan] = useState(LANG_VI);
  const [isChanged, setIsChanged] = useState(false);
  const [messageError, setMessageError] = useState("");

  useEffect(() => {
    setCreationForm(form);
    setCreationFormErrorMessages(
      lodash.cloneDeep(creationFormErrorMessagesInitialState)
    );
    setMessageError("");
    setLan(LANG_VI);
  }, [form, isOpen]);

  const handleChange = (evt) => {
    setCreationForm({
      ...creationForm,
      [evt.target.name]: evt.target.value,
    });
    if (evt.target.value !== "") {
      setCreationFormErrorMessages({
        ...creationFormErrorMessages,
        [evt.target.name]: "",
      });
    }
  };

  const handleChangeEditorVi = (content) => {
    setCreationForm({
      ...creationForm,
      product_category_detail_description: content,
    });
  };
  const handleChangeEditorEn = (content) => {
    setCreationForm({
      ...creationForm,
      product_category_detail_description_en: content,
    });
  };

  const handleSubmitCreate = async () => {
    let errorMessages = lodash.cloneDeep(creationFormErrorMessagesInitialState);
    let errorsCount = 0;
    if (creationForm.product_category_name === "") {
      errorMessages.product_category_name = "Tên danh mục được yêu cầu";
      errorsCount = errorsCount + 1;
    }
    if (creationForm.product_category_code === "") {
      errorMessages.product_category_code = "Mã danh mục được yêu cầu";
      errorsCount = errorsCount + 1;
    }
    if (!creationForm.product_category_thumbnail) {
      errorMessages.product_category_thumbnail = "Ảnh danh mục được yêu cầu";
      errorsCount = errorsCount + 1;
    }
    if (
      creationForm.product_category_slug !== "" &&
      !isValidUrlSlug(creationForm.product_category_slug)
    ) {
      errorMessages.product_category_slug =
        "Slug chỉ bao gồm chữ thường, -, và chữ số";
      errorsCount = errorsCount + 1;
    }
    if (
      creationForm.product_category_slug_en !== "" &&
      !isValidUrlSlug(creationForm.product_category_slug_en)
    ) {
      errorMessages.product_category_slug_en =
        "Slug only contains lowercase letters, -, and numbers";
      errorsCount = errorsCount + 1;
    }
    if (errorsCount > 0) {
      setCreationFormErrorMessages(errorMessages);
      setLan(LANG_VI);
      return;
    }
    try {
      let formData = new FormData();
      formData.append("file", file);
      await postImage(AppURL.uploadImg, formData).then((res) => {
        let submitForm = {
          image: res.id || 1,
          translates: [
            {
              language_code: LANG_VI,
              language_field: "name",
              language_value: creationForm.product_category_name,
            },
          ],
          code: creationForm.product_category_code,
          is_feature: isFeature ? 1 : -1,
        };
        if (creationForm.product_category_detail_description) {
          submitForm.translates.push({
            language_code: LANG_VI,
            language_field: "detail_description",
            language_value: creationForm.product_category_detail_description,
          });
        }
        if (creationForm.product_category_detail_description_en) {
          submitForm.translates.push({
            language_code: LANG_EN,
            language_field: "detail_description",
            language_value: creationForm.product_category_detail_description_en,
          });
        }
        if (!isEmpty(creationForm.product_category_name_en)) {
          submitForm.translates.push({
            language_code: LANG_EN,
            language_field: "name",
            language_value: creationForm.product_category_name_en,
          });
        }
        if (creationForm.product_category_slug) {
          submitForm.translates.push({
            language_code: LANG_VI,
            language_field: "slug",
            language_value: creationForm.product_category_slug,
          });
        }
        if (creationForm.product_category_slug_en) {
          submitForm.translates.push({
            language_code: LANG_EN,
            language_field: "slug",
            language_value: creationForm.product_category_slug_en,
          });
        }
        if (creationForm.description_seo) {
          submitForm.translates.push({
            language_code: LANG_VI,
            language_field: "description_seo",
            language_value: creationForm.description_seo,
          });
        }
        if (creationForm.description_seo_en) {
          submitForm.translates.push({
            language_code: LANG_EN,
            language_field: "description_seo",
            language_value: creationForm.description_seo_en,
          });
        }
        if (creationForm.title_seo) {
          submitForm.translates.push({
            language_code: LANG_VI,
            language_field: "title_seo",
            language_value: creationForm.title_seo,
          });
        }
        if (creationForm.title_seo_en) {
          submitForm.translates.push({
            language_code: LANG_EN,
            language_field: "title_seo",
            language_value: creationForm.title_seo_en,
          });
        }
        if (creationForm.redirect_slug_302) {
          submitForm.translates.push({
            language_code: LANG_VI,
            language_field: "redirect_slug_302",
            language_value: creationForm.redirect_slug_302,
          });
        }
        if (creationForm.redirect_slug_302_en) {
          submitForm.translates.push({
            language_code: LANG_EN,
            language_field: "redirect_slug_302",
            language_value: creationForm.redirect_slug_302_en,
          });
        }
        if (creationForm.redirect_slug) {
          submitForm.translates.push({
            language_code: LANG_VI,
            language_field: "redirect_slug",
            language_value: creationForm.redirect_slug,
          });
        }
        if (creationForm.redirect_slug_en) {
          submitForm.translates.push({
            language_code: LANG_EN,
            language_field: "redirect_slug",
            language_value: creationForm.redirect_slug_en,
          });
        }
        addNewCate(AppURL.productCate, submitForm, { validateStatus })
          .then((res) => {
            if (res?.statusCode >= 300) {
              setMessageError(res?.message);
            } else {
              setUpdate(!update);
              onClose();
            }
          })
          .catch((error) => {});
      });
    } catch (error) {
      onClose();
    }
  };

  const handleSubmitUpdate = async () => {
    let errorMessages = lodash.cloneDeep(creationFormErrorMessagesInitialState);
    let errorsCount = 0;
    if (creationForm.product_category_name === "") {
      errorMessages.product_category_name = "Tên danh mục được yêu cầu";
      errorsCount = errorsCount + 1;
    }
    if (creationForm.product_category_code === "") {
      errorMessages.product_category_code = "Mã danh mục được yêu cầu";
      errorsCount = errorsCount + 1;
    }
    if (creationForm.thumbnail === "") {
      errorsCount = errorsCount + 1;
    }
    if (creationForm.title_seo.length > 60) {
      errorMessages.title_seo = "Tiêu đề SEO phải dưới 60 ký tự";
      errorsCount = errorsCount + 1;
    }
    if (creationForm.title_seo_en.length > 60) {
      errorMessages.title_seo_en = "Title SEO must be less than 60 characters";
      errorsCount = errorsCount + 1;
    }
    if (creationForm.description_seo.length > 165) {
      errorMessages.description_seo = "Mô tả SEO phải dưới 165 ký tự";
      errorsCount = errorsCount + 1;
    }
    if (creationForm.description_seo_en.length > 165) {
      errorMessages.description_seo_en =
        "Description SEO must be less than 165 characters";
      errorsCount = errorsCount + 1;
    }
    if (errorsCount > 0) {
      setCreationFormErrorMessages(errorMessages);
      setLan(LANG_VI);
      return;
    }
    try {
      let formData = new FormData();
      if (!isChanged) {
        let submitForm = {
          image: creationForm.image,
          translates: [
            {
              language_code: LANG_VI,
              language_field: "name",
              language_value: creationForm.product_category_name,
            },
            // {
            //   language_code: LANG_EN,
            //   language_field: "name",
            //   language_value: isEmpty(creationForm.product_category_name_en)
            //     ? creationForm.product_category_name
            //     : creationForm.product_category_name_en,
            // },
          ],
          code: creationForm.product_category_code,
          is_feature: isFeature ? 1 : -1,
        };
        if (!isEmpty(creationForm.product_category_detail_description)) {
          submitForm.translates.push({
            language_code: LANG_VI,
            language_field: "detail_description",
            language_value: creationForm.product_category_detail_description,
          });
        }
        if (!isEmpty(creationForm.product_category_detail_description_en)) {
          submitForm.translates.push({
            language_code: LANG_EN,
            language_field: "detail_description",
            language_value: creationForm.product_category_detail_description_en,
          });
        }
        if (creationForm.product_category_name_en) {
          submitForm.translates.push({
            language_code: LANG_EN,
            language_field: "name",
            language_value: creationForm.product_category_name_en,
          });
        }
        if (creationForm.product_category_slug) {
          submitForm.translates.push({
            language_code: LANG_VI,
            language_field: "slug",
            language_value: creationForm.product_category_slug,
          });
        }
        if (creationForm.product_category_slug_en) {
          submitForm.translates.push({
            language_code: LANG_EN,
            language_field: "slug",
            language_value: creationForm.product_category_slug_en,
          });
        }
        if (creationForm.title_seo) {
          submitForm.translates.push({
            language_code: LANG_VI,
            language_field: "title_seo",
            language_value: creationForm.title_seo,
          });
        }
        if (creationForm.title_seo_en) {
          submitForm.translates.push({
            language_code: LANG_EN,
            language_field: "title_seo",
            language_value: creationForm.title_seo_en,
          });
        }
        if (creationForm.description_seo) {
          submitForm.translates.push({
            language_code: LANG_VI,
            language_field: "description_seo",
            language_value: creationForm.description_seo,
          });
        }
        if (creationForm.description_seo_en) {
          submitForm.translates.push({
            language_code: LANG_EN,
            language_field: "description_seo",
            language_value: creationForm.description_seo_en,
          });
        }
        if (creationForm.redirect_slug_302) {
          submitForm.translates.push({
            language_code: LANG_VI,
            language_field: "redirect_slug_302",
            language_value: creationForm.redirect_slug_302,
          });
        }
        if (creationForm.redirect_slug_302_en) {
          submitForm.translates.push({
            language_code: LANG_EN,
            language_field: "redirect_slug_302",
            language_value: creationForm.redirect_slug_302_en,
          });
        }
        if (creationForm.redirect_slug) {
          submitForm.translates.push({
            language_code: LANG_VI,
            language_field: "redirect_slug",
            language_value: creationForm.redirect_slug,
          });
        }
        if (creationForm.redirect_slug_en) {
          submitForm.translates.push({
            language_code: LANG_EN,
            language_field: "redirect_slug",
            language_value: creationForm.redirect_slug_en,
          });
        }
        onUpdate(submitForm);
      } else {
        formData.append("file", file);
        postImage(AppURL.uploadImg, formData)
          .then((res) => {
            let submitForm = {
              image: res.id || 1,
              translates: [
                {
                  language_code: LANG_VI,
                  language_field: "name",
                  language_value: creationForm.product_category_name,
                },
                // {
                //   language_code: LANG_EN,
                //   language_field: "name",
                //   language_value: isEmpty(creationForm.product_category_name_en)
                //     ? creationForm.product_category_name
                //     : creationForm.product_category_name_en,
                // },
                {
                  language_code: LANG_VI,
                  language_field: "slug",
                  language_value: creationForm?.product_category_slug || "",
                },
                // {
                //   language_code: LANG_EN,
                //   language_field: "slug",
                //   language_value: creationForm?.product_category_slug_en || "",
                // },
              ],
              code: creationForm.product_category_code,
              is_feature: isFeature ? 1 : -1,
            };
            if (!isEmpty(creationForm.product_category_slug_en)) {
              submitForm.translates.push({
                language_code: LANG_EN,
                language_field: "slug",
                language_value: creationForm?.product_category_slug_en,
              });
            }
            if (!isEmpty(creationForm.product_category_detail_description)) {
              submitForm.translates.push({
                language_code: LANG_VI,
                language_field: "detail_description",
                language_value:
                  creationForm.product_category_detail_description,
              });
            }
            if (!isEmpty(creationForm.product_category_detail_description_en)) {
              submitForm.translates.push({
                language_code: LANG_EN,
                language_field: "detail_description",
                language_value:
                  creationForm.product_category_detail_description_en,
              });
            }
            if (creationForm.product_category_name_en) {
              submitForm.translates.push({
                language_code: LANG_EN,
                language_field: "name",
                language_value: creationForm.product_category_name_en,
              });
            }
            if (creationForm.title_seo) {
              submitForm.translates.push({
                language_code: LANG_VI,
                language_field: "title_seo",
                language_value: creationForm.title_seo,
              });
            }
            if (creationForm.title_seo_en) {
              submitForm.translates.push({
                language_code: LANG_EN,
                language_field: "title_seo",
                language_value: creationForm.title_seo_en,
              });
            }
            if (creationForm.description_seo) {
              submitForm.translates.push({
                language_code: LANG_VI,
                language_field: "description_seo",
                language_value: creationForm.description_seo,
              });
            }
            if (creationForm.description_seo_en) {
              submitForm.translates.push({
                language_code: LANG_EN,
                language_field: "description_seo",
                language_value: creationForm.description_seo_en,
              });
            }
            if (creationForm.redirect_slug_302) {
              submitForm.translates.push({
                language_code: LANG_VI,
                language_field: "redirect_slug_302",
                language_value: creationForm.redirect_slug_302,
              });
            }
            if (creationForm.redirect_slug_302_en) {
              submitForm.translates.push({
                language_code: LANG_EN,
                language_field: "redirect_slug_302",
                language_value: creationForm.redirect_slug_302_en,
              });
            }
            if (creationForm.redirect_slug) {
              submitForm.translates.push({
                language_code: LANG_VI,
                language_field: "redirect_slug",
                language_value: creationForm.redirect_slug,
              });
            }
            if (creationForm.redirect_slug_en) {
              submitForm.translates.push({
                language_code: LANG_EN,
                language_field: "redirect_slug",
                language_value: creationForm.redirect_slug_en,
              });
            }
            onUpdate(submitForm);
          })
          .then(() => setIsChanged(false));
      }
    } catch (error) {
      onClose();
    }
  };
  const onUpdate = (submitForm) => {
    const url = Utils.replaceStrUrl(AppURL.deleteProductCategory, [
      creationForm.id,
    ]);
    updateCate(url, submitForm, { validateStatus })
      .then((res) => {
        if (res?.statusCode >= 300) {
          setMessageError(res?.message);
        } else {
          setUpdate(!update);
          onClose();
        }
      })
      .catch((error) => {});
  };

  const handleOpenFileBrowser = () => {
    document.getElementById("file").click();
  };

  const handleUploadFile = async (evt) => {
    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      setCreationForm({
        ...creationForm,
        product_category_thumbnail: reader.result,
      });
    };
    reader.readAsDataURL(file);
    setFile(file);
    setIsChanged(true);
  };

  return (
    <BasicModal
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={
        mode === PRODUCT_CATEGORIES_SCREEN_CREATION_MODE
          ? handleSubmitCreate
          : handleSubmitUpdate
      }
    >
      {messageError && <div className="text-field-message">{messageError}</div>}
      <div className={classes.flex}>
        <div>
          <Checkbox
            disabled={
              (totalFeatures >= 4 &&
                mode === PRODUCT_CATEGORIES_SCREEN_CREATION_MODE) ||
              (mode === PRODUCT_CATEGORIES_SCREEN_EDIT_MODE &&
                totalFeatures >= 4 &&
                !isFeature)
            }
            checked={isFeature}
            onChange={async () => {
              await setIsFeature(!isFeature);
              if (mode === PRODUCT_CATEGORIES_SCREEN_EDIT_MODE) {
                if (isFeature) {
                  setTotalFeatures(totalFeatures - 1);
                } else setTotalFeatures(totalFeatures + 1);
              }
            }}
          />
          <span>Feature </span>
          <span className={classes.notetxt}>
            ( Ẩn khi đã đủ danh mục nổi bật )
          </span>
        </div>
        <SelectLang value={lan} onChange={setLan} />
      </div>
      <div>
        <TextFields
          label={lan === LANG_VI ? "Mã danh mục cha" : "Parent category code"}
          required
          error={creationFormErrorMessages.product_category_code !== ""}
          placeholder={
            lan === LANG_VI
              ? "Nhập mã danh mục cha"
              : "Enter parent category code"
          }
          name="product_category_code"
          value={creationForm.product_category_code}
          onChange={(evt) => handleChange(evt)}
          helperText={creationFormErrorMessages.product_category_code}
        />
      </div>
      <div>
        {lan === LANG_VI ? (
          <TextFields
            label="Tên danh mục cha"
            required
            error={creationFormErrorMessages.product_category_name !== ""}
            placeholder="Nhập tên danh mục cha"
            name="product_category_name"
            value={creationForm.product_category_name}
            onChange={(evt) => handleChange(evt)}
            helperText={creationFormErrorMessages.product_category_name}
          />
        ) : (
          <TextFields
            label="Parent category name"
            required
            placeholder="Enter parent category name"
            name="product_category_name_en"
            value={creationForm.product_category_name_en}
            onChange={(evt) => handleChange(evt)}
          />
        )}
      </div>
      <div>
        {lan === LANG_VI ? (
          <TextFields
            label="Slug danh mục cha"
            error={creationFormErrorMessages.product_category_slug !== ""}
            placeholder="Nhập slug danh mục cha"
            name="product_category_slug"
            value={creationForm.product_category_slug}
            onChange={(evt) => handleChange(evt)}
            helperText={creationFormErrorMessages.product_category_slug}
          />
        ) : (
          <TextFields
            label="Parent category slug"
            placeholder="Enter parent category slug"
            name="product_category_slug_en"
            value={creationForm.product_category_slug_en}
            onChange={(evt) => handleChange(evt)}
            helperText={creationFormErrorMessages.product_category_slug_en}
          />
        )}
      </div>
      <div>
        {lan === LANG_VI ? (
          <TextFields
            label="Redirect slug 302"
            placeholder="Nhập redirect slug 302"
            name="redirect_slug_302"
            value={creationForm.redirect_slug_302}
            onChange={(evt) => handleChange(evt)}
            helperText={creationFormErrorMessages.redirect_slug_302}
          />
        ) : (
          <TextFields
            label="Redirect slug 302"
            placeholder="Enter redirect slug 302"
            name="redirect_slug_302_en"
            value={creationForm.redirect_slug_302_en}
            onChange={(evt) => handleChange(evt)}
            helperText={creationFormErrorMessages.redirect_slug_302_en}
          />
        )}
      </div>
      <div>
        {lan === LANG_VI ? (
          <TextFields
            label="Redirect slug 301"
            placeholder="Nhập redirect slug 301"
            name="redirect_slug"
            value={creationForm.redirect_slug}
            onChange={(evt) => handleChange(evt)}
            helperText={creationFormErrorMessages.redirect_slug}
          />
        ) : (
          <TextFields
            label="Redirect slug 301"
            placeholder="Enter redirect slug 301"
            name="redirect_slug_en"
            value={creationForm.redirect_slug_en}
            onChange={(evt) => handleChange(evt)}
            helperText={creationFormErrorMessages.redirect_slug_en}
          />
        )}
      </div>
      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <p
          style={{
            fontSize: "14px",
          }}
        >
          {lan === "vi" ? "Mô tả chi tiết " : "Detail description"}
        </p>
        {lan === LANG_VI && (
          <TextEditors
            defaultValue={creationForm.product_category_detail_description}
            onChange={(content) => {
              handleChangeEditorVi(content);
            }}
            onFocus={handleFixLinkEditorOnModal}
          />
        )}
        {lan === LANG_EN && (
          <TextEditors
            defaultValue={creationForm.product_category_detail_description_en}
            onChange={(content) => {
              handleChangeEditorEn(content);
            }}
            onFocus={handleFixLinkEditorOnModal}
          />
        )}
      </div>
      <div>
        {lan === LANG_VI ? (
          <TextFields
            label="Tiêu đề SEO"
            error={creationFormErrorMessages.title_seo !== ""}
            placeholder="Nhập tiêu đề SEO"
            name="title_seo"
            value={creationForm.title_seo}
            onChange={(evt) => handleChange(evt)}
            helperText={creationFormErrorMessages.title_seo}
          />
        ) : (
          <TextFields
            label="Title SEO"
            placeholder="Enter title SEO"
            name="title_seo_en"
            value={creationForm.title_seo_en}
            onChange={(evt) => handleChange(evt)}
            helperText={creationFormErrorMessages.title_seo_en}
          />
        )}
      </div>
      <div>
        {lan === LANG_VI ? (
          <TextFields
            label="Mô tả SEO"
            error={creationFormErrorMessages.description_seo !== ""}
            placeholder="Nhập mô tả SEO"
            name="description_seo"
            value={creationForm.description_seo}
            onChange={(evt) => handleChange(evt)}
            helperText={creationFormErrorMessages.description_seo}
          />
        ) : (
          <TextFields
            label="Description SEO"
            placeholder="Enter description SEO"
            name="description_seo_en"
            value={creationForm.description_seo_en}
            onChange={(evt) => handleChange(evt)}
            helperText={creationFormErrorMessages.description_seo_en}
          />
        )}
      </div>
      <div>
        <TextFields
          label={lan === LANG_VI ? "Ảnh" : "Image"}
          required
          error={
            creationFormErrorMessages.product_category_thumbnail &&
            !creationForm.product_category_thumbnail
          }
          helperText={creationFormErrorMessages.product_category_thumbnail}
        >
          <Grid container className={classes.upload}>
            <Grid item xs={3}>
              <Avatar
                className={classes.avatar}
                src={
                  creationForm.product_category_thumbnail !== ""
                    ? creationForm.product_category_thumbnail
                    : ""
                }
              >
                <ImageIcon />
              </Avatar>
            </Grid>
            <Grid item xs={9} className={classes.uploadBtnGroup}>
              <Button
                startIcon={<FiUpload />}
                className={classes.uploadBtn}
                onClick={handleOpenFileBrowser}
              >
                Upload
              </Button>
              <input
                type="file"
                id="file"
                className={classes.hidden}
                onChange={handleUploadFile}
              />
              <p className={classes.uploadNoti}>
                ({lan === LANG_VI ? "Kích thước ảnh" : "Size"}: 196x188)
              </p>
            </Grid>
          </Grid>
        </TextFields>
      </div>
    </BasicModal>
  );
}