import {useState, useEffect} from "react";
import lodash from "lodash";
import {makeStyles} from "@material-ui/core/styles";
import {TextField, Grid, Avatar, Button} from "@material-ui/core";

import {Image as ImageIcon} from "@material-ui/icons";

import BasicModal from "../../../components/BasicModal";
import {NEWS_CATEGORIES_SCREEN_CREATION_MODE} from "app/constants/news-categories";
import {isValidUrlSlug} from "app/utils/validate";

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: "25px",
    width: "100%",
  },
}));

const creationFormErrorMessagesInitialState = {
  vie_category_name: "",
  eng_category_name: "",
  vie_slug: "",
  eng_slug: "",
  title_seo: "",
  title_seo_en: "",
  description_seo: "",
  description_seo_en: "",
  redirect_slug_302: "",
  redirect_slug_302_en: "",
  redirect_slug: "",
  redirect_slug_en: ""
};

export default function CreationModal({
  title,
  isOpen,
  onClose,
  form,
  onSave,
  mode,
}) {
  const classes = useStyles();

  const [creationForm, setCreationForm] = useState(form);
  const [readyForSave, setReadyForSave] = useState(false);
  const [creationFormErrorMessages, setCreationFormErrorMessages] = useState(
    lodash.cloneDeep(creationFormErrorMessagesInitialState)
  );

  useEffect(() => {
    setCreationForm(form);
    setCreationFormErrorMessages(
      lodash.cloneDeep(creationFormErrorMessagesInitialState)
    );
  }, [isOpen]);

  useEffect(() => {
    if (
      creationForm.vie_category_name !== "" ||
      creationForm.eng_category_name !== ""
    )
      setReadyForSave(true);
    else setReadyForSave(false);
  }, [creationForm]);

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

  const handleSubmitCreate = () => {
    let errorMessages = lodash.cloneDeep(creationFormErrorMessagesInitialState);
    let errorsCount = 0;
    if (creationForm.vie_category_name === "") {
      errorMessages.vie_category_name = "Tên chuyên mục (VN) được yêu cầu";
      errorsCount = errorsCount + 1;
    } else if (creationForm.vie_category_name.length >= 30) {
      errorMessages.vie_category_name = "Không được quá 30 kí tự";
      errorsCount = errorsCount + 1;
    }
    if (creationForm.eng_category_name === "") {
      errorMessages.eng_category_name = "Tên chuyên mục (EN) được yêu cầu";
      errorsCount = errorsCount + 1;
    } else if (creationForm.eng_category_name.length >= 30) {
      errorMessages.eng_category_name = "Không được quá 30 kí tự";
      errorsCount = errorsCount + 1;
    }
    if (
      creationForm.vie_slug !== "" &&
      !isValidUrlSlug(creationForm.vie_slug)
    ) {
      errorMessages.vie_slug = "Slug chỉ bao gồm chữ thường, -, và chữ số";
      errorsCount = errorsCount + 1;
    }
    if (
      creationForm.eng_slug !== "" &&
      !isValidUrlSlug(creationForm.eng_slug)
    ) {
      errorMessages.eng_slug =
        "Slug chỉ bao gồm chữ thường, -, và chữ số";
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
      return;
    }
    try {
      let submitForm = {
        contents: [
          // {
          //   language_code: "vi",
          //   language_field: "name",
          //   language_value: creationForm.vie_category_name,
          // },
          // {
          //   language_code: "en",
          //   language_field: "name",
          //   language_value: creationForm.eng_category_name,
          // },
        ],
      };
      if (creationForm.eng_category_name) {
        submitForm.contents.push({
          language_code: "en",
          language_field: "name",
          language_value: creationForm.eng_category_name,
        });
      }
      if (creationForm.vie_category_name) {
        submitForm.contents.push({
          language_code: "vi",
          language_field: "name",
          language_value: creationForm.vie_category_name,
        });
      }
      if (creationForm.vie_slug) {
        submitForm.contents.push({
          language_code: "vi",
          language_field: "slug",
          language_value: creationForm.vie_slug,
        });
      }
      if (creationForm.eng_slug) {
        submitForm.contents.push({
          language_code: "en",
          language_field: "slug",
          language_value: creationForm.eng_slug,
        });
      }
      if (creationForm.title_seo) {
        submitForm.contents.push({
          language_code: "vi",
          language_field: "title_seo",
          language_value: creationForm.title_seo,
        });
      }
      if (creationForm.title_seo_en) {
        submitForm.contents.push({
          language_code: "en",
          language_field: "title_seo",
          language_value: creationForm.title_seo_en,
        });
      }
      if (creationForm.description_seo) {
        submitForm.contents.push({
          language_code: "vi",
          language_field: "description_seo",
          language_value: creationForm.description_seo,
        });
      }
      if (creationForm.description_seo_en) {
        submitForm.contents.push({
          language_code: "en",
          language_field: "description_seo",
          language_value: creationForm.description_seo_en,
        });
      }
      if (creationForm.redirect_slug_302) {
        submitForm.contents.push({
          language_code: "vi",
          language_field: "redirect_slug_302",
          language_value: creationForm.redirect_slug_302,
        });
      }
      if (creationForm.redirect_slug_302_en) {
        submitForm.contents.push({
          language_code: "en",
          language_field: "redirect_slug_302",
          language_value: creationForm.redirect_slug_302_en,
        });
      }
      if (creationForm.redirect_slug) {
        submitForm.contents.push({
          language_code: "vi",
          language_field: "redirect_slug",
          language_value: creationForm.redirect_slug,
        });
      }
      if (creationForm.redirect_slug_en) {
        submitForm.contents.push({
          language_code: "en",
          language_field: "redirect_slug",
          language_value: creationForm.redirect_slug_en,
        });
      }
      onSave(submitForm);
    } catch (error) {
      console.log(error);
      onClose();
    }
  };

  const handleSubmitUpdate = async () => {
    let errorMessages = lodash.cloneDeep(creationFormErrorMessagesInitialState);
    let errorsCount = 0;
    if (creationForm.vie_category_name === "") {
      errorMessages.vie_category_name = "Tên chuyên mục (VN) được yêu cầu";
      errorsCount = errorsCount + 1;
    } else if (creationForm.vie_category_name.length >= 30) {
      errorMessages.vie_category_name = "Không được quá 30 kí tự";
      errorsCount = errorsCount + 1;
    }
    if (creationForm.eng_category_name === "") {
      errorMessages.eng_category_name = "Tên chuyên mục (EN) được yêu cầu";
      errorsCount = errorsCount + 1;
    } else if (creationForm.eng_category_name.length >= 30) {
      errorMessages.eng_category_name = "Không được quá 30 kí tự";
      errorsCount = errorsCount + 1;
    }
    if (
      creationForm.vie_slug !== "" &&
      !isValidUrlSlug(creationForm.vie_slug)
    ) {
      errorMessages.vie_slug = "Slug chỉ bao gồm chữ thường, -, và chữ số";
      errorsCount = errorsCount + 1;
    }
    if (
      creationForm.eng_slug !== "" &&
      !isValidUrlSlug(creationForm.eng_slug)
    ) {
      errorMessages.eng_slug =
        "Slug chỉ bao gồm chữ thường, -, và chữ số";
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
      return;
    }
    try {
      let submitForm = {
        contents: [
          // {
          //   language_code: "vi",
          //   language_field: "name",
          //   language_value: creationForm.vie_category_name,
          // },
          // {
          //   language_code: "en",
          //   language_field: "name",
          //   language_value: creationForm.eng_category_name,
          // },
        ],
      };
      if(creationForm.vie_category_name){
        submitForm.contents.push({
          language_code: "vi",
          language_field: "name",
          language_value: creationForm.vie_category_name,
        })
      }
      if(creationForm.eng_category_name){
        submitForm.contents.push({
          language_code: "en",
            language_field: "name",
            language_value: creationForm.eng_category_name,
        })
      }
      if (creationForm.vie_slug) {
        submitForm.contents.push({
          language_code: "vi",
          language_field: "slug",
          language_value: creationForm.vie_slug,
        });
      }
      if (creationForm.eng_slug) {
        submitForm.contents.push({
          language_code: "en",
          language_field: "slug",
          language_value: creationForm.eng_slug,
        });
      }
      if (creationForm.title_seo) {
        submitForm.contents.push({
          language_code: "vi",
          language_field: "title_seo",
          language_value: creationForm.title_seo,
        });
      }
      if (creationForm.title_seo_en) {
        submitForm.contents.push({
          language_code: "en",
          language_field: "title_seo",
          language_value: creationForm.title_seo_en,
        });
      }
      if (creationForm.description_seo) {
        submitForm.contents.push({
          language_code: "vi",
          language_field: "description_seo",
          language_value: creationForm.description_seo,
        });
      }
      if (creationForm.description_seo_en) {
        submitForm.contents.push({
          language_code: "en",
          language_field: "description_seo",
          language_value: creationForm.description_seo_en,
        });
      }
      if (creationForm.redirect_slug_302) {
        submitForm.contents.push({
          language_code: "vi",
          language_field: "redirect_slug_302",
          language_value: creationForm.redirect_slug_302,
        });
      }
      if (creationForm.redirect_slug_302_en) {
        submitForm.contents.push({
          language_code: "en",
          language_field: "redirect_slug_302",
          language_value: creationForm.redirect_slug_302_en,
        });
      }
      if (creationForm.redirect_slug) {
        submitForm.contents.push({
          language_code: "vi",
          language_field: "redirect_slug",
          language_value: creationForm.redirect_slug,
        });
      }
      if (creationForm.redirect_slug_en) {
        submitForm.contents.push({
          language_code: "en",
          language_field: "redirect_slug",
          language_value: creationForm.redirect_slug_en,
        });
      }
      onSave(submitForm);
    } catch (error) {
      console.log(error);
      onClose();
    }
  };

  return (
    <BasicModal
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={
        mode === NEWS_CATEGORIES_SCREEN_CREATION_MODE
          ? handleSubmitCreate
          : handleSubmitUpdate
      }
      isNewsCategory={true}
      // readyForSave={readyForSave}
    >
      <div>
        <p>Tên chuyên mục (VN)*</p>
        <TextField
          type="text"
          variant="outlined"
          className={classes.input}
          error={creationFormErrorMessages.vie_category_name !== ""}
          placeholder="Nhập tên chuyên mục"
          name="vie_category_name"
          defaultValue={creationForm.vie_category_name}
          onChange={(evt) => handleChange(evt)}
          helperText={creationFormErrorMessages.vie_category_name}
        />
      </div>
      <div>
        <p>Slug (VN)*</p>
        <TextField
          type="text"
          variant="outlined"
          className={classes.input}
          error={creationFormErrorMessages.vie_slug !== ""}
          placeholder="Nhập slug"
          name="vie_slug"
          defaultValue={creationForm.vie_slug}
          onChange={(evt) => handleChange(evt)}
          helperText={creationFormErrorMessages.vie_slug}
        />
      </div>
      <div>
        <p>Redirect slug 301 (VN)</p>
        <TextField
          type="text"
          variant="outlined"
          className={classes.input}
          placeholder="Nhập redirect slug 301"
          name="redirect_slug"
          defaultValue={creationForm.redirect_slug}
          onChange={(evt) => handleChange(evt)}
          helperText={creationFormErrorMessages.redirect_slug}
        />
      </div>
      <div>
        <p>Redirect slug 302 (VN)</p>
        <TextField
          type="text"
          variant="outlined"
          className={classes.input}
          placeholder="Nhập redirect slug 302"
          name="redirect_slug_302"
          defaultValue={creationForm.redirect_slug_302}
          onChange={(evt) => handleChange(evt)}
          helperText={creationFormErrorMessages.redirect_slug_302}
        />
      </div>
      <div>
        <p>Tiêu đề SEO (VN)*</p>
        <TextField
          type="text"
          variant="outlined"
          className={classes.input}
          error={creationFormErrorMessages.title_seo !== ""}
          placeholder="Nhập tiêu đề SEO"
          name="title_seo"
          defaultValue={creationForm.title_seo}
          onChange={(evt) => handleChange(evt)}
          helperText={creationFormErrorMessages.title_seo}
        />
      </div>
      <div>
        <p>Mô tả SEO (VN)*</p>
        <TextField
          type="text"
          variant="outlined"
          className={classes.input}
          error={creationFormErrorMessages.description_seo !== ""}
          placeholder="Nhập mô tả SEO"
          name="description_seo"
          defaultValue={creationForm.description_seo}
          onChange={(evt) => handleChange(evt)}
          helperText={creationFormErrorMessages.description_seo}
        />
      </div>
      <div>
        <p>Tên chuyên mục (ENG)*</p>
        <TextField
          type="text"
          variant="outlined"
          className={classes.input}
          error={creationFormErrorMessages.eng_category_name !== ""}
          placeholder="Enter category name"
          name="eng_category_name"
          defaultValue={creationForm.eng_category_name}
          onChange={(evt) => handleChange(evt)}
          helperText={creationFormErrorMessages.eng_category_name}
        />
      </div>
      <div>
        <p>Slug (ENG)*</p>
        <TextField
          type="text"
          variant="outlined"
          className={classes.input}
          error={creationFormErrorMessages.eng_slug !== ""}
          placeholder="Enter slug"
          name="eng_slug"
          defaultValue={creationForm.eng_slug}
          onChange={(evt) => handleChange(evt)}
          helperText={creationFormErrorMessages.eng_slug}
        />
      </div>
      <div>
        <p>Redirect slug 301 (EN)</p>
        <TextField
          type="text"
          variant="outlined"
          className={classes.input}
          placeholder="Enter redirect slug 301"
          name="redirect_slug_en"
          defaultValue={creationForm.redirect_slug_en}
          onChange={(evt) => handleChange(evt)}
          helperText={creationFormErrorMessages.redirect_slug_en}
        />
      </div>
      <div>
        <p>Redirect slug 302 (EN)</p>
        <TextField
          type="text"
          variant="outlined"
          className={classes.input}
          placeholder="Enter redirect slug 302"
          name="redirect_slug_302_en"
          defaultValue={creationForm.redirect_slug_302_en}
          onChange={(evt) => handleChange(evt)}
          helperText={creationFormErrorMessages.redirect_slug_302_en}
        />
      </div>
      <div>
        <p>Title SEO (ENG)*</p>
        <TextField
          type="text"
          variant="outlined"
          className={classes.input}
          error={creationFormErrorMessages.title_seo_en !== ""}
          placeholder="Enter title SEO"
          name="title_seo_en"
          defaultValue={creationForm.title_seo_en}
          onChange={(evt) => handleChange(evt)}
          helperText={creationFormErrorMessages.title_seo_en}
        />
      </div>
      <div>
        <p>Description SEO (ENG)*</p>
        <TextField
          type="text"
          variant="outlined"
          className={classes.input}
          error={creationFormErrorMessages.description_seo_en !== ""}
          placeholder="Enter description SEO"
          name="description_seo_en"
          defaultValue={creationForm.description_seo_en}
          onChange={(evt) => handleChange(evt)}
          helperText={creationFormErrorMessages.description_seo_en}
        />
      </div>
    </BasicModal>
  );
}
