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
import AddProduct from "app/pages/Warehouse/AddProduct";
import { ACTION_TYPE } from "app/reducers/warehouse-receipt";
import { LANG_VI } from "app/utils/constant";
import { formatDateTime } from "app/utils/validate";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const EditReceipt = ({ receipt, refreshList }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isDetail, setIsDetail] = useState(true);
  const warehouseReceipt = useSelector(
    (store) => store.warehouseReceipt.warehouseReceipt
  );
  const [details, setDetails] = useState([]);
  const [productList, setProductList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmReceipt, setConfirmReceipt] = useState(false);
  const [confirmSave, setConfirmSave] = useState(false);
  const [addProduct, setAddProduct] = useState(false);

  useEffect(() => {
    if (!receipt?.id) {
      history.push("/");
    }
  }, [receipt, history]);

  useEffect(() => {
    if (receipt?.id) {
      dispatch({
        type: ACTION_TYPE.GET_WAREHOUSE_RECEIPT_REQUEST,
        id: receipt?.inventory?.id,
        input: receipt?.id,
        params: { limit: 500, page: 1 },
      });
    }
  }, [dispatch, receipt]);

  useEffect(() => {
    if (warehouseReceipt?.id) {
      if (Array.isArray(warehouseReceipt?.details)) {
        setDetails([...warehouseReceipt.details]);
      }
    }
    if (isDetail) {
      setProductList([]);
      setSelectedRows([]);
    }
  }, [warehouseReceipt, isDetail]);

  const checkedAll = (e) => {
    if (e.target.checked) {
      let selectReceipt = [];
      if (Array.isArray(warehouseReceipt?.details)) {
        selectReceipt = warehouseReceipt.details.map(
          (item) => item?.product?.id
        );
      }
      let selectProduct = [];
      if (Array.isArray(productList)) {
        selectProduct = productList.map((item) => item?.product?.id);
      }
      setSelectedRows([...selectReceipt, ...selectProduct]);
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
    setIsDetail(true);
  };

  const onDeleteReceipt = () => {
    setConfirmDelete(false);
    let key = receipt?.inventory?.id;
    let data = {
      [key]: [receipt?.id],
    };
    dispatch({
      type: ACTION_TYPE.DELETE_WAREHOUSE_RECEIPT_REQUEST,
      data,
      success: () => {
        refreshList();
        history.push("/");
      },
    });
  };

  const onDelete = () => {
    setDetails(
      details.filter((item) => selectedRows.indexOf(item?.product?.id) === -1)
    );
    setProductList(
      productList.filter(
        (item) => selectedRows.indexOf(item?.product?.id) === -1
      )
    );
    setSelectedRows([]);
    setConfirmDelete(false);
  };

  const onChangeProduct = (product, number) => {
    let prod = details.find((item) => item?.product?.id === product?.id);
    if (prod?.number) {
      prod.number = prod.number + number;
      setDetails([...details]);
      return;
    }
    let prodList = [...productList];
    prod = prodList.find((item) => item?.product?.id === product?.id);
    if (prod?.number) {
      prod.number = prod.number + number;
    } else {
      prodList.push({ product, number });
    }
    setProductList(prodList);
  };

  const onSubmit = () => {
    if (productList?.length > 0 || details?.length > 0) {
      dispatch({
        type: ACTION_TYPE.EDIT_WAREHOUSE_RECEIPT_REQUEST,
        id: receipt?.inventory?.id,
        input: receipt?.id,
        data: {
          details: [
            ...details.map((item) => ({
              product_id: item?.product?.id,
              number: item?.number,
            })),
            ...productList.map((item) => ({
              product_id: item?.product?.id,
              number: item?.number,
            })),
          ],
        },
        success: () => {
          refreshList();
          history.push("/");
        },
      });
    } else {
      alert("Phải có ít nhất 1 sản phẩm trong phiếu");
    }
  };

  return (
    <Fragment>
      <ConfirmDelete
        open={confirmSave}
        onClose={() => setConfirmSave(false)}
        title={<div style={{ color: "#003BFF" }}>CHỈNH SỬA PHIẾU NHẬP KHO</div>}
      >
        <div className="modal-body">
          Chỉnh sửa phiếu nhập kho có thế sẽ làm âm số lượng sản phẩm trong kho
          hàng. Bạn có chắc chắn chỉnh sửa?
        </div>
        <div className="modal-footer" style={{ textAlign: "center" }}>
          <DefaultButton onClick={() => setConfirmSave(false)}>
            HỦY BỎ
          </DefaultButton>
          <PrimaryButton onClick={onSubmit}>LƯU LẠI</PrimaryButton>
        </div>
      </ConfirmDelete>
      <ConfirmDelete
        open={confirmReceipt}
        onClose={() => setConfirmReceipt(false)}
        onOK={onDeleteReceipt}
        title="XÓA PHIẾU NHẬP KHO"
        message="Xóa phiếu nhập kho có thế sẽ làm âm số lượng sản phẩm trong kho hàng. Bạn có chắc chắn xóa?"
      />
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
      {isDetail ? (
        <div className="page-header">
          <div className="page-title">
            <Breadcrumbs>
              <Link to="/">Phiếu nhập kho</Link>
              <Typography>{receipt?.code}</Typography>
            </Breadcrumbs>
          </div>
          <PrimaryButton onClick={() => setIsDetail(false)}>
            Chỉnh sửa
          </PrimaryButton>
          <DangerButton onClick={() => setConfirmReceipt(true)}>
            Xoá
          </DangerButton>
        </div>
      ) : (
        <div className="page-header">
          <div className="page-title">
            <Breadcrumbs>
              <Link to="/">Phiếu nhập kho</Link>
              <LinkUI href="#" onClick={onBack}>
                {receipt?.code}
              </LinkUI>
              <Typography>Chỉnh sửa</Typography>
            </Breadcrumbs>
          </div>
          <DefaultButton onClick={() => setIsDetail(true)}>Huỷ</DefaultButton>
          <PrimaryButton onClick={() => setConfirmSave(true)}>
            Nhập kho
          </PrimaryButton>
        </div>
      )}
      <div className="page-content">
        <div className="page-title">Thông tin phiếu nhập kho</div>
        <Divider style={{ marginBottom: 16 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <label className="info-label">Mã phiếu</label>
            <div className="info-value">{receipt?.code}</div>
          </Grid>
          <Grid item xs={12} md={3}>
            <label className="info-label">Tên kho hàng</label>
            <div className="info-value">{receipt?.inventory?.name}</div>
          </Grid>
          <Grid item xs={12} md={3}>
            <label className="info-label">Ngày tạo</label>
            <div className="info-value">
              {formatDateTime(receipt?.created_at)}
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <label className="info-label">Người tạo</label>
            <div className="info-value">{receipt?.created_by?.fullname}</div>
          </Grid>
        </Grid>
      </div>
      <div className="page-content" style={{ marginTop: 24, paddingTop: 0 }}>
        <div className="page-header">
          <div className="page-title">Danh sách sản phẩm</div>
          <PrimaryButton
            startIcon={<Add />}
            onClick={() => setAddProduct(true)}
            disabled={isDetail}
          >
            Thêm sản phẩm
          </PrimaryButton>
          <DangerButton
            startIcon={<DeleteOutline />}
            onClick={() => setConfirmDelete(true)}
            disabled={isDetail || selectedRows.length === 0}
          >
            Xóa đã chọn
          </DangerButton>
        </div>
        <TableContainer component={Paper} style={{ maxHeight: 358 }}>
          <Table padding="normal">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < productList?.length + details.length
                    }
                    checked={
                      selectedRows.length > 0 &&
                      selectedRows.length ===
                        productList?.length + details.length
                    }
                    onChange={checkedAll}
                    disabled={isDetail}
                  />
                </TableCell>
                <TableCell>Thumbnail</TableCell>
                <TableCell>Mã sản phẩm</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Số lượng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(details) &&
                details.map((prod) => (
                  <TableRow key={prod?.product?.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.indexOf(prod?.product?.id) > -1}
                        onChange={(e) => checkedRow(e, prod?.product)}
                        disabled={isDetail}
                      />
                    </TableCell>
                    <TableCell>
                      <Card style={{ width: "104px", margin: 8 }}>
                        <CardMedia
                          image={
                            Array.isArray(prod?.product?.images) &&
                            prod.product.images.find(
                              (item) => item?.is_thumbnail === 1
                            )?.url
                          }
                          style={{ paddingBottom: "60%" }}
                        />
                      </Card>
                    </TableCell>
                    <TableCell>{prod?.product?.code}</TableCell>
                    <TableCell>{prod?.product?.name}</TableCell>
                    <TableCell>{prod?.number}</TableCell>
                  </TableRow>
                ))}
              {Array.isArray(productList) &&
                productList.map((prod) => (
                  <TableRow key={prod?.product?.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.indexOf(prod?.product?.id) > -1}
                        onChange={(e) => checkedRow(e, prod?.product)}
                        disabled={isDetail}
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

export default EditReceipt;
