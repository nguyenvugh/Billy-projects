import { Typography } from '@material-ui/core';
import Breadcrumbs from "app/components/Breadcrumbs";
import DefaultButton from "app/components/Button/DefaultButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import { urlUserProfile } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import { Link, useHistory } from "react-router-dom";

export default function Toolbar({ id, handleUpdateCustomer, data }) {
  const history = useHistory();

  return (
    <div className="page-header">
      <div className="page-title">
        <Breadcrumbs>
          <Link to={urlUserProfile}>
            Tài khoản người dùng
          </Link>
          <Link onClick={() => history.goBack()}>
            {data?.email}
          </Link>
          <Typography>Chỉnh sửa</Typography>
        </Breadcrumbs>
      </div>
      <DefaultButton
        onClick={() => history.goBack()}
      >
        Huỷ
      </DefaultButton>
      <PrimaryButton
        onClick={handleUpdateCustomer}
      >
        Lưu lại
      </PrimaryButton>
    </div>
  )
}