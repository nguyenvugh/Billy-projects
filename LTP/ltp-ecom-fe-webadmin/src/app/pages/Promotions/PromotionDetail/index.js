import { Button, Divider, Grid, makeStyles, Paper } from "@material-ui/core";
import CalendarPicker from "app/components/CalendarPicker";
import ConfirmModal from "app/components/ConfirmModal";
import ImagePicker from "app/components/ImagePicker";
import LanguageSelector from "app/components/LanguageSelector";
import {
  deletePromotion as _deletePromotion,
  getPromotionDetail as _getPromotionDetail,
} from "app/services/promotion";
import { formatVND } from "app/utils/common";
import { formatDateTime } from "app/utils/validate";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import Input from "../components/Input";
import Switch from "../components/Switch";
import Textarea from "../components/Textarea";
import {
  LABELS_EN,
  LABELS_VI,
  PROMOTION_EN_TYPES,
  PROMOTION_TYPES,
  breadcrumbsLinks,
} from "../definition";
import { urlPromotion } from "app/Layouts/AuthenticatedLayout/Sidebar/url";

function PromotionDetail({ match }) {
  const classes = useStyles();
  const history = useHistory();
  const id = match.params.id;
  const [promotion, setPromotion] = useState(null);
  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
  const [languageCode, changeLanguageCode] = useState("vi");
  const isCampaignType =
    promotion && PROMOTION_TYPES[promotion.promo_type] == PROMOTION_TYPES[1];
  const [labels, setLabels] = useState(LABELS_VI);
  const breadcrumbsLinks = [
    {
      href: "/promotions/create",
      label: "Chi tiết Promotion Slider",
    },
  ];

  useEffect(() => {
    getPromotionDetail();
  }, []);
  useEffect(() => {
    setLabels(languageCode == "vi" ? LABELS_VI : LABELS_EN);
  }, [languageCode]);

  // GET
  const getPromotionDetail = async () => {
    try {
      const request = await _getPromotionDetail({ id });
      const { data } = await request.data;
      handleGetPromotionDetailSuccess(data);
    } catch (error) {}
  };

  const getValue = (arr, lCode, lField) =>
    arr.filter((i) => i.language_code == lCode && i.language_field == lField)[0]
      ?.language_value || "";

  // DELETE
  const deletePromotion = async () => {
    try {
      const request = await _deletePromotion({ ids: id });
      const response = await request.data;
      history.push(urlPromotion);
    } catch (error) {}
  };

  // HANDLE
  const handleGetPromotionDetailSuccess = (data) => {
    // console.log(data.start_date);
    try {
      const commonStructure = {
        promo_type: data.type,
        promo_productId: data.product,
        promo_startDate: `${data.start_date.replaceAll("-", "/")} ${
          data.start_time
        }:00`,
        promo_endDate: `${data.end_date.replaceAll("-", "/")} ${
          data.end_time
        }:00`,
        promo_image: data.thumbnail_obj.url,
        promo_imageId: data.thumbnail_obj.id,
        promo_active: data.is_active,
        promo_name: {
          en: getValue(data.translates, "en", "name"),
          vi: getValue(data.translates, "vi", "name"),
        },
        promo_button: {
          en: getValue(data.translates, "en", "button"),
          vi: getValue(data.translates, "vi", "button"),
        },
        promo_description: {
          en: getValue(data.translates, "en", "description"),
          vi: getValue(data.translates, "vi", "description"),
        },
      };

      if (PROMOTION_TYPES[data.type] == PROMOTION_TYPES[1]) {
        const campaignStructure = {
          ...commonStructure,
          promo_link: data.link,
        };

        setPromotion(campaignStructure);
        return;
      }
      const productStructure = {
        ...commonStructure,
        promo_price: data.product_obj.price,
        promo_discount: data.percentage,
        promo_reducePrice: data.product_obj.price * (data.percentage / 100),
        promo_reducedPrice:
          data.product_obj.price -
          data.product_obj.price * (data.percentage / 100),
        promo_link: data.link,
        promo_product: {
          en: data.product_obj.translates.filter(
            (i) => i.language_code == "vi"
          )[0].name,
          vi: data.product_obj.translates.filter(
            (i) => i.language_code == "vi"
          )[0].name,
        },
      };
      console.log("productStructure", productStructure);

      setPromotion(productStructure);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenDeletePopup = () => {
    setIsOpenDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setIsOpenDeletePopup(false);
  };

  const handleEdit = () => {
    history.push({
      pathname: `/promotions/edit/${id}`,
      state: {
        defaultData: promotion,
      },
    });
  };

  const handleDelete = () => {
    deletePromotion();
  };

  const RenderDeleteConfirmChildren = () => {
    return <span>Bạn có chắc muốn xóa promotion slider đã chọn?</span>;
  };

  const renderForm = () => {
    if (isCampaignType) return renderCampaignForm();
    return renderProductForm();
  };

  const renderCampaignForm = () => {
    return (
      <Grid container item xs={12} spacing={4}>
        <Grid item xs>
          <Input
            readOnly
            labelName={labels.promo_link.label}
            defaultValue={promotion.promo_link}
          />
        </Grid>

        <Grid item xs>
          <Input
            readOnly
            labelName={labels.promo_button.placeholder}
            defaultValue={promotion.promo_button[languageCode]}
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
            <Input
              required
              readOnly
              defaultValue={promotion.promo_product[languageCode]}
              labelName={labels.promo_product.label}
            />
          </Grid>

          <Grid item xs>
            <Input
              readOnly
              labelName={labels.promo_button.label}
              defaultValue={promotion.promo_button[languageCode]}
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} spacing={4}>
          <Grid item xs>
            <Input
              required
              readOnly
              defaultValue={formatVND(promotion.promo_price, false)}
              labelName={labels.promo_price.label}
              inputSuffix="VND"
            />
          </Grid>

          <Grid item xs>
            <Input
              readOnly
              defaultValue={promotion.promo_discount}
              labelName={labels.promo_discount.label}
              inputSuffix="%"
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} spacing={4}>
          <Grid item xs>
            <Input
              required
              readOnly
              defaultValue={formatVND(promotion.promo_reducePrice, false)}
              labelName={labels.promo_reducePrice.label}
              inputSuffix="VND"
            />
          </Grid>

          <Grid item xs>
            <Input
              required
              readOnly
              labelName={labels.promo_reducedPrice.label}
              defaultValue={formatVND(promotion.promo_reducedPrice, false)}
              inputSuffix="VND"
            />
          </Grid>
        </Grid>
      </>
    );
  };

  if (!promotion) return null;
  return (
    <div className={classes.root}>
      <Grid
        container
        alignItems="center"
        spacing={2}
        className={classes.header}
      >
        <div>
          <Breadcrumbs links={breadcrumbsLinks} />
        </div>
        <div>
          <Button
            onClick={handleEdit}
            disableElevation
            variant="contained"
            classes={{
              root: classes.saveButton,
              label: classes.labelSaveButton,
            }}
          >
            Chỉnh sửa
          </Button>

          <Button
            variant="outlined"
            classes={{
              root: classes.deleteButton,
              label: classes.labelDeleteButton,
            }}
            onClick={handleOpenDeletePopup}
          >
            Xoá
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
                <Input
                  readOnly
                  defaultValue={
                    languageCode == "vi"
                      ? PROMOTION_TYPES[promotion.promo_type]
                      : PROMOTION_EN_TYPES[promotion.promo_type]
                  }
                  labelName={labels.promo_type.label}
                />
              </Grid>

              <Grid item xs>
                <Input
                  readOnly
                  labelName={labels.promo_name.label}
                  defaultValue={promotion.promo_name[languageCode]}
                />
              </Grid>
            </Grid>

            {renderForm()}

            {/* 2 */}
            <Grid
              container
              item
              xs={12}
              spacing={4}
              style={{ position: "relative" }}
            >
              <Grid item xs>
                <Textarea
                  readOnly
                  labelName={labels.promo_description.label}
                  defaultValue={promotion.promo_description[languageCode]}
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
                <CalendarPicker
                  displayValue={formatDateTime(promotion.promo_startDate)}
                  required
                  readOnly
                  type="datetime-local"
                  labelName={labels.promo_startDate.label}
                  defaultValue={promotion.promo_startDate}
                />
              </Grid>
              <span className={classes.chain} />
              <Grid item xs>
                <CalendarPicker
                  readOnly
                  displayValue={formatDateTime(promotion.promo_endDate)}
                  type="datetime-local"
                  defaultValue={promotion.promo_endDate}
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
                  checked={promotion.promo_active}
                  readOnly
                  labelName={labels.promo_active.label}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <ImagePicker
              readOnly
              labelName={labels.promo_image.label}
              defaultValue={promotion.promo_image}
            />
          </Grid>
        </Grid>
      </Paper>

      <ConfirmModal
        onOk={handleDelete}
        onClose={handleCloseDeletePopup}
        title="XÓA PROMOTION SLIDER"
        children={<RenderDeleteConfirmChildren />}
        type="delete"
        okText="XÓA"
        isOpen={isOpenDeletePopup}
      />
    </div>
  );
}

PromotionDetail.defaultProps = {};

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
  deleteButton: {
    width: "100%",
    backgroundColor: "#D70000",
  },
  labelDeleteButton: {
    fontSize: "14px",
    color: "#ffffff",
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
    bottom: 35,
    left: "calc(50% - 5px)",
  },
}));

export default PromotionDetail;
