import { useEffect, useLayoutEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, FormControlLabel, Checkbox } from '@material-ui/core';
import lodash from 'lodash';

import Toolbar from './components/Toolbar';
import Content from './components/Content';
import TransactionHistoryTable from './components/TransactionHistoryTable';
import ConfirmModal from 'app/components/ConfirmModal';

import * as Utils from '../../../utils';
import * as AppURL from '../../../services/urlAPI';
import { getProductCategory, deleteProductCategory } from 'app/services/axios';

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: "#ffffff",
    padding: '20px',
    marginBottom: '20px'
  },
  photos: {
    padding: '0px 0px 0px 20px',
  }
}));

export default function UserProfileDetail() {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();

  const [customerDetail, setCustomerDetail] = useState(null);
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState({});
  const [listChildCate, setListChildCate] = useState([]);
  const [isOpenDeleteAccountConfirmation, setIsOpenDeleteAccountConfirmation] = useState(false);

  useEffect(async () => {
    try {
      if (id) {
        const url = Utils.replaceStrUrl(AppURL.customerDetail, [id]);
        await getProductCategory(url).then(async (res) => {
          if (res.code === 200) {
            const data = Utils.getSafeValue(res, 'data', {});
            const id = Utils.getSafeValue(data, 'id', 0);
            const name = Utils.getSafeValue(data, 'name', '');
            const created_at = Utils.getSafeValue(data, 'created_at', '');
            const created_at_string = new Date(created_at).toLocaleDateString('vi-VI');
            const phone_number = Utils.getSafeValue(data, 'phone_number', '');
            const email = Utils.getSafeValue(data, 'email', '');
            const sex = Utils.getSafeValue(data, 'sex', 0);
            const addresses = Utils.getSafeValue(data, 'addresses', []);
            let defaultAddress;
            if (Array.isArray(data?.addresses)) {
              defaultAddress = data.addresses.find(item => item?.is_default === 1);
            }
            const address = Utils.getSafeValue(defaultAddress, 'address', '');
            const country = Utils.getSafeValue(defaultAddress, 'country.name', '');
            const city = Utils.getSafeValue(defaultAddress, 'city.name', '');
            const district = Utils.getSafeValue(defaultAddress, 'district.name', '');
            const ward = Utils.getSafeValue(defaultAddress, 'ward.name', '');
            const alias = Utils.getSafeValue(defaultAddress, 'alias', '');
            const birthday = Utils.getSafeValue(data, 'birthday', '');
            const avatarId = Utils.getSafeValue(data, 'avatar', 0);
            const avatarObj = Utils.getSafeValue(data, 'avatar_obj', {});
            const avatar = Utils.getSafeValue(avatarObj, 'url', '');
            const customerDetailData = {
              id,
              name,
              created_at_string,
              phone_number,
              email,
              sex,
              address,
              country,
              city,
              district,
              ward,
              birthday,
              avatar,
              alias,
              avatarId,
              lock_reason: data?.lock_reason,
            }
            await setCustomerDetail(customerDetailData);
          }
        });


      } else {
        console.log("no id")
      }
    } catch (error) { }
  }, []);

  const handleDeleteAccount = async () => {
    let url = Utils.replaceStrUrl(AppURL.customerDetail, [id]);
    await deleteProductCategory(url);
    setIsOpenDeleteAccountConfirmation(false);
    history.goBack();
  }

  return (
    <>
      {customerDetail === null ? <div></div> :
        <div>
          <Toolbar id={id} setIsOpenDeleteAccountConfirmation={setIsOpenDeleteAccountConfirmation} data={customerDetail} />
          <Grid container className={classes.main}>
            <Grid item xs={12}>
              <Content data={customerDetail} />
            </Grid>
          </Grid>
          <Divider light />
          <TransactionHistoryTable id={id} />
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
      }
    </>
  )
}