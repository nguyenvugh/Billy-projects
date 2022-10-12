import { Grid, makeStyles, Paper } from '@material-ui/core';
import DangerButton from 'app/components/Button/DangerButton';
import PrimaryButton from 'app/components/Button/PrimaryButton';
import ConfirmDelete from 'app/components/ConfirmDelete';
import { urlStore } from 'app/Layouts/AuthenticatedLayout/Sidebar/url';
import { ACTION_TYPE } from 'app/reducers/shop';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ImagePicker from '../../../components/ImagePicker';
import Breadcrumbs from '../components/Breadcrumbs';
import Input from '../components/Input';
import Select from '../components/Select';
import { dayList } from '../StoreCreation';

function PromotionDetail({ match }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const id = match.params.id;
  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
  const shop = useSelector((store) => store.shop.shop);

  useEffect(() => {
    if (shop?.id?.toString() !== id) {
      history.push(urlStore);
      return;
    }
  }, [shop?.id, id])

  const handleEdit = () => {
    history.push(`${urlStore}/edit/${shop?.id}`);
  };

  const handleOpenDeletePopup = () => {
    setIsOpenDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setIsOpenDeletePopup(false);
  };

  const handleDelete = () => {
    dispatch({
      type: ACTION_TYPE.DELETE_SHOP_LIST_REQUEST,
      data: { ids: [shop?.id] },
      success: () => {
        history.push(urlStore);
      },
    })
  };

  return (
    <div className={classes.root}>
      <ConfirmDelete
        open={isOpenDeletePopup}
        onClose={handleCloseDeletePopup}
        onOK={handleDelete}
        title="XÓA CỬA HÀNG"
        message="Bạn có chắc muốn xóa cửa hàng đã chọn?"
      />
      <div className="page-header">
        <div className="page-title">
          <Breadcrumbs
            links={[{
              href: '/promotions/create',
              label: shop?.name,
            }]}
          />
        </div>
        <PrimaryButton onClick={handleEdit}>
          Chỉnh sửa
        </PrimaryButton>
        <DangerButton onClick={handleOpenDeletePopup}>
          Xoá
        </DangerButton>
      </div>
      <Paper elevation={0} className={classes.inner}>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            {/* 1 */}
            <Grid container item xs={12} spacing={4}>
              <Grid item xs>
                <Input
                  required
                  readOnly
                  labelName='Tên cửa hàng'
                  value={shop?.name}
                />
              </Grid>

              <Grid item xs>
                <Select
                  required
                  readOnly
                  labelName='Tỉnh/ thành phố'
                  value={shop?.city}
                />
              </Grid>
            </Grid>
            {/* 2 */}
            <Grid container item xs={12} spacing={4} >
              <Grid item xs>
                <Input
                  required
                  readOnly
                  labelName='Điện thoại'
                  value={shop?.phone_number}
                />
              </Grid>

              <Grid item xs>
                <Select
                  readOnly
                  labelName='Quận/ huyện'
                  value={shop?.district}
                />
              </Grid>
            </Grid>
            {/* 3 */}
            <Grid container item xs={12} spacing={4}>
              <Grid item xs>
                <Input
                  required
                  readOnly
                  labelName='Email'
                  value={shop?.email}
                />
              </Grid>

              <Grid item xs>
                <Select
                  readOnly
                  labelName='Phường/ xã'
                  value={shop?.ward}
                />
              </Grid>
            </Grid>
            {/* 4 */}
            <Grid container item xs={12} spacing={4}>
              <Grid item xs>
                <Input
                  readOnly
                  required
                  labelName='Fax'
                  value={shop?.fax}
                />
              </Grid>

              <Grid item xs>
                <Input
                  readOnly
                  required
                  labelName='Địa chỉ'
                  value={shop?.address}
                />
              </Grid>
            </Grid>
            {/* 5 */}
            <Grid container item xs={12} spacing={4}>
              <Grid item xs>
                <Grid container item justify='space-between' xs>
                  <Grid item xs style={{ marginRight: 30 }}>

                    <Input
                      required
                      readOnly
                      labelName='Giờ hoạt động'
                      value={shop?.start_working_time}
                    />
                  </Grid>
                  <Grid item xs>
                    <Input
                      readOnly
                      value={shop?.end_working_time}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs>
                <Grid container xs>
                  <Grid item xs style={{ marginRight: 30 }}>
                    <Input
                      readOnly
                      required
                      labelName='Ngày hoạt động'
                      value={dayList.find(item => item?.id === shop?.start_working_date)?.name}
                    />
                  </Grid>
                  <Grid item xs>
                    <Input readOnly value={dayList.find(item => item?.id === shop?.end_working_date)?.name} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* 6 */}
            <Grid container item xs={12} spacing={4}>
              <Grid item xs>
                <Input
                  readOnly
                  required
                  labelName='Kinh độ'
                  value={shop?.long}
                />
              </Grid>

              <Grid item xs>
                <Input
                  readOnly
                  required
                  labelName='Vĩ độ'
                  value={shop?.lat}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs>
            <ImagePicker
              readOnly
              labelName='Ảnh cửa hàng (không bắt buộc)'
              uploadDesc='(Kích thước ảnh: 1066x582)'
              defaultValue={shop?.thumbnail_obj?.url}
            />
          </Grid>
        </Grid>
      </Paper>
    </div >
  );
}

PromotionDetail.defaultProps = {
};

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 12
  },
  inner: {
    padding: '16px 24px',
  },
  title: {
    fontSize: '16px',
    fontWeight: 400,
    color: '#0000000',

    margin: '12px 0'
  },
  chain: {
    display: 'flex',
    width: '10px',
    height: '2px',
    backgroundColor: '#000000',

    position: 'absolute',
    bottom: '33px',
    left: '-5px'
  }
}));


export default PromotionDetail;