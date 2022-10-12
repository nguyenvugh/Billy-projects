import {useState, useEffect} from "react";
import {useParams, useLocation, useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {Grid, Divider, FormControl, Select, MenuItem} from "@material-ui/core";

import Toolbar from "./components/Toolbar";
import Content from "./components/Content";
import Thumbnail from "./components/Thumbnail";
import ContentTab from "./components/ContentTab";
import ConfirmModal from "app/components/ConfirmModal";
import viFlag from "app/assets/vi.png";
import usFlag from "app/assets/us.png";

import * as Utils from "app/utils";
import {addNewCate} from "app/services/axios";
import * as AppURL from "app/services/urlAPI";
import ContentTabEN from "../NewDetail/components/ContentTabEN";

const useStyles = makeStyles((theme) => ({
  thumbnail: {
    padding: "0px 0px 0px 20px",
  },
  titleHeader: {
    marginBottom: "10px",
    fontSize: "16px",
    fontWeight: "400",
    fontStyle: "normal",
    color: "#000000",
  },
  main: {
    backgroundColor: "#ffffff",
    padding: "20px",
    marginBottom: "20px",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
  },
  imgFlag: {
    width: "20px",
    height: "14px",
  },
}));

export default function NewDetail() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const {id} = useParams();

  const [contentData, setContentData] = useState({});
  const [contentTabData, setContentTabData] = useState("");
  const [thumbnailData, setThumbnailData] = useState({});

  useEffect(async () => {
    const detail = Utils.getSafeValue(location.state, "row", {});
    const listCate = Utils.getSafeValue(location.state, "listCate", []);
    const translates = Utils.getSafeValue(detail, "translates", []);
    const name = Utils.getField(translates, "vi", "name");
    const desc = Utils.getField(translates, "vi", "desc");
    const content = Utils.getField(translates, "vi", "content");
    const nameEN = Utils.getField(translates, "en", "name");
    const descEN = Utils.getField(translates, "en", "desc");
    const slug = Utils.getField(translates, "vi", "slug");
    const slugEN = Utils.getField(translates, "en", "slug");
    const contentEN = Utils.getField(translates, "en", "content");
    const title_seo = Utils.getField(translates, "vi", "title_seo");
    const title_seo_en = Utils.getField(translates, "en", "title_seo");
    const description_seo = Utils.getField(translates, "vi", "description_seo");
    const description_seo_en = Utils.getField(
      translates,
      "en",
      "description_seo"
    );
    const redirect_slug_302 = Utils.getField(
      translates,
      "vi",
      "redirect_slug_302"
    );
    const redirect_slug_302_en = Utils.getField(
      translates,
      "en",
      "redirect_slug_302"
    );
    const redirect_slug = Utils.getField(
      translates,
      "vi",
      "redirect_slug"
    );
    const redirect_slug_en = Utils.getField(
      translates,
      "en",
      "redirect_slug"
    );
    const category = Utils.getSafeValue(detail, "category", 0);
    const status = Utils.getSafeValue(detail, "status", 0);
    const scheduled_at = Utils.getSafeValue(detail, "scheduled_at", "");
    const dateString = new Date(scheduled_at).toLocaleString("vi-VI");
    const dateArr = dateString.split(", ");
    const formatDate = dateArr[1]
      .split("/")
      .reverse()
      .map((item) => {
        if (item.length === 1) return "0" + item;
        return item;
      });
    const filter_scheduled_at =
      formatDate.join("-") + "T" + dateArr[0].slice(0, 5);
    const author = Utils.getSafeValue(detail, "author", "");
    const updated_at = Utils.getSafeValue(detail, "updated_at", "");
    const date = new Date(updated_at);
    const updated_at_date = date.toLocaleDateString("vi-VI");
    const feature = Utils.getSafeValue(detail, "features", 0);
    const thumbnailObj = Utils.getSafeValue(detail, "thumbnail_obj", {});
    const thumbnailUrl = Utils.getSafeValue(thumbnailObj, "url", "");
    const contentData = {
      name,
      desc,
      category,
      status,
      filter_scheduled_at,
      author,
      updated_at_date,
      feature,
      listCate,
      nameEN,
      descEN,
      slug,
      slugEN,
      title_seo,
      title_seo_en,
      description_seo,
      description_seo_en,
      redirect_slug_302,
      redirect_slug_302_en,
      redirect_slug,
      redirect_slug_en
    };
    const contentTabData = {
      content,
      contentEN,
    };
    const thumbnailData = {
      thumbnailUrl,
    };
    await setContentData(contentData);
    await setContentTabData(contentTabData);
    await setThumbnailData(thumbnailData);
  }, []);

  const [openLan, setOpenLan] = useState(false);
  const [lan, setLan] = useState("vi");
  const [
    isOpenDeleteProductsConfirmation,
    setIsOpenDeleteProductsConfirmation,
  ] = useState(false);

  const handleCloseLan = () => {
    setOpenLan(false);
  };

  const handleOpenLan = () => {
    setOpenLan(true);
  };

  const handleChangeLan = (e) => {
    setLan(e.target.value);
  };

  const handleDeleteNews = () => {
    console.log(id);
    const params = {
      ids: id,
    };
    addNewCate(AppURL.deleteNews, params).then((res) => {
      if (res.code === 200) {
        history.goBack();
      }
    });
  };

  const handleSubmit = () => {};
  return (
    <div>
      <Toolbar
        onSubmit={handleSubmit}
        id={id}
        detail={location.state.row}
        onDelete={() => setIsOpenDeleteProductsConfirmation(true)}
      />
      <div className={classes.main}>
        <Grid container className={classes.flex}>
          <span className={classes.titleHeader}>Tin tức</span>
          <FormControl className={classes.formControl}>
            <Select
              open={openLan}
              onClose={handleCloseLan}
              onOpen={handleOpenLan}
              value={lan}
              onChange={handleChangeLan}
            >
              <MenuItem value={"vi"}>
                <img className={classes.imgFlag} src={viFlag} /> Tiếng Việt
              </MenuItem>
              <MenuItem value={"en"}>
                <img className={classes.imgFlag} src={usFlag} /> Tiếng Anh
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item xs={8}>
            <Content data={contentData} lan={lan} />
          </Grid>
          <Grid item xs={4} className={classes.thumbnail}>
            <Thumbnail data={thumbnailData} lan={lan} />
          </Grid>
        </Grid>
        <Grid container>
          {lan === "vi" ? (
            <ContentTab data={contentTabData} />
          ) : (
            <ContentTabEN data={contentTabData} />
          )}
        </Grid>
      </div>
      <ConfirmModal
        isOpen={isOpenDeleteProductsConfirmation}
        type="delete"
        title="Xoá tin tức"
        okText="Xoá"
        onOk={handleDeleteNews}
        onClose={() => setIsOpenDeleteProductsConfirmation(false)}
      >
        <p>Bạn có chắc muốn xóa tin tức đã chọn?</p>
      </ConfirmModal>
    </div>
  );
}
