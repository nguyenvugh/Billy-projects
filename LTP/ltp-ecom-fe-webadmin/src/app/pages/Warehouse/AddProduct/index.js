import { Grid, IconButton, Modal } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import DefaultButton from "app/components/Button/DefaultButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import TextFields from "app/components/TextFields";
import SelectProduct from "app/pages/Charity/AddEditCharityProduct/SelectProduct";
import { isEmpty } from "app/utils/validate";
import { useEffect, useState } from "react";

const AddProduct = ({ open, setOpen, setProduct }) => {
  const [productSelect, setProductSelect] = useState();
  const [number, setNumber] = useState("");
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (open) {
      setProductSelect();
      setNumber("");
      setSubmit(false);
    }
  }, [open]);

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen instanceof Function && setOpen(false);
    }
  };

  const onSubmit = () => {
    if (!productSelect?.id || isEmpty(number) || parseInt(number) === 0) {
      setSubmit(true);
      return;
    }
    setProduct instanceof Function &&
      setProduct(productSelect, parseInt(number));
    setOpen instanceof Function && setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">Thêm sản phẩm</div>
          <IconButton onClick={handleClose} style={{ padding: 3 }}>
            <Close />
          </IconButton>
        </div>
        <div className="modal-body">
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <TextFields
                label="Sản phẩm"
                required
                error={submit && !productSelect?.id}
                helperText="Sản phẩm được yêu cầu"
              >
                <SelectProduct
                  value={productSelect}
                  onChange={setProductSelect}
                />
              </TextFields>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFields
                label="Số lượng"
                required
                value={number}
                onChange={(e) =>
                  setNumber(
                    e.target.value.replace(/[^0-9]/g, "").replace(/^0+/, "")
                  )
                }
                error={submit && (isEmpty(number) || parseInt(number) === 0)}
                helperText={
                  parseInt(number) === 0
                    ? "Số lượng phải lớn hơn 0"
                    : "Số lượng được yêu cầu"
                }
              />
            </Grid>
          </Grid>
        </div>
        <div className="modal-footer">
          <DefaultButton onClick={handleClose}>Huỷ</DefaultButton>
          <PrimaryButton onClick={onSubmit}>Thêm</PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};

export default AddProduct;
