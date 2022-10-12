import { Link as LinkUI, Typography } from "@material-ui/core";
import Breadcrumbs from "app/components/Breadcrumbs";
import DefaultButton from "app/components/Button/DefaultButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import { PRODUCT_SCREEN_EDIT_MODE } from "app/constants/products";
import { urlProduct } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import { Link, useLocation, useHistory } from "react-router-dom";

export default function Toolbar({ mode, onSubmit, goBack, detail }) {
  const location = useLocation();
  const history = useHistory();
  const handleGotoList = () => {
    history.push({
      pathname: `${urlProduct}`, 
      state: {page : location.state?.page || 1}
    });
  };
  return (
    <div className="page-header">
      <div className="page-title">
        {mode === PRODUCT_SCREEN_EDIT_MODE ?
          <Breadcrumbs>
            <div className="page-title" onClick={() => handleGotoList()}>
              Danh sách sản phẩm
            </div>
            <LinkUI
              href="#"
              onClick={(e) => {
                e.preventDefault();
                goBack()
              }}
            >
              {detail?.product_name}
            </LinkUI>
            <Typography>Chỉnh sửa</Typography>
          </Breadcrumbs> :
          <Breadcrumbs>
            <Link to={urlProduct}>
              Danh sách sản phẩm
            </Link>
            <Typography>Thêm mới</Typography>
          </Breadcrumbs>
        }
      </div>
      <DefaultButton
        onClick={goBack}
      >
        Huỷ
      </DefaultButton>
      <PrimaryButton
        onClick={onSubmit}
      >
        Lưu lại
      </PrimaryButton>
    </div>
  );
}
