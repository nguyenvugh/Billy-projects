import { Typography } from '@material-ui/core';
import Breadcrumbs from 'app/components/Breadcrumbs';
import DangerButton from 'app/components/Button/DangerButton';
import PrimaryButton from 'app/components/Button/PrimaryButton';
import { urlAdmin } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import { Link, useHistory } from 'react-router-dom';

export default function Toolbar({ id, detail, onDelete }) {
  const history = useHistory();

  const handleGotoEditPage = () => {
    history.push({
      pathname: `${urlAdmin}/edit/${id}`,
      state: detail
    })
  }

  return (
    <div className="page-header">
      <div className="page-title">
        <Breadcrumbs>
          <Link to={urlAdmin}>
            Danh sách tài khoản
          </Link>
          <Typography>
            {detail?.username}
          </Typography>
        </Breadcrumbs>
      </div>
      <PrimaryButton
        onClick={handleGotoEditPage}
      >
        Chỉnh sửa
      </PrimaryButton>
      <DangerButton
        onClick={onDelete}
      >
        Xoá
      </DangerButton>
    </div>
  )
}