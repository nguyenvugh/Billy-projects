import {Divider, FormControl, Grid, MenuItem, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import usFlag from "app/assets/us.png";
import viFlag from "app/assets/vi.png";
import {
  NEWS_SCREEN_CREATION_MODE,
  NEWS_SCREEN_EDIT_MODE,
} from "app/constants/news";
import {urlNews} from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import {
  addNewCate,
  getProductCategory,
  postImage,
  putApi,
} from "app/services/axios";
import * as AppURL from "app/services/urlAPI";
import * as Utils from "app/utils";
import {isEmpty, isValidUrlSlug} from "app/utils/validate";
import lodash from "lodash";
import {useEffect, useReducer, useState} from "react";
import {useHistory, useLocation, useParams} from "react-router-dom";
import Content from "./components/Content";
import ContentTab from "./components/ContentTab";
import ContentTabEN from "./components/ContentTabEN";
import Thumbnail from "./components/Thumbnail";
import Toolbar from "./components/Toolbar";
import {initialState, NewsCreationContext, reducer} from "./context";
import AlertModal from "app/components/AlertModal";

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: "#ffffff",
    padding: "20px",
    marginBottom: "20px",
  },
  thumbnail: {
    padding: "0px 0px 0px 20px",
  },
  titleHeader: {
    marginBottom: "10px",
    fontSize: "16px",
    fontWeight: "400",
    fontStyle: "normal",
    color: "#000000",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
  },
  imgFlag: {
    width: "20px",
    height: "14px",
  },
  marginBottom: {
    marginBottom: "20px",
  },
}));

const creationFormErrorMessagesInitialState = {
  name: "",
  category: "",
  status: "",
  scheduled_at: "",
  author: "",
  updated_at: "",
  desc: "",
  feature: "",
  content: "",
  thumbnail: "",
  slug: "",
  slugEN: "",
  title_seo: "",
  description_seo: "",
  title_seo_en: "",
  description_seo_en: "",
  redirect_slug_302: "",
  redirect_slug_302_en: "",
  redirect_slug: "",
  redirect_slug_en: ""
};

