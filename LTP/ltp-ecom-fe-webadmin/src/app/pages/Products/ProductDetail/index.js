/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Divider,
  FormControlLabel,
  Checkbox,
  Card,
  CardMedia,
  MenuItem,
  TextField,
} from "@material-ui/core";
import lodash from "lodash";

import Toolbar from "./components/Toolbar";
import Content from "./components/Content";
import PhotosBox from "./components/PhotosBox";
import ReviewTable from "./components/ReviewTable";
import viFlag from "app/assets/vi.png";
import usFlag from "app/assets/us.png";
import * as Utils from "../../../utils";
import * as AppURL from "../../../services/urlAPI";
import { getProductCategory } from "app/services/axios";

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: "#ffffff",
    marginBottom: "20px",
    marginTop: 0,
  },
  photos: {
    padding: "0px 0px 0px 20px",
  },
  imgFlag: {
    width: "20px",
    height: "14px",
    marginRight: "5px",
  },
}));

export default function ProductDetail() {
  const classes = useStyles();
  const Params = useParams();
  const { id } = Params;

  const [productDetail, setProductDetail] = useState(null);
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState({});
  const [listChildCate, setListChildCate] = useState([]);
  const [openLan, setOpenLan] = useState(false);
  const [lan, setLan] = useState("vi");

  useEffect(async () => {
    try {
      if (id) {
        const url = Utils.replaceStrUrl(AppURL.getProductDetail, [id]);
        await getProductCategory(url).then(async (res) => {
          const list = await getProductCategory(
            AppURL.getAllChildProductCategory
          );
          const results = Utils.getSafeValue(list, "results", []);
          await setListChildCate(results);
          const id = Utils.getSafeValue(res, "id", 0);
          const product_code = Utils.getSafeValue(res, "code", "");
          const translates = Utils.getSafeValue(res, "translates", []);
          const product_name = Utils.getObjByLanguage(translates, "vi", "name");
          const short_desc = Utils.getObjByLanguage(
            translates,
            "vi",
            "short_desc"
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
          const product_slug = Utils.getObjByLanguage(translates, "vi", "slug");
          const product_slug_en = Utils.getObjByLanguage(
            translates,
            "en",
            "slug"
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
          const thumbnailObj = lodash.find(images, {
            is_thumbnail: 1,
          });
          setThumbnail(thumbnailObj);
          const product_thumbnail = Utils.getSafeValue(
            thumbnailObj,
            "image.url",
            ""
          );
          const normalImages = images.filter((image) => {
            return image.is_thumbnail === -1;
          });
          setImages(normalImages);
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
          const product_description = Utils.getObjByLanguage(
            translates,
            "vi",
            "description"
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
          const num_sold = Utils.getSafeValue(res, "num_sold", 89);
          const num_like = Utils.getSafeValue(res, "num_like", 125);
          const avg_rating = Utils.getSafeValue(res, "avg_rating", 4.5);
          const width = Utils.getSafeValue(res, "width", null);
          const length = Utils.getSafeValue(res, "length", null);
          const height = Utils.getSafeValue(res, "height", null);
          const weight = Utils.getSafeValue(res, "weight", null);
          const allow_cod = Utils.getSafeValue(res, "allow_cod", null);
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
            num_sold,
            num_like,
            avg_rating,
            product_parent_category,
            width,
            length,
            height,
            weight,
            allow_cod,
            product_name_en,
            short_desc_en,
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
          };
          setProductDetail(productDetail);
        });
      } else {
        console.log("no id");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChangeLan = (e) => {
    setLan(e.target.value);
  };

  return (
    <>
      {productDetail === null ? (
        <div></div>
      ) : (
        <div>
          <Toolbar id={id} name={productDetail?.product_name} />
          <Grid container spacing={4} className={classes.main}>
            <Grid item xs={8}>
              <Grid container spacing={4}>
                <Grid
                  item
                  xs={6}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          productDetail.product_contact_nlt === 1 ? true : false
                        }
                      />
                    }
                    label="Sản phẩm đặc biệt"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          productDetail.product_feature === 1 ? true : false
                        }
                      />
                    }
                    label="Sản phẩm nổi bật"
                  />
                </Grid>
              </Grid>
              <Content
                productDetail={productDetail}
                listChildCate={listChildCate}
                lan={lan}
              />
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
              <h5>{lan === "vi" ? "Ảnh thumbnail" : "Thumbnail image"} *</h5>
              <Card>
                <CardMedia
                  image={thumbnail?.image?.url}
                  style={{ paddingBottom: "64%", borderRadius: 6 }}
                />
              </Card>
              <h5>{lan === "vi" ? "Hình ảnh" : "Images"}</h5>
              <PhotosBox images={images} lang={lan} />
            </Grid>
          </Grid>
          <Divider light />
          <ReviewTable productId={id} />
        </div>
      )}
    </>
  );
}
