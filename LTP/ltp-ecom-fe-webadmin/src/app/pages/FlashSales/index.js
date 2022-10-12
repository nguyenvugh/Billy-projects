import { Button, Grid, Input, makeStyles, MenuItem, Select } from '@material-ui/core';
import { Add as AddIcon, DeleteOutline  } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import ConfirmModal from 'app/components/ConfirmModal';
import { ACTION_TYPE } from 'app/reducers/loading';
import { deleteFlashSale as _deleteFlashSale, getFlashSaleList as _getFlashSaleList, updateFlashSaleActive } from 'app/services/flashsale';
import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddFlashSale from './AddFlashSale';
import Table from './components/Table';
import SearchInput from "app/components/SearchInput";
import SelectStatus from "app/components/SelectStatus";
import DangerButton from "app/components/Button/DangerButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
// import ModalErrorMessage from 'app/Layouts/Loading/ModalErrorMessage';
// import Input from './components/Input';
// import Select from './components/Select';


const columns = [
  {
    id: 1,
    name: 'product_thumbnail',
    text: 'Tên chương trình',
    align: "left",
    paddingLeft: "12px"
  },
  {
    id: 2,
    name: 'product_name',
    text: 'Người tạo',
    align: "left"
  },
  {
    id: 3,
    name: 'product_quantity',
    text: 'Ngày bắt đầu - kết thúc',
    align: "left"
  },
  {
    id: 4,
    name: 'product_price',
    text: 'Trạng thái',
    align: "center"
  }
];





const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '16px 0',
  },

  header: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '18px 0',


    '& > div > .MuiInputBase-root': {
      border: '1px solid #E2E2E2',
      borderRadius: 4,
      marginRight: '24px',
      padding: '2px 12px 2px 18px',
      '& > input': {
        // padding: '3px 16px',
      }
    }
  },
  addButton: {
    backgroundColor: '#3952D3',
    marginRight: '24px'
  },
  deleteButton: {
    backgroundColor: '#D70000'
  },
  labelButton: {
    color: '#ffffff',
    fontSize: '14px',
    textTransform: 'capitalize'
  },
  productsTitle: {
    marginTop: 0
  }
}));

export const __FLASH_SALE = {
  name: '',
  startDate: '',
  endDate: '',
};

const allStatus = { status: 0, label: "Tất cả trạng thái" };

