import { Button, Grid, makeStyles } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import ConfirmModal from 'app/components/ConfirmModal';
import { deletePromotion as _deletePromotion, getPromotionList as _getPromotionList } from 'app/services/promotion';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Table from './components/Table';
import { columns, PROMOTION_STATUS_TYPES } from './definition';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    margin: 0,
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

function Promotions() {
  const classes = useStyles();
  const urlParams = useParams();
  const history = useHistory();
  const [list, setList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
  const [productList, setProductList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(1);

  useEffect(() => {
    getPromotionList();
  }, [urlParams]);

  //GET
  const getPromotionList = async () => {
    try {
      const params = {
        page: Number(urlParams.page) || 1,
        limit: 5,
      };
      const request = await _getPromotionList(params);
      const { data } = await request.data;
      handleGetPromotionListSuccess(data);
    } catch (error) {
    }
  };

  // Handle
  const handleGetPromotionListSuccess = (data) => {

    const listStructure = data.totalRecords > 0 ? data.results.map(item => {
      const name = item.translates.filter(t => t.language_code == 'vi' && t.language_field == 'name')[0].language_value || '';
      const description = item.translates.filter(t => t.language_code == 'vi' && t.language_field == 'description');
      const createBy = item.translates.filter(t => t.language_code == 'vi' && t.language_field == 'create_by');
      return {
        id: item.id,
        promotion_thumbnail: item.thumbnail_obj.url,
        promotion_name: name,
        promotion_type: item.type,
        promotion_description: description.length > 0 ? description[0].language_value : '',
        promotion_fromDate: `${item.start_date} ${item.start_time}`,
        promotion_toDate: `${item.end_date} ${item.end_time}`,
        promotion_createBy: createBy.length > 0 ? createBy[0].language_value : '',
        promotion_status: PROMOTION_STATUS_TYPES[item.type],
        promotion_active: item.is_active
      };
    }) : [];
    setTotalRecords(data.totalRecords);
    setList(listStructure);
  };

  const handleDeletePromotionList = async () => {
    try {
      const listRemoved = selectedRows.map(item => item.id).toString();
      const request = await _deletePromotion({ ids: listRemoved });
      const response = await request;
      await getPromotionList();
      setSelectedRows([]);
      handleCloseDeletePopup();
    } catch (error) {
    }
  };

  const handleAdd = () => {
    history.push('/promotions/create');
  };
  const handleOpenDeletePopup = () => setIsOpenDeletePopup(true);
  const handleCloseDeletePopup = () => setIsOpenDeletePopup(false);

  // Render
  const RenderDeleteConfirmChildren = () => {
    return <span>Bạn có chắc muốn xóa những promotion slider đã chọn?</span>;
  };

  return (
    <div className={classes.root}>
      <Grid container direction='column'>
        <Grid className={classes.header} container item>
          <h2 className={`${classes.title} ${classes.productsTitle}`}>Promotion Slider</h2>

          <div>
            <Button
              variant="contained"
              classes={{
                root: classes.addButton,
                label: classes.labelButton
              }}
              onClick={handleAdd}
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

        <Table totalRecords={totalRecords} data={list} columns={columns} onSelect={{ selectedRows, setSelectedRows }} />
      </Grid>

      <ConfirmModal
        onOk={handleDeletePromotionList}
        onClose={handleCloseDeletePopup}
        title='XÓA PROMOTION SLIDER'
        children={<RenderDeleteConfirmChildren />}
        type='delete'
        okText='XÓA'
        isOpen={isOpenDeletePopup} />
    </div>
  );
}


export default Promotions;