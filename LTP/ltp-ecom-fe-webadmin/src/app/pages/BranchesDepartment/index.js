import { Add as AddIcon } from '@material-ui/icons';
import DangerButton from 'app/components/Button/DangerButton';
import PrimaryButton from 'app/components/Button/PrimaryButton';
import ConfirmDelete from 'app/components/ConfirmDelete';
import Pagination from 'app/components/Pagination';
import { ACTION_TYPE } from 'app/reducers/branch';
import { PAGE_SIZE } from 'app/utils/constant';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Table from './components/Table';
import { urlBranch } from "app/Layouts/AuthenticatedLayout/Sidebar/url";

const columns = [
  {
    id: 1,
    name: 'dpt_name',
    text: 'Tên văn phòng',
    width: '20%'
  },
  {
    id: 2,
    name: 'dpt_address',
    text: 'Địa chỉ',
    width: '40%'
  },
  {
    id: 3,
    name: 'dpt_hotline',
    text: 'Hotline',
    width: '15%'
  },
  {
    id: 4,
    name: 'dpt_fax',
    text: 'Fax',
    width: '15%'
  },
];

function BranchesDepartment() {
  const dispatch = useDispatch();
  const history = useHistory();
  const branchList = useSelector((store) => store.branch.branchList);
  const totalRecords = useSelector((store) => store.branch.totalRecords);
  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);

  useEffect(() => {
    dispatch({
      type: ACTION_TYPE.GET_BRANCH_LIST_REQUEST,
      params: { page, limit: PAGE_SIZE }
    })
    setSelectedRows([]);
  }, [dispatch, page])

  const refreshList = () => {
    dispatch({
      type: ACTION_TYPE.GET_BRANCH_LIST_REQUEST,
      params: { page, limit: PAGE_SIZE }
    })
    setSelectedRows([]);
  }

  const handleAdd = () => {
    history.push(`${urlBranch}/create`);
  };


  const handleOpenDeletePopup = () => {
    setIsOpenDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setIsOpenDeletePopup(false);
  };

  const handleDelete = () => {
    handleCloseDeletePopup();
    let ids = selectedRows.map(item => item?.id);
    dispatch({
      type: ACTION_TYPE.DELETE_BRANCH_LIST_REQUEST,
      data: { ids },
      success: () => {
        setSelectedRows([]);
        refreshList();
      },
    })
  };

  return (
    <Fragment>
      <ConfirmDelete
        open={isOpenDeletePopup}
        onOK={handleDelete}
        onClose={handleCloseDeletePopup}
        title='XÓA VĂN PHÒNG ĐẠI DIỆN'
        message="Bạn có chắc muốn xóa những văn phòng đã chọn?"
      />
      <div className="page-header">
        <div className="page-title">Danh sách văn phòng đại diện</div>
        <PrimaryButton
          onClick={handleAdd}
          startIcon={<AddIcon />}>
          Thêm mới
        </PrimaryButton>
        <DangerButton
          onClick={handleOpenDeletePopup}
          disabled={!selectedRows.length > 0}>
          Xoá đã chọn
        </DangerButton>
      </div>
      <Table
        totalRecords={totalRecords}
        data={branchList}
        page={page}
        columns={columns}
        onSelect={{ selectedRows, setSelectedRows }}
      />
      <Pagination
        count={Math.ceil(totalRecords / PAGE_SIZE)}
        page={page}
        handleChangePage={setPage}
      />
    </Fragment >
  );
}


export default BranchesDepartment;