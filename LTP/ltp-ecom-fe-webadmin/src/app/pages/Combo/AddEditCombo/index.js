import {
  Box,
  Card,
  CardMedia,
  Divider,
  Grid,
  Link as LinkUI,
  Typography,
} from "@material-ui/core";
import Breadcrumbs from "app/components/Breadcrumbs";
import DangerButton from "app/components/Button/DangerButton";
import DefaultButton from "app/components/Button/DefaultButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import ConfirmDelete from "app/components/ConfirmDelete";
import PreviewImage from "app/components/PreviewImage";
import PreviewImageMulti from "app/components/PreviewImageMulti";
import SelectLang from "app/components/SelectLang";
import SelectStatus from "app/components/SelectStatus";
import TextEditors from "app/components/TextEditors";
import TextFields from "app/components/TextFields";
import { ACTION_TYPE } from "app/reducers/combo";
import { ACTION_TYPE as ACTION_TYPE_UPLOAD } from "app/reducers/upload-file";
import { LANG_EN, LANG_VI } from "app/utils/constant";
import { formatPrice, isEmpty } from "app/utils/validate";
import { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { comboStatusList } from "..";
import ComboProducts from "../ComboProducts";

const AddEditCombo = ({ refreshList }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const [detail, setDetail] = useState(true);
  const [lang, setLang] = useState(LANG_VI);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const combo = useSelector((store) => store.combo.combo);
  const [code, setCode] = useState("");
  const [nameVi, setNameVi] = useState("");
  const [shortDescVi, setShortDescVi] = useState("");
  const [descriptionVi, setDescriptionVi] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [shortDescEn, setShortDescEn] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [submit, setSubmit] = useState(false);
  const [editorVi, setEditorVi] = useState();
  const [editorEn, setEditorEn] = useState();
  const [thumbnail, setThumnail] = useState();
  const [thumbnailFiles, setThumnailFiles] = useState([]);
  const [imagesList, setImagesList] = useState([]);
  const [imagesFiles, setImagesFiles] = useState([]);
  const [status, setStatus] = useState();
  const [productList, setProductList] = useState([]);
  const [errorCode, setErrorCode] = useState();
  const [errorNameVi, setErrorNameVi] = useState();
  const [errorNameEn, setErrorNameEn] = useState();

  useEffect(() => {
    if (params?.id) {
      dispatch({
        type: ACTION_TYPE.GET_COMBO_REQUEST,
        id: params.id,
        error: () => {
          history.replace("/");
        },
      });
    }
  }, [history, params?.id]);

  useEffect(() => {
    if (detail) {
      setLang(LANG_VI);
      setCode(combo?.code);
      setNameVi(combo?.[LANG_VI]?.name);
      setShortDescVi(combo?.[LANG_VI]?.short_desc);
      setDescriptionVi(combo?.[LANG_VI]?.description);
      setNameEn(combo?.[LANG_EN]?.name);
      setShortDescEn(combo?.[LANG_EN]?.short_desc);
      setDescriptionEn(combo?.[LANG_EN]?.description);
      setEditorVi();
      setEditorEn();
      setSubmit(false);
      setStatus(comboStatusList.find((item) => item.status === combo?.status));
      let images = combo?.images;
      if (Array.isArray(images)) {
        setThumnail(images.find((item) => item?.is_thumbnail === 1));
        setImagesList(images.filter((item) => item?.is_thumbnail === -1));
      }
      setThumnailFiles([]);
      setImagesFiles([]);
      let details = combo?.details;
      if (Array.isArray(details)) {
        setProductList([...details]);
      }
      setErrorCode();
      setErrorNameVi();
      setErrorNameEn();
    }
  }, [combo, detail]);

  const onChangeDetail = (e) => {
    e.preventDefault();
    setDetail(!detail);
    editorVi?.data?.set(combo?.[LANG_VI]?.description);
    editorEn?.data?.set(combo?.[LANG_EN]?.description);
  };

  const onChangeCode = (e) => {
    setCode(e.target.value);
    setErrorCode();
  };

  const onDelete = () => {
    dispatch({
      type: ACTION_TYPE.DELETE_COMBO_LIST_REQUEST,
      data: { ids: [combo?.id] },
      success: () => {
        refreshList();
        history.replace("/");
      },
    });
  };

  const onEdit = (images) => {
    let details = productList.map((item) => ({
      product_id: item?.product?.id,
      percentage: item?.percentage,
      quantity: item?.quantity,
    }));
    let data = {
      images,
      code,
      status: status?.status,
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
      details,
    };
    dispatch({
      type: ACTION_TYPE.EDIT_COMBO_REQUEST,
      id: combo?.id,
      data,
      success: () => {
        dispatch({
          type: ACTION_TYPE.GET_COMBO_REQUEST,
          id: params.id,
          success: () => {
            setDetail(true);
          },
          error: () => {
            history.replace("/");
          },
        });
        refreshList();
      },
      error: (e) => {
        if (e?.message === "M?? combo ???? t???n t???i") {
          setErrorCode(e?.message);
        } else if (e?.message === "T??n combo ???? t???n t???i") {
          setErrorNameVi(e?.message);
          setErrorNameEn("Combo name is already exists");
        }
      },
    });
  };

  const onSubmit = () => {
    if (
      isEmpty(code) ||
      isEmpty(nameVi) ||
      isEmpty(shortDescVi) ||
      isEmpty(descriptionVi) ||
      !status?.status ||
      errorNameVi ||
      errorCode ||
      !thumbnail
    ) {
      setLang(LANG_VI);
      setSubmit(true);
      return;
    }
    let data = [...thumbnailFiles, ...imagesFiles];
    dispatch({
      type: ACTION_TYPE_UPLOAD.UPLOAD_FILE_MULTI_REQUEST,
      data,
      success: (responseList) => {
        let images = imagesList.map((item) => ({
          image_id: item?.image?.id,
          is_thumbnail: item?.is_thumbnail,
        }));
        if (thumbnailFiles.length === 0 && Array.isArray(combo?.images)) {
          let thumb = combo.images.find((item) => item?.is_thumbnail === 1);
          if (thumb) {
            images.unshift({
              image_id: thumb?.image?.id,
              is_thumbnail: thumb?.is_thumbnail,
            });
          }
        }
        if (Array.isArray(responseList)) {
          responseList.forEach((item, index) => {
            let is_thumbnail = -1;
            if (thumbnailFiles.length === 1 && index === 0) {
              is_thumbnail = 1;
            }
            images.push({
              image_id: item?.data?.id,
              is_thumbnail,
            });
          });
        }
        onEdit(images);
      },
    });
  };

  return (
    <Fragment>
      <ConfirmDelete
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onOK={onDelete}
        title="X??A COMBO"
        message="B???n c?? ch???c mu???n x??a combo ???? ch???n?"
      />
      <div className="page-header">
        {combo?.id &&
          (detail ? (
            <Fragment>
              <div className="page-title">
                <Breadcrumbs>
                  <Link to="/">Qu???n l?? Combo</Link>
                  <Typography>Chi ti???t Combo</Typography>
                </Breadcrumbs>
              </div>
              <PrimaryButton onClick={onChangeDetail}>Ch???nh s???a</PrimaryButton>
              <DangerButton onClick={() => setConfirmDelete(true)}>
                X??a
              </DangerButton>
            </Fragment>
          ) : (
            <Fragment>
              <div className="page-title">
                <Breadcrumbs>
                  <Link to="/">Qu???n l?? Combo</Link>
                  <LinkUI href="#" onClick={onChangeDetail}>
                    Chi ti???t Combo
                  </LinkUI>
                  <Typography>Ch???nh s???a</Typography>
                </Breadcrumbs>
              </div>
              <DefaultButton onClick={onChangeDetail}>H???y</DefaultButton>
              <PrimaryButton onClick={onSubmit}>L??u l???i</PrimaryButton>
            </Fragment>
          ))}
      </div>
      <div className="page-content">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box fontSize={16} fontWeight={600}>
            Combo
          </Box>
          <SelectLang value={lang} onChange={setLang} />
        </Box>
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            md={8}
            style={{ display: lang !== LANG_VI && "none" }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <TextFields
                  label="M?? combo"
                  required
                  placeholder="Nh???p m?? combo"
                  disabled={detail}
                  value={code}
                  onChange={onChangeCode}
                  error={Boolean(errorCode) || (submit && isEmpty(code))}
                  helperText={errorCode || "M?? combo ???????c y??u c???u"}
                />
                <TextFields label="Tr???ng th??i" required>
                  <SelectStatus
                    width="100%"
                    disabled={detail}
                    value={status}
                    onChange={setStatus}
                    statusList={comboStatusList}
                  />
                </TextFields>
                <TextFields
                  label="L?????t y??u th??ch"
                  required
                  placeholder="T??? c???p nh???t"
                  disabled
                  value={formatPrice(combo?.num_like)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextFields
                  label="T??n combo"
                  required
                  placeholder="Nh???p t??n combo"
                  disabled={detail}
                  value={nameVi}
                  onChange={(e) => {
                    setNameVi(e.target.value);
                    setErrorNameVi();
                  }}
                  error={Boolean(errorNameVi) || (submit && isEmpty(nameVi))}
                  helperText={errorNameVi || "T??n combo ???????c y??u c???u"}
                />
                <TextFields
                  label="???? b??n"
                  required
                  placeholder="T??? c???p nh???t"
                  disabled
                  value={formatPrice(combo?.num_sold)}
                />
                <TextFields
                  label="Trung b??nh ????nh gi??"
                  required
                  placeholder="T??? c???p nh???t"
                  disabled
                  value={formatPrice(combo?.avg_rating)}
                />
              </Grid>
            </Grid>
            <TextFields
              label="M?? t??? ng???n"
              required
              placeholder="Nh???p m?? t??? ng???n"
              disabled={detail}
              value={shortDescVi}
              onChange={(e) => setShortDescVi(e.target.value)}
              error={submit && isEmpty(shortDescVi)}
              helperText="M?? t??? ng???n ???????c y??u c???u"
              inputProps={{ maxLength: 100 }}
            />
            <TextFields
              label="M?? t??? chi ti???t"
              required
              placeholder="Nh???p m?? t??? ng???n"
              disabled={detail}
              error={submit && isEmpty(descriptionVi)}
              helperText="M?? t??? chi ti???t ???????c y??u c???u"
            >
              <TextEditors
                disabled={detail}
                setEditor={setEditorVi}
                defaultValue={descriptionVi}
                onChange={setDescriptionVi}
              />
            </TextFields>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            style={{ display: lang !== LANG_EN && "none" }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <TextFields
                  label="Combo code"
                  required
                  placeholder="Enter combo code"
                  disabled={detail}
                  value={code}
                  onChange={onChangeCode}
                  error={Boolean(errorCode) || (submit && isEmpty(code))}
                  helperText={errorCode || "Combo code is required"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextFields
                  label="Combo name"
                  required
                  placeholder="Enter combo name"
                  disabled={detail}
                  value={nameEn}
                  onChange={(e) => {
                    setNameEn(e.target.value);
                    setErrorNameEn();
                  }}
                />
              </Grid>
            </Grid>
            <TextFields
              label="Short description"
              required
              placeholder="Enter short description"
              disabled={detail}
              value={shortDescEn}
              onChange={(e) => setShortDescEn(e.target.value)}
              inputProps={{ maxLength: 100 }}
            />
            <TextFields label="Detail description" disabled={detail}>
              <TextEditors
                disabled={detail}
                setEditor={setEditorEn}
                defaultValue={combo?.[LANG_EN]?.description}
                onChange={setDescriptionEn}
              />
            </TextFields>
          </Grid>
          {detail ? (
            <Grid item xs={12} md={4}>
              <TextFields
                label={
                  lang === LANG_VI ? "???nh thumbnail Combo" : "Combo thumbnail"
                }
                required
              >
                <Card>
                  <CardMedia
                    image={thumbnail?.image?.url}
                    style={{ paddingBottom: "64%", borderRadius: 6 }}
                  />
                </Card>
              </TextFields>
              <TextFields
                label={lang === LANG_VI ? "H??nh ???nh" : "Images"}
                required
              >
                {imagesList.length > 0 ? (
                  <Carousel>
                    {imagesList.map((item, index) => (
                      <Card key={index}>
                        <CardMedia
                          image={item?.image?.url}
                          style={{ paddingBottom: "64%", borderRadius: 6 }}
                        />
                      </Card>
                    ))}
                  </Carousel>
                ) : (
                  <div />
                )}
              </TextFields>
            </Grid>
          ) : (
            <Grid item xs={12} md={4}>
              <TextFields
                label={
                  lang === LANG_VI ? "???nh thumbnail Combo" : "Combo thumbnail"
                }
                required
                error={submit && !thumbnail}
                helperText={"???nh thumbnail ???????c y??u c???u"}
              >
                <PreviewImage
                  imgUrl={thumbnail?.image?.url}
                  setImgUrl={setThumnail}
                  onChangeFiles={setThumnailFiles}
                />
              </TextFields>
              <PreviewImageMulti
                lang={lang}
                imgList={imagesList}
                setImgList={setImagesList}
                onChangeFiles={setImagesFiles}
              />
            </Grid>
          )}
        </Grid>
      </div>
      <Box py={4}>
        <Divider />
      </Box>
      <ComboProducts
        detail={detail}
        productList={productList}
        setProductList={setProductList}
      />
    </Fragment>
  );
};

export default AddEditCombo;
