import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import DefaultButton from "app/components/Button/DefaultButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import TextFields from "app/components/TextFields";
import SelectProduct from "app/pages/Charity/AddEditCharityProduct/SelectProduct";
import { isNumeric, numberWithCommas } from "app/utils/common";
import { formatPrice, isEmpty } from "app/utils/validate";
import { useEffect } from "react";
import { useState } from "react";

const AddEditComboProduct = ({
  product,
  setProduct,
  productList,
  setProductList,
}) => {
  const [productSelect, setProductSelect] = useState();
  const [percentage, setPercentage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (product?.product?.id) {
      setProductSelect(product?.product);
      setPercentage(numberWithCommas(product?.percentage));
      setQuantity(formatPrice(product?.quantity));
    } else {
      setProductSelect();
      setPercentage("");
      setQuantity("");
      setSubmit(false);
    }
  }, [product]);

  const handleClose = (e, reason) => {
    e?.preventDefault();
    if (reason !== "backdropClick") {
      setProduct();
    }
  };

  const onChangeProduct = (product) => {
    setProductSelect(product);
  };

  const onChangePercentage = (e) => {
    const value = e.target.value;
    const isValidNumber = isNumeric(value || 0);
    if (!isValidNumber) return;
    if (parseInt(value) > 100) {
      setPercentage("100");
    } else {
      setPercentage(value);
    }
  };

  const validateProduct = () => {
    if (!productSelect?.id) {
      return "Sản phẩm được yêu cầu";
    }
    if (
      !product &&
      productList.find((item) => item?.product?.id === productSelect?.id)
    ) {
      return "Sản phẩm đã xuất hiện trong combo";
    }
    return null;
  };

  const onSubmit = () => {
    if (
      !productSelect?.id ||
      isEmpty(quantity) ||
      parseInt(quantity) === 0 ||
      isEmpty(percentage) ||
      parseFloat(percentage) === 0 ||
      (!product &&
        productList.find((item) => item?.product?.id === productSelect?.id))
    ) {
      setSubmit(true);
      return;
    }
    let newProductList = [...productList];
    if (product?.product?.id) {
      //edit
      product.quantity = parseInt(quantity.replace(/[^0-9]/g, ""));
      product.percentage = parseFloat(percentage);
    } else {
      //add
      let product_obj = {
        product: productSelect,
        quantity: parseInt(quantity.replace(/[^0-9]/g, "")),
        percentage: parseFloat(percentage),
      };
      newProductList.push(product_obj);
    }
    setProduct();
    setProductList(newProductList);
  };

  const errorProduct = validateProduct();

  const priceDiscount = numberWithCommas(
    +((+productSelect?.price / 100) * parseFloat(percentage || "0")).toFixed(4)
  );

  const priceAfterDiscount = numberWithCommas(
    +((productSelect?.price / 100) * (100 - parseFloat(percentage))).toFixed(4)
  );

  const intoMoney = numberWithCommas(
    +(
      quantity *
      ((productSelect?.price / 100) * (100 - parseFloat(percentage)))
    ).toFixed(4)
  );
  return (
    <Modal
      open={product !== undefined}
      onClose={handleClose}
      style={{ outline: "none" }}
    >
      <div className="modal-content" style={{ maxWidth: 650 }}>
        <div className="modal-header">
          <div className="modal-title">
            {product?.product?.id ? "Chỉnh sửa " : "Thêm "}sản phẩm
          </div>
          <IconButton onClick={handleClose} style={{ padding: 3 }}>
            <Close />
          </IconButton>
        </div>
        <div className="modal-body">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextFields
                label="Sản phẩm"
                required
                error={submit && errorProduct}
                helperText={errorProduct}
              >
                <SelectProduct
                  value={productSelect}
                  onChange={onChangeProduct}
                  disabled={!!product?.product?.id}
                />
              </TextFields>
              <TextFields
                disabled
                label="Giá sản phẩm"
                required
                placeholder="Tự cập nhật"
                value={formatPrice(productSelect?.price)}
              />
              <TextFields
                disabled
                label="Giá giảm"
                required
                placeholder="Tự cập nhật"
                endAdornment={
                  <InputAdornment position="end">
                    <Box color="#3A3A3A" fontWeight="bold">
                      {" "}
                      VND
                    </Box>
                  </InputAdornment>
                }
                value={priceDiscount}
              />
              <TextFields
                disabled
                label="Thành tiền"
                required
                placeholder="Tự cập nhật"
                endAdornment={
                  <InputAdornment position="end">
                    <Box color="#3A3A3A" fontWeight="bold">
                      {" "}
                      VND
                    </Box>
                  </InputAdornment>
                }
                value={intoMoney}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFields
                label="Số lượng mua"
                required
                placeholder="Nhập số lượng"
                value={quantity}
                onChange={(e) => setQuantity(formatPrice(e.target.value))}
                error={
                  submit && (isEmpty(quantity) || parseInt(quantity) === 0)
                }
                helperText={
                  isEmpty(quantity)
                    ? "Số lượng được yêu cầu"
                    : "Số lượng phải lớn hơn 0"
                }
              />
              <TextFields
                label="Phần trăm giảm"
                required
                placeholder="Nhập %"
                endAdornment={
                  <InputAdornment position="end">
                    <Box color="#3A3A3A" fontWeight="bold">
                      {" "}
                      %
                    </Box>
                  </InputAdornment>
                }
                value={percentage}
                onChange={onChangePercentage}
                error={submit && isEmpty(percentage)}
                helperText={
                  isEmpty(percentage) && "Phần trăm quyên góp được yêu cầu"
                }
                inputProps={{ maxLength: 5 }}
              />
              <TextFields
                disabled
                label="Giá sau giảm"
                required
                placeholder="Tự cập nhật"
                endAdornment={
                  <InputAdornment position="end">
                    <Box color="#3A3A3A" fontWeight="bold">
                      VND
                    </Box>
                  </InputAdornment>
                }
                value={priceAfterDiscount}
              />
            </Grid>
          </Grid>
        </div>
        <div className="modal-footer">
          <DefaultButton onClick={handleClose}>Hủy</DefaultButton>
          <PrimaryButton onClick={onSubmit}>Lưu lại</PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};

export default AddEditComboProduct;
