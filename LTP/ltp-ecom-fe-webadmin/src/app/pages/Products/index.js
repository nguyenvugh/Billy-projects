import { Box, Checkbox, FormControlLabel } from '@material-ui/core';
import { Add as AddIcon, DeleteOutline } from '@material-ui/icons';
import DangerButton from 'app/components/Button/DangerButton';
import PrimaryButton from 'app/components/Button/PrimaryButton';
import ConfirmModal from 'app/components/ConfirmModal';
import SearchInput from "app/components/SearchInput";
import { deleteProductCategory, getProductCategory, updateCate } from 'app/services/axios';
import { isEmpty } from 'app/utils/validate';
import lodash from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import Select from 'react-select';
import * as AppURL from '../../services/urlAPI';
import * as Utils from '../../utils';
import Table from './components/Table';

const columns = [
  {
    id: 1,
    name: 'product_code',
    text: 'Mã sản phẩm',
  },
  {
    id: 2,
    name: 'product_name',
    text: 'Tên sản phẩm',
  },
  {
    id: 3,
    name: 'parent_category_name',
    text: 'Danh mục con',
  },
  {
    id: 4,
    name: 'quantity',
    text: 'Số lượng',
  },
  {
    id: 5,
    name: 'price',
    text: 'Đơn giá',
  },
  {
    id: 6,
    name: 'feature',
    text: 'Nổi bật',
  },
  {
    id: 7,
    name: 'status',
    text: 'Trạng thái',
  }
];

const status = [
  {
    value: 0,
    label: 'Trạng thái'
  },
  {
    value: 1,
    label: 'Hiện'
  },
  {
    value: -1,
    label: 'Ẩn'
  }
]

