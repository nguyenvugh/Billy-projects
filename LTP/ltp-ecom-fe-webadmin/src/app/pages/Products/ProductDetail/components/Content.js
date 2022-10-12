import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormControl,
} from "@material-ui/core";
import parse from "html-react-parser";
import * as Utils from "app/utils";

const useStyles = makeStyles((theme) => ({
  grid: {
    marginBottom: "10px",
  },
  featureProductCount: {
    color: "#ED0017",
    fontWeight: "italic",
  },
  input: {
    width: "100%",
    fontSize: "14px !important",
  },
  textarea: {
    width: "100%",
    fontSize: "14px",
  },
  description: {
    color: "rgba(0,0,0,0.38)",
    height: "140px",
    width: "100%",
    border: "1px solid rgba(0,0,0,0.38)",
    borderRadius: "4px",
    paddingLeft: "14px",
    paddingRight: "14px",
    overflow: "scroll",
  },
  title: {
    fontSize: "14px",
    lineHeight: "16px",
    color: "#000000",
    marginBottom: "8px",
    fontWeight: "400",
  },
  label: {
    marginBottom: "5px",
  },
  inputCheckbox: {
    width: "30%",
    fontSize: "14px !important",
  },
  noBorder: {
    border: "none",
  },
}));

export default function Content({ productDetail, listChildCate, lan }) {
  const classes = useStyles();
  const {
    product_code,
    product_status,
    product_name,
    product_quantity,
    product_category,
    product_parent_category,
    product_price,
    short_desc,
    product_description,
    num_sold,
    num_like,
    avg_rating,
    weight,
    width,
    height,
    length,
    allow_cod,
    product_name_en,
    short_desc_en,
    product_description_en,
    product_slug,
    product_slug_en,
    title_seo,
    description_seo,
    title_seo_en,
    description_seo_en,
    redirect_slug_302,
    redirect_slug_302_en,
    redirect_slug,
    redirect_slug_en,
  } = productDetail;

  return (
    <>
      <Grid container className={classes.grid} spacing={4}>
        <Grid item xs={6}>
          <p className={classes.title}>
            {lan === "vi" ? "Mã sản phẩm" : "Product code"} *
          </p>
          <TextField
            disabled
            variant="outlined"
            required
            className={classes.input}
            name="product_code"
            value={product_code}
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <p className={classes.title}>
            {lan === "vi" ? "Trạng thái" : "Status"} *
          </p>
          <TextField
            disabled
            required
            className={classes.input}
            select
            variant="outlined"
            value={product_status}
            size="small"
          >
            <MenuItem value={true}>Hiện</MenuItem>
            <MenuItem value={false}>Ẩn</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Grid container className={classes.grid} spacing={4}>
        <Grid item xs={6}>
          <p className={classes.title}>
            {lan === "vi" ? "Tên sản phẩm *" : "Product name"}
          </p>
          {lan === "vi" ? (
            <TextField
              disabled
              variant="outlined"
              required
              className={classes.input}
              name="product_name"
              value={product_name}
              size="small"
            />
          ) : (
            <TextField
              disabled
              variant="outlined"
              required
              className={classes.input}
              name="product_name_en"
              value={product_name_en}
              size="small"
            />
          )}
        </Grid>
        <Grid item xs={6}>
          <p className={classes.title}>
            {lan === "vi" ? "Số lượng" : "Quantity"} *
          </p>
          <TextField
            disabled
            variant="outlined"
            required
            className={classes.input}
            name="product_quantity"
            value={Intl.NumberFormat("vi-VI").format(product_quantity)}
            size="small"
          />
        </Grid>
      </Grid>
      <Grid container className={classes.grid} spacing={4}>
        <Grid item xs={6}>
          <p className={classes.title}>
            {lan === "vi" ? "Danh mục con" : "Subcategory"} *
          </p>
          <FormControl
            variant="outlined"
            className={classes.input}
            size="small"
          >
            <Select disabled value={product_category} name="product_category">
              {listChildCate.length > 0 &&
                listChildCate.map((item) => {
                  const id = Utils.getSafeValue(item, "id", 0);
                  const translates = Utils.getSafeValue(item, "translates", []);
                  const name = Utils.getField(translates, "vi", "name");
                  return (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <p className={classes.title}>
            {lan === "vi" ? "Danh mục cha" : "Parent category"}
          </p>
          <TextField
            disabled
            variant="outlined"
            className={classes.input}
            name="product_parent_category"
            value={product_parent_category}
            size="small"
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.grid} spacing={4}>
        <Grid item xs={6}>
          <p className={classes.label}>
            {lan === "vi" ? "Kích thước" : "Size"} (cm)*
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              border: "1px solid #c4c4c4",
              borderRadius: "4px",
              marginTop: "-1px",
              marginBottom: "-1px",
            }}
          >
            <TextField
              className={classes.inputCheckbox}
              disabled
              variant="outlined"
              name="length"
              value={length}
              placeholder="Dài"
              inputProps={{ style: { textAlign: "center" } }}
              InputProps={{
                classes: { notchedOutline: classes.noBorder },
              }}
              size="small"
            />
            <span style={{ margin: "auto" }}>X</span>
            <TextField
              className={classes.inputCheckbox}
              disabled
              variant="outlined"
              name="width"
              value={width}
              placeholder="Rộng"
              inputProps={{ style: { textAlign: "center" } }}
              InputProps={{
                classes: { notchedOutline: classes.noBorder },
              }}
              size="small"
            />
            <span style={{ margin: "auto" }}>X</span>
            <TextField
              className={classes.inputCheckbox}
              disabled
              variant="outlined"
              name="height"
              value={height}
              placeholder="Cao"
              inputProps={{ style: { textAlign: "center" } }}
              InputProps={{
                classes: { notchedOutline: classes.noBorder },
              }}
              size="small"
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <p className={classes.label}>
            {lan === "vi" ? "Khối lượng" : "Weight"} (kg)*
          </p>
          <TextField
            variant="outlined"
            disabled
            className={classes.input}
            placeholder="Nhập khối lượng"
            name="weight"
            value={weight}
            size="small"
          />
        </Grid>
      </Grid>
      <Grid container className={classes.grid} spacing={4}>
        <Grid
          item
          xs={6}
          style={{
            paddingTop: "3.5vw",
          }}
        >
          <FormControlLabel
            style={{
              marginRight: "5px",
            }}
            control={
              <Checkbox
                checked={allow_cod === true || allow_cod === 1}
                disabled
              />
            }
            label={lan === "vi" ? "Cho phép COD" : "Allow COD"}
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <p className={classes.title}>
            {lan === "vi" ? "Giá bán" : "Price"} *
          </p>
          <TextField
            disabled
            // type="number"
            variant="outlined"
            required
            className={classes.input}
            name="product_price"
            value={Intl.NumberFormat("vi-VI").format(product_price)}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <span>
                    <strong>VND</strong>
                  </span>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.grid} spacing={4}>
        <Grid item xs={6}>
          <p className={classes.title}>
            {lan === "vi" ? "Lượt yêu thích" : "Favourite count"}
          </p>
          <TextField
            disabled
            type="number"
            variant="outlined"
            className={classes.input}
            name="num_like"
            value={num_like}
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <p className={classes.title}>
            {lan === "vi" ? "Trung bình đánh giá" : "Average rating"}
          </p>
          <TextField
            disabled
            type="text"
            variant="outlined"
            className={classes.input}
            name="avg_rating"
            value={avg_rating}
            size="small"
          />
        </Grid>
      </Grid>
      <Grid container className={classes.grid} spacing={4}>
        <Grid item xs={6}>
          <p className={classes.title}>{lan === "vi" ? "Đã bán" : "Sold"}</p>
          <TextField
            disabled
            type="number"
            variant="outlined"
            className={classes.input}
            name="num_sold"
            value={num_sold}
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <p className={classes.title}>Slug</p>
          {lan === "vi" ? (
            <TextField
              disabled
              type="text"
              variant="outlined"
              className={classes.input}
              name="product_slug"
              value={product_slug}
              size="small"
            />
          ) : (
            <TextField
              disabled
              type="text"
              variant="outlined"
              className={classes.input}
              name="product_slug_en"
              value={product_slug_en}
              size="small"
            />
          )}
        </Grid>
        <Grid item xs={6}>
          <p className={classes.title}>Redirect Slug 302</p>
          {lan === "vi" && (
            <TextField
              disabled
              type="text"
              variant="outlined"
              className={classes.input}
              name="redirect_slug_302"
              value={redirect_slug_302}
              size="small"
            />
          )}{" "}
          {lan === "en" && (
            <TextField
              disabled
              type="text"
              variant="outlined"
              className={classes.input}
              name="redirect_slug_302_en"
              value={redirect_slug_302_en}
              size="small"
            />
          )}
        </Grid>
        <Grid item xs={6}>
          <p className={classes.title}>Redirect Slug 301</p>
          {lan === "vi" && (
            <TextField
              disabled
              type="text"
              variant="outlined"
              className={classes.input}
              name="redirect_slug"
              value={redirect_slug}
              size="small"
            />
          )}
          {lan === "en" && (
            <TextField
              disabled
              type="text"
              variant="outlined"
              className={classes.input}
              name="redirect_slug_en"
              value={redirect_slug_en}
              size="small"
            />
          )}
        </Grid>
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item xs={12}>
          <p className={classes.title}>
            {lan === "vi" ? "Mô tả ngắn" : "Short description"} *
          </p>
          {lan === "vi" ? (
            <TextField
              disabled
              type="text"
              variant="outlined"
              className={classes.input}
              multiline
              rows={3}
              name="short_desc"
              value={short_desc}
            />
          ) : (
            <TextField
              disabled
              type="text"
              variant="outlined"
              className={classes.input}
              multiline
              rows={3}
              name="short_desc_en"
              value={short_desc_en}
            />
          )}
        </Grid>
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item xs={12}>
          <p className={classes.title}>
            {lan === "vi" ? "Mô tả chi tiết" : "Detail description"}
          </p>
          <div className={classes.description}>
            {parse(lan === "vi" ? product_description : product_description_en)}
          </div>
        </Grid>
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item xs={12}>
          <p className={classes.title}>
            {lan === "vi" ? "Tiêu đề SEO" : "Title SEO"} *
          </p>
          {lan === "vi" ? (
            <TextField
              disabled
              type="text"
              variant="outlined"
              className={classes.input}
              multiline
              rows={3}
              name="title_seo"
              value={title_seo}
            />
          ) : (
            <TextField
              disabled
              type="text"
              variant="outlined"
              className={classes.input}
              multiline
              rows={3}
              name="title_seo_en"
              value={title_seo_en}
            />
          )}
        </Grid>
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item xs={12}>
          <p className={classes.title}>
            {lan === "vi" ? "Mô tả SEO" : "Description SEO"} *
          </p>
          {lan === "vi" ? (
            <TextField
              disabled
              type="text"
              variant="outlined"
              className={classes.input}
              multiline
              rows={3}
              name="description_seo"
              value={description_seo}
            />
          ) : (
            <TextField
              disabled
              type="text"
              variant="outlined"
              className={classes.input}
              multiline
              rows={3}
              name="description_seo_en"
              value={description_seo_en}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}
