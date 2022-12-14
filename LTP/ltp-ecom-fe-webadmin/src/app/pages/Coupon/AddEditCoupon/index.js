import {
  Box,
  Grid,
  Link as LinkUI,
  MenuItem,
  Snackbar,
  Typography,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import Breadcrumbs from "app/components/Breadcrumbs";
import DangerButton from "app/components/Button/DangerButton";
import DefaultButton from "app/components/Button/DefaultButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import ConfirmDelete from "app/components/ConfirmDelete";
import Select from "app/components/Select";
import SelectLang from "app/components/SelectLang";
import Switch from "app/components/Switch";
import TextFields from "app/components/TextFields";
import {
  fetchCoupon,
  fetchCreateCoupon,
  fetchDeleteCoupons,
  fetchListCoupon,
  fetchUpdateCoupon,
} from "app/reducers/coupon";
import { getTranslateField } from "app/utils";
import { LANG_EN, LANG_VI, PAGE_SIZE } from "app/utils/constant";
import { formatDateTime, isEmpty } from "app/utils/validate";
import EventIcon from "@material-ui/icons/Event";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import BillCondition from "../BillCondition";
import GoodsCondition from "../GoodsCondition";
const objectCondition = {
  percentage: null,
  price: null,
  product: null,
  quantity: null,
  type: 1,
  value: null,
};
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const AddEditCoupon = ({ coupon }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [openToastError, setOpenToastError] = useState(false);
  const [messageToastError, setMessageToastError] = useState("");
  const { coupon: couponDetail } = useSelector((state) => state.coupon);
  const [dataDetail, setDataDetail] = useState(coupon || couponDetail || {});
  const history = useHistory();
  const [detail, setDetail] = useState(true);
  const [lang, setLang] = useState(LANG_VI);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [validate, setValidate] = useState(false);
  const [conditionType, setConditionType] = useState(dataDetail.type || 1);
  const [billConditionList, setBillConditionList] = useState([]);
  const [goodsConditionList, setGoodsConditionList] = useState([]);
  useEffect(() => {
    if (!coupon?.id && !!params.id) {
      dispatch(fetchCoupon({ id: params.id }));
    }
  }, [params?.id, coupon, detail]);
  useEffect(() => {
    if (!coupon?.id && params?.id) {
      onChangeValueDataDetail(couponDetail);
    } else {
      if (coupon?.id && params?.id) {
        onChangeValueDataDetail(coupon);
      } else {
        setDataDetail({ ...dataDetail, status: 1 });
        setBillConditionList([{ key: 0, ...objectCondition }]);
        setGoodsConditionList([{ key: 0, ...objectCondition }]);
      }
    }
  }, [couponDetail]);
  useEffect(() => {
    if (!coupon) {
      history.replace("/");
      return;
    }
    setDetail(Boolean(coupon?.id));
  }, [coupon]);
  const onChangeValueDataDetail = (object = {}) => {
    const obj_name_vi = getTranslateField(object?.translates || [], "vi");
    const obj_name_en = getTranslateField(object?.translates || [], "en");
    const start_date = `${object?.start_date ? moment(object?.start_date).format("yyyy-MM-DD") : ""
      }${object?.start_time ? `T${object?.start_time}` : ""}`;
    const end_date = `${object?.end_date ? moment(object?.end_date).format("yyyy-MM-DD") : ""
      }${object?.end_time ? `T${object?.end_time}` : ""}`;
    setDataDetail({
      ...object,
      name_vi: obj_name_vi.name,
      name_en: obj_name_en.name,
      start_date,
      end_date,
    });
    setConditionType(object.type);
    setBillConditionList(
      object.type === 2
        ? [{ key: 0, ...objectCondition }]
        : object?.requirements?.length
          ? object?.requirements
          : [{ key: 0, ...objectCondition }]
    );
    const goodCondition = (object?.requirements || []).filter(
      (item) => item.product
    );
    setGoodsConditionList(
      object.type === 2
        ? goodCondition.length
          ? goodCondition
          : [{ key: 0, ...objectCondition }]
        : [{ key: 0, ...objectCondition }]
    );
  };
  const onChangeDetail = (e) => {
    e.preventDefault();
    setValidate(false);
    setDetail(!detail);
  };
  const addBill = () => {
    let condition = [...billConditionList];
    condition.push({
      key: billConditionList.length,
      ...objectCondition,
    });
    setBillConditionList(condition);
  };
  const validateConditionBlank = () => {
    if (billConditionList.length) {
      let check = billConditionList.every((item) => item.value && item.price);
      return check;
    } else {
      return true;
    }
  };
  const validateConditionRequire = () => {
    let flag = true;
    if (billConditionList.length > 1) {
      for (let i = 0; i < billConditionList.length - 1; i++) {
        const item1 = billConditionList[i];
        const item2 = billConditionList[i + 1];
        let value1 = item1.value;
        let value2 = item2.value;
        let price1 = item1.price;
        let price2 = item2.price;
        if (item1.type === 1) {
          value1 = (+item1.value / +item1.price) * 100;
        }
        if (item2.type === 1) {
          value2 = (+item2.value / +item2.price) * 100;
        }
        if (+value1 >= +value2 || +price1 >= +price2) {
          flag = false;
          break;
        }
      }
    }
    return flag;
  };
  const validateGoodsConditionBlank = () => {
    if (goodsConditionList.length) {
      let check = goodsConditionList.every(
        (item) =>
          !!(item.product?.id || item.product) &&
          !!item.quantity &&
          !!item.percentage
      );
      return check;
    } else {
      return true;
    }
  };
  const validateGoodsConditionRequire = () => {
    let flag = true;
    if (goodsConditionList.length > 1) {
      for (let i = 0; i <= goodsConditionList.length - 1; i++) {
        const itemCurrent = { ...goodsConditionList[i], index: i };
        const isProductExist = goodsConditionList.filter(
          (el, indexCondition) =>
            (el?.product?.id || el?.product) ===
            (itemCurrent?.product?.id || itemCurrent?.product) && indexCondition != i
        );
        const ProductExist = goodsConditionList.filter(
          (el, indexCondition) =>
            (el?.product?.id || el?.product) ===
            (itemCurrent?.product?.id || itemCurrent?.product) && indexCondition < i
        );
        if (isProductExist.length > 0 && ProductExist.length > 0) {
          const itemBefore = { ...ProductExist[ProductExist.length - 1] };
          const quantityCurrent = +itemCurrent.quantity;
          const quantityBefore = +itemBefore.quantity;
          const percentageCurrent = +itemCurrent.percentage;
          const percentageBefore = +itemBefore.percentage;
          if (quantityCurrent <= quantityBefore || percentageCurrent <= percentageBefore) {
            flag = false;
            break;
          }
        }
      }
    }
    return flag;
  };
  const removeBill = (index) => {
    let condition = [...billConditionList];
    condition.splice(index, 1);
    setBillConditionList(condition);
  };
  const addGoods = () => {
    let condition = [...goodsConditionList];
    condition.push({
      key: goodsConditionList.length,
      ...objectCondition,
    });
    setGoodsConditionList(condition);
  };
  const removeGoods = (index) => {
    let condition = [...goodsConditionList];
    condition.splice(index, 1);
    setGoodsConditionList(condition);
  };
  const onChangeValue = (e, type, key) => {
    const name = e.target.name;
    switch (type) {
      case "switch":
        setDataDetail({
          ...dataDetail,
          [key]: dataDetail.status === 1 ? -1 : 1,
        });
        break;
      default:
        setDataDetail({
          ...dataDetail,
          [name]: e.target.value,
        });
        break;
    }
  };

  const handleCreateOrEdit = () => {
    try {
      if(validate){
        return
      }
      if (
        dataDetail.code &&
        dataDetail.quantity &&
        dataDetail.limit &&
        dataDetail.start_date &&
        dataDetail.end_date &&
        (conditionType && conditionType === 1
          ? validateConditionBlank() && validateConditionRequire()
          : validateGoodsConditionBlank() && validateGoodsConditionRequire())
      ) {
        if (
          isEmpty(dataDetail?.name_vi) ||
          dataDetail?.name_vi?.length > 50
        ) {
          setLang(LANG_VI);
          setValidate(true);
          return;
        }
        let start = new Date(dataDetail.start_date).getTime();
        let end = new Date(dataDetail.end_date).getTime();
        if (
          start > end ||
          +dataDetail.limit > +dataDetail.quantity ||
          dataDetail.code.length > 10 ||
          dataDetail.name_vi.length > 50
        ) {
          setValidate(true);
          return;
        }
        setValidate(false);
        if (isEmpty(dataDetail.name_en)) {
          dataDetail.name_en = dataDetail.name_vi;
        }
        let body = {
          ...dataDetail,
          start_date: moment(dataDetail.start_date).format("yyyy-MM-DD"),
          start_time: moment(dataDetail.start_date).format("HH:mm"),
          end_date: moment(dataDetail.end_date).format("yyyy-MM-DD"),
          end_time: moment(dataDetail.end_date).format("HH:mm"),
          limit: +dataDetail.limit,
          quantity: +dataDetail.quantity,
          type: conditionType,
          contents: [
            {
              language_code: "vi",
              language_field: "name",
              language_value: dataDetail.name_vi,
            },
            {
              language_code: "en",
              language_field: "name",
              language_value: dataDetail.name_en,
            },
          ],
          order_requirements: billConditionList,
          product_requirements: goodsConditionList.length
            ? [
              ...goodsConditionList.map((item) => {
                return {
                  percentage: +item.percentage,
                  quantity: +item.quantity,
                  product: item.product?.id || item.product,
                };
              }),
            ]
            : [],
        };
        if (params.id) {
          dispatch(fetchUpdateCoupon({ ...body, id: params.id }))
            .then((s) => {
              if (s?.data?.code === 200) {
                setDetail(true);
                setValidate(false);
                setLang(LANG_VI);
                history.push(`/${params.id}`);
              } else {
                if ((s.message || "").includes("code already exist")) {
                  setMessageToastError("M?? khuy???n m???i ???? t???n t???i");
                  setValidate(true);
                } else {
                  setOpenToastError(true);
                  setMessageToastError(s.message);
                }
              }
            })
            .catch((error) => { });
        } else {
          dispatch(fetchCreateCoupon({ ...body }))
            .then((s) => {
              if (s?.data?.code === 200) {
                history.push("/");
              } else {
                if ((s.message || "").includes("code already exist")) {
                  setMessageToastError("M?? khuy???n m???i ???? t???n t???i");
                  setValidate(true);
                } else {
                  setOpenToastError(true);
                  setMessageToastError(s.message);
                }
              }
            })
            .catch((error) => { });
        }
      } else {
        setValidate(true);
      }
      
    } catch (error) { }
  };
  const deleteCoupon = () => {
    setConfirmDelete(false);
    dispatch(fetchDeleteCoupons({ ids: [params.id] })).then((s) => {
      dispatch(
        fetchListCoupon({
          page: 1,
          limit: PAGE_SIZE,
        })
      );
      history.push("/");
    });
  };
  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToastError(false);
  };
  return (
    <Fragment>
      <Snackbar
        open={openToastError}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseToast} severity="error">
          {messageToastError}
        </Alert>
      </Snackbar>
      <ConfirmDelete
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onOK={deleteCoupon}
        title="X??A COUPON"
        message="B???n c?? ch???c mu???n x??a coupon ???? ch???n?"
        cancelTitle="H???Y B???"
        okTitle="X??A"
      />
      <div className="page-header">
        {params?.id ? (
          detail ? (
            <Fragment>
              <div className="page-title">
                <Breadcrumbs>
                  <Link to="/">Qu???n l?? coupon</Link>
                  <Typography>Chi ti???t coupon</Typography>
                </Breadcrumbs>
              </div>
              <PrimaryButton onClick={onChangeDetail}>Ch???nh s???a</PrimaryButton>
              <DangerButton onClick={() => setConfirmDelete(true)}>
                X??a
              </DangerButton>
            </Fragment>
          ) : (
            <Fragment>
              <div className="page-title">
                <Breadcrumbs>
                  <Link to="/">Qu???n l?? coupon</Link>
                  <LinkUI href="#" onClick={onChangeDetail}>
                    Chi ti???t coupon
                  </LinkUI>
                  <Typography>Ch???nh s???a</Typography>
                </Breadcrumbs>
              </div>
              <DefaultButton onClick={onChangeDetail}>H???y</DefaultButton>
              <PrimaryButton onClick={handleCreateOrEdit}>
                L??u l???i
              </PrimaryButton>
            </Fragment>
          )
        ) : (
          <Fragment>
            <div className="page-title">
              <Breadcrumbs>
                <Link to="/">Qu???n l?? coupon</Link>
                <Typography>Th??m m???i</Typography>
              </Breadcrumbs>
            </div>
            <DefaultButton component={Link} to="/">
              H???y
            </DefaultButton>
            <PrimaryButton onClick={handleCreateOrEdit}>L??u L???i</PrimaryButton>
          </Fragment>
        )}
      </div>
      <div className="page-content">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box fontSize={16} fontWeight={600}>
            Coupon
          </Box>
          <SelectLang
            value={lang}
            onChange={(e) => {
              setLang(e);
              setValidate(false);
            }}
          />
        </Box>
        {lang === LANG_VI ? (
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <TextFields
                label="M?? khuy???n m??i"
                required
                placeholder="Nh???p m?? khuy???n m??i"
                disabled={detail}
                value={dataDetail.code}
                helperText={
                  validate && !dataDetail.code
                    ? "M?? khuy???n m???i ???????c y??u c???u"
                    : validate && dataDetail.code?.length > 10
                      ? "M?? khuy???n m???i t???i ??a 10 k?? t???"
                      : validate && messageToastError
                        ? messageToastError
                        : ""
                }
                name="code"
                onChange={(e) => {
                  onChangeValue(e);
                  setMessageToastError("");
                }}
                error={
                  (validate && !dataDetail.code) ||
                  (validate && dataDetail.code?.length > 10) ||
                  (validate && messageToastError)
                }
              />
              <TextFields
                label="Gi???i h???n s??? l?????ng s??? d???ng"
                required
                placeholder="Gi???i h???n s??? l?????ng s??? d???ng"
                helperText={
                  validate && !dataDetail.limit
                    ? "Gi???i h???n s??? l?????ng s??? d???ng ???????c y??u c???u"
                    : validate && +dataDetail.limit > +dataDetail.quantity
                      ? "Gi???i h???n s??? l?????ng s??? d???ng kh??ng l???n h??n S??? l?????ng"
                      : ""
                }
                type="number"
                disabled={detail}
                value={dataDetail.limit}
                name="limit"
                onChange={(e) => onChangeValue(e)}
                error={
                  (validate && !dataDetail.limit) ||
                  (validate && +dataDetail.limit > +dataDetail.quantity)
                }
              />
              <TextFields
                label="Khuy???n m??i theo"
                helperText="Khuy???n m??i theo ???????c y??u c???u"
                required
                disabled={detail}
                value={conditionType}
                error={validate && !conditionType}
              >
                <Select
                  style={{ width: "100%" }}
                  value={conditionType}
                  onChange={(e) => {
                    setConditionType(e.target.value);
                  }}
                  disabled={detail}
                  name="type"
                >
                  <MenuItem value={1}>
                    <Box>H??a ????n</Box>
                  </MenuItem>
                  <MenuItem value={2}>
                    <Box>S??? l?????ng h??ng h??a</Box>
                  </MenuItem>
                </Select>
              </TextFields>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFields
                label="T??n ch????ng tr??nh"
                required
                placeholder="Nh???p t??n ch????ng tr??nh"
                helperText={
                  validate && lang === LANG_VI && isEmpty(dataDetail?.name_vi)
                    ? "T??n ch????ng tr??nh ???????c y??u c???u"
                    : validate &&
                      lang === LANG_VI &&
                      dataDetail?.name_vi?.length > 50
                      ? "T??n ch????ng tr??nh t???i ??a 50 k?? t???"
                      : ""
                }
                disabled={detail}
                value={dataDetail?.name_vi || ""}
                name="name_vi"
                onChange={(e) => onChangeValue(e)}
                error={
                  (validate && isEmpty(dataDetail?.name_vi)) ||
                  (validate && dataDetail?.name_vi?.length > 50)
                }
                inputProps={{ maxLength: 50 }}
              />
              <Box className="wrapper-datetime-local">
                <span
                  className="datetime-local-display-value"
                  style={{ color: dataDetail?.start_date ? "black" : "gray" }}
                >
                  {dataDetail?.start_date
                    ? formatDateTime(dataDetail?.start_date)
                    : "dd/mm/yyyy hh:mm"}
                </span>
                <TextFields
                  label="Ng??y b???t ?????u"
                  helperText="Ng??y b???t ?????u ???????c y??u c???u"
                  required
                  type="datetime-local"
                  disabled={detail}
                  value={dataDetail?.start_date}
                  name="start_date"
                  onChange={(e) => onChangeValue(e)}
                  error={validate && !dataDetail?.start_date}
                  placeholder=""
                  endAdornment={<EventIcon />}
                  inputProps={{
                    // readonly: "readonly",
                    min: params?.id
                      ? null
                      : moment().format("yyyy-MM-DDTHH:mm"),
                  }}
                />
              </Box>
              <Box className="text-field-label">Tr???ng th??i </Box>
              <Switch
                disabled={detail}
                checked={dataDetail?.status === 1}
                onChange={(e) => {
                  onChangeValue(e, "switch", "status");
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFields
                label="S??? l?????ng"
                required
                type="number"
                placeholder="Nh???p s??? l?????ng coupon"
                helperText="S??? l?????ng ???????c y??u c???u"
                disabled={detail}
                value={dataDetail.quantity}
                name="quantity"
                onChange={(e) => onChangeValue(e)}
                error={validate && !dataDetail?.quantity}
              />
              <Box className="wrapper-datetime-local">
                <span
                  className="datetime-local-display-value"
                  style={{ color: dataDetail?.end_date ? "black" : "gray" }}
                >
                  {dataDetail?.end_date
                    ? formatDateTime(dataDetail?.end_date)
                    : "dd/mm/yyyy hh:mm"}
                </span>
                <TextFields
                  label="Ng??y k???t th??c"
                  required
                  type="datetime-local"
                  disabled={detail}
                  value={dataDetail?.end_date}
                  name="end_date"
                  onChange={(e) => onChangeValue(e)}
                  helperText="Ng??y k???t th??c ???????c y??u c???u"
                  error={validate && !dataDetail?.end_date}
                  placeholder=""
                  endAdornment={<EventIcon />}
                  errorDate={
                    validate &&
                    new Date(dataDetail?.end_date) <
                    new Date(dataDetail?.start_date)
                  }
                  helperTextDate="Ng??y k???t th??c > ng??y b???t ?????u"
                  inputProps={{
                    // readonly: "readonly",
                    min: params?.id
                      ? null
                      : moment().format("yyyy-MM-DDTHH:mm"),
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <TextFields
                label="Coupon code"
                required
                placeholder="Enter coupon code"
                helperText={
                  validate && !dataDetail.code
                    ? "Coupon code is require"
                    : validate && dataDetail.code?.length > 10
                      ? "Coupon code up to 10 characters"
                      : validate && messageToastError
                        ? "Coupon code exists"
                        : ""
                }
                disabled={detail}
                value={dataDetail?.code}
                name="code"
                onChange={(e) => {
                  onChangeValue(e);
                  setMessageToastError("");
                }}
                error={
                  (validate && !dataDetail?.code) ||
                  (validate && dataDetail.code?.length > 10) ||
                  (validate && messageToastError)
                }
              />
              <TextFields
                label="Quantity per user"
                required
                placeholder="Enter quantity per user"
                helperText={
                  validate && !dataDetail.limit
                    ? "Quantity per user is require"
                    : validate && +dataDetail.limit > +dataDetail.quantity
                      ? "Quantity per user is not greater than the quantity"
                      : ""
                }
                type="number"
                disabled={detail}
                value={dataDetail?.limit}
                name="limit"
                onChange={(e) => onChangeValue(e)}
                error={validate && !dataDetail?.limit}
              />
              <TextFields
                label="Coupon method"
                helperText="Coupon method is require"
                required
                disabled={detail}
                value={conditionType}
                error={validate && !conditionType}
              >
                <Select
                  style={{ width: "100%" }}
                  value={conditionType}
                  onChange={(e) => setConditionType(e.target.value)}
                  disabled={detail}
                >
                  <MenuItem value={1}>
                    <Box>Bill</Box>
                  </MenuItem>
                  <MenuItem value={2}>
                    <Box>Quantity of goods</Box>
                  </MenuItem>
                </Select>
              </TextFields>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFields
                label="Coupon name"
                required
                placeholder="Enter coupon name"
                disabled={detail}
                value={dataDetail?.name_en || ""}
                name="name_en"
                onChange={(e) => onChangeValue(e)}
                inputProps={{ maxLength: 50 }}
              />
              <Box className="wrapper-datetime-local">
                <span
                  className="datetime-local-display-value"
                  style={{ color: dataDetail?.start_date ? "black" : "gray" }}
                >
                  {dataDetail?.start_date
                    ? formatDateTime(dataDetail?.start_date)
                    : "dd/mm/yyyy hh:mm"}
                </span>
                <TextFields
                  label="Start date"
                  helperText="Start date is require"
                  required
                  type="datetime-local"
                  placeholder=""
                  disabled={detail}
                  value={dataDetail?.start_date}
                  name="start_date"
                  onChange={(e) => onChangeValue(e)}
                  error={validate && !dataDetail?.start_date}
                  endAdornment={<EventIcon />}
                  inputProps={{
                    // readonly: "readonly",
                    min: params?.id
                      ? null
                      : moment().format("yyyy-MM-DDTHH:mm"),
                  }}
                />
              </Box>
              <Box className="text-field-label">Tr???ng th??i </Box>
              <Switch
                disabled={detail}
                checked={dataDetail?.status === 1}
                name="status"
                onChange={(e) => {
                  onChangeValue(e, "switch", "status");
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFields
                label="Quantity"
                required
                type="number"
                placeholder="Enter quantity"
                helperText="Quantity is require"
                disabled={detail}
                value={dataDetail?.quantity}
                error={validate && !dataDetail?.quantity}
                name="quantity"
                onChange={(e) => onChangeValue(e)}
              />
              <Box className="wrapper-datetime-local">
                <span
                  className="datetime-local-display-value"
                  style={{ color: dataDetail?.end_date ? "black" : "gray" }}
                >
                  {dataDetail?.end_date
                    ? formatDateTime(dataDetail?.end_date)
                    : "dd/mm/yyyy hh:mm"}
                </span>
                <TextFields
                  label="End date"
                  helperText="End date is require"
                  error={validate && !dataDetail?.end_date}
                  required
                  type="datetime-local"
                  disabled={detail}
                  value={dataDetail?.end_date}
                  name="end_date"
                  placeholder=""
                  onChange={(e) => onChangeValue(e)}
                  endAdornment={<EventIcon />}
                  errorDate={
                    validate &&
                    new Date(dataDetail?.end_date) <
                    new Date(dataDetail?.start_date)
                  }
                  helperTextDate="End date > Start date"
                  inputProps={{
                    // readonly: "readonly",
                    min: params?.id
                      ? null
                      : moment().format("yyyy-MM-DDTHH:mm"),
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        )}
      </div>
      <div className="page-header">
        <div className="page-title">
          {lang === LANG_VI ? "??i???u ki???n" : "Condition"}
        </div>
      </div>
      <div className="page-content" style={{ marginBottom: 20 }}>
        {conditionType === 1 ? (
          <Fragment>
            {Array.isArray(billConditionList) &&
              billConditionList.map((item, index) => (
                <BillCondition
                  validate={validate}
                  index={index}
                  billCondition={item}
                  lang={lang}
                  detail={detail}
                  onRemove={removeBill}
                  billConditionList={billConditionList}
                  setBillConditionList={setBillConditionList}
                  setValidate={setValidate}
                />
              ))}
            {!detail && (
              <PrimaryButton
                startIcon={<Add />}
                onClick={addBill}
                disabled={detail}
              >
                Th??m ??i???u ki???n
              </PrimaryButton>
            )}
          </Fragment>
        ) : (
          <Fragment>
            {Array.isArray(goodsConditionList) &&
              goodsConditionList.map((item, index) => (
                <GoodsCondition
                  validate={validate}
                  index={index}
                  goodsCondition={item}
                  lang={lang}
                  detail={detail}
                  onRemove={removeGoods}
                  goodsConditionList={goodsConditionList}
                  setGoodsConditionList={setGoodsConditionList}
                />
              ))}
            {!detail && (
              <PrimaryButton
                startIcon={<Add />}
                onClick={addGoods}
                disabled={detail}
                style={{ marginBottom: "32px" }}
              >
                Th??m ??i???u ki???n
              </PrimaryButton>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};
AddEditCoupon.defaultProps = {
  coupon: {},
};
export default AddEditCoupon;
