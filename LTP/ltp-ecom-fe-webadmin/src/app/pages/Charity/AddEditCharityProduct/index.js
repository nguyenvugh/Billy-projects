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
          setErrorProduct("S???n ph???m ???? xu???t hi???n trong ch????ng tr??nh");
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
            {product?.id ? "Ch???nh s???a " : "Th??m "}s???n ph???m
          </div>
          <IconButton onClick={handleClose} style={{ padding: 3 }}>
            <Close />
          </IconButton>
        </div>
        <div className="modal-body">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextFields
                label="S???n ph???m"
                required
                error={errorProduct || (submit && !productSelect?.id)}
                helperText={
                  errorProduct ? errorProduct : "S???n ph???m ???????c y??u c???u"
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
                label="Gi?? s???n ph???m"
                required
                placeholder="T??? c???p nh???t"
                value={formatPrice(productSelect?.price)}
              />
              <TextFields
                disabled
                label="Ti???n quy??n g??p"
                required
                placeholder="T??? c???p nh???t"
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
                label="S??? l?????ng"
                required
                placeholder="Nh???p s??? l?????ng"
                value={quantity}
                onChange={(e) => setQuantity(formatPrice(e.target.value))}
                error={
                  submit && (isEmpty(quantity) || parseInt(quantity) === 0)
                }
                helperText={
                  isEmpty(quantity)
                    ? "S??? l?????ng ???????c y??u c???u"
                    : "S??? l?????ng ph???i l???n h??n 0"
                }
              />
              <TextFields
                label="Quy??n g??p"
                required
                placeholder="Nh???p %"
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
                  isEmpty(percentage) && "Ph???n tr??m quy??n g??p ???????c y??u c???u"
                }
                inputProps={{ maxLength: 5 }}
              />
              <TextFields
                disabled
                label="Gi?? tr??? sau quy??n g??p"
                required
                placeholder="T??? c???p nh???t"
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
          <DefaultButton onClick={handleClose}>H???y</DefaultButton>
          <PrimaryButton onClick={onSubmit}>L??u l???i</PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};

export default AddEditCharityProduct;
