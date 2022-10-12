import { Box, Divider, Grid, InputAdornment, Link as LinkUI, Typography } from "@material-ui/core";
import Breadcrumbs from "app/components/Breadcrumbs";
import DangerButton from "app/components/Button/DangerButton";
import DefaultButton from "app/components/Button/DefaultButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import ConfirmDelete from "app/components/ConfirmDelete";
import SelectLang from "app/components/SelectLang";
import TextFields from "app/components/TextFields";
import { ACTION_TYPE } from "app/reducers/charity";
import { LANG_EN, LANG_VI } from "app/utils/constant";
import { convertDateTimeInput, formatDateTimeInput, formatPrice, isEmpty } from "app/utils/validate";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import CharityProducts from "../CharityProducts";

const AddEditCharity = ({ refreshList }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const charity = useSelector((store) => store.charity.charity);
  const [detail, setDetail] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [lang, setLang] = useState(LANG_VI);
  const [nameVi, setNameVi] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [price, setPrice] = useState("");
  const [descriptionVi, setDescriptionVi] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [submit, setSubmit] = useState(false);
  const [total, setTotal] = useState("");

  useEffect(() => {
    if (charity?.id?.toString() !== params?.id) {
      history.replace("/");
    }
  }, [charity, params?.id])

  useEffect(() => {
    setDetail(Boolean(charity?.id));
    if (charity?.id) {
      setLang(LANG_VI);
      setNameVi(charity?.[`${LANG_VI}.name`]);
      setNameEn(charity?.[`${LANG_EN}.name`]);
      setPrice(formatPrice(charity?.price));
      setDescriptionVi(charity?.[`${LANG_VI}.description`]);
      setDescriptionEn(charity?.[`${LANG_EN}.description`]);
      setStartDate(formatDateTimeInput(charity?.start_date));
      setEndDate(formatDateTimeInput(charity?.end_date));
      setSubmit(false);
      setTotal(formatPrice(charity?.total));
    }
  }, [charity])

  const onChangeDetail = (e) => {
    e.preventDefault();
    setDetail(!detail)
  }
  const goDetail = (e) => {
    e.preventDefault();
    setDetail(true);
    setNameVi(charity?.[`${LANG_VI}.name`]);
    setNameEn(charity?.[`${LANG_EN}.name`]);
    setPrice(formatPrice(charity?.price));
    setDescriptionVi(charity?.[`${LANG_VI}.description`]);
    setDescriptionEn(charity?.[`${LANG_EN}.description`]);
    setStartDate(formatDateTimeInput(charity?.start_date));
    setEndDate(formatDateTimeInput(charity?.end_date));
    setSubmit(false);
    setTotal(formatPrice(charity?.total));
  }
  const onSubmit = () => {
    if (isEmpty(nameVi) || isEmpty(descriptionVi)) {
      setLang(LANG_VI);
      setSubmit(true);
      return;
    }
    if (isEmpty(price) || parseInt(price) === 0 || isEmpty(start_date) || (!isEmpty(end_date) && start_date >= end_date)) {
      setSubmit(true);
      return;
    }
    let contents = [{
      language_code: LANG_VI,
      language_field: "name",
      language_value: nameVi,
    }, {
      language_code: LANG_VI,
      language_field: "description",
      language_value: descriptionVi,
    }, {
      language_code: LANG_EN,
      language_field: "name",
      language_value: isEmpty(nameEn) ? nameVi : nameEn,
    }, {
      language_code: LANG_EN,
      language_field: "description",
      language_value: isEmpty(descriptionEn) ? descriptionVi : descriptionEn,
    }]
    dispatch({
      type: ACTION_TYPE.EDIT_CHARITY_REQUEST,
      id: charity?.id,
      data: {
        status: -1,
        price: price.replace(/[^0-9]/g, ''),
        start_date: convertDateTimeInput(start_date),
        end_date: isEmpty(end_date) ? null : convertDateTimeInput(end_date),
        contents,
      },
      success: () => {
        dispatch({
          type: ACTION_TYPE.GET_CHARITY_REQUEST,
          id: charity?.id,
        })
        refreshList instanceof Function && refreshList();
      }
    })
  }

  const onDelete = () => {
    if (charity?.id) {
      dispatch({
        type: ACTION_TYPE.DELETE_CHARITY_LIST_REQUEST,
        data: { ids: [charity.id] },
        success: () => {
          refreshList instanceof Function && refreshList();
          history.push("/");
        },
      })
    }
  }
  return (
    <Fragment>
      <ConfirmDelete
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onOK={onDelete}
        title="XÓA CHƯƠNG TRÌNH"
        message="Bạn có chắc muốn xóa chương trình kêu gọi đã chọn?"
      />
      <div className="page-header">
        {
          detail ?
            <Fragment>
              <div className="page-title">
                <Breadcrumbs>
                  <Link to="/">Danh sách chương trình kêu gọi</Link>
                  <Typography>Chi tiết chương trình</Typography>
                </Breadcrumbs>
              </div>
              <PrimaryButton onClick={onChangeDetail}>Chỉnh sửa</PrimaryButton>
              <DangerButton onClick={() => setConfirmDelete(true)}>Xóa</DangerButton>
            </Fragment>
            : <Fragment>
              <div className="page-title">
                <Breadcrumbs>
                  <Link to="/">Danh sách chương trình kêu gọi</Link>
                  <LinkUI href="#" onClick={goDetail}>Chi tiết chương trình</LinkUI>
                  <Typography>Chỉnh sửa</Typography>
                </Breadcrumbs>
              </div>
              <DefaultButton onClick={goDetail}>Hủy</DefaultButton>
              <PrimaryButton onClick={onSubmit}>Lưu lại</PrimaryButton>
            </Fragment>
        }
      </div>
      <div className="page-content">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box fontSize={16} fontWeight={600}>Chi tiết chương trình kêu gọi</Box>
          <SelectLang value={lang} onChange={setLang} />
        </Box>
        {lang === LANG_VI ?
          <Grid container spacing={4}>
            <Grid item xs={12} style={{ paddingBottom: 0 }}>
              <TextFields
                disabled={detail}
                label="Tên chương trình kêu gọi"
                required
                placeholder="Nhập tên chương trình kêu gọi"
                value={nameVi}
                onChange={(e) => setNameVi(e.target.value)}
                error={submit && isEmpty(nameVi)}
                helperText="Tên chương trình kêu gọi được yêu cầu"
                inputProps={{ maxLength: 50 }}
              />
              <TextFields
                disabled={detail}
                label="Mô tả"
                required
                placeholder="Nhập mô tả"
                value={descriptionVi}
                onChange={(e) => setDescriptionVi(e.target.value)}
                error={submit && isEmpty(descriptionVi)}
                helperText="Mô tả được yêu cầu"
              />
            </Grid>
            <Grid item xs={12} md={4} style={{ paddingTop: 0 }}>
              <TextFields
                disabled={detail}
                label="Ngày bắt đầu"
                required
                type="datetime-local"
                value={start_date}
                onChange={(e) => setStartDate(e.target.value)}
                error={submit && isEmpty(start_date)}
                helperText="Ngày bắt đầu được yêu cầu"
              />
              <TextFields
                label="Tổng tiền đã kêu gọi"
                required
                disabled
                value={total}
                endAdornment={<InputAdornment position="end"><Box color="#3A3A3A" fontWeight="bold">VND</Box></InputAdornment>}
              />
            </Grid>
            <Grid item xs={12} md={4} style={{ paddingTop: 0 }}>
              <TextFields
                disabled={detail}
                label="Ngày kết thúc"
                type="datetime-local"
                value={end_date}
                onChange={(e) => setEndDate(e.target.value)}
                error={submit && !isEmpty(start_date) && !isEmpty(end_date) && start_date >= end_date}
                helperText="Ngày kết thúc không hợp lệ"
              />
              <TextFields
                disabled={detail}
                label="Mức tiền kêu gọi"
                required
                placeholder="Nhập mức tiền kêu gọi"
                endAdornment={<InputAdornment position="end"><Box color="#3A3A3A" fontWeight="bold">VND</Box></InputAdornment>}
                value={price}
                onChange={(e) => setPrice(formatPrice(e.target.value))}
                error={submit && (isEmpty(price) || parseInt(price) === 0)}
                helperText={isEmpty(price) ? "Mức tiền kêu gọi được yêu cầu" : parseInt(price) === 0 && "Mức tiền kêu gọi phải lớn hơn 0"}
              />
            </Grid>
          </Grid> :
          <Grid container spacing={4}>
            <Grid item xs={12} style={{ paddingBottom: 0 }}>
              <TextFields
                disabled={detail}
                label="Charity program name"
                required
                placeholder="Enter charity program name"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                inputProps={{ maxLength: 50 }}
              />
              <TextFields
                disabled={detail}
                label="Description"
                required
                placeholder="Enter description"
                value={descriptionEn}
                onChange={(e) => setDescriptionEn(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4} style={{ paddingTop: 0 }}>
              <TextFields
                disabled={detail}
                label="Start date"
                required
                type="datetime-local"
                value={start_date}
                onChange={(e) => setStartDate(e.target.value)}
                error={submit && isEmpty(start_date)}
                helperText="Start date is required"
              />
              <TextFields
                disabled
                label="Donation (VNĐ)"
                required
                value={total}
                endAdornment={<InputAdornment position="end"><Box color="#3A3A3A" fontWeight="bold">VND</Box></InputAdornment>}
              />
            </Grid>
            <Grid item xs={12} md={4} style={{ paddingTop: 0 }}>
              <TextFields
                disabled={detail}
                label="End date"
                type="datetime-local"
                value={end_date}
                onChange={(e) => setEndDate(e.target.value)}
                error={submit && !isEmpty(start_date) && !isEmpty(end_date) && start_date >= end_date}
                helperText="End date is invalid"
              />
              <TextFields
                disabled={detail}
                label="Expected donation"
                required
                placeholder="Enter expected donation"
                endAdornment={<InputAdornment position="end"><Box color="#3A3A3A" fontWeight="bold">VND</Box></InputAdornment>}
                value={price}
                onChange={(e) => setPrice(formatPrice(e.target.value))}
                error={submit && (isEmpty(price) || parseInt(price) === 0)}
                helperText={isEmpty(price) ? "Expected donation is requred" : parseInt(price) === 0 && "Expected donation is greater than 0"}
              />
            </Grid>
          </Grid>}
      </div>
      <Box py={4}>
        <Divider />
      </Box>
      <CharityProducts charity={charity} detail={detail} />
    </Fragment >
  )
}

export default AddEditCharity;