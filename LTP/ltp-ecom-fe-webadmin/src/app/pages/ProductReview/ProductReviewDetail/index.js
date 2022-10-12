import { useEffect, useLayoutEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Divider, FormControlLabel, Checkbox } from "@material-ui/core";
import lodash from "lodash";

import Toolbar from "./components/Toolbar";
import Content from "./components/Content";
import ConfirmModal from "app/components/ConfirmModal";

import * as Utils from "../../../utils";
import * as AppURL from "../../../services/urlAPI";
import { getProductCategory } from "app/services/axios";
import {
  patchApproveProductReviews,
  patchDeclineProductReviews,
  getProductReviewDetail,
} from "app/services/product-reviews";
const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: "#ffffff",
    padding: "20px",
    marginBottom: "20px",
  },
  photos: {
    padding: "0px 0px 0px 20px",
  },
}));

export default function UserProfileDetail() {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();

  const [productDetail, setProductDetail] = useState(null);
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState({});
  const [listChildCate, setListChildCate] = useState([]);
  const [
    isOpenApproveAccountConfirmation,
    setIsOpenApproveAccountConfirmation,
  ] = useState(false);
  const [isOpenDenyAccountConfirmation, setIsOpenDenyAccountConfirmation] =
    useState(false);
  const [review, setReview] = useState(null);

  useEffect(() => {
    getProductDetail();
  }, []);

  const getProductDetail = async () => {
    try {
      const request = await getProductReviewDetail({ id });
      const response = request.data;
      setReview(response);
    } catch (error) {
      console.log(error);
    }
  };

  const approveProductReviews = async () => {
    try {
      const request = await patchApproveProductReviews({ ids: [id] });
      const response = await request;
      setIsOpenApproveAccountConfirmation(false);
      await getProductDetail();
    } catch (error) {
      // setIsOpenApproveAccountConfirmation(false);
    }
  };

  const declineProductReviews = async () => {
    try {
      const request = await patchDeclineProductReviews({ ids: [id] });
      const response = await request;
      setIsOpenDenyAccountConfirmation(false);
      await getProductDetail();
    } catch (error) {
      // setIsOpenDenyAccountConfirmation(false);
    }
  };

  const handleDenyAccount = () => {
    setIsOpenDenyAccountConfirmation(false);
    declineProductReviews();
  };

  const handleApproveAccount = () => {
    setIsOpenApproveAccountConfirmation(false);
    approveProductReviews();
  };

  return (
    <>
      <Toolbar
        setIsOpenApproveAccountConfirmation={
          setIsOpenApproveAccountConfirmation
        }
        setIsOpenDenyAccountConfirmation={setIsOpenDenyAccountConfirmation}
      />
      <Grid container className={classes.main}>
        <Grid item xs={12}>
          <Content review={review} />
        </Grid>
      </Grid>
      <ConfirmModal
        isOpen={isOpenApproveAccountConfirmation}
        type="save"
        title="Duyệt đánh giá"
        okText="Duyệt"
        onOk={handleApproveAccount}
        onClose={() => setIsOpenApproveAccountConfirmation(false)}
      >
        <p>Bạn có chắc muốn duyệt đánh giá đã chọn?</p>
      </ConfirmModal>
      <ConfirmModal
        isOpen={isOpenDenyAccountConfirmation}
        type="delete"
        title="Từ chối đánh giá"
        okText="Từ chối"
        onOk={handleDenyAccount}
        onClose={() => setIsOpenDenyAccountConfirmation(false)}
      >
        <p>Bạn có chắc muốn từ chối đánh giá đã chọn?</p>
      </ConfirmModal>
    </>
  );
}
