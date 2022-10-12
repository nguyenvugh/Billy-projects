import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextEditors from "app/components/TextEditors";
import * as Utils from "app/utils";
import { formatPrice } from "app/utils/validate";
import lodash from "lodash";
import { useContext, useRef } from "react";
import NumberFormat from "react-number-format";
import { ProductCreationContext } from "../context";

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: "10px 0",
    marginBottom: "10px",
    // fontSize: '14px'
  },
  gridItemLeft: {
    padding: "0px 10px 0px 0px",
    margin: "auto",
  },
  gridItemLeftCheckbox: {
    padding: "2vw 10px 0px 0px",
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
  textarea: {
    width: "100%",
    fontSize: "14px",
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

const NumberFormatCustom = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
    />
  );
};

export default function Content({
  listChildCate,
  currentParent,
  setCurrentParent,
  creationFormErrorMessages,
  setCreationFormErrorMessages,
  lan,
}) {
  const classes = useStyles();

  const context = useContext(ProductCreationContext);
  const {
    state: { detail },
  } = context;

  const handleChange = (evt) => {
    const { dispatch } = context;
    if (
      evt.target.name === "product_quantity" ||
      evt.target.name === "product_price"
    ) {
      const value = parseInt(evt.target.value);
      dispatch({
        type: "updateDetailInput",
        payload: {
          key: evt.target.name,
          value,
        },
      });
    }
    dispatch({
      type: "updateDetailInput",
      payload: {
        key: evt.target.name,
        value: evt.target.value,
      },
    });
    if (
      evt.target.name === "width" ||
      evt.target.name === "height" ||
      evt.target.name === "length"
    ) {
      setCreationFormErrorMessages({
        ...creationFormErrorMessages,
        size: "",
      });
    } else {
      if (evt.target.value !== "") {
        setCreationFormErrorMessages({
          ...creationFormErrorMessages,
          [evt.target.name]: "",
        });
      }
    }
  };

  const handleChangeCate = (evt) => {
    const { dispatch } = context;
    dispatch({
      type: "updateDetailInput",
      payload: {
        key: evt.target.name,
        value: evt.target.value,
      },
    });
    setCreationFormErrorMessages({
      ...creationFormErrorMessages,
      product_category: "",
    });
    const newParent = lodash.find(listChildCate, {
      id: evt.target.value,
    });
    const parent_obj = Utils.getSafeValue(newParent, "parent_obj", {});
    const translates = Utils.getSafeValue(parent_obj, "translates", []);
    const newParentName = Utils.getField(translates, "vi", "name");
    setCurrentParent(newParentName);
  };

  const handleSetCOD = (evt) => {
    const { dispatch } = context;
    console.log(evt.target.checked, "checked");
    dispatch({
      type: "updateDetailInput",
      payload: {
        key: "allow_cod",
        value: evt.target.checked,
      },
    });
  };

  const {
    product_code,
    product_name,
    product_price,
    product_category,
    product_parent_category,
    product_status,
    short_desc,
    product_description,
    width,
    height,
    length,
    weight,
    allow_cod,
    product_name_en,
    short_desc_en,
    product_quantity,
    product_description_en,
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
  } = detail;

  return (
    <>
      <Grid container className={classes.grid}>
        <Grid item xs={6} className={classes.gridItemLeft}>
          <p className={classes.label}>
            {lan === "vi" ? "Mã sản phẩm" : "Product code"} *
          </p>
          <TextField
            variant="outlined"
            className={classes.input}
            placeholder={
              lan === "vi" ? "Nhập mã sản phẩm" : "Enter product code"
            }
            name="product_code"
            value={product_code}
            onChange={handleChange}
            error={creationFormErrorMessages.product_code !== ""}
            helperText={creationFormErrorMessages.product_code}
            size="small"
          />
        </Grid>
        <Grid item xs={6} className={classes.gridItemRight}>
          <p className={classes.label}>
            {lan === "vi" ? "Trạng thái" : "Status"} *
          </p>
          <FormControl
            variant="outlined"
            className={classes.input}
            size="small"
          >
            <Select
              value={product_status}
              onChange={handleChange}
              name="product_status"
            >
              <MenuItem value={false}>Ẩn</MenuItem>
              <MenuItem value={true}>Hiện</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item xs={6} className={classes.gridItemLeft}>
          <p className={classes.label}>
            {lan === "vi" ? "Tên sản phẩm *" : "Product name"}
          </p>
          {lan === "vi" ? (
            <TextField
              variant="outlined"
              className={classes.input}
              placeholder="Nhập tên sản phẩm"
              name="product_name"
              value={product_name}
              onChange={handleChange}
              error={creationFormErrorMessages.product_name !== ""}
              helperText={creationFormErrorMessages.product_name}
              size="small"
            />
          ) : (
            <TextField
              variant="outlined"
              className={classes.input}
              placeholder="Enter product name"
              name="product_name_en"
              value={product_name_en}
              onChange={handleChange}
              size="small"
              error={
                // creationFormErrorMessages.short_desc_en !== "" ||
                creationFormErrorMessages.product_name_en !== ""
                // creationFormErrorMessages.product_description_en !== ""
              }
              helperText={creationFormErrorMessages.product_name_en}
            />
          )}
        </Grid>
        <Grid item xs={6} className={classes.gridItemRight}>
          <p className={classes.label}>
            {lan === "vi" ? "Số lượng" : "Quantity"} *
          </p>
          <TextField
            variant="outlined"
            className={classes.input}
            placeholder={lan === "vi" ? "Nhập số lượng" : "Enter quantity"}
            name="product_quantity"
            value={formatPrice(product_quantity)}
            disabled
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
            size="small"
          />
        </Grid>
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item xs={6} className={classes.gridItemLeft}>
          <p className={classes.label}>
            {lan === "vi" ? "Danh mục con" : "Subcategory"} *
          </p>
          <FormControl
            variant="outlined"
            className={classes.input}
            size="small"
          >
            <Select
              value={product_category}
              onChange={handleChangeCate}
              name="product_category"
              defaultValue={product_category}
            >
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
          {creationFormErrorMessages.product_category !== "" && (
            <div
              style={{
                fontSize: 12,
                color: "red",
                marginTop: 3,
                marginLeft: 15,
              }}
            >
              {creationFormErrorMessages.product_category}
            </div>
          )}
        </Grid>
        <Grid item xs={6} className={classes.gridItemRight}>
          <p className={classes.label}>
            {lan === "vi" ? "Danh mục cha" : "Parent category"}
          </p>
          <TextField
            disabled
            variant="outlined"
            className={classes.input}
            name="product_parent_category"
            value={currentParent}
            defaultValue={product_parent_category}
            size="small"
          />
        </Grid>
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item xs={6} className={classes.gridItemLeft}>
          <p className={classes.label}>
            {lan === "vi" ? "Kích thước" : "Size"} (cm)*
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              border:
                creationFormErrorMessages.size === ""
                  ? "1px solid #c4c4c4"
                  : "1px solid #f44336",
              borderRadius: "4px",
              marginTop: "-1px",
              marginBottom: "-1px",
            }}
          >
            <TextField
              type="number"
              step={0.01}
              className={classes.inputCheckbox}
              variant="outlined"
              name="length"
              value={length}
              placeholder={lan === "vi" ? "Dài" : "Length"}
              onChange={handleChange}
              inputProps={{ style: { textAlign: "center" } }}
              InputProps={{
                classes: { notchedOutline: classes.noBorder },
              }}
              size="small"
            />
            <span style={{ margin: "auto" }}>X</span>
            <TextField
              type="number"
              step={0.01}
              className={classes.inputCheckbox}
              variant="outlined"
              name="width"
              value={width}
              placeholder={lan === "vi" ? "Rộng" : "Width"}
              onChange={handleChange}
              inputProps={{ style: { textAlign: "center" } }}
              InputProps={{
                classes: { notchedOutline: classes.noBorder },
              }}
              size="small"
            />
            <span style={{ margin: "auto" }}>X</span>
            <TextField
              type="number"
              step={0.01}
              className={classes.inputCheckbox}
              variant="outlined"
              name="height"
              value={height}
              onChange={handleChange}
              placeholder={lan === "vi" ? "Cao" : "Height"}
              inputProps={{ style: { textAlign: "center" } }}
              InputProps={{
                classes: { notchedOutline: classes.noBorder },
              }}
              size="small"
            />
          </div>

          {creationFormErrorMessages.size !== "" && (
            <div
              style={{
                fontSize: "0.75rem",
                color: "#f44336",
                marginTop: 4,
                marginLeft: 15,
              }}
            >
              {creationFormErrorMessages.size}
            </div>
          )}
        </Grid>
        <Grid item xs={6} className={classes.gridItemRight}>
          <p className={classes.label}>
            {lan === "vi" ? "Khối lượng" : "Weight"} (kg)*
          </p>
          <TextField
            variant="outlined"
            type="number"
            step={0.01}
            className={classes.input}
            placeholder={lan === "vi" ? "Nhập khối lượng" : "Enter weight"}
            name="weight"
            value={weight}
            onChange={handleChange}
            helperText={creationFormErrorMessages.weight}
            error={creationFormErrorMessages.weight !== ""}
            size="small"
          />
        </Grid>
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item xs={6} className={classes.gridItemLeftCheckbox}>
          <FormControlLabel
            style={{
              marginRight: "5px",
            }}
            control={
              <Checkbox
                checked={allow_cod === true || allow_cod === 1}
                onChange={handleSetCOD}
              />
            }
            label={lan === "vi" ? "Cho phép COD" : "Allow COD"}
            size="small"
          />
        </Grid>
        <Grid item xs={6} className={classes.gridItemRight}>
          <p className={classes.label}>
            {lan === "vi" ? "Giá bán" : "Price"} *
          </p>
          <TextField
            variant="outlined"
            className={classes.input}
            name="product_price"
            value={product_price}
            onChange={handleChange}
            helperText={creationFormErrorMessages.product_price}
            error={creationFormErrorMessages.product_price !== ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <span>
                    <strong>VND</strong>
                  </span>
                </InputAdornment>
              ),
              inputComponent: NumberFormatCustom,
            }}
            size="small"
          />
        </Grid>
        <Grid item xs={6} className={classes.gridItemRight}></Grid>
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item xs={6} className={classes.gridItemLeft}>
          <p className={classes.label}>Slug</p>
          {lan === "vi" && (
            <TextField
              variant="outlined"
              className={classes.input}
              placeholder="Nhập slug sản phẩm"
              name="product_slug"
              value={product_slug}
              onChange={handleChange}
              error={creationFormErrorMessages.product_slug !== ""}
              helperText={creationFormErrorMessages.product_slug}
              size="small"
            />
          )}
          {lan === "en" && (
            <TextField
              variant="outlined"
              className={classes.input}
              placeholder="Enter product slug"
              name="product_slug_en"
              value={product_slug_en}
              onChange={handleChange}
              error={creationFormErrorMessages.product_slug_en !== ""}
              helperText={creationFormErrorMessages.product_slug_en}
              size="small"
            />
          )}
        </Grid>
        <Grid item xs={6} className={classes.gridItemRight}></Grid>
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item xs={6} className={classes.gridItemLeft}>
          <p className={classes.label}>Redirect Slug 302</p>
          {lan === "vi" && (
            <TextField
              variant="outlined"
              className={classes.input}
              placeholder="Nhập redirect slug 302"
              name="redirect_slug_302"
              value={redirect_slug_302}
              onChange={(e) => {
                const { dispatch } = context;
                dispatch({
                  type: "updateDetailInput",
                  payload: {
                    key: "redirect_slug_302",
                    value: e.target.value,
                  },
                });
              }}
              helperText={creationFormErrorMessages.redirect_slug_302}
              size="small"
            />
          )}
          {lan === "en" && (
            <TextField
              variant="outlined"
              className={classes.input}
              placeholder="Enter product slug 302"
              name="redirect_slug_302_en"
              value={redirect_slug_302_en}
              onChange={(e) => {
                const { dispatch } = context;
                dispatch({
                  type: "updateDetailInput",
                  payload: {
                    key: "redirect_slug_302_en",
                    value: e.target.value,
                  },
                });
              }}
              helperText={creationFormErrorMessages.redirect_slug_302_en}
              size="small"
            />
          )}
        </Grid>
        <Grid item xs={6} className={classes.gridItemRight}>
          <p className={classes.label}>Redirect Slug 301</p>
          {lan === "vi" && (
            <TextField
              variant="outlined"
              className={classes.input}
              placeholder="Nhập redirect slug 301"
              name="redirect_slug"
              value={redirect_slug}
              onChange={(e) => {
                const { dispatch } = context;
                dispatch({
                  type: "updateDetailInput",
                  payload: {
                    key: "redirect_slug",
                    value: e.target.value,
                  },
                });
              }}
              helperText={creationFormErrorMessages.redirect_slug}
              size="small"
            />
          )}
          {lan === "en" && (
            <TextField
              variant="outlined"
              className={classes.input}
              placeholder="Enter product slug 302"
              name="redirect_slug_en"
              value={redirect_slug_en}
              onChange={(e) => {
                const { dispatch } = context;
                dispatch({
                  type: "updateDetailInput",
                  payload: {
                    key: "redirect_slug_en",
                    value: e.target.value,
                  },
                });
              }}
              helperText={creationFormErrorMessages.redirect_slug_en}
              size="small"
            />
          )}
        </Grid>
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item xs={12}>
          <p className={classes.label}>
            {lan === "vi" ? "Mô tả ngắn *" : "Short description *"}
          </p>
          {lan === "vi" ? (
            <TextField
              type="text"
              variant="outlined"
              className={classes.input}
              multiline
              rows={3}
              name="short_desc"
              placeholder="Nhập mô tả ngắn"
              value={short_desc}
              onChange={handleChange}
              error={creationFormErrorMessages.short_desc !== ""}
              helperText={creationFormErrorMessages.short_desc}
            />
          ) : (
            <TextField
              type="text"
              variant="outlined"
              className={classes.input}
              multiline
              rows={3}
              name="short_desc_en"
              placeholder="Enter short description"
              value={short_desc_en}
              onChange={handleChange}
              error={creationFormErrorMessages.short_desc_en !== ""}
              helperText={creationFormErrorMessages.short_desc_en}
            />
          )}
        </Grid>
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item xs={12}>
          <p className={classes.label}>
            {lan === "vi" ? "Mô tả chi tiết *" : "Detail description *"}
          </p>
          {lan === "vi" && (
            <div>
              <TextEditors
                defaultValue={product_description}
                onChange={(content) => {
                  const { dispatch } = context;
                  dispatch({
                    type: "updateDetailInput",
                    payload: {
                      key: "product_description",
                      value: content,
                    },
                  });
                  setCreationFormErrorMessages({
                    ...creationFormErrorMessages,
                    product_description: "",
                  });
                }}
              />
              {creationFormErrorMessages.product_description !== "" && (
                <div
                  style={{
                    fontSize: 12,
                    color: "red",
                    marginTop: 3,
                    marginLeft: 15,
                  }}
                >
                  {creationFormErrorMessages.product_description}
                </div>
              )}
            </div>
          )}
          {lan === "en" && (
            <div>
              <TextEditors
                defaultValue={product_description_en}
                onChange={(content) => {
                  const { dispatch } = context;
                  dispatch({
                    type: "updateDetailInput",
                    payload: {
                      key: "product_description_en",
                      value: content,
                    },
                  });
                  setCreationFormErrorMessages({
                    ...creationFormErrorMessages,
                    product_description_en: "",
                  });
                }}
              />
              {creationFormErrorMessages.product_description_en !== "" && (
                <div
                  style={{
                    fontSize: 12,
                    color: "red",
                    marginTop: 3,
                    marginLeft: 15,
                  }}
                >
                  {creationFormErrorMessages.product_description_en}
                </div>
              )}
            </div>
          )}
        </Grid>
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item xs={12}>
          <p className={classes.label}>
            {lan === "vi" ? "Tiêu đề SEO *" : "Title SEO *"}
          </p>
          {lan === "vi" ? (
            <TextField
              variant="outlined"
              className={classes.input}
              placeholder="Nhập tiêu đề SEO"
              name="title_seo"
              value={title_seo}
              onChange={handleChange}
              error={creationFormErrorMessages.title_seo !== ""}
              helperText={creationFormErrorMessages.title_seo}
              size="small"
            />
          ) : (
            <TextField
              variant="outlined"
              className={classes.input}
              placeholder="Enter title SEO"
              name="title_seo_en"
              value={title_seo_en}
              onChange={handleChange}
              error={creationFormErrorMessages.title_seo_en !== ""}
              helperText={creationFormErrorMessages.title_seo_en}
              size="small"
            />
          )}
        </Grid>
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item xs={12}>
          <p className={classes.label}>
            {lan === "vi" ? "Mô tả SEO *" : "Description SEO *"}
          </p>
          {lan === "vi" ? (
            <TextField
              variant="outlined"
              className={classes.input}
              placeholder="Nhập mô tả SEO"
              name="description_seo"
              value={description_seo}
              onChange={handleChange}
              error={creationFormErrorMessages.description_seo !== ""}
              helperText={creationFormErrorMessages.description_seo}
              size="small"
            />
          ) : (
            <TextField
              variant="outlined"
              className={classes.input}
              placeholder="Enter description SEO"
              name="description_seo_en"
              value={description_seo_en}
              onChange={handleChange}
              error={creationFormErrorMessages.description_seo_en !== ""}
              helperText={creationFormErrorMessages.description_seo_en}
              size="small"
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}
