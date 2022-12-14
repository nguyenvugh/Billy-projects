import { Box, Grid, IconButton, Modal } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import DangerButton from "app/components/Button/DangerButton";
import DefaultButton from "app/components/Button/DefaultButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import SelectLang from "app/components/SelectLang";
import Switch from "app/components/Switch";
import TextEditors from "app/components/TextEditors";
import TextFields from "app/components/TextFields";
import { ACTION_TYPE } from "app/reducers/combo";
import { LANG_EN, LANG_VI } from "app/utils/constant";
import { isEmpty } from "app/utils/validate";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AddCombo = ({ open, setOpen, refreshList }) => {
  const dispatch = useDispatch();
  const [lang, setLang] = useState(LANG_VI);
  const [code, setCode] = useState("");
  const [nameVi, setNameVi] = useState("");
  const [shortDescVi, setShortDescVi] = useState("");
  const [descriptionVi, setDescriptionVi] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [shortDescEn, setShortDescEn] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [submit, setSubmit] = useState(false);
  const [errorCode, setErrorCode] = useState();
  const [errorNameVi, setErrorNameVi] = useState();
  const [errorNameEn, setErrorNameEn] = useState();

  useEffect(() => {
    if (!open) {
      setLang(LANG_VI);
      setCode("");
      setNameVi("");
      setShortDescVi("");
      setDescriptionVi("");
      setNameEn("");
      setShortDescEn("");
      setDescriptionEn("");
      setSubmit(false);
      setErrorCode();
      setErrorNameVi();
      setErrorNameEn();
    }
  }, [open]);

  const onClose = (e, reason) => {
    if (reason !== "backdropClick") {
      setOpen instanceof Function && setOpen(false);
    }
  };

  const onChangeCode = (e) => {
    setCode(e.target.value);
    setErrorCode();
  }

  const onSubmit = () => {
    if (
      isEmpty(code) ||
      isEmpty(nameVi) ||
      isEmpty(shortDescVi) ||
      isEmpty(descriptionVi) ||
      errorNameVi || errorCode
    ) {
      setLang(LANG_VI);
      setSubmit(true);
      return;
    }
    dispatch({
      type: ACTION_TYPE.ADD_COMBO_REQUEST,
      data: {
        code,
        translates: [
          {
            language_code: LANG_VI,
            name: nameVi,
            short_desc: shortDescVi,
            description: descriptionVi,
          },
          {
            language_code: LANG_EN,
            name: isEmpty(nameEn) ? nameVi : nameEn,
            short_desc: isEmpty(shortDescEn) ? shortDescVi : shortDescEn,
            description: isEmpty(descriptionEn) ? descriptionVi : descriptionEn,
          },
        ],
      },
      success: () => {
        refreshList instanceof Function && refreshList();
        setOpen instanceof Function && setOpen(false);
      },
      error: (e) => {
        if (e?.message === "M?? combo ???? t???n t???i") {
          setErrorCode(e?.message);
        } else if (e?.message === "T??n combo ???? t???n t???i") {
          setErrorNameVi(e?.message);
          setErrorNameEn("Combo name is already exists");
        }
      }
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-content" style={{ maxWidth: 800 }}>
        <div className="modal-header">
          <div className="modal-title">Th??m combo</div>
          <IconButton onClick={onClose} style={{ padding: 3 }}>
            <Close />
          </IconButton>
        </div>
        <div className="modal-body">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pb={2}
          >
            <Box fontSize={16} fontWeight={600}></Box>
            <SelectLang value={lang} onChange={setLang} />
          </Box>
          <div style={{ display: lang !== LANG_VI && "none" }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6} style={{ paddingBottom: 0 }}>
                <TextFields
                  label="M?? combo"
                  required
                  placeholder="Nh???p m?? combo"
                  value={code}
                  onChange={onChangeCode}
                  error={Boolean(errorCode) || (submit && isEmpty(code))}
                  helperText={errorCode || "M?? combo ???????c y??u c???u"}
                />
              </Grid>
              <Grid item xs={12} md={6} style={{ paddingBottom: 0 }}>
                <TextFields
                  label="T??n combo"
                  required
                  placeholder="Nh???p t??n combo"
                  value={nameVi}
                  onChange={(e) => {
                    setNameVi(e.target.value);
                    setErrorNameVi();
                  }}
                  error={Boolean(errorNameVi) || (submit && isEmpty(nameVi))}
                  helperText={errorNameVi || "T??n combo ???????c y??u c???u"}
                />
              </Grid>
              <Grid item xs={12} style={{ paddingTop: 0, paddingBottom: 0 }}>
                <TextFields
                  label="M?? t??? ng???n"
                  required
                  placeholder="Nh???p m?? t??? ng???n"
                  value={shortDescVi}
                  onChange={(e) => setShortDescVi(e.target.value)}
                  error={submit && isEmpty(shortDescVi)}
                  helperText="M?? t??? ng???n ???????c y??u c???u"
                  inputProps={{ maxLength: 100 }}
                />
                <TextFields
                  label="M?? t??? chi ti???t"
                  required
                  error={submit && isEmpty(descriptionVi)}
                  helperText="M?? t??? chi ti???t ???????c y??u c???u"
                >
                  <TextEditors
                    defaultValue={descriptionVi}
                    onChange={setDescriptionVi}
                  />
                </TextFields>
              </Grid>
            </Grid>
          </div>
          <div style={{ display: lang !== LANG_EN && "none" }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6} style={{ paddingBottom: 0 }}>
                <TextFields
                  label="Combo code"
                  required
                  placeholder="Enter combo code"
                  value={code}
                  onChange={onChangeCode}
                  error={Boolean(errorCode) || (submit && isEmpty(code))}
                  helperText={errorCode || "Combo code is required"}
                />
              </Grid>
              <Grid item xs={12} md={6} style={{ paddingBottom: 0 }}>
                <TextFields
                  label="Combo name"
                  required
                  placeholder="Enter combo name"
                  value={nameEn}
                  onChange={(e) => {
                    setNameEn(e.target.value);
                    setErrorNameEn();
                  }}
                />
              </Grid>
              <Grid item xs={12} style={{ paddingTop: 0, paddingBottom: 0 }}>
                <TextFields
                  label="Short descripton"
                  required
                  placeholder="Enter short description"
                  value={shortDescEn}
                  onChange={(e) => setShortDescEn(e.target.value)}
                  inputProps={{ maxLength: 100 }}
                />
                <TextFields
                  label="Detail description"
                >
                  <TextEditors
                    defaultValue={descriptionEn}
                    onChange={setDescriptionEn}
                  />
                </TextFields>
              </Grid>
            </Grid>
          </div>
        </div>
        <div className="modal-footer">
          <DefaultButton onClick={onClose}>H???y</DefaultButton>
          <PrimaryButton onClick={onSubmit}>Th??m</PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};

export default AddCombo;
