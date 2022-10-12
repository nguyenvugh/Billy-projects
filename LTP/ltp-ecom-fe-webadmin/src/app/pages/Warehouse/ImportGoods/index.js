import {
  Card,
  CardMedia,
  Checkbox,
  Divider,
  Grid,
  Link as LinkUI,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Add, DeleteOutline } from "@material-ui/icons";
import Breadcrumbs from "app/components/Breadcrumbs";
import DangerButton from "app/components/Button/DangerButton";
import DefaultButton from "app/components/Button/DefaultButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import ConfirmDelete from "app/components/ConfirmDelete";
import { ACTION_TYPE } from "app/reducers/warehouse-receipt";
import { LANG_VI } from "app/utils/constant";
import moment from "moment";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddProduct from "../AddProduct";

const ImportGoods = ({ warehouse, setImportProduct, refreshList }) => {
  const dispatch = useDispatch();
  const profile = useSelector((store) => store.profile.profile);
  const [productList, setProductList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [addProduct, setAddProduct] = useState(false);

  const checkedAll = (e) => {
    if (e.target.checked) {
      if (Array.isArray(productList))
        setSelectedRows(productList.map((item) => item?.product?.id));
    } else {
      setSelectedRows([]);
    }
  };

  const checkedRow = (e, row) => {
    let selected = [...selectedRows];
    if (e.target.checked) {
      selected.push(row?.id);
    } else {
      selected = selected.filter((item) => item !== row?.id);
    }
    setSelectedRows(selected);
  };

  const onBack = (e) => {
    e?.preventDefault();
    setImportProduct(false);
  };

  const onDelete = () => {
    let select = productList.filter(
      (item) => selectedRows.indexOf(item?.product?.id) === -1
    );
    setProductList(select);
    setSelectedRows([]);
    setConfirmDelete(false);
  };

  const onChangeProduct = (product, number) => {
    let prodList = [...productList];
    let prod = prodList.find((item) => item?.product?.id === product?.id);
    if (prod?.number) {
      prod.number = prod.number + number;
    } else {
      prodList.push({ product, number });
    }
    setProductList(prodList);
  };

  const onSubmit = () => {
    if (productList?.length > 0) {
      dispatch({
        type: ACTION_TYPE.ADD_WAREHOUSE_RECEIPT_REQUEST,
        id: warehouse?.id,
        data: {
          details: productList.map((item) => ({
            product_id: item?.product?.id,
            number: item?.number,
          })),
        },
        success: () => {
          refreshList instanceof Function && refreshList();
          onBack();
        },
      });
    } else {
      onBack();
    }
  };

  return (
    <Fragment>
      <ConfirmDelete
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onOK={onDelete}
        title="XÓA SẢN PHẨM"
        message="Bạn có chắc muốn xóa sản phẩm đã chọn?"
      />
      <AddProduct
        open={addProduct}
        setOpen={setAddProduct}
        setProduct={onChangeProduct}
      />
      <div className="page-header">
        <div className="page-title">
          <Breadcrumbs>
            <Link to="/">Quản lý kho hàng</Link>
            <LinkUI href="#" onClick={onBack}>
              {warehouse?.name}
            </LinkUI>
            <Typography>Nhập kho</Typography>
          </Breadcrumbs>
        </div>
        <DefaultButton onClick={onBack}>Huỷ</DefaultButton>
        <PrimaryButton onClick={onSubmit}>Nhập kho</PrimaryButton>
      </div>
      <div className="page-content">
        <div className="page-title">Thông tin phiếu nhập kho</div>
        <Divider style={{ marginBottom: 16 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <label className="info-label">Mã phiếu</label>
            <div className="info-value">
              {warehouse?.code}-N-{moment().format("DDMMYYYY")}-X
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <label className="info-label">Tên kho hàng</label>
            <div className="info-value">{warehouse?.name}</div>
          </Grid>
          <Grid item xs={12} md={3}>
            <label className="info-label">Ngày tạo</label>
            <div className="info-value">{moment().format("DD/MM/YYYY")}</div>
          </Grid>
          <Grid item xs={12} md={3}>
            <label className="info-label">Người tạo</label>
            <div className="info-value">{profile?.fullname}</div>
          </Grid>
        </Grid>
      </div>
      <div className="page-content" style={{ marginTop: 24, paddingTop: 0 }}>
        <div className="page-header">
          <div className="page-title">Danh sách sản phẩm</div>
          <PrimaryButton
            startIcon={<Add />}
            onClick={() => setAddProduct(true)}
          >
            Thêm sản phẩm
          </PrimaryButton>
          <DangerButton
            startIcon={<DeleteOutline />}
            disabled={selectedRows.length === 0}
            onClick={() => setConfirmDelete(true)}
          >
            Xóa đã chọn
          </DangerButton>
        </div>
        <TableContainer component={Paper}>
          <Table padding="normal">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < productList?.length
                    }
                    checked={
                      productList?.length > 0 &&
                      selectedRows.length === productList?.length
                    }
                    onChange={checkedAll}
                  />
                </TableCell>
                <TableCell>Thumbnail</TableCell>
                <TableCell>Mã sản phẩm</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Số lượng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(productList) &&
                productList.map((prod) => (
                  <TableRow key={prod?.product?.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.indexOf(prod?.product?.id) > -1}
                        onChange={(e) => checkedRow(e, prod?.product)}
                      />
                    </TableCell>
                    <TableCell>
                      <Card style={{ width: "104px", margin: 8 }}>
                        <CardMedia
                          image={
                            Array.isArray(prod?.product?.images) &&
                            prod.product.images.find(
                              (item) => item?.is_thumbnail === 1
                            )?.image?.url
                          }
                          style={{ paddingBottom: "60%" }}
                        />
                      </Card>
                    </TableCell>
                    <TableCell>{prod?.product?.code}</TableCell>
                    <TableCell>{prod?.product?.[LANG_VI]?.name}</TableCell>
                    <TableCell>{prod?.number}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Fragment>
  );
};

export default ImportGoods;
