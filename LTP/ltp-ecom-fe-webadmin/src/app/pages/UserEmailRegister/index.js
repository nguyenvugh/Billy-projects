import {
  Checkbox, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import DangerButton from "app/components/Button/DangerButton";
import ConfirmDelete from "app/components/ConfirmDelete";
import Pagination from "app/components/Pagination";
import { ACTION_TYPE } from "app/reducers/email";
import { PAGE_SIZE } from "app/utils/constant";
import { formatDateTime } from "app/utils/validate";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ExportExcel from "./export-excel";

export default function UserEmailRegister() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [emailList, setEmailList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    dispatch({
      type: ACTION_TYPE.GET_EMAIL_LIST_REQUEST,
      params: {
        limit: PAGE_SIZE, page, q: "",
      },
      success: (response) => {
        setEmailList(response?.data?.results);
        setTotalRecords(response?.data?.totalRecords)
      }
    });
    setSelectedRows([]);
  }, [dispatch, page])

  const refreshList = () => {
    dispatch({
      type: ACTION_TYPE.GET_EMAIL_LIST_REQUEST,
      params: {
        limit: PAGE_SIZE, page, q: "",
      },
      success: (response) => {
        setEmailList(response?.data?.results);
        setTotalRecords(response?.data?.totalRecords)
      }
    })
    setSelectedRows([]);
  }

  const checkedAll = (e) => {
    if (e.target.checked) {
      if (Array.isArray(emailList))
        setSelectedRows(emailList.map(item => item?.id))
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
    if (selectedRows.length > 0) {
      dispatch({
        type: ACTION_TYPE.DELETE_EMAIL_LIST_REQUEST,
        data: { ids: selectedRows },
        success: refreshList
      })
      setConfirmDelete(false);
    }
  }

  return (
    <div>
      <ConfirmDelete
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onOK={onDelete}
        title="XÓA EMAIL ĐĂNG KÝ"
        message="Bạn có chắc muốn xóa những email đăng ký đã chọn?"
      />
      <div className="page-header">
        <div className="page-title">Danh sách email đăng ký</div>
        <ExportExcel />
        <DangerButton
          startIcon={<DeleteOutline />}
          onClick={() => setConfirmDelete(true)}
          disabled={!selectedRows.length > 0}
        >
          Xoá đã chọn
        </DangerButton>
      </div>
      <TableContainer component={Paper}>
        <Table padding="normal">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  indeterminate={
                    selectedRows.length > 0 && selectedRows.length < emailList?.length
                  }
                  checked={
                    emailList?.length > 0 && selectedRows.length === emailList?.length
                  }
                  onChange={checkedAll}
                />
              </TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Thời gian đăng ký</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(emailList) && emailList.map((email) => {
              return (
                <TableRow key={email?.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.indexOf(email?.id) > -1}
                      onChange={(e) => checkedRow(e, email)}
                    />
                  </TableCell>
                  <TableCell>
                    {email?.email}
                  </TableCell>
                  <TableCell>
                    {formatDateTime(email?.created_at)}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(totalRecords / PAGE_SIZE)}
        page={page}
        handleChangePage={setPage}
      />
    </div>
  );
}