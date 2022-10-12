import { useEffect, useLayoutEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, FormControlLabel, Checkbox } from '@material-ui/core';
import lodash from 'lodash';
import { removePermissions, removeToken } from 'app/reducers/auth';
import * as AppURL from 'app/services/urlAPI';
import { getProductCategory } from 'app/services/axios';
import * as Utils from 'app/utils';

import Toolbar from './components/Toolbar';
import Content from './components/Content';
import ConfirmModal from 'app/components/ConfirmModal';

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

export default function Profile() {
  const classes = useStyles();
  const history = useHistory();

  const [isOpenLogoutAccountConfirmation, setIsOpenLogoutAccountConfirmation] = useState(false);
  const [data, setData] = useState(null);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const getProfile = async () => {
      await getProductCategory(AppURL.getAdminProfile).then(res => {
        if (res.code === 200) {
          const data = Utils.getSafeValue(res, 'data', {});
          const username = Utils.getSafeValue(data, 'username', '');
          const fullname = Utils.getSafeValue(data, 'fullname', '');
          const national_id = Utils.getSafeValue(data, 'national_id', '');
          const groupId = Utils.getSafeValue(data, 'group', 0);
          const sex = Utils.getSafeValue(data, 'sex', 0);
          const phone_number = Utils.getSafeValue(data, 'phone_number', '');
          const address = Utils.getSafeValue(data, 'address', '');
          const groupObj = lodash.find(groups, { id: groupId });
          const groupName = Utils.getSafeValue(groupObj, 'name', '');
          const avatarId = Utils.getSafeValue(data, 'avatar', 0);
          const avatar_obj = Utils.getSafeValue(data, 'avatar_obj', {});
          const profileData = {
            username, fullname, national_id, sex, phone_number, address, group: groupName, avatarId, avatar_obj
          };
          setData(profileData)
        }
      }).catch(err => console.log(err));
    };

    const getGroup = async () => {
      await getProductCategory(AppURL.getAdminGroup).then(res => {
        if (res.code === 200) {
          const data = Utils.getSafeValue(res, 'data', {});
          const results = Utils.getSafeValue(data, "results", []);
          setGroups(results);
        }
      });
    }
    getGroup();
    getProfile();
  }, [])

  const handleLogoutAccount = () => {
    setIsOpenLogoutAccountConfirmation(false);
    removeToken();
    removePermissions();
    history.push('/login');
  }

  return (
    <>
      {
        !data ?
          <div></div> :
          <div>
            <Toolbar setIsOpenLogoutAccountConfirmation={setIsOpenLogoutAccountConfirmation} data={data} />
            <Grid container className={classes.main}>
              <Grid item xs={12}>
                <Content data={data} />
              </Grid>
            </Grid>
            <ConfirmModal
              isOpen={isOpenLogoutAccountConfirmation}
              type="delete"
              title="Đăng xuất"
              okText="Đăng xuất"
              onOk={handleLogoutAccount}
              onClose={() => setIsOpenLogoutAccountConfirmation(false)}
            >
              <p>Bạn có chắc muốn đăng xuất tài khoản?</p>
            </ConfirmModal>
          </div>
      }
    </>
  )
}