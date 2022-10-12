import {
  Box, Grid, Paper, Typography
} from "@material-ui/core";
import Breadcrumbs from "app/components/Breadcrumbs";
import DefaultButton from "app/components/Button/DefaultButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import TextFields from "app/components/TextFields";
import { ACTION_TYPE } from "app/reducers/static-page";
import { isEmail } from "app/utils/common";
import { LANG_EN, LANG_VI } from "app/utils/constant";
import { isEmpty } from "app/utils/validate";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import SelectLang from "app/components/SelectLang";

const FooterConfig = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const footer = useSelector((store) => store.staticPage.footer);
  const [lang, setLang] = useState(LANG_VI);
  const [nameVi, setNameVi] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [emailVi, setEmailVi] = useState("");
  const [emailEn, setEmailEn] = useState("");
  const [phoneNumberVi, setPhoneNumberVi] = useState("");
  const [phoneNumberEn, setPhoneNumberEn] = useState("");
  const [addressVi, setAddressVi] = useState("");
  const [addressEn, setAddressEn] = useState("");
  const [submit, setSubmit] = useState("");

  useEffect(() => {
    dispatch({
      type: ACTION_TYPE.GET_FOOTER_REQUEST,
    })
  }, [dispatch])

  useEffect(() => {
    setNameVi(footer?.[`${LANG_VI}.company_name`]);
    setEmailVi(footer?.[`${LANG_VI}.email`]);
    setPhoneNumberVi(footer?.[`${LANG_VI}.hotline`]);
    setAddressVi(footer?.[`${LANG_VI}.address`]);
    setNameEn(footer?.[`${LANG_EN}.company_name`]);
    setEmailEn(footer?.[`${LANG_EN}.email`]);
    setPhoneNumberEn(footer?.[`${LANG_EN}.hotline`]);
    setAddressEn(footer?.[`${LANG_EN}.address`]);
  }, [footer])

  const onSubmit = () => {
    if (isEmpty(nameVi) || !isEmail(emailVi) || isEmpty(phoneNumberVi) || isEmpty(addressVi)) {
      setLang(LANG_VI);
      setSubmit(true);
      return;
    }
    if (isEmpty(nameEn) || !isEmail(emailEn) || isEmpty(phoneNumberEn) || isEmpty(addressEn)) {
      setLang(LANG_EN);
      setSubmit(true);
      return;
    }
    let contents = [{
      language_code: LANG_VI,
      language_field: "company_name",
      language_value: nameVi,
    }, {
      language_code: LANG_VI,
      language_field: "email",
      language_value: emailVi,
    }, {
      language_code: LANG_VI,
      language_field: "hotline",
      language_value: phoneNumberVi,
    }, {
      language_code: LANG_VI,
      language_field: "address",
      language_value: addressVi,
    }, {
      language_code: LANG_EN,
      language_field: "company_name",
      language_value: nameEn,
    }, {
      language_code: LANG_EN,
      language_field: "email",
      language_value: emailEn,
    }, {
      language_code: LANG_EN,
      language_field: "hotline",
      language_value: phoneNumberEn,
    }, {
      language_code: LANG_EN,
      language_field: "address",
      language_value: addressEn,
    }];
    dispatch({
      type: ACTION_TYPE.EDIT_FOOTER_REQUEST,
      data: { contents },
      success: () => {
        history.push("/");
      }
    })
  }

  return (
    <Fragment>
      <div className="page-header">
        <div className="page-title">
          <Breadcrumbs>
            <Link to="/">Cấu hình thông tin</Link>
            <Typography>Thông tin cơ bản của Long Thành Plastic</Typography>
          </Breadcrumbs>
        </div>
        <DefaultButton component={Link} to="/">
          Hủy
        </DefaultButton>
        <PrimaryButton onClick={onSubmit}>
          Lưu lại
        </PrimaryButton>
      </div>
      <Paper className="page-content">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box fontSize={16} fontWeight={600} color="#000000">Thông tin</Box>
          <SelectLang value={lang} onChange={setLang} />
        </Box>
        {lang === LANG_VI ?
          <Fragment>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <TextFields
                  label="Tên công ty"
                  required
                  value={nameVi}
                  onChange={(e) => setNameVi(e.target.value)}
                  error={submit && isEmpty(nameVi)}
                  helperText="Tên công ty được yêu cầu"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextFields
                  label="Email"
                  required
                  value={emailVi}
                  onChange={(e) => setEmailVi(e.target.value)}
                  error={submit && (isEmpty(emailVi) || !isEmail(emailVi))}
                  helperText={isEmpty(emailVi) ? "Email được yêu cầu" : "Email không hợp lệ"}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextFields
                  label="Hotline"
                  required
                  value={phoneNumberVi}
                  onChange={(e) => setPhoneNumberVi(e.target.value)}
                  error={submit && isEmpty(phoneNumberVi)}
                  helperText="Hotline được yêu cầu"
                />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextFields
                  label="Địa chỉ"
                  required
                  value={addressVi}
                  onChange={(e) => setAddressVi(e.target.value)}
                  error={submit && isEmpty(addressVi)}
                  helperText="Địa chỉ được yêu cầu"
                />
              </Grid>
            </Grid>
          </Fragment> :
          <Fragment>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <TextFields
                  label="Company name"
                  required
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  error={submit && isEmpty(nameEn)}
                  helperText="Company name is required"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextFields
                  label="Email"
                  required
                  value={emailEn}
                  onChange={(e) => setEmailEn(e.target.value)}
                  error={submit && (isEmpty(emailEn) || !isEmail(emailEn))}
                  helperText={isEmpty(emailEn) ? "Email is required" : "Email is invalid"}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextFields
                  label="Hotline"
                  required
                  value={phoneNumberEn}
                  onChange={(e) => setPhoneNumberEn(e.target.value)}
                  error={submit && isEmpty(phoneNumberEn)}
                  helperText="Hotline is required"
                />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextFields
                  label="Address"
                  required
                  value={addressEn}
                  onChange={(e) => setAddressEn(e.target.value)}
                  error={submit && isEmpty(addressEn)}
                  helperText="Address is required"
                />
              </Grid>
            </Grid>
          </Fragment>
        }
      </Paper>
    </Fragment>
  );
}

export default FooterConfig;