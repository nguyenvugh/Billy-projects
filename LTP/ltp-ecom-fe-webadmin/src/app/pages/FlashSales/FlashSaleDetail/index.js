import { Button, Grid, makeStyles } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import Breadcrumbs from '../components/Breadcrumbs';
import ConfirmModal from 'app/components/ConfirmModal';
import Header from 'app/pages/FlashSales/components/Header';
import { createActiveFlashSaleTime as _activeFlashSaleTime, deleteFlashSaleProduct, getFLashSaleDetail, getFlashSaleProducts, PRODUCT_STATUS, updateFlashSaleDetail } from 'app/services/flashsale';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddProduct, { flashSalesStructureForm } from '../AddProduct';
import Table from './components/Table';


const columns = [
  {
    id: 1,
    name: 'product_thumbnail',
    text: 'Hình ảnh',
  },
  {
    id: 2,
    name: 'product_name',
    text: 'Sản phẩm',
  },
  {
    id: 3,
    name: 'product_quantity',
    text: 'Số lượng',
  },
  {
    id: 4,
    name: 'product_price',
    text: 'Giá thực',
  },
  {
    id: 5,
    name: 'product_discount',
    text: 'Phần trăm giảm',
  },
  {
    id: 6,
    name: 'product_reduced_price',
    text: 'Giá sau giảm',
  },
  {
    id: 7,
    name: 'product_status',
    text: 'Trạng thái',
  },
  {
    id: 8,
    name: 'edit',
    text: 'Chỉnh sửa',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '18px 0'
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



function FlashSaleDetail() {

  const classes = useStyles();
  const urlParams = useParams();
  const [list, setList] = useState([]);
  const [product, setProduct] = useState(flashSalesStructureForm);
  const [totalRecords, setTotalRecords] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isCreateForm, setIsCreateForm] = useState(true);
  const [isOpenAddPopup, setIsOpenAddPopup] = useState(false);
  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
  const [flashSaleStatus, setFlashSaleStatus] = useState(false);
  const [flashSaleTime, setFlashSaleTime] = useState({
    flashSaleName: '',
    createBy: '',
    startDate: '',
    endDate: '',
    status: ''
  });

  const breadcrumbsLinks = [{
    href: '#',
    label: flashSaleTime?.flashSaleName
  }];




  useEffect(() => {
    getFlashSaleTime();
    // getFlashSaleProductList();
  }, []);

  useEffect(() => {
    getFlashSaleProductList();
  }, [urlParams]);


  const getFlashSaleProductList = async () => {

    try {
      if (!urlParams?.id) return;
      const params = {
        id: +urlParams?.id,
        page: urlParams.page || 1,
        limit: 4
      };
      const request = await getFlashSaleProducts(params);
      const { code, data, } = await request.data;
      handleGetFlashSaleListSuccess(data);
    } catch (error) {
      console.log(error);
    }
  };


  const handleGetFlashSaleListSuccess = (data) => {
    setTotalRecords(data.totalRecords);
    const listStructure = data.totalRecords > 0 ? data.results.map(item => ({
      id: item.id,
      product_id: item.product_obj.id,
      flashsale_id: item.flash_sale,
      product_name: item.product_obj.translates[0].name,
      product_quantity: item.quantity,
      product_price: item.product_obj.price,
      product_status: PRODUCT_STATUS[item.status],
      product_discount: item.percentage,
      product_thumbnail: item.product_obj.images[0].image.url,
      product_remaining: item.product_obj.product_inventory.reduce((v, i) => i.remaining_number + v, 0),
    })) : [];
    setList(listStructure);
  };

  const handleEdit = (item) => {
    handleOpenAddPopup();
    setIsCreateForm(false);
    console.log(item);
    setProduct({
      id: item.id,
      productId: item.product_id,
      flashSaleId: item.flashsale_id,
      productName: item.product_name,
      productQuantity: item.product_quantity,
      productPrice: item.product_price,
      productDiscount: item.product_discount,
      productStatus: item.product_status,
      productRemaining: item.product_remaining
    });
  };


  const getFlashSaleTime = async () => {
    try {
      if (!urlParams?.id) return;
      const request = await getFLashSaleDetail(urlParams.id);
      const { code, data } = await request.data;
      if (code == 200) {
        setFlashSaleStatus(data.is_active == -1 ? false : true);
        setFlashSaleTime({
          flashSaleName: data.name,
          createBy: data.admin_obj.fullname,
          startDate: new Date(data.start_date),
          endDate: new Date(data.end_date),
          status: -1
        });
      }
    } catch (error) {

    }
  };

  const updateFlashSale = async ({ name, startDate, endDate, startTime, endTime }) => {
    try {
      console.log(flashSaleTime, startTime);
      if (!urlParams?.id) return;

      const params = {
        id: +urlParams.id,
        name: name ? name : flashSaleTime.flashSaleName,
        start_date: startTime ? new Date(`${startDate} ${startTime}`) : flashSaleTime.startDate,
        end_date: endDate ? new Date(`${endDate} ${endTime}`) : flashSaleTime.endDate
      };

      const request = await updateFlashSaleDetail(params);
      const response = await request;

      setFlashSaleTime(prevState => ({
        ...prevState,
        flashSaleName: params.name,
        startDate: params.start_date,
        endDate: params.end_date,
      }));
    } catch (error) {

    }
  };


  const activeFlashSaleTime = async (checked) => {
    try {
      const request = await _activeFlashSaleTime({ is_active: checked });
      const { data } = await request.data;
      setFlashSaleStatus(checked);
    } catch (error) {

    }
  };

  const handleDateTimeFromDateTimePicker = (dateTime) => {
    updateFlashSale(dateTime);
  };

  const handleChangeFlashName = (name) => {
    updateFlashSale({ name: name });
  };

  const getSwitchChange = (checked) => {
    activeFlashSaleTime(checked);
  };

  const handleDeleteFlashSaleList = async () => {
    try {
      const listRemoved = selectedRows.map(item => item.id).join(',');
      const request = await deleteFlashSaleProduct({ ids: listRemoved });
      const response = await request;
      await getFlashSaleProductList();
      setSelectedRows([]);
      handleCloseDeletePopup();
    } catch (error) {
    }
  };

  const handleSubmit = () => {
    getFlashSaleProductList();
  };

  const handleOpenAddPopup = () => setIsOpenAddPopup(true);
  const handleOpenDeletePopup = () => setIsOpenDeletePopup(true);
  const handleCloseDeletePopup = () => setIsOpenDeletePopup(false);
  const handleCloseAddPopup = () => {
    setIsOpenAddPopup(false);
    setIsCreateForm(true);
    setProduct(flashSalesStructureForm);
  };

  const RenderDeleteConfirmChildren = () => {
    return <span>Bạn có chắc muốn xóa những sản phẩm đã chọn?</span>;
  };

  return (
    <div className={classes.root}>
      <div style={{ margin: '16px 0' }}>
        <Breadcrumbs links={breadcrumbsLinks} />
      </div>
      <Header
        switchChecked={flashSaleStatus}
        onChangeName={handleChangeFlashName}
        onDateTimeChange={handleDateTimeFromDateTimePicker}
        flashSaleName={flashSaleTime.flashSaleName}
        createBy={flashSaleTime.createBy}
        startDate={flashSaleTime.startDate}
        endDate={flashSaleTime.endDate} />

      <Grid container direction='column'>
        <Grid className={classes.header} container item>
          <h2 className={`${classes.title} ${classes.productsTitle}`}>Danh sách sản phẩm</h2>
          <div>
            <Button
              variant="contained"
              classes={{
                root: classes.addButton,
                label: classes.labelButton
              }}
              disabled={!flashSaleStatus}
              onClick={handleOpenAddPopup}
              startIcon={<AddIcon />}>
              Thêm mới
            </Button>

            <Button
              onClick={handleOpenDeletePopup}
              variant="contained"
              disabled={!selectedRows.length > 0}
              classes={{
                root: classes.deleteButton,
                label: classes.labelButton,
              }}>Xoá đã chọn</Button>
          </div>
        </Grid>


        <Table totalRecords={totalRecords} disable={!flashSaleStatus} data={list} columns={columns} onSelect={{ selectedRows, setSelectedRows }} onEdit={handleEdit} />
      </Grid>

      <ConfirmModal
        onOk={handleDeleteFlashSaleList}
        onClose={handleCloseDeletePopup}
        title='XÓA SẢN PHẨM'
        children={<RenderDeleteConfirmChildren />}
        type='delete'
        okText='XÓA'
        isOpen={isOpenDeletePopup} />
      {isOpenAddPopup && <AddProduct
        isCreate={isCreateForm}
        defaultForm={product}
        isOpen={isOpenAddPopup}
        onClose={handleCloseAddPopup}
        onSubmit={handleSubmit} />}
    </div>
  );
}


export default FlashSaleDetail;