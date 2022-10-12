import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {NEWS_SCREEN_CREATION_MODE} from "app/constants/news";
import {getProductCategory} from "app/services/axios";
import * as AppURL from "app/services/urlAPI";
import * as Utils from "app/utils";
import React, {useContext, useEffect, useState} from "react";
import {NewsCreationContext} from "../context";

const useStyles = makeStyles((theme) => ({
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
  input: {
    width: "100%",
    fontSize: "14px !important",
  },
  inputDisable: {
    width: "100%",
    fontSize: "14px !important",
    backgroundColor: "#ededed",
  },
  textarea: {
    width: "100%",
    fontSize: "14px",
    fontStyle: "normal",
  },
  selectInput: {
    color: "#898989",
    fontWeight: "400",
  },
  title: {
    fontSize: "14px",
    color: "#000000",
    fontWeight: "400",
  },
  time: {
    // fontSize: '13px',
    textDecoration: "underline",
    color: "#2154ff",
    marginLeft: "16px",
  },
  feature: {
    fontSize: "14px",
  },
  notetxt: {
    fontStyle: "italic",
    color: "#ED0017",
    fontSize: "12px",
  },
}));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#1a43cc",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#1a43cc",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#1a43cc",
      },
    },
  },
})(TextField);

const status_types = [
  {
    id: 1,
    value: 1,
    label_vi: "Bản nháp",
    label_en: "Draft",
  },
  {
    id: 2,
    value: 2,
    label_vi: "Xuất bản",
    label_en: "Publish",
  },
  // {
  //   id: 3,
  //   value: 3,
  //   label_vi: "Chờ xuất bản",
  //   label_en: 'Schedule'
  // }
];

