import {
  Box, Checkbox, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from "@material-ui/core";
import { Add, DeleteOutline } from "@material-ui/icons";
import Breadcrumbs from "app/components/Breadcrumbs";
import DangerButton from "app/components/Button/DangerButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import ConfirmDelete from "app/components/ConfirmDelete";
import Pagination from "app/components/Pagination";
import SearchInput from "app/components/SearchInput";
import { ACTION_TYPE } from "app/reducers/warehouse";
import { PAGE_SIZE } from "app/utils/constant";
import { isEmpty } from "app/utils/validate";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ImportGoods from "../ImportGoods";

const WarehouseDetail = ({ warehouse }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const productList = useSelector((store) => store.warehouse.productList);
  const totalRecords = useSelector((store) => store.warehouse.totalProduct);
  const [page, setPage] = useState(1);
  const [search_value, setSearchValue] = useState("");
  const [importProduct, setImportProduct] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (id !== warehouse?.id?.toString()) {
      history.replace("/");
    }
  }, [history, id, warehouse?.id])

  useEffect(() => {
    dispatch({
      type: ACTION_TYPE.GET_PRODUCT_LIST_REQUEST,
      id: warehouse?.id,
      params: {
        limit: PAGE_SIZE, page,
        search: isEmpty(search_value) ? undefined : search_value
      },
    })
    setSelectedRows([]);
  }, [dispatch, page, warehouse?.id, search_value])

  const refreshList = () => {
    dispatch({
      type: ACTION_TYPE.GET_PRODUCT_LIST_REQUEST,
      id: warehouse?.id,
      params: {
        limit: PAGE_SIZE, page,
        search: isEmpty(search_value) ? undefined : search_value
      },
    })
    setSelectedRows([]);
  }

  const checkedAll = (e) => {
    if (e.target.checked) {
      if (Array.isArray(productList)) {
        setSelectedRows(productList.map(item => item?.id));
      }
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

  const onSearch = (value) => {
    setSearchValue(value);
    setPage(1);
  }

  const onDelete = () => {
    setConfirmDelete(false);
    if (selectedRows.length > 0) {
      dispatch({
        type: ACTION_TYPE.DELETE_PRODUCT_LIST_REQUEST,
        id: warehouse?.id,
        data: { ids: selectedRows },
        success: refreshList,
      })
    }
  }

  if (importProduct)
    return (
      <ImportGoods
        warehouse={warehouse}
        importProduct={importProduct}
        setImportProduct={setImportProduct}
        refreshList={refreshList}
      />
    )

  return (
    <Fragment>
      <ConfirmDelete
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onOK={onDelete}
        title="X??A S???N PH???M"
        message="X??a s???n ph???m kho c?? th??? s??? l??m thi???u h???t h??ng h??a cho c??c ????n h??ng. B???n c?? ch???c ch???n x??a?"
      />
      <div className="page-header">
        <div className="page-title">
          <Breadcrumbs>
            <Link to="/">Qu???n l?? kho h??ng</Link>
            <Typography>{warehouse?.name}</Typography>
          </Breadcrumbs>
        </div>
        <SearchInput
          defaultValue={search_value}
          onSubmit={onSearch}
          placeholder="M??/T??n s???n ph???m"
        />
        <PrimaryButton
          startIcon={<Add />}
          onClick={() => setImportProduct(true)}
        >
          Th??m m???i
        </PrimaryButton>
        <DangerButton
          startIcon={<DeleteOutline />}
          disabled={selectedRows.length === 0}
          onClick={() => setConfirmDelete(true)}
        >
          X??a ???? ch???n
        </DangerButton>
      </div>
      <TableContainer component={Paper}>
        <Table padding="normal">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  indeterminate={
                    selectedRows.length > 0 && selectedRows.length < productList?.length
                  }
                  checked={
                    productList?.length > 0 && selectedRows.length === productList?.length
                  }
                  onChange={checkedAll}
                />
              </TableCell>
              <TableCell>M?? s???n ph???m</TableCell>
              <TableCell>T??n s???n ph???m</TableCell>
              <TableCell>Danh m???c con</TableCell>
              <TableCell>S??? l?????ng</TableCell>
              <TableCell>???? b??n</TableCell>
              <TableCell>Tr???ng th??i</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(productList) && productList.map((item) => (
              <TableRow key={item?.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.indexOf(item?.id) > -1}
                    onChange={(e) => checkedRow(e, item)}
                  />
                </TableCell>
                <TableCell>
                  {item?.product?.code}
                </TableCell>
                <TableCell>
                  {item?.product?.name}
                </TableCell>
                <TableCell>
                  {item?.product?.category?.name}
                </TableCell>
                <TableCell>
                  {item?.remaining_number + item?.sold_number}
                </TableCell>
                <TableCell>
                  {item?.sold_number}
                </TableCell>
                <TableCell style={{ padding: "6px" }}>
                  {item?.remaining_number > 0 ?
                    <Box component="span" whiteSpace="nowrap" padding="4px 12px" color="#00B41D" border="1px solid #00B41D" borderRadius="12px">
                      C??n h??ng
                    </Box> :
                    <Box component="span" whiteSpace="nowrap" padding="4px 12px" color="#FF0000" border="1px solid #FF0000" borderRadius="12px">
                      H???t h??ng
                    </Box>
                  }
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

export default WarehouseDetail;