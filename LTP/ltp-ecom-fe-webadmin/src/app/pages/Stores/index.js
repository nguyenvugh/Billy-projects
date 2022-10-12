import { Add as AddIcon } from '@material-ui/icons';
import DangerButton from 'app/components/Button/DangerButton';
import PrimaryButton from 'app/components/Button/PrimaryButton';
import ConfirmDelete from 'app/components/ConfirmDelete';
import Pagination from 'app/components/Pagination';
import { ACTION_TYPE } from 'app/reducers/shop';
import { PAGE_SIZE } from 'app/utils/constant';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Table from './components/Table';
import { urlStore } from 'app/Layouts/AuthenticatedLayout/Sidebar/url';

const columns = [
  {
    id: 1,
    name: 'store_name',
    text: 'Tên cửa hàng',
    width: '10%'
  },
  {
    id: 2,
    name: 'store_address',
    text: 'Địa chỉ',
    width: '25%'
  },
  {
    id: 3,
    name: 'store_phoneNumber',
    text: 'Điện thoại',
    width: '10%'
  },
  {
    id: 4,
    name: 'store_fax',
    text: 'Fax',
    width: '10%'
  },
  {
    id: 5,
    name: 'store_email',
    text: 'Email',
    width: '15%'
  },
  {
    id: 6,
    name: 'store_businessHours',
    text: 'Giờ hoạt động',
    width: '15%'
  },
];

function Stores() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
  const shopList = useSelector((store) => store.shop.shopList);
  const totalRecords = useSelector((store) => store.shop.totalRecords);

  const handleAdd = () => {
    history.push(`${urlStore}/create`);
  };

  useEffect(() => {
    dispatch({
      type: ACTION_TYPE.GET_SHOP_LIST_REQUEST,
      params: { page, limit: PAGE_SIZE }
    })
    setSelectedRows([]);
  }, [dispatch, page])

  const refreshList = () => {
    dispatch({
      type: ACTION_TYPE.GET_SHOP_LIST_REQUEST,
      params: { page, limit: PAGE_SIZE }
    })
    setSelectedRows([]);
  }

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
      type: ACTION_TYPE.DELETE_SHOP_LIST_REQUEST,
      data: { ids },
      success: refreshList,
    })
  };

  return (
    <Fragment>
      <ConfirmDelete
        open={isOpenDeletePopup}
        onClose={handleCloseDeletePopup}
        onOK={handleDelete}
        title="XÓA CỬA HÀNG"
        message="Bạn có chắc muốn xóa những cửa hàng đã chọn?"
      />
      <div className="page-header">
        <div className="page-title">Danh sách hệ thống cửa hàng</div>
        <PrimaryButton
          onClick={handleAdd}
          startIcon={<AddIcon />}
        >
          Thêm mới
        </PrimaryButton>
        <DangerButton
          onClick={handleOpenDeletePopup}
          disabled={!selectedRows.length > 0}
        >
          Xoá đã chọn
        </DangerButton>
      </div>
      <Table
        totalRecords={totalRecords}
        data={shopList}
        columns={columns}
        onSelect={{ selectedRows, setSelectedRows }}
      />
      <Pagination
        count={Math.ceil(totalRecords / PAGE_SIZE)}
        page={page}
        handleChangePage={setPage}
      />
    </Fragment>
  );
}


export default Stores;