export default function Content({
  listCate,
  creationFormErrorMessages,
  setCreationFormErrorMessages,
  totalPublicFeatures,
  totalPrivateFeatures,
  mode,
  lan,
}) {
  const classes = useStyles();
  const context = useContext(NewsCreationContext);
  const {
    state: {detail},
    dispatch,
  } = context;

  const [featurePublicIsUpdated, setFeaturePublicIsUpdated] = useState(false);
  const [featurePrivateIsUpdated, setFeaturePrivateIsUpdated] = useState(false);
  const [totalPrivate, setTotalPrivate] = useState(totalPrivateFeatures);

  const {
    name,
    category,
    status,
    scheduled_at,
    author,
    updated_at,
    desc,
    featurePublic,
    featurePrivate,
    nameEN,
    descEN,
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
  } = detail;

  useEffect(async () => {
    let totalFeaturesUrl = Utils.replaceStrUrl(AppURL.getNews, [1, 100]);
    totalFeaturesUrl += `&is_private_features=1&category=${detail.category}`;
    await getProductCategory(totalFeaturesUrl).then((res) => {
      const code = Utils.getSafeValue(res, "code", 0);
      if (code === 200) {
        const data = Utils.getSafeValue(res, "data", {});
        const total = Utils.getSafeValue(data, "totalRecords", 0);
        setTotalPrivate(total);
      }
    });
  }, [detail.category]);

  const handleChange = (evt) => {
    dispatch({
      type: "updateDetailInput",
      payload: {
        key: evt.target.name,
        value: evt.target.value,
      },
    });
    if (evt.target.value !== "") {
      setCreationFormErrorMessages({
        ...creationFormErrorMessages,
        [evt.target.name]: "",
      });
    }
  };

  const handleChangeStatus = (evt) => {
    dispatch({
      type: "updateDetailInput",
      payload: {
        key: evt.target.name,
        value: evt.target.value,
      },
    });
    if (evt.target.value !== "") {
      setCreationFormErrorMessages({
        ...creationFormErrorMessages,
        [evt.target.name]: "",
      });
    }
    if (evt.target.value !== 3) {
      const now = new Date().getTime() + 7 * 3600 * 1000;
      const time = new Date(now).toISOString();
      const filterTime = time.substring(0, 16);
      dispatch({
        type: "updateDetailInput",
        payload: {
          key: "scheduled_at",
          value: filterTime,
        },
      });
      if (scheduled_at !== "") {
        setCreationFormErrorMessages({
          ...creationFormErrorMessages,
          scheduled_at: "",
        });
      }
    }
  };

  const handleChangeFeaturePublic = (e) => {
    dispatch({
      type: "updateDetailInput",
      payload: {
        key: "featurePublic",
        value: e.target.checked,
      },
    });
    setFeaturePublicIsUpdated(!featurePublicIsUpdated);
  };

  const handleChangeFeaturePrivate = (e) => {
    dispatch({
      type: "updateDetailInput",
      payload: {
        key: "featurePrivate",
        value: e.target.checked,
      },
    });
    setFeaturePrivateIsUpdated(!featurePrivateIsUpdated);
  };

  return (
    <>
      <Grid container className={classes.grid}>
        <Grid item xs={6} className={classes.gridItemLeft}>
          <p className={classes.title}>
            {lan === "vi" ? "Tiêu đề tiếng Việt *" : "Title"}
          </p>
          {lan === "vi" ? (
            <TextField
              variant="outlined"
              className={classes.input}
              placeholder="Nhập tên tiêu đề tiếng Việt"
              name="name"
              value={name}
              onChange={handleChange}
              error={creationFormErrorMessages.name !== ""}
              helperText={creationFormErrorMessages.name}
            />
          ) : (
            <TextField
              variant="outlined"
              className={classes.input}
              placeholder="Enter title"
              name="nameEN"
              value={nameEN}
              onChange={handleChange}
            />
          )}
        </Grid>
        <Grid item xs={6} className={classes.gridItemRight}>
          <p className={classes.title}>
            {lan === "vi" ? "Chuyên mục" : "Category"} *
          </p>
          <TextField
            required
            name="category"
            className={classes.input}
            select
            value={category}
            onChange={handleChange}
            variant="outlined"
            error={creationFormErrorMessages.category !== ""}
            helperText={creationFormErrorMessages.category}
            SelectProps={{
              MenuProps: {
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
              },
            }}
          >
            <MenuItem value="" disabled>
              <span className={classes.selectInput}>-Chọn chuyên mục-</span>
            </MenuItem>
            {listCate.length > 0 &&
              listCate.map((option) => {
                return <MenuItem value={option.value}>{option.label}</MenuItem>;
              })}
          </TextField>
        </Grid>
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item xs={6} className={classes.gridItemLeft}>
          <p className={classes.title}>
            {lan === "vi" ? "Trạng thái" : "Status"} *
          </p>
          <TextField
            required
            name="status"
            className={classes.input}
            select
            value={status}
            onChange={handleChangeStatus}
            variant="outlined"
            error={creationFormErrorMessages.status !== ""}
            helperText={creationFormErrorMessages.status}
            SelectProps={{
              MenuProps: {
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
              },
            }}
          >
            <MenuItem value={0} disabled style={{}}>
              <span className={classes.selectInput}>
                {lan === "vi" ? "-Chọn trạng thái-" : "-Select status-"}
              </span>
            </MenuItem>
            {status_types.map((option) => {
              let label = lan === "vi" ? option.label_vi : option.label_en;
              return <MenuItem value={option.value}>{label}</MenuItem>;
            })}
          </TextField>
        </Grid>
        <Grid item xs={6} className={classes.gridItemRight}>
          <p className={classes.title}>
            {lan === "vi" ? "Ngày xuất bản" : "Publish date"} *
          </p>
          <CssTextField
            disabled={status !== 3}
            name="scheduled_at"
            value={scheduled_at}
            className={classes.input}
            variant="outlined"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: scheduled_at,
            }}
            onChange={handleChange}
          />
          {creationFormErrorMessages.scheduled_at !== "" && (
            <div
              style={{fontSize: 12, color: "red", marginTop: 3, marginLeft: 15}}
            >
              {creationFormErrorMessages.scheduled_at}
            </div>
          )}
        </Grid>
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item xs={6} className={classes.gridItemLeft}>
          <p className={classes.title}>
            {lan === "vi" ? "Tác giả" : "Author"} *
          </p>
          <TextField
            value={author}
            variant="outlined"
            required
            className={classes.input}
            placeholder={
              lan === "vi" ? "Nhập tên tác giả" : "Enter author's name"
            }
            name="author"
            onChange={handleChange}
            error={creationFormErrorMessages.author !== ""}
            helperText={creationFormErrorMessages.author}
          />
        </Grid>
        <Grid item xs={6} className={classes.gridItemRight}>
          <p className={classes.title}>
            {lan === "vi" ? "Ngày sửa gần nhất" : "Last edited date"}
          </p>
          <TextField
            value={updated_at}
            variant="outlined"
            className={classes.inputDisable}
            name="updated_at"
            disabled
          />
        </Grid>
      </Grid>
      <Grid container className={classes.grid}>
        <p className={classes.title}>
          {lan === "vi" ? "Mô tả *" : "Description"}
        </p>
        {lan === "vi" ? (
          <TextField
            value={desc}
            variant="outlined"
            className={classes.input}
            name="desc"
            placeholder="Nhập mô tả"
            onChange={handleChange}
            error={creationFormErrorMessages.desc !== ""}
            helperText={creationFormErrorMessages.desc}
          />
        ) : (
          <TextField
            value={descEN}
            variant="outlined"
            className={classes.input}
            name="descEN"
            placeholder="Enter description"
            onChange={handleChange}
          />
        )}
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item xs={6} className={classes.gridItemLeft}>
          <p className={classes.title}>
            {lan === "vi" ? "Chọn loại tin" : "Select news type"} :
          </p>
          <div className={classes.input}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={featurePrivate}
                  onChange={handleChangeFeaturePrivate}
                  disabled={
                    mode === NEWS_SCREEN_CREATION_MODE
                      ? totalPrivate === 4
                        ? true
                        : false
                      : totalPrivate === 4 &&
                        !detail.featurePrivate &&
                        !featurePrivateIsUpdated
                      ? true
                      : false
                  }
                />
              }
              label={
                <Typography className={classes.feature}>
                  {lan === "vi" ? "Nổi bật riêng" : "Category feature"}
                </Typography>
              }
            />
            <span className={classes.notetxt}>
              {lan === "vi"
                ? "(Ẩn khi đã đủ danh mục nổi bật)"
                : "Disable when category feature is full"}
            </span>
          </div>
          <div className={classes.input}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={featurePublic}
                  onChange={handleChangeFeaturePublic}
                  disabled={
                    mode === NEWS_SCREEN_CREATION_MODE
                      ? totalPublicFeatures === 4
                        ? true
                        : false
                      : totalPublicFeatures === 4 &&
                        !detail.featurePublic &&
                        !featurePublicIsUpdated
                      ? true
                      : false
                  }
                />
              }
              label={
                <Typography className={classes.feature}>
                  {lan === "vi" ? "Nổi bật chung" : "General feature"}
                </Typography>
              }
            />
            <span className={classes.notetxt}>
              {lan === "vi"
                ? "(Ẩn khi đã đủ danh mục nổi bật)"
                : "Disable when general feature is full"}
            </span>
          </div>
        </Grid>
        <Grid item xs={6} className={classes.gridItemRight}>
          <p className={classes.title}>Slug</p>
          {lan === "vi" && (
            <TextField
              variant="outlined"
              className={classes.input}
              placeholder="Nhập slug"
              name="slug"
              value={slug}
              onChange={handleChange}
              error={creationFormErrorMessages.slug !== ""}
              helperText={creationFormErrorMessages.slug}
            />
          )} {lan === "en" &&  (
            <TextField
              variant="outlined"
              className={classes.input}
              placeholder="Enter slug"
              name="slugEN"
              value={slugEN}
              onChange={handleChange}
              error={creationFormErrorMessages.slugEN !== ""}
              helperText={creationFormErrorMessages.slugEN}
            />
          )}
          <p className={classes.title}>Redirect slug 301</p>
          {lan === "vi" && (
            <TextField
              variant="outlined"
              className={classes.input}
              placeholder="Nhập redirect slug 301"
              name="redirect_slug"
              value={redirect_slug}
              onChange={handleChange}
              helperText={creationFormErrorMessages.redirect_slug}
            />
          ) }{lan === "en" &&(
            <TextField
              variant="outlined"
              className={classes.input}
              placeholder="Enter redirect slug 301"
              name="redirect_slug_en"
              value={redirect_slug_en}
              onChange={handleChange}
              helperText={creationFormErrorMessages.redirect_slug_en}
            />
          )}
          <p className={classes.title}>Redirect slug 302</p>
          {lan === "vi" && (
            <TextField
              variant="outlined"
              className={classes.input}
              placeholder="Nhập redirect slug 302"
              name="redirect_slug_302"
              value={redirect_slug_302}
              onChange={handleChange}
              helperText={creationFormErrorMessages.redirect_slug_302}
            />
          ) }{lan === "en" &&(
            <TextField
              variant="outlined"
              className={classes.input}
              placeholder="Enter redirect slug 302"
              name="redirect_slug_302_en"
              value={redirect_slug_302_en}
              onChange={handleChange}
              helperText={creationFormErrorMessages.redirect_slug_302_en}
            />
          )}

        </Grid>

      </Grid>
      <Grid container className={classes.grid}>
        <p className={classes.title}>
          {lan === "vi" ? "Tiêu đề SEO" : "Title SEO"}
        </p>
        {lan === "vi" ? (
          <TextField
            value={title_seo}
            variant="outlined"
            className={classes.input}
            name="title_seo"
            placeholder="Nhập tiêu đề SEO"
            onChange={handleChange}
            error={creationFormErrorMessages.title_seo !== ""}
            helperText={creationFormErrorMessages.title_seo}
          />
        ) : (
          <TextField
            value={title_seo_en}
            variant="outlined"
            className={classes.input}
            name="title_seo_en"
            placeholder="Enter title SEO"
            onChange={handleChange}
          />
        )}
      </Grid>
      <Grid container className={classes.grid}>
        <p className={classes.title}>
          {lan === "vi" ? "Mô tả SEO" : "Description SEO"}
        </p>
        {lan === "vi" ? (
          <TextField
            value={description_seo}
            variant="outlined"
            className={classes.input}
            name="description_seo"
            placeholder="Nhập mô tả SEO"
            onChange={handleChange}
            error={creationFormErrorMessages.description_seo !== ""}
            helperText={creationFormErrorMessages.description_seo}
          />
        ) : (
          <TextField
            value={description_seo_en}
            variant="outlined"
            className={classes.input}
            name="description_seo_en"
            placeholder="Enter description SEO"
            onChange={handleChange}
          />
        )}
      </Grid>
    </>
  );
}
