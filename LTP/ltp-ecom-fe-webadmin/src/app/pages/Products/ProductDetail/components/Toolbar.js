import { Typography } from "@material-ui/core";
import Breadcrumbs from "app/components/Breadcrumbs";
import PrimaryButton from "app/components/Button/PrimaryButton";
import { urlProduct } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import { Link, useHistory, useLocation } from "react-router-dom";

export default function Toolbar({ id, name }) {
  const location = useLocation();
  const history = useHistory();

  const handleGotoEditPage = () => {
    history.push({
      pathname: `${urlProduct}/edit/${id}`, 
      state: {page : location.state?.page || 1}
    });
  };

  const handleGotoList = () => {
    history.push({
      pathname: `${urlProduct}`, 
      state: {page : location.state?.page || 1}
    });
  };
  return (
    <div className="page-header">
      <div className="page-title">
        <Breadcrumbs>
          <div className="page-title" onClick={() => handleGotoList()}>
            Danh sách sản phẩm
          </div>
          <Typography>{name}</Typography>
        </Breadcrumbs>
      </div>
      <PrimaryButton
        onClick={handleGotoEditPage}
      >
        Chỉnh sửa
      </PrimaryButton>
    </div>
  );
}
