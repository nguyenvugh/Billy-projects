import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@material-ui/core";
import { ACTION_TYPE } from "app/reducers/static-page";
import { formatDateTime } from "app/utils/validate";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const StaticPageList = () => {
  const dispatch = useDispatch();
  const staticPageList = useSelector((store) => store.staticPage.staticPageList);

  useEffect(() => {
    dispatch({
      type: ACTION_TYPE.GET_STATIC_PAGE_LIST_REQUEST,
      params: { limit: 100, page: 1 }
    })
  }, [dispatch])

  return (
    <Fragment>
      <div className="page-header">
        <div className="page-title">Danh sách trang tĩnh</div>
      </div>
      <TableContainer component={Paper} style={{ marginBottom: 24 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên trang tĩnh</TableCell>
              {/* <TableCell>ID admin đăng</TableCell> */}
              <TableCell>Ngày sửa gần đây</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(staticPageList) && staticPageList.map((page) => (
              <TableRow key={page?.id}>
                <TableCell>
                  <Link to={`/${page?.id}`}>
                    {page?.slug}
                  </Link>
                </TableCell>
                {/* <TableCell>
                  {page?.update_by}
                </TableCell> */}
                <TableCell>
                  {formatDateTime(page?.updated_at)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="page-header">
        <div className="page-title">Cấu hình thông tin</div>
      </div>
      <TableContainer component={Paper} style={{ marginBottom: 24 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Thông tin</TableCell>
              {/* <TableCell>Ngày sửa gần đây</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Link to={`/config/footer`}>
                  Thông tin cơ bản của Long Thành Plastic
                </Link>
              </TableCell>
              {/* <TableCell>
                {page?.update_by}
              </TableCell> */}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}

export default StaticPageList;