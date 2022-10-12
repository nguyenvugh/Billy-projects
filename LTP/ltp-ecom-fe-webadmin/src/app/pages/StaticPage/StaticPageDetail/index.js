import {
  Box, Grid, Paper, Typography
} from "@material-ui/core";
import Breadcrumbs from "app/components/Breadcrumbs";
import DefaultButton from "app/components/Button/DefaultButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import SelectLang from "app/components/SelectLang";
import TextEditors from "app/components/TextEditors";
import TextFields from "app/components/TextFields";
import { ACTION_TYPE } from "app/reducers/static-page";
import { LANG_EN, LANG_VI } from "app/utils/constant";
import { isEmpty } from "app/utils/validate";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";

const StaticPageDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const staticPage = useSelector((store) => store.staticPage.staticPage);
  const [contentVi, setContentVi] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [lang, setLang] = useState(LANG_VI);

  useEffect(() => {
    if (staticPage?.id) {
      setContentVi(staticPage?.[`${LANG_VI}.content`] || "");
      setContentEn(staticPage?.[`${LANG_EN}.content`] || "");
    }
  }, [staticPage]);

  useEffect(() => {
    return () => {
      dispatch({
        type: ACTION_TYPE.GET_STATIC_PAGE_SUCCESS,
        payload: {}
      })
    }
  }, [dispatch])

  useEffect(() => {
    dispatch({
      type: ACTION_TYPE.GET_STATIC_PAGE_REQUEST,
      id,
      error: () => {
        history.replace("/");
      }
    })
  }, [dispatch, id]);

  const onSubmit = () => {
    if (contentVi === staticPage?.[`${LANG_VI}.content`] && contentEn === staticPage?.[`${LANG_EN}.content`]) {
      history.push("/");
      return;
    }
    dispatch({
      type: ACTION_TYPE.EDIT_STATIC_PAGE_REQUEST,
      id: staticPage?.id,
      data: {
        contents: [{
          language_code: LANG_VI,
          language_field: "content",
          language_value: contentVi,
        }, {
          language_code: LANG_EN,
          language_field: "content",
          language_value: isEmpty(contentEn) ? contentVi : contentEn,
        }],
      },
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
            <Link to="/">Danh sách trang tĩnh</Link>
            <Typography>Chỉnh sửa trang tĩnh</Typography>
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
          <Box fontSize={16} fontWeight={600} color="#000000">Trang tĩnh</Box>
          <SelectLang value={lang} onChange={setLang} />
        </Box>
        <div style={{ display: lang === LANG_VI ? "block" : "none" }}>
          <Grid container>
            <Grid item md={6}>
              <TextFields
                label="Tên trang tĩnh"
                value={staticPage?.slug}
                disabled
              />
            </Grid>
          </Grid>
          <div className="label">
            Nội dung
          </div>
          <TextEditors
            defaultValue={contentVi}
            onChange={setContentVi}
          />
        </div>
        <div style={{ display: lang === LANG_EN ? "block" : "none" }}>
          <Grid container>
            <Grid item md={6}>
              <TextFields
                label="Name's page"
                value={staticPage?.slug}
                disabled
              />
            </Grid>
          </Grid>
          <div className="label">
            Content
          </div>
          <TextEditors
            defaultValue={contentEn}
            onChange={setContentEn}
          />
        </div>
      </Paper>
    </Fragment>
  );
}

export default StaticPageDetail;