export default function NewCreation() {
  const classes = useStyles();
  const {id} = useParams();
  const location = useLocation();
  const history = useHistory();

  const [state, dispatch] = useReducer(reducer, initialState);

  const [creationFormErrorMessages, setCreationFormErrorMessages] = useState(
    lodash.cloneDeep(creationFormErrorMessagesInitialState)
  );
  const [openLan, setOpenLan] = useState(false);
  const [lan, setLan] = useState("vi");
  const [mode, setMode] = useState(NEWS_SCREEN_CREATION_MODE);
  const [listCate, setListCate] = useState([]);
  const [fileThumbnail, setFileThumbnail] = useState(null);
  const [totalPublicFeatures, setTotalPublicFeatures] = useState(0);
  const [totalPrivateFeatures, setTotalPrivateFeatures] = useState(0);
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [apiError, setError] = useState(false);

  useEffect(async () => {
    try {
      await getProductCategory(AppURL.getAllNewsCategory).then((res) => {
        if (res.code === 200) {
          const data = Utils.getSafeValue(res, "data", []);
          const initialObj = {
            id: 0,
            value: 0,
            label: "Chuyên mục",
          };
          let list = [];
          data.map((cate) => {
            const id = Utils.getSafeValue(cate, "id", 0);
            const translates = Utils.getSafeValue(cate, "translates", []);
            const name = Utils.getField(translates, "vi", "name");
            const objCate = {
              id,
              value: id,
              label: name,
            };
            list.push(objCate);
          });
          setListCate(list);
        }
      });

      let totalFeaturesUrl = Utils.replaceStrUrl(AppURL.getNews, [1, 100]);
      totalFeaturesUrl += `&is_public_features=1`;
      await getProductCategory(totalFeaturesUrl).then((res) => {
        const code = Utils.getSafeValue(res, "code", 0);
        if (code === 200) {
          const data = Utils.getSafeValue(res, "data", {});
          const total = Utils.getSafeValue(data, "totalRecords", 0);
          setTotalPublicFeatures(total);
        }
      });

      if (id) {
        setMode(NEWS_SCREEN_EDIT_MODE);
        const detail = location.state;
        const translates = Utils.getSafeValue(detail, "translates", []);
        const name = Utils.getField(translates, "vi", "name");
        const desc = Utils.getField(translates, "vi", "desc");
        const content = Utils.getField(translates, "vi", "content");
        const nameEN = Utils.getField(translates, "en", "name");
        const contentEN = Utils.getField(translates, "en", "content");
        const descEN = Utils.getField(translates, "en", "desc");
        const slug = Utils.getField(translates, "vi", "slug");
        const slugEN = Utils.getField(translates, "en", "slug");
        const title_seo = Utils.getField(translates, "vi", "title_seo");
        const title_seo_en = Utils.getField(translates, "en", "title_seo");
        const description_seo = Utils.getField(translates, "vi", "description_seo");
        const description_seo_en = Utils.getField(translates, "en", "description_seo");
        const redirect_slug_302 = Utils.getField(translates, "vi", "redirect_slug_302");
        const redirect_slug_302_en = Utils.getField(translates, "en", "redirect_slug_302");
        const redirect_slug = Utils.getField(translates, "vi", "redirect_slug");
        const redirect_slug_en = Utils.getField(translates, "en", "redirect_slug");
        const category = Utils.getSafeValue(detail, "category", 0);
        const status = Utils.getSafeValue(detail, "status", 0);
        const scheduled_at = Utils.getSafeValue(detail, "scheduled_at", "");
        const dateString = new Date(scheduled_at).toLocaleString("vi-VI");
        const dateArr = dateString.split(", ");
        const formatDate = dateArr[1]
          .split("/")
          .reverse()
          .map((item) => {
            if (item.length === 1) return "0" + item;
            return item;
          });
        const filter_scheduled_at =
          formatDate.join("-") + "T" + dateArr[0].slice(0, 5);
        const author = Utils.getSafeValue(detail, "author", "");
        const updated_at = Utils.getSafeValue(detail, "updated_at", "");
        const date = new Date(updated_at);
        const updated_at_date = date.toLocaleDateString("vi-VI");
        const feature = Utils.getSafeValue(detail, "features", 0);
        const featurePublic = feature === 2 || feature === 4;
        const featurePrivate = feature === 3 || feature === 4;
        const thumbnailObj = Utils.getSafeValue(detail, "thumbnail_obj", {});
        const thumbnailUrl = Utils.getSafeValue(thumbnailObj, "url", "");
        const thumbnail = Utils.getSafeValue(detail, "thumbnail", 0);
        setFileThumbnail(thumbnail);
        const payload = {
          name,
          category,
          status,
          scheduled_at: filter_scheduled_at,
          author,
          updated_at: updated_at_date,
          desc,
          featurePublic,
          featurePrivate,
          content,
          thumbnail: thumbnailUrl,
          nameEN,
          descEN,
          contentEN,
          slug,
          slugEN,
          title_seo,
          title_seo_en,
          description_seo,
          description_seo_en,
          redirect_slug_302,
          redirect_slug_302_en,
          redirect_slug,
          redirect_slug_en
        };
        dispatch({
          type: "updateDetail",
          payload,
        });

        // get number of private features in current category
        let totalFeaturesUrl = Utils.replaceStrUrl(AppURL.getNews, [1, 100]);
        totalFeaturesUrl += `&is_private_features=1&category=${category}`;
        await getProductCategory(totalFeaturesUrl).then((res) => {
          const code = Utils.getSafeValue(res, "code", 0);
          if (code === 200) {
            const data = Utils.getSafeValue(res, "data", {});
            const total = Utils.getSafeValue(data, "totalRecords", 0);
            setTotalPrivateFeatures(total);
          }
        });
      }
    } catch (error) {}
  }, [id]);

  const handleCloseLan = () => {
    setOpenLan(false);
  };

  const handleOpenLan = () => {
    setOpenLan(true);
  };

  const handleChangeLan = (e) => {
    setLan(e.target.value);
  };

  const handleCloseModal = () => {
    setError(false);
  };

  const handleSubmit = async () => {
    const {detail} = state;
    let errorMessage = lodash.cloneDeep(creationFormErrorMessagesInitialState);
    let errorsCount = 0;
    if (detail.name === "") {
      errorMessage.name = "Tiêu đề được yêu cầu";
      errorsCount = errorsCount + 1;
    }
    if (typeof detail.category !== "number") {
      errorMessage.category = "Chuyên mục được yêu cầu";
      errorsCount = errorsCount + 1;
    }
    if (detail.status === 0) {
      errorMessage.status = "Trạng thái được yêu cầu";
      errorsCount = errorsCount + 1;
    }
    if (detail.scheduled_at === "") {
      errorMessage.scheduled_at = "Ngày xuất bản được yêu cầu";
      errorsCount = errorsCount + 1;
    }
    if (detail.author === "") {
      errorMessage.author = "Tác giả được yêu cầu";
      errorsCount = errorsCount + 1;
    }
    if (detail.content === "") {
      errorMessage.content = "Nội dung được yêu cầu";
      errorsCount = errorsCount + 1;
    }
    if (detail.desc === "") {
      errorMessage.desc = "Mô tả được yêu cầu";
      errorsCount = errorsCount + 1;
    }
    if (detail.thumbnail === "") {
      errorMessage.thumbnail = "Ảnh thumbnail được yêu cầu";
      errorsCount = errorsCount + 1;
    }
    if (detail.slug !== "" && !isValidUrlSlug(detail.slug)) {
      errorMessage.slug = "Slug chỉ bao gồm chữ thường, -, và chữ số";
      errorsCount = errorsCount + 1;
    }
    if (detail.slugEN !== "" && !isValidUrlSlug(detail.slugEN)) {
      errorMessage.slugEN =
        "Slug only contains lowercase letters, -, and numbers";
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
    if (errorsCount > 0) {
      setLan("vi");
      setCreationFormErrorMessages(errorMessage);
      return;
    }
    try {
      if (mode === NEWS_SCREEN_CREATION_MODE) {
        let formThumbnail = new FormData();
        let thumbnailId;
        formThumbnail.append("file", fileThumbnail);
        await postImage(AppURL.uploadImg, formThumbnail).then((res) => {
          thumbnailId = res.id;
        });
        let scheduled_at = new Date(detail.scheduled_at).toISOString();
        const featurePrivate = Utils.getSafeValue(
          detail,
          "featurePrivate",
          false
        );
        const featurePublic = Utils.getSafeValue(
          detail,
          "featurePublic",
          false
        );
        let features = 1;
        if (featurePrivate && !featurePublic) {
          features = 3;
        } else if (!featurePrivate && featurePublic) {
          features = 2;
        } else if (featurePrivate && featurePublic) {
          features = 4;
        }
        let params = {
          thumbnail_id: thumbnailId,
          category_id: detail.category,
          features,
          author: detail.author,
          status: detail.status,
          scheduled_at,
          contents: [
            // {
            //   language_code: "vi",
            //   language_field: "name",
            //   language_value: detail.name,
            // },
            // {
            //   language_code: "vi",
            //   language_field: "desc",
            //   language_value: detail.desc,
            // },
            // {
            //   language_code: "vi",
            //   language_field: "content",
            //   language_value: detail.content,
            // },

          ],
        };
        if(!isEmpty(detail.content)) {
          params.contents.push( {
            language_code: "vi",
            language_field: "content",
            language_value: detail.content,
          })
        }
        if(!isEmpty(detail.desc)) {
          params.contents.push( {
            language_code: "vi",
            language_field: "desc",
            language_value: detail.desc,
          })
        }
        if(!isEmpty(detail.name)) {
          params.contents.push( {
            language_code: "vi",
            language_field: "name",
            language_value: detail.name,
          })
        }
        if(!isEmpty(detail.nameEN)) {
          params.contents.push( {
            language_code: "en",
            language_field: "name",
            language_value:  detail.nameEN,
          })
        }
        if(!isEmpty(detail.descEN)) {
          params.contents.push({
            language_code: "en",
            language_field: "desc",
            language_value:  detail.descEN,
          })
        }
        if(!isEmpty(detail.contentEN)) {
          params.contents.push( {
            language_code: "en",
            language_field: "content",
            language_value:  detail.contentEN,
          })
        }
        if (!isEmpty(detail.slug)) {
          params.contents.push({
            language_code: "vi",
            language_field: "slug",
            language_value: detail.slug,
          });
        }
        if (!isEmpty(detail.slugEN)) {
          params.contents.push({
            language_code: "en",
            language_field: "slug",
            language_value: detail.slugEN,
          });
        }
        if (!isEmpty(detail.title_seo)) {
          params.contents.push({
            language_code: "vi",
            language_field: "title_seo",
            language_value: detail.title_seo,
          });
        }
        if (!isEmpty(detail.title_seo_en)) {
          params.contents.push({
            language_code: "en",
            language_field: "title_seo",
            language_value: detail.title_seo_en,
          });
        }
        if (!isEmpty(detail.description_seo)) {
          params.contents.push({
            language_code: "vi",
            language_field: "description_seo",
            language_value: detail.description_seo,
          });
        }
        if (!isEmpty(detail.description_seo_en)) {
          params.contents.push({
            language_code: "en",
            language_field: "description_seo",
            language_value: detail.description_seo_en,
          });
        }
        if (!isEmpty(detail.redirect_slug_302)) {
          params.contents.push({
            language_code: "vi",
            language_field: "redirect_slug_302",
            language_value: detail.redirect_slug_302,
          });
        }
        if (!isEmpty(detail.redirect_slug_302_en)) {
          params.contents.push({
            language_code: "en",
            language_field: "redirect_slug_302",
            language_value: detail.redirect_slug_302_en,
          });
        }
        if (!isEmpty(detail.redirect_slug)) {
          params.contents.push({
            language_code: "vi",
            language_field: "redirect_slug",
            language_value: detail.redirect_slug,
          });
        }
        if (!isEmpty(detail.redirect_slug_en)) {
          params.contents.push({
            language_code: "en",
            language_field: "redirect_slug",
            language_value: detail.redirect_slug_en,
          });
        }
        addNewCate(AppURL.createNews, params)
          .then((res) => {
            history.push(urlNews);
          })
          .catch((err) => {
            setError(true);
          });
      } else {
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
        let scheduled_at = new Date(detail.scheduled_at).toISOString();
        // let content = Utils.removeTags(detail.content);
        const featurePrivate = Utils.getSafeValue(
          detail,
          "featurePrivate",
          false
        );
        const featurePublic = Utils.getSafeValue(
          detail,
          "featurePublic",
          false
        );
        let features = 1;
        if (featurePrivate && !featurePublic) {
          features = 3;
        } else if (!featurePrivate && featurePublic) {
          features = 2;
        } else if (featurePrivate && featurePublic) {
          features = 4;
        }
        let params = {
          thumbnail_id: thumbnailId,
          category_id: detail.category,
          features,
          author: detail.author,
          status: detail.status,
          scheduled_at,
          contents: [
            // {
            //   language_code: "vi",
            //   language_field: "name",
            //   language_value: detail.name,
            // },
            // {
            //   language_code: "vi",
            //   language_field: "desc",
            //   language_value: detail.desc,
            // },
            // {
            //   language_code: "vi",
            //   language_field: "content",
            //   language_value: detail.content,
            // },
            // {
            //   language_code: "en",
            //   language_field: "name",
            //   language_value: detail.nameEN,
            // },
            // {
            //   language_code: "en",
            //   language_field: "desc",
            //   language_value: detail.descEN,
            // },
            // {
            //   language_code: "en",
            //   language_field: "content",
            //   language_value: detail.contentEN,
            // },
          ],
        };
        if(!isEmpty(detail.content)){
          params.contents.push({
            language_code: "vi",
            language_field: "content",
            language_value: detail.content,
          })
        }
        if(!isEmpty(detail.desc)){
          params.contents.push({
            language_code: "vi",
            language_field: "desc",
            language_value: detail.desc,
          })
        }
        if(!isEmpty(detail.name)){
          params.contents.push({
            language_code: "vi",
            language_field: "name",
            language_value: detail.name,
          })
        }
        if(!isEmpty(detail.nameEN)){
          params.contents.push({
            language_code: "en",
            language_field: "name",
            language_value: detail.nameEN,
          })
        }
        if(!isEmpty(detail.descEN)){
          params.contents.push({
            language_code: "en",
            language_field: "desc",
            language_value: detail.descEN,
          })
        }
        if(!isEmpty(detail.contentEN)){
          params.contents.push({
            language_code: "en",
            language_field: "content",
            language_value: detail.contentEN,
          })
        }
        if (!isEmpty(detail.slug)) {
          params.contents.push({
            language_code: "vi",
            language_field: "slug",
            language_value: detail.slug,
          });
        }
        if (!isEmpty(detail.slugEN)) {
          params.contents.push({
            language_code: "en",
            language_field: "slug",
            language_value: detail.slugEN,
          });
        }
        if (!isEmpty(detail.title_seo)) {
          params.contents.push({
            language_code: "vi",
            language_field: "title_seo",
            language_value: detail.title_seo,
          });
        }
        if (!isEmpty(detail.title_seo_en)) {
          params.contents.push({
            language_code: "en",
            language_field: "title_seo",
            language_value: detail.title_seo_en,
          });
        }
        if (!isEmpty(detail.description_seo)) {
          params.contents.push({
            language_code: "vi",
            language_field: "description_seo",
            language_value: detail.description_seo,
          });
        }
        if (!isEmpty(detail.description_seo_en)) {
          params.contents.push({
            language_code: "en",
            language_field: "description_seo",
            language_value: detail.description_seo_en,
          });
        }
        if (!isEmpty(detail.redirect_slug_302)) {
          params.contents.push({
            language_code: "vi",
            language_field: "redirect_slug_302",
            language_value: detail.redirect_slug_302,
          });
        }
        if (!isEmpty(detail.redirect_slug_302_en)) {
          params.contents.push({
            language_code: "en",
            language_field: "redirect_slug_302",
            language_value: detail.redirect_slug_302_en,
          });
        }
        if (!isEmpty(detail.redirect_slug)) {
          params.contents.push({
            language_code: "vi",
            language_field: "redirect_slug",
            language_value: detail.redirect_slug,
          });
        }
        if (!isEmpty(detail.redirect_slug_en)) {
          params.contents.push({
            language_code: "en",
            language_field: "redirect_slug",
            language_value: detail.redirect_slug_en,
          });
        }
        const url = Utils.replaceStrUrl(AppURL.updateNews, [id]);
        putApi(url, params)
          .then((res) => {
            history.push(urlNews);
          })
          .catch((error) => {
            const err = error.response?.data;
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSendMail = () => {
    addNewCate(AppURL.sendEmailNews, {news_id: location.state?.id}).then(() => {
      history.push(urlNews);
    });
  };

  return (
    <NewsCreationContext.Provider value={{state, dispatch}}>
      <Toolbar
        onSubmit={handleSubmit}
        mode={mode}
        onSendMail={onSendMail}
        isSendEmail={isSendEmail}
        setIsSendEmail={setIsSendEmail}
        detail={state.detail}
      />
      <div className={classes.main}>
        <Grid container className={classes.flex}>
          <span className={classes.titleHeader}>Tin tức</span>
          <FormControl className={classes.formControl}>
            <Select
              open={openLan}
              onClose={handleCloseLan}
              onOpen={handleOpenLan}
              value={lan}
              onChange={handleChangeLan}
            >
              <MenuItem value={"vi"}>
                <img className={classes.imgFlag} src={viFlag} /> Tiếng Việt
              </MenuItem>
              <MenuItem value={"en"}>
                <img className={classes.imgFlag} src={usFlag} /> Tiếng Anh
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item xs={8}>
            <Content
              listCate={listCate}
              creationFormErrorMessages={creationFormErrorMessages}
              setCreationFormErrorMessages={setCreationFormErrorMessages}
              totalPublicFeatures={totalPublicFeatures}
              mode={mode}
              totalPrivateFeatures={totalPrivateFeatures}
              lan={lan}
            />
          </Grid>
          <Grid item xs={4} className={classes.thumbnail}>
            <Thumbnail
              setFileThumbnail={setFileThumbnail}
              creationFormErrorMessages={creationFormErrorMessages}
              setCreationFormErrorMessages={setCreationFormErrorMessages}
              lan={lan}
            />
          </Grid>
        </Grid>
        <Grid container className={classes.marginBottom}>
          {lan === "vi" ? (
            <ContentTab
              creationFormErrorMessages={creationFormErrorMessages}
              setCreationFormErrorMessages={setCreationFormErrorMessages}
              dispatch={dispatch}
              state={state}
            />
          ) : (
            <ContentTabEN
              creationFormErrorMessages={creationFormErrorMessages}
              setCreationFormErrorMessages={setCreationFormErrorMessages}
              dispatch={dispatch}
              state={state}
            />
          )}
        </Grid>
      </div>
      <AlertModal title="Lỗi" isOpen={apiError} onClose={handleCloseModal}>
        <span>Đã có lỗi xảy ra, vui lòng thử lại sau</span>
      </AlertModal>
    </NewsCreationContext.Provider>
  );
}
