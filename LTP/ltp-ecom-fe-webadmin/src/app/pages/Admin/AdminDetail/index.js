import { useState, useEffect } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, FormControl, Select, MenuItem} from '@material-ui/core';

import Toolbar from './components/Toolbar';
import Content from './components/Content';
import ConfirmModal from 'app/components/ConfirmModal';
import viFlag from 'app/assets/vi.png';
import usFlag from 'app/assets/us.png';
import lodash from 'lodash';

import * as Utils from 'app/utils';
import {getProductCategory, addNewCate} from 'app/services/axios';
import * as AppURL from 'app/services/urlAPI';

const useStyles = makeStyles((theme) => ({
  thumbnail: {
    padding: '0px 0px 0px 20px',
  },
  titleHeader: {
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: '400',
    fontStyle: 'normal',
    color: '#000000'
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  imgFlag: {
    width: '20px',
    height: '14px'
  }
}));

export default function AdminDetail() {
  const history = useHistory();
  const { id } = useParams();

  const [contentData, setContentData] = useState({});

  useEffect(() => {
    getAdminAccounts();
  }, []);

  const getAdminAccounts = async () => {
    await getProductCategory(AppURL.getAdminGroup).then(result => {
      if(result.code === 200){
        const data = Utils.getSafeValue(result, 'data', {});
        const groups = Utils.getSafeValue(data, "results", []);
        const url = Utils.replaceStrUrl(AppURL.getAdminDetail, [id])
        getProductCategory(url).then(res => {
          if(res.code === 200){
            const detail = Utils.getSafeValue(res, 'data', {});
            const username = Utils.getSafeValue(detail, 'username', '');
            const groupId = Utils.getSafeValue(detail, 'group', 0);
            const groupObj = lodash.find(groups, { id: groupId});
            const groupName = Utils.getSafeValue(groupObj, 'name', '');
            const status = Utils.getSafeValue(detail, 'status', 0);
            const fullname = Utils.getSafeValue(detail, 'fullname', '');
            const sex = Utils.getSafeValue(detail, 'sex', 0);
            const national_id = Utils.getSafeValue(detail, 'national_id', '');
            const phone_number = Utils.getSafeValue(detail, 'phone_number', '');
            const address = Utils.getSafeValue(detail, 'address', '');
            const contentData = {
              username,
              groupName: groupName,
              status,
              fullname,
              sex,
              national_id,
              phone_number,
              address,
              groups,
              group: groupId
            };
            console.log(groups)
            setContentData(contentData);
          }
        })
      }
    });
  }

  const [openLan, setOpenLan] = useState(false);
  const [lan, setLan] = useState('vi');
  const [isOpenDeleteAccountConfirmation, setIsOpenDeleteAccountConfirmation] = useState(false);

  const handleCloseLan = () => {
    setOpenLan(false);
  }

  const handleOpenLan = () => {
    setOpenLan(true);
  }

  const handleChangeLan = (e) => {
    setLan(e.target.value)
  }
  
  const handleDeleteAccount = () => {
    console.log(id);
    const params = {
      ids: id,
    };
    addNewCate(AppURL.deleteAdminAccount, params).then(res => {
      if(res.code === 200){
        setIsOpenDeleteAccountConfirmation(false);
        history.goBack();
      }
    });
  }

  const handleSubmit = () => {

  }
  return (
    <div>
      <Toolbar
        onSubmit={handleSubmit}
        id={id}
        detail={contentData}
        onDelete={() => setIsOpenDeleteAccountConfirmation(true)}
      />
      <Divider />
      <Grid container>
        <Content data={contentData} />
      </Grid>
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
  )
}