export default function Products() {
  const history = useHistory();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isOpenDeleteProductsConfirmation, setIsOpenDeleteProductsConfirmation] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(location.state?.page || 1);
  const [isOutstanding, setIsOutstanding] = useState(false);
  const [query, setQuery] = useState('');
  const [displayStatus, setDisplayStatus] = useState(0);
  const [listChildCate, setListChildCate] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [update, setUpdate] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  useEffect(async () => {
    await getProductCategory(AppURL.getAllChildProductCategory).then(res => {
      const results = Utils.getSafeValue(res, 'results', []);
      const initialObj = {
        id: 0,
        value: 0,
        label: 'Danh mục con'
      }
      let list = [initialObj];
      results.map(cate => {
        const id = Utils.getSafeValue(cate, "id", 0);
        const translates = Utils.getSafeValue(cate, "translates", []);
        const name = Utils.getField(translates, "vi", "name");
        const objCate = {
          id,
          value: id,
          label: name
        };
        list.push(objCate);
      })
      setListChildCate(list);
    })
  }, [])

  useEffect(async () => {
    let url = Utils.replaceStrUrl(AppURL.getProducts, [
      currentPage, 10
    ]);
    if (isOutstanding) url += `&is_feature=1`;
    if (query !== '') url += `&q=${query}`;
    if (displayStatus !== 0) url += `&status_display=${displayStatus}`;
    if (selectedCategory !== 0) url += `&category=${selectedCategory}`;
    if (query !== '') {
      await getProducts(url);
    } else {
      await debounceGetProducts(url);
    }
  }, [isOutstanding, query, displayStatus, selectedCategory, update, currentPage])

  const getProducts = (url) => {
    getProductCategory(url).then(res => {
      const results = Utils.getSafeValue(res, "results", []);
      const total = Utils.getSafeValue(res, "total", 0);
      setData(results);
      setTotal(total);
    })
  }

  const debounceGetProducts = useCallback(lodash.debounce(getProducts, 500), []);

  const handleRedirectToCreationPage = () => {
    history.push({
      pathname: '/products/create',
      state: total,
    });
  }

  const handleDeleteSelectedRows = () => {
    try {
      if (selectedRows.length > 0) {
        if (selectedRows.length === 1) {
          const selectedId = Utils.getSafeValue(selectedRows[0], "id", 0);
          const url = Utils.replaceStrUrl(AppURL.deleteProduct, [
            selectedId,
          ])
          deleteProductCategory(url).then(res => {
            if (res !== null) {
              const newData = data.filter(cat => {
                return cat.id !== selectedId;
              });
              setData(newData);
            }
          });
        } else {
          const arrIds = selectedRows.map(row => row?.id);
          const param = 'ids=';
          let url = Utils.replaceStrUrl(AppURL.deleteProducts, []);
          for (let i = 0; i < arrIds.length - 1; i++) {
            url += param + arrIds[i] + '&';
          }
          url += param + arrIds[arrIds.length - 1];
          deleteProductCategory(url).then(res => {
            if (res !== null) {
              const newData = data.filter(cat => {
                return !lodash.includes(arrIds, cat.id);
              })
              setData(newData);
            }
          })
        }
      }
      setSelectedRows([]);
      setIsOpenDeleteProductsConfirmation(false);
    } catch (error) {
      console.log(error);
      setIsOpenDeleteProductsConfirmation(false);
    }
  }

  const handleUpdateStatus = (rowParam, status) => {
    // console.log(row, status);
    const row = { ...currentRow };
    if (row.status_display === status) return;
    try {
      let images = [];
      let thumbnailId;
      row.images.map(image => {
        if (image.is_thumbnail !== 1)
          images.push(image.image.id);
        else thumbnailId = image.image.id;
      });
      const translates = Utils.getSafeValue(row, "translates", []);
      const name = Utils.getObjByLanguage(translates, 'vi', 'name');
      const short_desc = Utils.getObjByLanguage(translates, 'vi', 'short_desc');
      const desc = Utils.getObjByLanguage(translates, 'vi', 'description');
      const name_en = Utils.getObjByLanguage(translates, 'en', 'name');
      const short_desc_en = Utils.getObjByLanguage(translates, 'en', 'short_desc');
      const desc_en = Utils.getObjByLanguage(translates, 'en', 'description');
      const code = Utils.getSafeValue(row, 'code', '');
      const category = Utils.getSafeValue(row, 'category', 0);
      const price = Utils.getSafeValue(row, 'price', 0);
      const width = Utils.getSafeValue(row, 'width', 0);
      const length = Utils.getSafeValue(row, 'length', 0);
      const height = Utils.getSafeValue(row, 'height', 0);
      const weight = Utils.getSafeValue(row, 'weight', 0);
      const allow_cod = Utils.getSafeValue(row, 'allow_cod', 0);
      let translatesParams = [];
      if (name !== null && name !== '') translatesParams.push({
        language_code: "vi",
        language_field: "name",
        language_value: name
      });
      if (short_desc !== null && short_desc !== '') translatesParams.push({
        language_code: "vi",
        language_field: "short_desc",
        language_value: short_desc
      });
      if (desc !== null && desc !== '') translatesParams.push({
        language_code: "vi",
        language_field: "description",
        language_value: desc
      })
      translatesParams.push({
        language_code: "en",
        language_field: "name",
        language_value: isEmpty(name_en) ? name : name_en,
      });
      translatesParams.push({
        language_code: "en",
        language_field: "short_desc",
        language_value: isEmpty(short_desc_en) ? short_desc : short_desc_en,
      });
      translatesParams.push({
        language_code: "en",
        language_field: "description",
        language_value: isEmpty(desc_en) ? desc : desc_en,
      })
      let params = {
        code,
        is_popular: -1,
        is_feature: row.is_feature,
        status_display: status,
        price,
        category,
        stock: row.product_inventory[0].remaining_number,
        images,
        thumbnail: thumbnailId,
        translates: translatesParams,
        width,
        length,
        height,
        weight,
        allow_cod
      }
      const url = Utils.replaceStrUrl(AppURL.deleteProduct, [row.id]);
      updateCate(url, params).then((res) => {
        setUpdate(!update);
      })
    } catch (error) {

    }
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title" style={{ width: "100%" }}>
          Danh sách sản phẩm
        </div>
      </div>
      <Box display="flex" justifyContent="space-between" marginBottom="16px">
        <SearchInput
          defaultValue={query}
          onSubmit={setQuery}
          placeholder="Nhập tên/mã sản phẩm"
        />
        <Select
          styles={{ control: (base) => ({ ...base, width: 200, height: 40 }) }}
          placeholder="Danh mục con"
          options={listChildCate}
          onChange={(selected) => setSelectedCategory(selected.value)}
        />
        <Select
          styles={{ control: (base) => ({ ...base, width: 150, height: 40 }) }}
          placeholder="Trạng thái"
          options={status}
          onChange={(selected) => setDisplayStatus(selected.value)}
        />
        <FormControlLabel
          control={<Checkbox checked={isOutstanding} onChange={() => setIsOutstanding(!isOutstanding)} />}
          label="Nổi bật"
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
      </Box>
      <Table
        data={data}
        columns={columns}
        onSelect={{
          selectedRows,
          setSelectedRows
        }}
        total={total}
        setCurrentPage={setCurrentPage}
        page={currentPage}
        handleUpdateStatus={handleUpdateStatus}
        setCurrentRow={setCurrentRow}
      />
      <ConfirmModal
        isOpen={isOpenDeleteProductsConfirmation}
        type="delete"
        title="Xoá sản phẩm"
        okText="Xoá"
        onOk={handleDeleteSelectedRows}
        onClose={() => setIsOpenDeleteProductsConfirmation(false)}
      >
        <p>Bạn có chắc muốn xóa những sản phẩm đã chọn?</p>
      </ConfirmModal>
    </div>
  );
}