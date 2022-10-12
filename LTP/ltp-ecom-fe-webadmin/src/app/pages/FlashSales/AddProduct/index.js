import {
  Box,
  Button,
  Grid,
  InputAdornment,
  makeStyles,
  Modal,
} from "@material-ui/core";
import TextFields from "app/components/TextFields";
import {
  createFlashSaleProduct as _createFlashSaleProduct,
  getProductList as _getProductList,
  PRODUCT_STATUS,
  updateFlashSaleProduct,
} from "app/services/flashsale";
import { formatVND, isNumeric } from "app/utils/common";
import { LANG_VI } from "app/utils/constant";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Autocomplete from "../components/Autocomplete";
import Input from "../components/Input";
import Select from "../components/Select";

export const flashSalesStructureForm = {
  flashSaleId: "",
  productId: "",
  productName: "",
  productQuantity: "",
  productPrice: "",
  productDiscount: "",
  productReducedPrice: -1,
  productReducePrice: -1,
  productStatus: "",
  productRemaining: 0,
};

const LABELS = [
  "",
  "",
  "Sản phẩm",
  "Số lượng",
  "Giá sản phẩm",
  "Phần trăm giảm",
  "Giá giảm",
  "Giá sau giảm",
  "Trạng thái",
];
function AddProduct({ isCreate, isOpen, onClose, onSubmit, defaultForm }) {
  const urlParams = useParams();
  const classes = useStyles();
  const [productList, setProductList] = useState([]);
  const [alertError, setAlertError] = useState({
    error: "",
    isShow: false,
  });
  const [form, setForm] = useState(() => {
    if (defaultForm) {
      const { productReducePrice, productReducedPrice } = calcDiscount(
        defaultForm.productPrice,
        defaultForm.productDiscount,
        false
      );
      defaultForm = {
        ...defaultForm,
        productReducePrice,
        productReducedPrice,
      };
      return defaultForm;
    }
    return flashSalesStructureForm;
  });

  const [error, setError] = useState(flashSalesStructureForm);

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = async () => {
    try {
      const request = await _getProductList();
      const { data } = await request.data;
      handleGetProductSuccess(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetProductSuccess = (data) => {
    const listStructure =
      data.length > 0
        ? data.map((item) => {
            let title = "";
            if (Array.isArray(item?.translates)) {
              title =
                item.translates.find(
                  (element) => element?.language_code === LANG_VI
                )?.name || "";
            }
            const totalQuantity = item.product_inventory.reduce(
              (acc, inventory) => acc + inventory.remaining_number,
              0
            );
            return {
              id: item.id,
              title,
              price: item.price,
              remaining: totalQuantity,
            };
          })
        : [];
    setProductList(listStructure);
  };

  const handleAddProduct = () => {
    const isValid = validateForm();
    if (!isValid) return;

    isCreate ? createFlashSaleProduct() : updateFlashSale();
  };

  const createFlashSaleProduct = async () => {
    try {
      if (!urlParams?.id) return;
      const params = {
        id: +urlParams.id,
        product_id: Number(form.productId),
        quantity: Number(form.productQuantity),
        status: Number(form.productStatus),
        percentage: Number(form.productDiscount),
      };
      const request = await _createFlashSaleProduct(params);
      const response = await request;
      setError("");
      onSubmit && onSubmit(form);
      onClose && onClose();
    } catch (error) {
      handleErrorApi(error.response.data.errorCode);
    }
  };

  const updateFlashSale = async () => {
    try {
      if (!urlParams?.id) return;
      const params = {
        product_id: Number(form.productId),
        quantity: Number(form.productQuantity),
        status: isNaN(form.productStatus)
          ? PRODUCT_STATUS.indexOf(form.productStatus)
          : Number(form.productStatus),
        percentage: Number(form.productDiscount),
      };
      const request = await updateFlashSaleProduct(
        urlParams?.id,
        form.id,
        params
      );
      const response = await request;
      setError("");
      onSubmit && onSubmit(form);
      onClose && onClose();
    } catch (error) {
      handleErrorApi(error.response.data.errorCode);
    }
  };

  const handleErrorApi = (errorCode) => {
    switch (errorCode) {
      case "flashSale::011":
        setError({
          ...flashSalesStructureForm,
          productName: "Sản phẩm đang giảm giá trong chương trình khác",
        });
        break;
      case "flashSale::012":
        handleAlertError(
          "Số lượng không được lớn hơn số lượng sản phẩm còn lại"
        );
        break;
      default:
        handleAlertError("Something went wrong");
        break;
    }
  };

  const handleAlertError = (error) => {
    setError("");
    setAlertError((prevState) => ({ isShow: true, error: error }));
  };
  const validateForm = (showError = true) => {
    let isValid = true;

    const isEmpty = Object.keys(form).every((key, val, arr) => {
      if (
        key === "productId" ||
        key === "flashSaleId" ||
        key === "productPrice" ||
        key == "productRemaining"
      ) {
        return true;
      }
      return form[key] && String(form[key]).length > 0;
    });

    if (!isEmpty) {
      const emptyFields = Object.keys(form).reduce((obj, key, index) => {
        if (
          key === "productId" ||
          key === "flashSaleId" ||
          key === "productPrice" ||
          key == "productRemaining"
        ) {
          return { ...obj, [key]: true };
        }
        return {
          ...obj,
          [key]:
            String(form[key]).length <= 0 && `${LABELS[index]} được yêu cầu`,
        };
      }, {});
      // console.log('emptyFields', emptyFields, form);
      showError && setError(emptyFields);
      isValid = false;
    }
    if (form.productRemaining) {
      // if (form.productQuantity == 0) {
      //   setError(prevState => ({ ...prevState, productQuantity: `Số lượng phải lớn hơn 0` }));
      //   isValid = false;
      // }
      if (form.productQuantity > form.productRemaining) {
        setError((prevState) => ({
          ...prevState,
          productQuantity: `Số lượng còn lại không đủ, số lượng còn lại: ${form.productRemaining}`,
        }));
        isValid = false;
      }
    } else {
      const product = productList.filter((i) => i.id == form.productId);
      const totalQuantity = product.reduce(
        (acc, item) => acc + item.remaining_number,
        0
      );
      if (form.productQuantity == 0) {
        setError((prevState) => ({
          ...prevState,
          productQuantity: `Số lượng phải lớn hơn 0`,
        }));
        isValid = false;
      }
      if (form.productQuantity > totalQuantity) {
        setError((prevState) => ({
          ...prevState,
          productQuantity: `Số lượng còn lại không đủ, số lượng còn lại: ${totalQuantity}`,
        }));
        isValid = false;
      }
    }

    if (form.productDiscount > 100) {
      setError((prevState) => ({
        ...prevState,
        productDiscount: "Phần trăm giảm không hợp lệ",
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleClose = () => {
    onClose && onClose();
  };

  const handleChange = (key, val) => {
    if (key === "productName" && val) {
      const price = val.price || defaultForm.productPrice;
      const discount = form.productDiscount || defaultForm.productDiscount;
      const id = val.id || defaultForm.productId;
      const remaining = val.remaining || defaultForm.productRemaining;
      setForm((prevState) => ({
        ...prevState,
        productName: val.title,
        productId: id,
        productPrice: price,
        productRemaining: remaining,
      }));
      calcDiscount(price, discount);
      return;
    }
    if (key === "productPrice") {
      calcDiscount(val, form.productDiscount);
      return;
    }
    if (key === "productDiscount") {
      calcDiscount(form.productPrice, val);
      return;
    }
    if (key === "productStatus") {
      val = val.index;
      setForm((prevState) => ({ ...prevState, [key]: String(val).trim() }));
      return;
    }

    // key !== "productName" &&
    //   setForm((prevState) => ({ ...prevState, [key]: String(val).trim() }));
  };

  function calcDiscount(price, discount = 0, isSetForm = true) {
    let productDiscount = discount;
    const isValidNumber = isNumeric(productDiscount || 0);
    if (!isValidNumber) return;
    if (parseInt(productDiscount) > 100) {
      productDiscount = "100";
    } else {
      productDiscount = discount;
    }

    let priceReduce = price * (productDiscount / 100);
    let priceReduced = price - priceReduce;

    isSetForm &&
      setForm((prevState) => ({
        ...prevState,
        productDiscount,
        productReducePrice: formatVND(Number(priceReduce).toFixed(), false),
        productReducedPrice: formatVND(Number(priceReduced).toFixed(), false),
      }));

    return {
      productDiscount,
      productReducePrice:
        price && formatVND(Number(priceReduce).toFixed(), false),
      productReducedPrice:
        price && formatVND(Number(priceReduced).toFixed(), false),
    };
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className={classes.container}>
        <header className={classes.header}>
          <span>{isCreate ? "Thêm sản phẩm" : "Sửa sản phẩm"}</span>
        </header>

        <article className={classes.article}>
          <Grid container>
            <Grid item xs>
              <Grid container spacing={2}>
                <Grid item xs>
                  <Autocomplete
                    required
                    disabled={!isCreate}
                    error={error.productName}
                    defaultValue={form.productName}
                    data={productList}
                    id="product"
                    labelName="Sản phẩm"
                    placeholder="Chọn sản phẩm"
                    inputSuffix="VND"
                    onChange={(val) => handleChange("productName", val)}
                  />
                </Grid>
                <Grid item xs>
                  <Input
                    required
                    error={error.productQuantity}
                    id="quantity"
                    defaultValue={form.productQuantity}
                    labelName="Số lượng"
                    type="number"
                    placeholder="Nhập số lượng"
                    onChange={(val) => handleChange("productQuantity", val)}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs>
                  <Input
                    required
                    readOnly
                    error={error.productPrice}
                    id="price"
                    defaultValue={formatVND(form.productPrice, false)}
                    labelName="Giá sản phẩm"
                    placeholder="Tự cập nhật"
                    type="number"
                    inputSuffix="VND"
                    onChange={(val) => handleChange("productPrice", val)}
                  />
                </Grid>
                <Grid item xs>
                  <TextFields
                    label="Phần trăm giảm"
                    required
                    placeholder="Nhập %"
                    endAdornment={
                      <InputAdornment position="end">
                        <Box color="#3A3A3A" fontWeight="bold">
                          %
                        </Box>
                      </InputAdornment>
                    }
                    value={form.productDiscount}
                    onChange={(e) =>
                      handleChange("productDiscount", e.target.value)
                    }
                    error={error.productDiscount}
                    helperText={error.productDiscount}
                    inputProps={{ maxLength: 5 }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs>
                  <Input
                    required
                    id="reduce_price"
                    defaultValue={form.productReducePrice}
                    error={error.productReducePrice}
                    labelName="Giá giảm"
                    placeholder="Tự cập nhật"
                    readOnly
                    inputSuffix="VND"
                  />
                </Grid>
                <Grid item xs>
                  <Input
                    required
                    inputClassName={
                      form.productReducedPrice &&
                      classes.productReducedPriceInput
                    }
                    labelClassName={
                      form.productReducedPrice &&
                      classes.productReducedPriceLabel
                    }
                    id="reduced_price"
                    defaultValue={form.productReducedPrice}
                    error={error.productReducedPrice}
                    labelName="Giá sau giảm"
                    placeholder="Tự cập nhật"
                    readOnly
                    inputSuffix="VND"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item style={{ marginTop: 24 }}>
            <Select
              defaultValue={form.productStatus}
              error={error.productStatus}
              data={PRODUCT_STATUS}
              id="status"
              labelName="Trạng thái"
              placeholder="-Chọn trạng thái-"
              onChange={(val) => handleChange("productStatus", val)}
            />
          </Grid>
        </article>
        {alertError.isShow && (
          <p className={classes.error}>{alertError.error}</p>
        )}
        <footer className={classes.footer}>
          <Grid className={classes.buttons} container spacing={2}>
            <Grid item xs={3}>
              <Button
                fullWidth
                onClick={handleClose}
                variant="outlined"
                classes={{
                  root: classes.cancelButton,
                  label: classes.labelCancelButton,
                }}
              >
                Huỷ
              </Button>
            </Grid>

            <Grid item xs={3}>
              <Button
                fullWidth
                disableElevation
                onClick={handleAddProduct}
                variant="contained"
                classes={{
                  root: classes.addButton,
                  label: classes.labelAddButton,
                }}
              >
                {isCreate ? "Thêm" : "Lưu lại"}
              </Button>
            </Grid>
          </Grid>
        </footer>
      </div>
    </Modal>
  );
}

AddProduct.defaultProps = {
  isOpen: false,
  isCreate: true,
  products: [],
  defaultData: {
    productId: "",
    productName: "",
    productQuantity: "",
    productPrice: "",
    productDiscount: "",
    productReducedPrice: "",
    productStatus: "",
  },
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: "550px",
    backgroundColor: "#ffffff",

    borderRadius: "6px",
    padding: "16px",

    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },

  header: {
    borderBottom: "1px solid #EEEEEE",
    padding: "8px 12px 12px",
    "& span": {
      fontSize: "18px",
      fontWeight: 600,
      margin: 0,
    },
  },

  article: {
    borderBottom: "1px solid #EEEEEE",
    padding: "14px 12px 20px",
    "& .MuiGrid-item > div:not(:first-child)": {
      // marginTop: 24,
    },
  },

  footer: {
    marginTop: "24px",
    marginBottom: "14px",
  },
  buttons: {
    justifyContent: "flex-end",
  },

  cancelButton: {},
  addButton: {
    backgroundColor: "#3952D3",
  },
  labelCancelButton: {
    fontSize: "14px",
    fontWeight: 600,
    textTransform: "capitalize",
  },
  labelAddButton: {
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 600,
    textTransform: "capitalize",
  },

  productReducedPriceLabel: {
    color: "#49A8FF",
  },

  productReducedPriceInput: {
    backgroundColor: "#EEF2FF",
    "& .MuiInputBase-input": {
      color: "#1E72C0",
    },
    "& .MuiInputAdornment-root > span": {
      color: "#1E72C0",
    },
  },
  error: {
    color: "#EA403F",
    fontSize: 14,
  },
}));

export default AddProduct;
