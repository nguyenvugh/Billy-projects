import { Box, Grid, IconButton, InputAdornment, Modal } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import DefaultButton from "app/components/Button/DefaultButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import SelectLang from "app/components/SelectLang";
import TextFields from "app/components/TextFields";
import { ACTION_TYPE } from "app/reducers/charity";
import { LANG_EN, LANG_VI } from "app/utils/constant";
import { convertDateTimeInput, formatPrice, isEmpty } from "app/utils/validate";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";

const AddCharity = ({ open, setOpen, refreshList }) => {
  const dispatch = useDispatch();
  const [lang, setLang] = useState(LANG_VI);
  const [nameVi, setNameVi] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [price, setPrice] = useState("");
  const [descriptionVi, setDescriptionVi] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [submit, setSubmit] = useState(false);

  const onClose = (e, reason) => {
    if (reason !== 'backdropClick') {
      setOpen instanceof Function && setOpen(false);
    }
  }

  const reset = () => {
    setLang(LANG_VI);
    setNameVi("");
    setNameEn("");
    setPrice("");
    setDescriptionVi("");
    setDescriptionEn("");
    setStartDate("");
    setEndDate("");
    setSubmit(false);
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
      type: ACTION_TYPE.ADD_CHARITY_REQUEST,
      data: {
        status: -1,
        price: price?.replace(/[^0-9]/g, ''),
        start_date: convertDateTimeInput(start_date),
        end_date: isEmpty(end_date) ? undefined : convertDateTimeInput(end_date),
        contents,
      },
      success: () => {
        refreshList instanceof Function && refreshList();
        setOpen instanceof Function && setOpen(false);
        reset();
      }
    })
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-content" style={{ maxWidth: 800 }}>
        <div className="modal-header">
          <div className="modal-title">Thêm chương trình kêu gọi</div>
          <IconButton onClick={onClose} style={{ padding: 3 }}>
            <Close />
          </IconButton>
        </div>
        <div className="modal-body">
          <Box display="flex" justifyContent="space-between" alignItems="center" pb={2}>
            <Box fontSize={16} fontWeight={600}></Box>
            <SelectLang value={lang} onChange={setLang} />
          </Box>
          {lang === LANG_VI ?
            <Fragment>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6} style={{ paddingBottom: 0 }}>
                  <TextFields
                    label="Tên chương trình"
                    required
                    placeholder="Nhập tên chương trình"
                    value={nameVi}
                    onChange={(e) => setNameVi(e.target.value)}
                    error={submit && isEmpty(nameVi)}
                    helperText="Tên chương trình được yêu cầu"
                    inputProps={{ maxLength: 50 }}
                  />
                </Grid>
                <Grid item xs={12} md={6} style={{ paddingBottom: 0 }}>
                  <TextFields
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
                <Grid item xs={12} style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <TextFields
                    label="Mô tả"
                    required
                    placeholder="Nhập mô tả"
                    value={descriptionVi}
                    onChange={(e) => setDescriptionVi(e.target.value)}
                    error={submit && isEmpty(descriptionVi)}
                    helperText="Mô tả được yêu cầu"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <TextFields
                    label="Ngày bắt đầu"
                    required
                    type="datetime-local"
                    value={start_date}
                    onChange={(e) => setStartDate(e.target.value)}
                    error={submit && isEmpty(start_date)}
                    helperText="Ngày bắt đầu được yêu cầu"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextFields
                    label="Ngày kết thúc"
                    type="datetime-local"
                    value={end_date}
                    onChange={(e) => setEndDate(e.target.value)}
                    error={submit && !isEmpty(start_date) && !isEmpty(end_date) && start_date >= end_date}
                    helperText="Ngày kết thúc không hợp lệ"
                  />
                </Grid>
              </Grid>
            </Fragment> :
            <Fragment>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6} style={{ paddingBottom: 0 }}>
                  <TextFields
                    label="Charity program name"
                    required
                    placeholder="Enter charity program name"
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                    inputProps={{ maxLength: 50 }}
                  />
                </Grid>
                <Grid item xs={12} md={6} style={{ paddingBottom: 0 }}>
                  <TextFields
                    label="Expected donation"
                    required
                    placeholder="Enter expected donation"
                    endAdornment={<InputAdornment position="end"><Box color="#3A3A3A" fontWeight="bold">VND</Box></InputAdornment>}
                    value={price}
                    onChange={(e) => setPrice(formatPrice(e.target.value))}
                    error={submit && (isEmpty(price) || parseInt(price) === 0)}
                    helperText={isEmpty(price) ? "Expected donation is required" : parseInt(price) === 0 && "Expected donation greater than 0"}
                  />
                </Grid>
                <Grid item xs={12} style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <TextFields
                    label="Description"
                    required
                    placeholder="Enter description"
                    value={descriptionEn}
                    onChange={(e) => setDescriptionEn(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <TextFields
                    label="Start date"
                    required
                    type="datetime-local"
                    value={start_date}
                    onChange={(e) => setStartDate(e.target.value)}
                    error={submit && isEmpty(start_date)}
                    helperText="Start date is required"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextFields
                    label="End date"
                    type="datetime-local"
                    value={end_date}
                    onChange={(e) => setEndDate(e.target.value)}
                    error={submit && !isEmpty(start_date) && !isEmpty(end_date) && start_date >= end_date}
                    helperText="End date is invalid"
                  />
                </Grid>
              </Grid>
            </Fragment>
          }
        </div>
        <div className="modal-footer">
          <DefaultButton onClick={onClose}>Hủy</DefaultButton>
          <PrimaryButton onClick={onSubmit}>Thêm</PrimaryButton>
        </div>
      </div >
    </Modal >
  )
}

export default AddCharity;