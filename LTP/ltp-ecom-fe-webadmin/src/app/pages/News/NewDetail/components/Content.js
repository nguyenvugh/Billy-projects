import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import React from "react";

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

export default function Content({data, lan}) {
  const classes = useStyles();

  const {
    name,
    desc,
    category,
    status,
    filter_scheduled_at,
    author,
    updated_at_date,
    feature,
    listCate,
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
  } = data;

  return (
    <>
      <Grid container className={classes.grid}>
        <Grid item xs={6} className={classes.gridItemLeft}>
          <p className={classes.title}>
            {lan === "vi" ? "Tiêu đề tiếng Việt *" : "Title"}
          </p>
          <TextField
            disabled
            variant="outlined"
            required
            className={classes.input}
            placeholder={
              lan === "vi" ? "Nhập tên tiêu đề tiếng Việt" : "Enter title"
            }
            name="name"
            value={lan === "vi" ? name : nameEN}
          />
        </Grid>
        <Grid item xs={6} className={classes.gridItemRight}>
          <p className={classes.title}>
            {lan === "vi" ? "Chuyên mục" : "Category"} *
          </p>
          <FormControl className={classes.input}>
            <Select
              disabled
              value={parseInt(category)}
              displayEmpty
              variant="outlined"
            >
              {listCate &&
                listCate.map((option) => {
                  return (
                    <MenuItem value={option.value}>{option.label}</MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item xs={6} className={classes.gridItemLeft}>
          <p className={classes.title}>
            {lan === "vi" ? "Trạng thái" : "Status"} *
          </p>
          <TextField
            disabled
            variant="outlined"
            required
            className={classes.input}
            name="status"
            value={
              status === 1
                ? lan === "vi"
                  ? "Bản nháp"
                  : "Draft"
                : status === 2
                ? lan === "vi"
                  ? "Xuất bản"
                  : "Publish"
                : lan === "vi"
                ? "Chờ xuất bản"
                : "Schedule"
            }
          />
        </Grid>
        <Grid item xs={6} className={classes.gridItemRight}>
          <p className={classes.title}>
            {lan === "vi" ? "Ngày xuất bản" : "Publish date"} *
          </p>
          <CssTextField
            disabled
            className={classes.input}
            variant="outlined"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            value={filter_scheduled_at}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item xs={6} className={classes.gridItemLeft}>
          <p className={classes.title}>
            {lan === "vi" ? "Tác giả" : "Author"} *
          </p>
          <TextField
            disabled
            variant="outlined"
            required
            className={classes.input}
            name="author"
            value={author}
          />
        </Grid>
        <Grid item xs={6} className={classes.gridItemRight}>
          <p className={classes.title}>
            {lan === "vi" ? "Ngày sửa gần nhất" : "Last edited date"}
          </p>
          <TextField
            disabled
            variant="outlined"
            className={classes.inputDisable}
            name="last_modified_date"
            value={updated_at_date}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.grid}>
        <p className={classes.title}>
          {lan === "vi" ? "Mô tả *" : "Description"}
        </p>
        <TextField
          disabled
          variant="outlined"
          required
          className={classes.input}
          name="desc"
          value={lan === "vi" ? desc : descEN}
        />
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item xs={6} className={classes.gridItemLeft}>
          <p className={classes.title}>
            {lan === "vi" ? "Chọn loại tin" : "Select news type"} :
          </p>
          <div className={classes.input}>
            <FormControlLabel
              disabled
              control={<Checkbox checked={feature === 3 || feature === 4} />}
              label={
                <Typography className={classes.feature}>
                  {lan === "vi" ? "Nổi bật riêng" : "Category feature"}
                </Typography>
              }
              style={{marginRight: 30}}
            />
            <FormControlLabel
              disabled
              control={<Checkbox checked={feature === 2 || feature === 4} />}
              label={
                <Typography className={classes.feature}>
                  {lan === "vi" ? "Nổi bật chung" : "General feature"}
                </Typography>
              }
            />
          </div>
        </Grid>
        <Grid item xs={6} className={classes.gridItemRight}>
          <p className={classes.title}>Slug *</p>
          <TextField
            disabled
            variant="outlined"
            className={classes.input}
            name="slug"
            value={lan === "vi" ? slug : slugEN}
          />
           <p className={classes.title}>Redirect slug 301</p>
          <TextField
            disabled
            variant="outlined"
            className={classes.input}
            name="redirect_slug"
            value={lan === "vi" ? redirect_slug : redirect_slug_en}
          />
          <p className={classes.title}>Redirect slug 302</p>
          <TextField
            disabled
            variant="outlined"
            className={classes.input}
            name="redirect_slug_302"
            value={lan === "vi" ? redirect_slug_302 : redirect_slug_302_en}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.grid}>
        <p className={classes.title}>
          {lan === "vi" ? "Tiêu đề SEO*" : "Title SEO"}
        </p>
        {lan === "vi" ? (
          <TextField
            disabled
            variant="outlined"
            className={classes.input}
            name="title_seo"
            value={title_seo}
          />
        ) : (
          <TextField
            disabled
            variant="outlined"
            className={classes.input}
            name="title_seo_en"
            value={title_seo_en}
          />
        )}
      </Grid>
      <Grid container className={classes.grid}>
        <p className={classes.title}>
          {lan === "vi" ? "Mô tả SEO *" : "Description SEO"}
        </p>
        {lan === "vi" ? (
          <TextField
            disabled
            variant="outlined"
            className={classes.input}
            name="description_seo"
            value={description_seo}
          />
        ) : (
          <TextField
            disabled
            variant="outlined"
            className={classes.input}
            name="description_seo_en"
            value={description_seo_en}
          />
        )}
      </Grid>
    </>
  );
}
