import { Typography } from '@material-ui/core';
import Breadcrumbs from "app/components/Breadcrumbs";
import DangerButton from 'app/components/Button/DangerButton';
import PrimaryButton from "app/components/Button/PrimaryButton";
import { urlNews } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import { Link, useHistory } from 'react-router-dom';

export default function Toolbar({ id, detail, onDelete }) {
  const history = useHistory();

  const handleGotoEditPage = () => {
    history.push({
      pathname: `${urlNews}/edit/${id}`,
      state: detail
    })
  }

  return (
    <div className="page-header">
      <div className="page-title">
        <Breadcrumbs>
          <Link to={urlNews} >
            Danh sách tin tức
          </Link>
          <Typography>Chi tiết tin tức</Typography>
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