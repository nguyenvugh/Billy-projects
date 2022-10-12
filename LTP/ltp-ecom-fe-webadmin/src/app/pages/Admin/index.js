import { makeStyles } from "@material-ui/core/styles";
import { Add as AddIcon, DeleteOutline } from "@material-ui/icons";
import DangerButton from "app/components/Button/DangerButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import ConfirmModal from 'app/components/ConfirmModal';
import { urlAdmin } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import { addNewCate, getProductCategory, putApi } from 'app/services/axios';
import * as AppURL from 'app/services/urlAPI';
import * as Utils from 'app/utils';
import lodash from 'lodash';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Table from "./components/Table";

const columns = [
  {
    id: 1,
    name: "username",
    text: "Tên đăng nhập",
  },
  {
    id: 2,
    name: "groupName",
    text: "Tên nhóm",
  },
  {
    id: 3,
    name: "status",
    text: "Trạng thái",
  },
  {
    id: 4,
    name: "created_at",
    text: "Ngày tạo",
  },
];

export default function Admin() {
  const history = useHistory();
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isOpenDeleteProductsConfirmation, setIsOpenDeleteProductsConfirmation] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [shouldReload, setShouldReload] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    getGroupAdmin();
  }, [])

  useEffect(async () => {
    let url = Utils.replaceStrUrl(AppURL.getAdminAccount, [currentPage, 10]);
    await getAdminAccounts(url);
  }, [shouldReload]);

  const getGroupAdmin = async () => {
    await getProductCategory(AppURL.getAdminGroup).then(result => {
      if (result.code === 200) {
        const data = Utils.getSafeValue(result, 'data', {});
        const groups = Utils.getSafeValue(data, "results", []);
        setGroups(groups);
      }
    })
  }

  const getAdminAccounts = url => {
    getProductCategory(url).then(res => {
      const code = Utils.getSafeValue(res, "code", 0);
      if (code === 200) {
        const data = Utils.getSafeValue(res, "data", {});
        const results = Utils.getSafeValue(data, "results", []);
        const total = Utils.getSafeValue(data, "totalRecords", 0);
        setData(results);
        setTotal(total);
      }
    })
  }

  const handleRedirectToCreationPage = () => {
    history.push(`${urlAdmin}/create`);
  };

  const handleDeleteSelectedRows = () => {
    console.log("handleDeleteSelectedRows", selectedRows);
    let ids = [];
    selectedRows.map(selectedRow => {
      const id = Utils.getSafeValue(selectedRow, "id", 0);
      ids.push(id);
    });
    const params = {
      ids: ids.join()
    }
    addNewCate(AppURL.deleteAdminAccount, params).then(res => {
      if (res.code === 200) {
        const newData = data.filter(cat => {
          return !lodash.includes(ids, cat.id);
        });
        setData(newData);
        setIsOpenDeleteProductsConfirmation(false);
        setSelectedRows([]);
      }
    })
    setIsOpenDeleteProductsConfirmation(false);
    setSelectedRows([]);
  };

  const handleAction = (action) => {
    if (action === 'activate') {
      if (currentRow.status === 2) {
        const params = {
          group_id: currentRow.group,
          username: currentRow.username,
          status: 1
        }
        const url = Utils.replaceStrUrl(AppURL.updateAdminAccount, [currentRow.id]);
        putApi(url, params).then(res => {
          if (res.code === 200)
            setShouldReload(!shouldReload);
        })
      }
    } else if (action === 'lock') {
      if (currentRow.status === 1) {
        const params = {
          group_id: currentRow.group,
          username: currentRow.username,
          status: 2
        }
        const url = Utils.replaceStrUrl(AppURL.updateAdminAccount, [currentRow.id]);
        putApi(url, params).then(res => {
          if (res.code === 200)
            setShouldReload(!shouldReload);
        })
      }
    }
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Danh sách tài khoản</div>
        <PrimaryButton
          startIcon={<AddIcon />}
          onClick={handleRedirectToCreationPage}
        >
          Thêm mới
        </PrimaryButton>
        <DangerButton
          startIcon={<DeleteOutline />}
          disabled={selectedRows.length === 0}
          onClick={() => setIsOpenDeleteProductsConfirmation(true)}
        >
          Xoá đã chọn
        </DangerButton>
      </div>
      <Table
        groups={groups}
        data={data}
        columns={columns}
        onSelect={{
          selectedRows,
          setSelectedRows,
        }}
        total={total}
        setCurrentRow={setCurrentRow}
        handleAction={handleAction}
      />
      <ConfirmModal
        isOpen={isOpenDeleteProductsConfirmation}
        type="delete"
        title="Xoá tin tức"
        okText="Xoá"
        onOk={handleDeleteSelectedRows}
        onClose={() => setIsOpenDeleteProductsConfirmation(false)}
      >
        <p>Bạn có chắc muốn xóa những tin tức đã chọn?</p>
      </ConfirmModal>
    </div >
  );
}