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
import { ACTION_TYPE } from "app/reducers/charity";
import { isNumeric, numberWithCommas } from "app/utils/common";
import { formatPrice, isEmpty } from "app/utils/validate";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SelectProduct from "./SelectProduct";

const AddEditCharityProduct = ({
  product,
  setProduct,
  charity,
  refreshList,
}) => {
  const dispatch = useDispatch();
  const [productSelect, setProductSelect] = useState();
  const [errorProduct, setErrorProduct] = useState();
  const [percentage, setPercentage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (product?.id) {
      setProductSelect(product?.product_obj);
      setPercentage(numberWithCommas(product?.percentage));
      setQuantity(formatPrice(product?.quantity));
    } else {
      setProductSelect();
      setPercentage("");
      setQuantity("");
      setSubmit(false);
    }
  }, [product]);

  useEffect(() => {
    if (Array.isArray(productSelect?.product_inventory)) {
      let max = productSelect.product_inventory.reduce(
        (value, item) => (item?.remaining_number || 0) + value,
        0
      );
      let q = parseInt(quantity.replace(/[^0-9]/g, ""));
      if (q > max) {
        setQuantity(formatPrice(max));
      }
    }
  }, [productSelect, quantity]);

  const handleClose = (e, reason) => {
    e?.preventDefault();
    if (reason !== "backdropClick") {
      setProduct instanceof Function && setProduct();
    }
  };

  const onChangeProduct = (product) => {
    setProductSelect(product);
    setErrorProduct();
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

  const onSubmit = () => {
    if (
      !productSelect?.id ||
      isEmpty(quantity) ||
      parseInt(quantity) === 0 ||
      isEmpty(percentage) ||
      parseInt(percentage) === 0
    ) {
      setSubmit(true);
      return;
    }
    dispatch({
      type: product?.id
        ? ACTION_TYPE.EDIT_PRODUCT_REQUEST
        : ACTION_TYPE.ADD_PRODUCT_REQUEST,
      id: charity?.id,
      productId: product?.id,
      data: {
        product: productSelect?.id,
        quantity: quantity.replace(/[^0-9]/g, ""),
        percentage,
      },
      success: () => {
        refreshList instanceof Function && refreshList();
        setProduct();
      },
      error: (e) => {
        if (e?.message === "charity product already exist") {
          setErrorProduct("Sản phẩm đã xuất hiện trong chương trình");
        }
      },
    });
  };

  const priceDiscount = numberWithCommas(
    +((+productSelect?.price / 100) * parseFloat(percentage || "0")).toFixed(4),
    ","
  );

  const priceAfterDiscount = numberWithCommas(
    +((productSelect?.price / 100) * (100 - parseFloat(percentage))).toFixed(4),
    ","
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
            {product?.id ? "Chỉnh sửa " : "Thêm "}sản phẩm
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
                error={errorProduct || (submit && !productSelect?.id)}
                helperText={
                  errorProduct ? errorProduct : "Sản phẩm được yêu cầu"
                }
              >
                <SelectProduct
                  value={productSelect}
                  onChange={onChangeProduct}
                  disabled={!!product?.id}
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
                label="Tiền quyên góp"
                required
                placeholder="Tự cập nhật"
                endAdornment={
                  <InputAdornment position="end">
                    <Box color="#3A3A3A" fontWeight="bold">
                      VND
                    </Box>
                  </InputAdornment>
                }
                value={priceDiscount}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFields
                label="Số lượng"
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
                label="Quyên góp"
                required
                placeholder="Nhập %"
                endAdornment={
                  <InputAdornment position="end">
                    <Box color="#3A3A3A" fontWeight="bold">
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
                label="Giá trị sau quyên góp"
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

export default AddEditCharityProduct;
