import { ACTION_TYPE } from "app/reducers/profile";
import lodash from "lodash";
import { useEffect, useState } from 'react';
import { Avatar, Menu as MMenu, MenuItem as MMenuItem } from '@material-ui/core';
import { FiPower, FiEdit } from 'react-icons/fi';
import './style.scss';
import { removePermissions, removeToken } from 'app/reducers/auth';
import { useHistory } from 'react-router-dom';
import { urlProfile } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import { useDispatch, useSelector } from "react-redux";
import * as Utils from 'app/utils';
import * as AppURL from 'app/services/urlAPI';
import axios from 'app/services/axios';
export default function Menu() {
  const history = useHistory();
  const [isOpenProfileDropdown, setIsOpenProfileDropdown] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const profile = useSelector((store) => store.profile.profile);

  useEffect(() => {
    if (lodash.isEmpty(profile)) {
      dispatch({
        type: ACTION_TYPE.GET_PROFILE_REQUEST,
      });
    }
  }, []);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const id = localStorage.getItem('id');
      const url = Utils.replaceStrUrl(AppURL.getAdminDetail, [id]);
      const requestImageId = await axios.get(url);
      const responseImageId = await requestImageId;

    } catch (error) {

    }


  };


  const handleOpenProfileDropdown = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpenProfileDropdown(true);
  };

  const handleCloseProfileDropdown = () => {
    setAnchorEl(null);
    setIsOpenProfileDropdown(false);
  };

  return (
    <div className="menu">
      <button
        aria-controls="profile-menu"
        aria-haspopup="true"
        className="menu__profile-dropdown-btn"
        onClick={handleOpenProfileDropdown}
      >
        {profile && profile.avatar_obj?.url ? (
          <Avatar
            alt={profile?.fullname}
            src={profile.avatar_obj?.url}
          ></Avatar>
        ) : (
          <Avatar>AD</Avatar>
        )}
      </button>
      <MMenu
        id="profile-menu"
        className="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={isOpenProfileDropdown}
        onClose={handleCloseProfileDropdown}
      >
        <MMenuItem
          className="profile-menu__item"
          onClick={() => {
            history.push(urlProfile);
            handleCloseProfileDropdown();
          }}
        >
          <FiEdit />
          <span>Thông tin tài khoản</span>
        </MMenuItem>;
        <MMenuItem
          className="profile-menu__item red"
          onClick={() => {
            removeToken();
            removePermissions();
            history.push("/login");
          }}
        >
          <FiPower />
          <span>Đăng xuất</span>
        </MMenuItem>
      </MMenu>
    </div >
  );
}
