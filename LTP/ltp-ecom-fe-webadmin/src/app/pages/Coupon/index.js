import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import DangerButton from "app/components/Button/DangerButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import ConfirmDelete from "app/components/ConfirmDelete";
import Pagination from "app/components/Pagination";
import SearchInput from "app/components/SearchInput";
import SelectStatus from "app/components/SelectStatus";
import SwitchUI from "app/components/Switch";
import {
  fetchDeleteCoupons,
  fetchListCoupon,
  fetchUpdateCoupon,
} from "app/reducers/coupon";
import { PAGE_SIZE } from "app/utils/constant";
import * as Utils from "app/utils";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import AddEditCoupon from "./AddEditCoupon";
import { urlCoupon } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
const allStatus = { status: "0", label: "Tất cả trạng thái" };
const Coupon = () => {
  const dispatch = useDispatch();
  const { listCoupon, isLoading, totalCoupons } = useSelector(
    (state) => state.coupon
  );
  const [page, setPage] = useState(1);
  const [search_value, setSearchValue] = useState("");
  const [status, setStatus] = useState(allStatus);
  const couponList = listCoupon;
  const [coupon, setCoupon] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    dispatch(
      fetchListCoupon({
        page: page,
        limit: PAGE_SIZE,
        search_value: search_value || null,
        status: +status.status || null,
      })
    );
  }, [page, search_value, status]);

  const checkedAll = (e) => {
    if (e.target.checked) {
      if (Array.isArray(couponList))
        setSelectedRows(couponList.map((item) => item?.id));
    } else {
      setSelectedRows([]);
    }
  };

  const checkedRow = (e, row) => {
    let selected = [...selectedRows];
    if (e.target.checked) {
      selected.push(row?.id);
    } else {
      selected = selected.filter((item) => item !== row?.id);
    }
    setSelectedRows(selected);
  };

  const onSearch = (value) => {
    setSearchValue(value);
    setPage(1);
  };
  const changeStatus = (value) => {
    setStatus(value);
    setPage(1);
  };
  const deleteCoupon = () => {
    setConfirmDelete(false);
    if (selectedRows.length > 0) {
      dispatch(fetchDeleteCoupons({ ids: selectedRows })).then((s) => {
        if (s.data.code === 200) {
          refreshList();
        }
      });
    }
  };
  const refreshList = () => {
    dispatch(
      fetchListCoupon({
        page: page,
        limit: PAGE_SIZE,
        search_value: search_value || null,
        status: +status.status || null,
      })
    );
  };
  const onChangeStatusCoupon = (item = {}) => {
    const { requirements, id, ...rest } = item;
    const body = {
      ...rest,
      status: item.status === 1 ? -1 : 1,
      contents: item.translates,
      order_requirements: requirements,
      product_requirements: requirements,
    };
    dispatch(fetchUpdateCoupon({ ...body, id }));
  };
  const renderCharityList = () => {
    return (
      <Fragment>
        <ConfirmDelete
          open={confirmDelete}
          onClose={() => setConfirmDelete(false)}
          onOK={deleteCoupon}
          title="XÓA COUPON"
          message="Bạn có chắc muốn xóa coupon đã chọn?"
          cancelTitle="HỦY BỎ"
          okTitle="XÓA"
        />
        <div className="page-header">
          <div className="page-title">Quản lý coupon</div>
          <SearchInput
            defaultValue={search_value}
            onSubmit={onSearch}
            placeholder="Mã/Tên chương trình"
          />
          <SelectStatus
            width={200}
            statusList={[allStatus, ...couponStatusList]}
            value={status}
            onChange={changeStatus}
          />
          <PrimaryButton
            component={Link}
            to="/add"
            startIcon={<Add />}
            onClick={() => setCoupon({})}
          >
            Thêm mới
          </PrimaryButton>
          <DangerButton
            disabled={selectedRows.length === 0}
            onClick={() => setConfirmDelete(true)}
          >
            Xóa đã chọn
          </DangerButton>
        </div>
        <TableContainer component={Paper}>
          <Table padding="none">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < couponList?.length
                    }
                    checked={
                      couponList?.length > 0 &&
                      selectedRows.length === couponList?.length
                    }
                    onChange={checkedAll}
                  />
                </TableCell>
                <TableCell>Mã khuyến mãi</TableCell>
                <TableCell>Tên chương trình</TableCell>
                <TableCell>Hình thức</TableCell>
                <TableCell>Ngày bắt đầu - kết thúc</TableCell>
                <TableCell>Bật/Tắt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(couponList) &&
                couponList.map((coupon) => {
                  const translates = Utils.getSafeValue(
                    coupon,
                    "translates",
                    []
                  );
                  const name = Utils.getObjByLanguage(
                    translates,
                    "vi",
                    "language_value"
                  );
                  return (
                    <TableRow key={coupon?.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedRows.indexOf(coupon?.id) > -1}
                          onChange={(e) => checkedRow(e, coupon)}
                        />
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/${coupon?.id}`}
                          onClick={() => setCoupon(coupon)}
                        >
                          {coupon?.code}
                        </Link>
                      </TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell>
                        {coupon?.type === 1
                          ? "Hóa đơn"
                          : coupon?.type === 2 && "Số lượng hàng hóa"}
                      </TableCell>
                      <TableCell
                        style={{
                          color: getColor(
                            `${coupon?.start_date} ${coupon?.start_time}`,
                            `${coupon?.end_date} ${coupon?.end_time}`
                          ),
                        }}
                      >
                        {!!coupon?.start_date &&
                          moment(coupon.start_date).format("DD/MM/yyyy")}
                        {` ${coupon.start_time}`} -
                        {!!coupon?.end_date &&
                          moment(coupon.end_date).format("DD/MM/yyyy")}
                        {` ${coupon.end_time}`}
                      </TableCell>
                      <TableCell>
                        <SwitchUI
                          checked={coupon?.status === 1}
                          onChange={() => getColor(
                            `${coupon?.start_date} ${coupon?.start_time}`,
                            `${coupon?.end_date} ${coupon?.end_time}`
                          ) === couponStatusList[1].color ? onChangeStatusCoupon(coupon) : false}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={Math.ceil(totalCoupons / PAGE_SIZE)}
          page={page}
          handleChangePage={setPage}
        />
      </Fragment>
    );
  };

  return (
    <BrowserRouter basename={urlCoupon}>
      <Switch>
        <Route exact path="/">
          {renderCharityList()}
        </Route>
        <Route exact path="/add">
          <AddEditCoupon coupon={{}} />
        </Route>
        <Route exact path="/:id">
          <AddEditCoupon coupon={coupon} deleteCoupon={deleteCoupon} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Coupon;

export const couponStatusList = [
  {
    status: 2,
    label: "Sắp diễn ra",
    color: "#FEAC0B",
  },
  {
    status: 1,
    label: "Đang diễn ra",
    color: "#00B41D",
  },
  {
    status: 3,
    label: "Đã kết thúc",
    color: "#9A9A9A",
  },
];

const getColor = (startDate, endDate) => {
  let now = new Date().getTime();
  let start = new Date(startDate).getTime();
  let end = new Date(endDate).getTime();
  if (isNaN(start) || isNaN(end)) return undefined;
  if (now > end) {
    return couponStatusList[2].color;
  } else if (start <= now && now <= end) {
    return couponStatusList[1].color;
  } else return couponStatusList[0].color;
};