function FlashSales() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const urlParams = useParams();
  const [list, setList] = useState([]);
  const [flashsale, setFlashsale] = useState(__FLASH_SALE);
  const [totalRecords, setTotalRecords] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isCreateForm, setIsCreateForm] = useState(true);
  const [isOpenAddPopup, setIsOpenAddPopup] = useState(false);
  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
  const [flashSaleStatus, setFlashSaleStatus] = useState(false);
  const [flashSaleTime, setFlashSaleTime] = useState({
    startDate: '',
    endDate: '',
    status: ''
  });

  const [unchecked, setUnchecked] = useState(false);

  const [params, setParams] = useState({
    page: urlParams.page || 1,
    limit: 10,
    search_value: '',
    status: allStatus
  });



  useEffect(() => {
    getFlashSaleList();
  }, [urlParams, params]);


  const getFlashSaleList = async () => {
    try {
      const request = await _getFlashSaleList({...params, status: params?.status?.status, page: urlParams.page || 1});
      const { code, data, } = await request.data;
      handleGetFlashSaleListSuccess(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const activeFlashSaleTime = async (id, checked) => {
    try {
      const request = await updateFlashSaleActive({ id });
      const { data } = await request.data;

      setFlashSaleStatus(checked);
      getFlashSaleList();
    } catch (error) {
      showErrorPopup('Không thể bật Flashsale này vì có sản phẩm đang trong chương trình khuyến mãi khác');
      setUnchecked({ id, status: true });
    }
  };

  const deleteFlashSale = async () => {
    try {
      const listRemoved = selectedRows.map(item => item.id).join(',');
      const request = await _deleteFlashSale({ ids: listRemoved });
      const response = await request;
      await getFlashSaleList();
      setSelectedRows([]);
      handleCloseDeletePopup();
    } catch (error) {
    }
  };



  const handleGetFlashSaleListSuccess = (data) => {
    console.log(data);
    setTotalRecords(data.totalRecords);
    const listStructure = data.totalRecords > 0 ? data.results.map(item => ({
      id: item.id,
      name: item.name,
      createBy: item?.admin_obj?.fullname,
      startDate: item.start_date,
      endDate: item.end_date,
      status: item.status == -1 ? false : true
    })) : [];
    setList(listStructure);
  };

  const handleEdit = (item) => {
    handleOpenAddPopup();
    setIsCreateForm(false);
  };

  const showErrorPopup = (errorMessage) => dispatch({
    type: ACTION_TYPE.SET_ERROR_MESSAGE, payload: [errorMessage]
  });


  const handleSubmit = () => {
    handleCloseAddPopup();
    getFlashSaleList();
  };

  const handleChangeSwitch = (item, checked) => {
    if (!item?.id) return;
    const _checked = checked ? 1 : -1;
    activeFlashSaleTime(item.id, _checked);
  };
  const handleOpenAddPopup = () => setIsOpenAddPopup(true);
  const handleOpenDeletePopup = () => setIsOpenDeletePopup(true);
  const handleCloseDeletePopup = () => setIsOpenDeletePopup(false);
  const handleCloseAddPopup = () => {
    setIsOpenAddPopup(false);
    setIsCreateForm(true);
    setFlashsale(__FLASH_SALE);
  };

  const RenderDeleteConfirmChildren = () => {
    return <span>Bạn có chắc muốn xóa những Flashsale đã chọn?</span>;
  };

  const handleChangeSelector = value => {
    setParams(prevState => ({
      ...prevState,
      status: value
    }));
  };
  const handleChangeFilter = (value) => {
    setParams(prevState => ({
      ...prevState,
      search_value: value
    }));
  };
  return (
    <div className={classes.root}>
      <Grid container direction='row'>
      <div className="page-header" style={{width: '100%'}}>
          <div className="page-title">Flashsale</div>
            <SearchInput
              defaultValue={params.search_value}
              onSubmit={handleChangeFilter}
              placeholder="Tên chương trình"
            />
            <SelectStatus
              width={200}
              statusList={[allStatus, ...listStatus]}
              value={params.status}
              onChange={handleChangeSelector}
            />
            <PrimaryButton
              startIcon={<AddIcon />}
              onClick={handleOpenAddPopup}
            >
              Thêm mới
            </PrimaryButton>
            <DangerButton
              startIcon={<DeleteOutline />}
              disabled={selectedRows.length === 0}
              onClick={handleOpenDeletePopup}
            >
              Xóa đã chọn
            </DangerButton>
        </div>


        <Table
          unchecked={unchecked}
          totalRecords={totalRecords} disable={false} data={list} columns={columns} onSelect={{ selectedRows, setSelectedRows }}
          onChangeSwitch={handleChangeSwitch} onEdit={handleEdit} />
      </Grid>

      <ConfirmModal
        onOk={deleteFlashSale}
        onClose={handleCloseDeletePopup}
        title='XÓA FLASHSALE'
        children={<RenderDeleteConfirmChildren />}
        type='delete'
        okText='XÓA'
        isOpen={isOpenDeletePopup} />
      {isOpenAddPopup && <AddFlashSale
        isCreate={isCreateForm}
        defaultForm={flashsale}
        isOpen={isOpenAddPopup}
        onClose={handleCloseAddPopup}
        onSubmit={handleSubmit} />}

    </div>
  );
}


export const listStatus = [
  {
    status: 2,
    label: "Sắp diễn ra",
    color: "#FEAC0B",
  },
  {
    status: 1,
    label: "Đang diễn ra",
    color: "#00B41D",
  },
  {
    status: 3,
    label: "Đã kết thúc",
    color: "#9A9A9A",
  },
];

export default FlashSales;