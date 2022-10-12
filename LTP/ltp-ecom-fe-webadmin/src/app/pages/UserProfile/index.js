import {
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BasicModal from 'app/components/BasicModal';
import ConfirmModal from 'app/components/ConfirmModal';
import SearchInput from "app/components/SearchInput";
import { addNewCate, deleteProductCategory, getProductCategory } from 'app/services/axios';
import * as AppURL from 'app/services/urlAPI';
import * as Utils from 'app/utils';
import lodash from 'lodash';
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import Table from "./components/Table";

const columns = [
  {
    id: 1,
    name: "username",
    text: "Tên người dùng",
  },
  {
    id: 2,
    name: "email",
    text: "Email người dùng",
  },
  {
    id: 3,
    name: "phone",
    text: "Số điện thoại",
  },
  {
    id: 4,
    name: "last_loggedin",
    text: "Đăng nhập cuối",
  },
  {
    id: 5,
    name: "status",
    text: "Trạng thái",
    align: "center",
  },
  {
    id: 6,
    name: "action",
    text: "Thiết lập",
    align: "center",
  }
];

const listOptions = [
  {
    value: 0,
    label: 'Tất cả tài khoản'
  },
  {
    value: -1,
    label: 'Tài khoản khoá'
  },
  {
    value: 1,
    label: 'Tài khoản mở'
  }
]

const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: '10px',
    marginBottom: '25px',
    width: '100%',
    fontSize: "14px",
    lineHeight: "16px"
  },
}));

export default function UserProfile() {
  const classes = useStyles();
  const history = useHistory();

  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState(0);
  const [queryPhone, setQueryPhone] = useState('');
  const [queryEmail, setQueryEmail] = useState('');
  const [total, setTotal] = useState(0);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isOpenDeleteAccountConfirmation, setIsOpenDeleteAccountConfirmation] = useState(false);
  const [isOpenUnlockAccountConfirmation, setIsOpenUnlockAccountConfirmation] = useState(false);
  const [currentRowOnAction, setCurrentRowOnAction] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [lockReason, setLockReason] = useState('');

  // useEffect(async () => {
  //   await getProductCategory(AppURL.getAllNewsCategory).then(res => {
  //     if(res.code === 200){
  //       const data = Utils.getSafeValue(res, 'data', []);
  //       const initialObj = {
  //         id: 0,
  //         value: 0,
  //         label: 'Chuyên mục'
  //       }
  //       let list = [initialObj];
  //       data.map(cate => {
  //         const id = Utils.getSafeValue(cate, "id", 0);
  //         const translates = Utils.getSafeValue(cate, "translates", []);
  //         const name = Utils.getField(translates, 'vi', 'name');
  //         const objCate = {
  //           id,
  //           value: id,
  //           label: name
  //         }
  //         list.push(objCate);
  //       })
  //       setListCate(list)
  //     }
  //   })
  // }, []);

  useEffect(async () => {
    let url = Utils.replaceStrUrl(AppURL.getAllCustomers, [currentPage, 10]);
    if (queryEmail !== '') {
      url += `&email=${queryEmail}`;
    }
    if (queryPhone !== '') {
      url += `&phone_number=${queryPhone}`;
    }
    if (status !== 0) url += `&status=${status}`;
    await debounceGetAllCustomers(url);
  }, [queryEmail, queryPhone, status, currentPage, isUpdated]);

  const getAllCustomers = url => {
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

  const debounceGetAllCustomers = useCallback(lodash.debounce(getAllCustomers, 500), []);

  const handleDeleteAccount = async () => {
    let url = Utils.replaceStrUrl(AppURL.customerDetail, [currentRowOnAction.id]);
    await deleteProductCategory(url);
    setIsOpenDeleteAccountConfirmation(false);
    setIsUpdated(!isUpdated);
  }

  const handleUnlockAccount = async () => {
    let url = Utils.replaceStrUrl(AppURL.activateCustomer, [currentRowOnAction.id]);
    await addNewCate(url);
    setIsOpenUnlockAccountConfirmation(false);
    setIsUpdated(!isUpdated);
  }

  const handleLockAccount = async () => {
    let url = Utils.replaceStrUrl(AppURL.deactivateCustomer, [currentRowOnAction.id]);
    const params = {
      reason: lockReason
    }
    await addNewCate(url, params);
    setIsOpen(false);
    setIsUpdated(!isUpdated);
  }

  const handleAction = (type) => {
    const currentStatus = Utils.getSafeValue(currentRowOnAction, 'status', 0);
    if (type === 'open') {
      setIsOpenUnlockAccountConfirmation(true);
    } else if (type === 'lock') {
      setIsOpen(true);
    } else if (type === 'delete') {
      setIsOpenDeleteAccountConfirmation(true);
    }
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          Tài khoản người dùng
        </div>
        <SearchInput
          defaultValue={queryEmail}
          onSubmit={(value) => {
            setCurrentPage(1);
            setQueryEmail(value)
          }}
          placeholder="Email người dùng"
        />
        <SearchInput
          defaultValue={queryPhone}
          onSubmit={(value) => {
            setCurrentPage(1);
            setQueryPhone(value);
          }}
          placeholder="Số điện thoại"
        />
        <Select
          styles={{ control: (base) => ({ ...base, width: 180, height: 40 }) }}
          placeholder="Tất cả tài khoản"
          options={listOptions}
          onChange={(selected) => setStatus(selected.value)}
        />
      </div>
      <Table
        data={data}
        columns={columns}
        onSelect={{
          selectedRows,
          setSelectedRows,
        }}
        total={total}
        handleAction={handleAction}
        setCurrentRow={setCurrentRowOnAction}
        currentRow={currentRowOnAction}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      // listCate={listCate}
      />
      <BasicModal
        title='Khoá tài khoản'
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleLockAccount}
        isNewsCategory={true}
        isLockUser={true}
        readyForSave={lockReason !== ''}
      >
        <div>Lý do khoá</div>
        <div>
          <TextField
            type="text"
            variant="outlined"
            className={classes.input}
            required
            multiline
            rows={8}
            // error={creationFormErrorMessages.vie_category_name !== ''}
            placeholder="Nhập lý do khoá"
            name="lock_reason"
            onChange={(evt) => setLockReason(evt.target.value)}
          // helperText={creationFormErrorMessages.vie_category_name}
          />
        </div>
      </BasicModal>
      <ConfirmModal
        isOpen={isOpenUnlockAccountConfirmation}
        type="save"
        title="Mở tài khoản"
        okText="Mở"
        onOk={handleUnlockAccount}
        onClose={() => setIsOpenUnlockAccountConfirmation(false)}
      >
        <p>Bạn có chắc muốn mở lại tài khoản đã chọn?</p>
      </ConfirmModal>
      <ConfirmModal
        isOpen={isOpenDeleteAccountConfirmation}
        type="delete"
        title="Xoá tài khoản"
        okText="Xoá"
        onOk={handleDeleteAccount}
        onClose={() => setIsOpenDeleteAccountConfirmation(false)}
      >
        <p>Bạn có chắc muốn xóa tài khoản đã chọn?</p>
      </ConfirmModal>
    </div>
  );
}