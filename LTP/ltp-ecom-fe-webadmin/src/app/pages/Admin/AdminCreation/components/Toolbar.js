import { Typography } from '@material-ui/core';
import Breadcrumbs from 'app/components/Breadcrumbs';
import DefaultButton from 'app/components/Button/DefaultButton';
import PrimaryButton from 'app/components/Button/PrimaryButton';
import { ADMIN_SCREEN_EDIT_MODE } from 'app/constants/admin';
import { urlAdmin } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import { Link, useHistory, useParams } from 'react-router-dom';

export default function Toolbar({ onSubmit, mode, detail }) {
  const history = useHistory();
  const params = useParams();

  const handleCancel = () => {
    history.push(urlAdmin);
  }

  return (
    <div className="page-header">
      <div className="page-title">
        {mode === ADMIN_SCREEN_EDIT_MODE ? (
          <Breadcrumbs>
            <Link to={urlAdmin}>
              Danh sách tài khoản
            </Link>
            <Link to={`${urlAdmin}/${params?.id}`}>
              {detail?.username}
            </Link>
            <Typography>
              Chỉnh sửa
            </Typography>
          </Breadcrumbs>
        ) : (
          <Breadcrumbs>
            <Link to={urlAdmin}>
              Danh sách tài khoản
            </Link>
            <Typography>
              Thêm mới
            </Typography>
          </Breadcrumbs>
        )}
      </div>
      <DefaultButton
        onClick={() => handleCancel()}
      >
        Huỷ
      </DefaultButton>
      <PrimaryButton
        onClick={onSubmit}
      >
        Lưu lại
      </PrimaryButton>
    </div>
  )
}