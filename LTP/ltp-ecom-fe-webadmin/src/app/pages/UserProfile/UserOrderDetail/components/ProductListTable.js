import { useState, useEffect } from "react";
import lodash from "lodash";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MTable from "@material-ui/core/Table";
import MTableBody from "@material-ui/core/TableBody";
import MTableCell from "@material-ui/core/TableCell";
import MTableContainer from "@material-ui/core/TableContainer";
import MTableHead from "@material-ui/core/TableHead";
import MTableRow from "@material-ui/core/TableRow";
import { Grid, Paper } from "@material-ui/core";
import Pagination from "app/components/Pagination";
import { formatVND } from "app/utils/common";
import { formatPrice } from "app/utils/validate";
import { LANG_VI } from "app/utils/constant";

import * as Utils from "app/utils";

function createData(
  id,
  productName,
  quantity,
  unitPrice,
  discount,
  totalPrice
) {
  return { id, productName, quantity, unitPrice, discount, totalPrice };
}

const useStyles = makeStyles((theme) => ({
  main: {
    margin: "20px 0",
  },
  toolbar: {
    margin: "15px 0",
  },
  title: {
    fontSize: "18px",
    marginTop: "20px",
    margin: 0,
    fontWeight: 600,
    lineHeight: "36px",
  },
  actionBlock: {
    textAlign: "left",
    width: "90%",
  },
  dateRange: {
    width: "90%",
  },
  deleteForm: {
    textAlign: "right",
  },
  deleteButton: {
    backgroundColor: "#D70000",
    textTransform: "unset",
    height: "40px !important",
    width: "100%",
  },
  table: {
    backgroundColor: "#ffffff",
  },
  tableHeader: {
    color: "#99A6B7",
    paddingBottom: "10px",
    paddingTop: "10px",
    paddingLeft: "20px",
  },
  pagination: {
    margin: "20px 0",
    float: "right",
  },
  statusCompleted: {
    color: "#00B41D",
    border: "1px solid #9EE2B8",
    backgroundColor: "#ffffff",
    height: "24px",
    width: "135px",
  },
  statusPending: {
    color: "#F8B711",
    border: "1px solid #F3C51F",
    backgroundColor: "#ffffff",
    height: "24px",
    width: "135px",
  },
  statusCanceled: {
    color: "#EA403F",
    border: "1px solid #EA403F",
    backgroundColor: "#ffffff",
    height: "24px",
    width: "135px",
  },
  statusConfirmed: {
    color: "#858585",
    border: "1px solid #858585",
    backgroundColor: "#ffffff",
    height: "24px",
    width: "135px",
  },
  searchForm: {
    fontSize: "14px",
    display: "flex",
    width: "100%",
  },
  searchFormLabel: {
    fontSize: "14px",
    marginTop: "-8px",
    color: "#898989",
  },
  searchFormInput: {
    fontSize: "14px",
    height: "40px",
    borderColor: "#E2E2E2",
    width: "90%",
  },
  searchFormIcon: {
    height: "36px",
    width: "36px",
  },
  iconCompleted: {
    height: "10px",
    width: "10px",
    color: "#00c537",
    marginRight: "10px",
  },
  iconPending: {
    height: "10px",
    width: "10px",
    color: "#f7b611",
    marginRight: "10px",
  },
  iconConfirmed: {
    height: "10px",
    width: "10px",
    color: "#383838",
    marginRight: "10px",
  },
  iconDelivering: {
    height: "10px",
    width: "10px",
    color: "#276ef1",
    marginRight: "10px",
  },
  iconCanceled: {
    height: "10px",
    width: "10px",
    color: "#ea403f",
    marginRight: "10px",
  },
  menuFloat: {
    fontSize: "14px",
  },
  tableCell: {
    paddingTop: "18px",
    paddingBottom: "18px",
    paddingLeft: "20px",
  },
  tableCellHead: {
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  ellipsis: {
    display: "inline-block",
    width: "14vw",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));

export default function ProductListTable({ data }) {
  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    console.log("handleChangePage", newPage);
  };

  return (
    <Grid className={classes.main}>
      <Grid container className={classes.toolbar}>
        <Grid item md>
          <h3 className={classes.title}>
            <span className={classes.titleLink}>Danh sách sản phẩm</span>
          </h3>
        </Grid>
      </Grid>
      <div className={classes.table}>
        <MTableContainer component={Paper} style={{ marginBottom: 24 }}>
          <MTable padding="normal" stickyHeader>
            <MTableHead>
              <MTableRow>
                <MTableCell>STT</MTableCell>
                <MTableCell>Tên sản phẩm</MTableCell>
                <MTableCell>Kho hàng</MTableCell>
                <MTableCell>Chương trình</MTableCell>
                <MTableCell>Số lượng</MTableCell>
                <MTableCell>Đơn giá</MTableCell>
                <MTableCell>Giá giảm</MTableCell>
                <MTableCell>Giá tổng</MTableCell>
              </MTableRow>
            </MTableHead>
            <MTableBody>
              {Array.isArray(data?.order_details) &&
                data.order_details.map((data, index) => {
                  let salePrice = null;
                  if (data?.combo_price) {
                    salePrice = data?.combo_price;
                  } else if (data?.promotion_price) {
                    salePrice = data?.promotion_price;
                  } else if (data?.sale_price) {
                    salePrice = data?.sale_price;
                  } else {
                    salePrice = null;
                  }
                  return (
                    <MTableRow key={data?.id}>
                      <MTableCell>{index + 1}</MTableCell>
                      <MTableCell>
                        {data?.product?.translates[0]?.name}
                      </MTableCell>
                      <MTableCell></MTableCell>
                      <MTableCell></MTableCell>
                      <MTableCell>{data?.number}</MTableCell>
                      <MTableCell>
                        {formatPrice(data?.original_price)} VNĐ
                      </MTableCell>
                      <MTableCell>
                        {salePrice
                          ? formatPrice(data?.original_price - salePrice)
                          : 0}{" "}
                        VNĐ
                      </MTableCell>
                      <MTableCell>{formatPrice(data?.total)} VNĐ</MTableCell>
                    </MTableRow>
                  );
                })}
            </MTableBody>
          </MTable>
        </MTableContainer>
      </div>
    </Grid>
  );
}
