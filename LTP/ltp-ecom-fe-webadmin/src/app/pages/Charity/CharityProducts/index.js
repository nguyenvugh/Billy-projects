import { Card, CardMedia, Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Add, DeleteOutline, Edit } from "@material-ui/icons";
import DangerButton from "app/components/Button/DangerButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import ConfirmDelete from "app/components/ConfirmDelete";
import Pagination from "app/components/Pagination";
import { ACTION_TYPE } from "app/reducers/charity";
import { LANG_VI } from "app/utils/constant";
import { formatPrice } from "app/utils/validate";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddEditCharityProduct from "../AddEditCharityProduct";

const PAGE_SIZE = 4;

const CharityProducts = ({ charity, detail }) => {
  const dispatch = useDispatch();
  const charityProducts = useSelector((store) => store.charity.charityProductList);
  const totalRecords = useSelector((store) => store.charity.productTotalRecords);
  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [charityProduct, setCharityProduct] = useState();

  useEffect(() => {
    if (detail) {
      setSelectedRows([]);
    }
  }, [detail])

  useEffect(() => {
    setSelectedRows([]);
    if (charity?.id) {
      dispatch({
        type: ACTION_TYPE.GET_PRODUCT_LIST_REQUEST,
        id: charity.id,
        params: { limit: PAGE_SIZE, page },
      })
    }
  }, [dispatch, charity, page])

  const refreshList = () => {
    setSelectedRows([])
    dispatch({
      type: ACTION_TYPE.GET_PRODUCT_LIST_REQUEST,
      id: charity.id,
      params: { limit: PAGE_SIZE, page },
    })
  }

  const checkedAll = (e) => {
    if (e.target.checked) {
      if (Array.isArray(charityProducts))
        setSelectedRows(charityProducts.map(item => item?.id))
    } else {
      setSelectedRows([])
    }
  };

  const checkedRow = (e, row) => {
    let selected = [...selectedRows];
    if (e.target.checked) {
      selected.push(row?.id)
    } else {
      selected = selected.filter(item => item !== row?.id)
    }
    setSelectedRows(selected)
  };

  const onDelete = () => {
    setConfirmDelete(false);
    if (selectedRows.length > 0) {
      dispatch({
        type: ACTION_TYPE.DELETE_PRODUCT_LIST_REQUEST,
        data: { ids: selectedRows },
        success: refreshList,
      })
    }
  }

  return (
    <Fragment>
      <AddEditCharityProduct
        setProduct={setCharityProduct}
        product={charityProduct}
        charity={charity}
        refreshList={refreshList}
      />
      <ConfirmDelete
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onOK={onDelete}
        title="X??A S???N PH???M"
        message="B???n c?? ch???c mu???n x??a s???n ph???m ???? ch???n?"
      />
      <div className="page-header">
        <div className="page-title">
          Danh s??ch s???n ph???m
        </div>
        <PrimaryButton
          startIcon={<Add />}
          onClick={() => setCharityProduct({})}
          disabled={detail}
        >
          Th??m m???i
        </PrimaryButton>
        <DangerButton
          startIcon={<DeleteOutline />}
          disabled={detail || selectedRows.length === 0}
          onClick={() => setConfirmDelete(true)}
        >
          X??a ???? ch???n
        </DangerButton>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  indeterminate={
                    selectedRows.length > 0 && selectedRows.length < charityProducts?.length
                  }
                  checked={
                    charityProducts?.length > 0 && selectedRows.length === charityProducts?.length
                  }
                  onChange={checkedAll}
                  disabled={detail}
                />
              </TableCell>
              <TableCell>H??nh ???nh</TableCell>
              <TableCell>S???n ph???m</TableCell>
              <TableCell>S??? l?????ng</TableCell>
              <TableCell>Gi?? b??n</TableCell>
              <TableCell>Quy??n g??p (%)</TableCell>
              <TableCell>Ti???n quy??n g??p</TableCell>
              <TableCell>???? b??n</TableCell>
              <TableCell>Ch???nh s???a</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(charityProducts) && charityProducts.map((product) => (
              <TableRow key={product?.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.indexOf(product?.id) > -1}
                    onChange={(e) => checkedRow(e, product)}
                    disabled={detail}
                  />
                </TableCell>
                <TableCell>
                  <Card style={{ width: "104px" }}>
                    <CardMedia
                      image={Array.isArray(product?.product_obj?.images) &&
                        product.product_obj.images.find(item => item?.is_thumbnail === 1)?.image?.url}
                      style={{ paddingBottom: "60%" }}
                    />
                  </Card>
                </TableCell>
                <TableCell>
                  {product?.product_obj?.[LANG_VI]?.name}
                </TableCell>
                <TableCell>
                  {product?.quantity}
                </TableCell>
                <TableCell>
                  {formatPrice(product?.product_obj?.price)} VN??
                </TableCell>
                <TableCell>
                  {product?.percentage} %
                </TableCell>
                <TableCell>
                  {formatPrice(product?.charity_price)} VN??
                </TableCell>
                <TableCell>
                  {product?.sold}
                </TableCell>
                <TableCell>
                  <IconButton disabled={detail} onClick={() => setCharityProduct(product)}>
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(totalRecords / PAGE_SIZE)}
        page={page}
        handleChangePage={setPage}
      />
    </Fragment>
  )
}

export default CharityProducts;