import {
  Box,
  Card,
  CardMedia,
  Checkbox,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Add, Edit } from "@material-ui/icons";
import DangerButton from "app/components/Button/DangerButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import ConfirmDelete from "app/components/ConfirmDelete";
import { numberWithCommas } from "app/utils/common";
import { LANG_VI } from "app/utils/constant";
import { formatPrice } from "app/utils/validate";
import { Fragment, useState } from "react";
import AddEditComboProduct from "../AddEditComboProduct";

const ComboProducts = ({ detail, productList, setProductList }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [product, setProduct] = useState();

  const checkedAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(productList.map((item) => item?.product?.id));
    } else {
      setSelectedRows([]);
    }
  };

  const checkedRow = (e, row) => {
    let selected = [...selectedRows];
    if (e.target.checked) {
      selected.push(row?.product?.id);
    } else {
      selected = selected.filter((item) => item !== row?.product?.id);
    }
    setSelectedRows(selected);
  };

  const removeProduct = () => {
    let proList = productList.filter(
      (item) => !selectedRows.includes(item?.product?.id)
    );
    setProductList(proList);
    setSelectedRows([]);
    setConfirmDelete(false);
  };

  let weight = 0;
  let size = 0;
  let discount = 0;
  let price = 0;
  productList.forEach((item) => {
    weight = weight + (parseFloat(item?.product?.weight) || 0) * item?.quantity;
    size =
      size +
      (parseFloat(item?.product?.length) || 0) *
        (parseFloat(item?.product?.width) || 0) *
        (parseFloat(item?.product?.height) || 0) *
        item?.quantity;
    price = price + parseFloat(item?.product?.price) * item?.quantity;
    discount =
      discount +
      ((parseFloat(item?.product?.price) * (100 - item?.percentage)) / 100) *
        item?.quantity;
  });

  return (
    <Fragment>
      <AddEditComboProduct
        product={product}
        setProduct={setProduct}
        productList={productList}
        setProductList={setProductList}
      />
      <ConfirmDelete
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onOK={removeProduct}
        title="X??A S???N PH???M"
        message="B???n c?? ch???c mu???n x??a s???n ph???m ???? ch???n?"
        cancelTitle="H???Y B???"
        okTitle="X??A"
      />
      <div className="page-header">
        <div className="page-title">Danh s??ch s???n ph???m</div>
        <PrimaryButton
          startIcon={<Add />}
          onClick={() => setProduct({})}
          disabled={detail}
        >
          Th??m m???i
        </PrimaryButton>
        <DangerButton
          disabled={detail || selectedRows.length === 0}
          onClick={() => setConfirmDelete(true)}
        >
          X??a ???? ch???n
        </DangerButton>
      </div>
      <TableContainer component={Paper} style={{ maxHeight: 377 }}>
        <Table padding="normal" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  indeterminate={
                    selectedRows.length > 0 &&
                    selectedRows.length < productList.length
                  }
                  checked={
                    productList.length > 0 &&
                    selectedRows.length === productList.length
                  }
                  onChange={checkedAll}
                  disabled={detail}
                />
              </TableCell>
              <TableCell>H??nh ???nh</TableCell>
              <TableCell>S???n ph???m</TableCell>
              <TableCell>Gi?? th???c</TableCell>
              <TableCell>Ph???n tr??m gi???m</TableCell>
              <TableCell>Gi?? sau gi???m</TableCell>
              <TableCell>S??? l?????ng mua</TableCell>
              <TableCell>Th??nh ti???n</TableCell>
              <TableCell>Ch???nh s???a</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.map((productItem) => {
              const { product, percentage, quantity } = productItem;

              const priceAfterDiscount =
                numberWithCommas(
                  ((product?.price * (100 - percentage)) / 100).toFixed()
                ) + " VN??";

              const intoMoney =
                numberWithCommas(
                  (
                    ((product?.price * (100 - percentage)) / 100) *
                    quantity
                  ).toFixed()
                ) + " VN??";

              return (
                <TableRow key={product?.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(product?.id)}
                      onChange={(e) => checkedRow(e, productItem)}
                      disabled={detail}
                    />
                  </TableCell>
                  <TableCell>
                    <Card style={{ width: "104px" }}>
                      <CardMedia
                        image={
                          Array.isArray(product?.images) &&
                          product.images.find(
                            (item) => item?.is_thumbnail === 1
                          )?.image?.url
                        }
                        style={{ paddingBottom: "60%" }}
                      />
                    </Card>
                  </TableCell>
                  <TableCell>{product?.[LANG_VI]?.name}</TableCell>
                  <TableCell>
                    {numberWithCommas(product?.price.toFixed())} VN??
                  </TableCell>
                  <TableCell>{percentage} %</TableCell>
                  <TableCell>{priceAfterDiscount}</TableCell>
                  <TableCell>{quantity}</TableCell>
                  <TableCell>{intoMoney}</TableCell>
                  <TableCell>
                    <IconButton
                      disabled={detail}
                      onClick={() => setProduct(productItem)}
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box my={4} className="page-content">
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <div>
              T???ng kh???i l?????ng:{" "}
              <Box component="span" fontWeight="bold">
                {weight}kg
              </Box>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <div>
              T???ng k??ch th?????c:{" "}
              <Box component="span" fontWeight="bold">
                {formatPrice(size)}cm<sup>3</sup>
              </Box>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <div>
              T???ng gi?? ti???n tr?????c gi???m:{" "}
              <Box component="span" fontWeight="bold">
                {formatPrice(price)}??
              </Box>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <div>
              T???ng gi?? ti???n sau gi???m:{" "}
              <Box component="span" fontWeight="bold">
                {formatPrice(discount)}??
              </Box>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default ComboProducts;
