import {
  Checkbox, FormControlLabel, Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add as AddIcon, DeleteOutline } from "@material-ui/icons";
import DangerButton from 'app/components/Button/DangerButton';
import PrimaryButton from 'app/components/Button/PrimaryButton';
import ConfirmModal from 'app/components/ConfirmModal';
import SearchInput from 'app/components/SearchInput';
import { urlNews } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import { addNewCate, getProductCategory } from 'app/services/axios';
import * as AppURL from 'app/services/urlAPI';
import * as Utils from 'app/utils';
import lodash from 'lodash';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import Table from "./components/Table";

const columns = [
  {
    id: 1,
    name: "thumbnail",
    text: "Thumbnail",
  },
  {
    id: 2,
    name: "public_feature",
    text: "Feature chung",
  },
  {
    id: 3,
    name: "private_feature",
    text: "Feature riêng",
  },
  {
    id: 4,
    name: "title",
    text: "Tiêu đề",
  },
  {
    id: 5,
    name: "content",
    text: "Nội dung",
  },
  {
    id: 6,
    name: "category",
    text: "Chuyên mục",
  },
  {
    id: 7,
    name: "modified_date",
    text: "Ngày đăng",
  },
  {
    id: 8,
    name: "status",
    text: "Trạng thái"
  },
];

const useStyles = makeStyles((theme) => ({
  publicFeature: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#A0AEC0"
  }
}));

export default function News() {
  const classes = useStyles();
  const history = useHistory();

  const [selectedRows, setSelectedRows] = useState([]);
  const [isPrivateFeature, setIsPrivateFeature] = useState(false);
  const [isPublicFeature, setIsPublicFeature] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState(0);
  const [query, setQuery] = useState('');
  const [total, setTotal] = useState(0);
  const [listCate, setListCate] = useState([]);
  const [selectedCate, setSelectedCate] = useState(0);
  const [isOpenDeleteProductsConfirmation, setIsOpenDeleteProductsConfirmation] = useState(false);

  useEffect(async () => {
    await getProductCategory(AppURL.getAllNewsCategory).then(res => {
      if (res.code === 200) {
        const data = Utils.getSafeValue(res, 'data', []);
        const initialObj = {
          id: 0,
          value: 0,
          label: 'Chuyên mục'
        }
        let list = [initialObj];
        data.map(cate => {
          const id = Utils.getSafeValue(cate, "id", 0);
          const translates = Utils.getSafeValue(cate, "translates", []);
          const name = Utils.getField(translates, 'vi', 'name');
          const objCate = {
            id,
            value: id,
            label: name
          }
          list.push(objCate);
        })
        setListCate(list)
      }
    })
  }, []);

  useEffect(async () => {
    let url = Utils.replaceStrUrl(AppURL.getNews, [currentPage, 10]);
    if (isPublicFeature) url += `&is_public_features=1`;
    if (isPrivateFeature) url += `&is_private_features=1`;
    if (query !== '') url += `&search_value=${query}`;
    if (selectedCate !== 0) url += `&category=${selectedCate}`
    await getNews(url);
  }, [isPublicFeature, isPrivateFeature, query, selectedCate, currentPage]);

  const getNews = url => {
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
    history.push(`${urlNews}/create`);
  };

  const handleDeleteSelectedRows = () => {
    let ids = [];
    selectedRows.map(selectedRow => {
      const id = Utils.getSafeValue(selectedRow, "id", 0);
      ids.push(id);
    });
    const params = {
      ids: ids.join()
    }
    addNewCate(AppURL.deleteNews, params).then(res => {
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

  return (
    <div>
      <div className="page-header">
        <div className="page-title" style={{ width: "100%" }}>
          Danh sách tin tức
        </div>
        <FormControlLabel
          control={<Checkbox checked={isPublicFeature} onChange={() => setIsPublicFeature(!isPublicFeature)} />}
          label={<Typography className={classes.publicFeature}>Feature chung</Typography>}
        />
        <FormControlLabel
          control={<Checkbox checked={isPrivateFeature} onChange={() => setIsPrivateFeature(!isPrivateFeature)} />}
          label={<Typography className={classes.publicFeature}>Feature riêng</Typography>}
        />
        <SearchInput
          defaultValue={query}
          onSubmit={setQuery}
          placeholder="Tiêu đề"
        />
        <Select
          styles={{ control: (base) => ({ ...base, width: 170, height: 40 }) }}
          placeholder="Chuyên mục"
          options={listCate}
          onChange={(selected) => setSelectedCate(selected.value)}
        />
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
        data={data}
        columns={columns}
        onSelect={{
          selectedRows,
          setSelectedRows,
        }}
        total={total}
        listCate={listCate}
        setCurrentPage={setCurrentPage}
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