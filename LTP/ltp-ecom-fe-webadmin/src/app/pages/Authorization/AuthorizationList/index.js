import { Add, DeleteOutline } from "@material-ui/icons";
import DangerButton from "app/components/Button/DangerButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import ConfirmModal from "app/components/ConfirmModal";
import { ACTION_TYPE } from "app/reducers/authorization";
import { PAGE_SIZE } from "app/utils/constant";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Table from "./Table";

const columns = [
  {
    id: 1,
    name: "name",
    text: "Tên nhóm",
  },
  {
    id: 2,
    name: "quantity",
    text: "Sỉ số",
  },
  {
    id: 3,
    name: "description",
    text: "Mô tả",
  },
  {
    id: 4,
    name: "createdAt",
    text: "Ngày tạo",
  },
];

const AuthorizationList = () => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.authorization.permissionGroupList);
  const totalRecords = useSelector((store) => store.authorization.totalRecords);
  const [page, setPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [, setCurrentRow] = useState(null);

  useEffect(() => {
    dispatch({ type: ACTION_TYPE.GET_PERMISSION_GROUP_LIST_REQUEST });
  }, [dispatch])

  const handlePageChange = (selectedPage) => {
    setPage(selectedPage);
    dispatch({ type: ACTION_TYPE.GET_PERMISSION_GROUP_LIST_REQUEST, data: { limit: PAGE_SIZE, selectedPage } })
  }

  const handleReload = () => {
    dispatch({ type: ACTION_TYPE.GET_PERMISSION_GROUP_LIST_REQUEST, data: { limit: PAGE_SIZE, page } })
  }

  const handleDelete = () => {
    setConfirmDelete(false);
    dispatch({
      type: ACTION_TYPE.DELETE_PERMISSION_GROUP_REQUEST,
      data: `ids=${selectedRows.map((row) => row.id).join(",")}`,
      success: () => {
        handleReload();
        setSelectedRows([]);
      },
    });
  };

  return (
    <Fragment>
      <div className="page-header">
        <div className="page-title">Danh sách phân quyền</div>
        <PrimaryButton
          startIcon={<Add />}
          component={Link}
          to="/add"
        >
          Thêm mới
        </PrimaryButton>
        <DangerButton
          startIcon={<DeleteOutline />}
          disabled={selectedRows.length === 0}
          onClick={() => setConfirmDelete(true)}
        >
          Xoá đã chọn
        </DangerButton>
      </div>
      <Table
        data={data}
        columns={columns}
        onSelect={{
          selectedRows,
          setSelectedRows,
        }}
        setCurrentPage={handlePageChange}
        total={totalRecords}
        setCurrentRow={setCurrentRow}
      />
      <ConfirmModal
        isOpen={confirmDelete}
        type="delete"
        onClose={() => setConfirmDelete(false)}
        onOk={handleDelete}
        title="Xóa phân quyền"
        children="Bạn có chắc muốn xóa những phân quyền đã chọn"
        cancelText="Hủy bỏ"
        okText="Xóa"
      />
    </Fragment>
  );
};

export default AuthorizationList;
