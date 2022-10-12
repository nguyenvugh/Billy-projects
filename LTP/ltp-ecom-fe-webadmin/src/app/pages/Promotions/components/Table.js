import { Checkbox, makeStyles, Paper } from "@material-ui/core";
import MTable from "@material-ui/core/Table";
import MTableBody from "@material-ui/core/TableBody";
import MTableCell from "@material-ui/core/TableCell";
import MTableContainer from "@material-ui/core/TableContainer";
import MTableHead from "@material-ui/core/TableHead";
import MTableRow from "@material-ui/core/TableRow";
import { Pagination } from "@material-ui/lab";
import find from "lodash/find";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { PROMOTION_TYPES } from "../definition";
import { urlPromotion } from "app/Layouts/AuthenticatedLayout/Sidebar/url";

const STATUS = ["Đang diễn ra", "Đã kết thúc", "Sắp diễn ra"];
const STATUS_COLORS = ["#00B41D", "#E11B1B", "#FFC043"];
Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onSelect: PropTypes.object.isRequired
};

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: "#ffffff"
  },
  tableContainer: {
    paddingTop: "14px",
    borderColor: "red"
  },
  table: {
    tableLayout: "fixed",
    "& th": {
      color: "#99A6B7"
    }
  },
  row: {
    "& td": {
      padding: "12px 0",
      wordWrap: "break-word",
      borderColor: "#EBEFF2"
    },
    "&:last-child td": {
      border: "none"
    },
    "&:hover": {
      cursor: "pointer"
    }
  },
  name: {
    "&  > a": {
      color: "#067EFF",
      textDecoration: "none"
    }
  },
  thumbnail: {
    paddingRight: 30,
    maxWidth: "100%",
    objectFit: "contain",
    height: "64px"
  },
  pagination: {
    display: "flex",
    justifyContent: "flex-end",

    marginTop: "16px",
    marginRight: "12px",
    paddingBottom: "30px"
  },

  promotionStatus: {
    border: "1px solid #00B41D",
    color: "#00B41D",
    borderRadius: "14px",

    padding: "2px 14px"
  },

  text: {
    display: "flex",
    width: "90%"
  },

  emptyList: {
    padding: "0 12px"
  },
  rowDisabled: {
    "& *": {
      color: "rgba(0, 0, 0, 0.26)"
    }
  },

  disabled: {
    color: "rgba(0, 0, 0, 0.26) !important",
    borderColor: "rgba(0, 0, 0, 0.26) !important"
  },
  txtDescription: {
    "-webkit-line-clamp": 6,
    textOverflow: "ellipsis",
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-box-orient": "vertical",
    wordWrap: "break-word"
  }
}));

function Table({ data, columns, onSelect, onEdit, onClickItem, totalRecords }) {
  const classes = useStyles();
  const history = useHistory();
  const [selectedRows, setSelectedRows] = useState([]);
  const params = useParams();

  const handleSelectAllClick = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
      onSelect.setSelectedRows([]);
    } else {
      setSelectedRows(data);
      onSelect.setSelectedRows(data);
    }
  };

  const handleSelectRow = row => {
    if (isSelected(row)) {
      const newSelectedRows = selectedRows.filter(item => item.id !== row.id);
      setSelectedRows(newSelectedRows);
      onSelect.setSelectedRows(newSelectedRows);
    } else {
      const newSelectedRows = [...selectedRows, row];
      setSelectedRows(newSelectedRows);
      onSelect.setSelectedRows(newSelectedRows);
    }
  };

  const isSelected = row => {
    return find(selectedRows, { id: row.id }) !== undefined;
  };

  const handleChangePage = (event, page) => {
    history.push(`${urlPromotion}/page/${page}`);
  };

  const handleEditProduct = product => {
    console.log(product);
    onEdit && onEdit(product);
  };

  const handleClickItem = ({ id }) => {
    const url = `${urlPromotion}/${id}`;
    history.replace(url);
  };

  const convertStatusTimeToTag = (startDate, endDate) => {
    const current = new Date();
    const start = new Date(startDate),
      end = new Date(endDate);

    if (current < start && current < end) {
      return 2;
    }
    if (current > end) {
      return 1;
    }
    return 0;
  };

  return (
    <div>
      <Paper className={classes.container} elevation={0} variant="outlined">
        {data.length > 0
          ? <MTableContainer className={classes.tableContainer}>
              <MTable
                aria-label="simple table"
                padding="none"
                className={classes.table}
              >
                <MTableHead>
                  <MTableRow>
                    <MTableCell
                      align="center"
                      padding="checkbox"
                      style={{ width: "5%" }}
                    >
                      <Checkbox
                        indeterminate={
                          selectedRows.length > 0 &&
                          selectedRows.length < data.length
                        }
                        checked={
                          data.length > 0 && selectedRows.length === data.length
                        }
                        onChange={handleSelectAllClick}
                      />
                    </MTableCell>
                    {columns.map(item =>
                      <MTableCell key={item.id} style={{ width: item.width }}>
                        {item.text}
                      </MTableCell>
                    )}
                  </MTableRow>
                </MTableHead>

                <MTableBody>
                  {data.map(row =>
                    <MTableRow
                      key={row.id}
                      className={`${classes.row}`}
                      onDoubleClick={() => handleClickItem(row)}
                      hover
                    >
                      <MTableCell padding="checkbox" align="center">
                        <Checkbox
                          checked={isSelected(row)}
                          onChange={() => handleSelectRow(row)}
                        />
                      </MTableCell>
                      <MTableCell>
                        <img
                          src={row.promotion_thumbnail}
                          className={classes.thumbnail}
                        />
                      </MTableCell>
                      <MTableCell>
                        <span className={`${classes.text} ${classes.name}`}>
                          <a href={`${urlPromotion}/${row.id}`}>
                            {row.promotion_name}
                          </a>
                        </span>
                      </MTableCell>
                      <MTableCell>
                        <span
                          className={`${classes.text} ${!row.promotion_active &&
                            classes.disabled}`}
                        >
                          {PROMOTION_TYPES[row.promotion_type]}
                        </span>
                      </MTableCell>
                      <MTableCell>
                        <span
                          className={`${classes.text} ${classes.txtDescription} ${!row.promotion_active &&
                            classes.disabled}`}
                        >
                          {row.promotion_description}
                        </span>
                      </MTableCell>
                      <MTableCell>
                        <span
                          className={`${classes.text} ${!row.promotion_active &&
                            classes.disabled}`}
                        >
                          {row.promotion_fromDate + ""} - <br />{" "}
                          {row.promotion_toDate + ""}
                        </span>
                      </MTableCell>
                      <MTableCell>
                        <span
                          className={`${classes.text} ${!row.promotion_active &&
                            classes.disabled}`}
                        >
                          {row.promotion_createBy}
                        </span>
                      </MTableCell>
                      <MTableCell>
                        <span
                          className={`${classes.promotionStatus} ${!row.promotion_active &&
                            classes.disabled}`}
                          style={{
                            color:
                              STATUS_COLORS[
                                convertStatusTimeToTag(
                                  row.promotion_fromDate,
                                  row.promotion_toDate
                                )
                              ],
                            borderColor:
                              STATUS_COLORS[
                                convertStatusTimeToTag(
                                  row.promotion_fromDate,
                                  row.promotion_toDate
                                )
                              ],
                            display: "inline-block",
                            whiteSpace: "nowrap",
                            margin: "0 -7px"
                          }}
                        >
                          {
                            STATUS[
                              convertStatusTimeToTag(
                                row.promotion_fromDate,
                                row.promotion_toDate
                              )
                            ]
                          }
                        </span>
                      </MTableCell>
                    </MTableRow>
                  )}
                </MTableBody>
              </MTable>
            </MTableContainer>
          : <h5 className={classes.emptyList}>Không có dữ liệu</h5>}
        <div className={classes.pagination}>
          <Pagination
            count={Math.ceil(totalRecords / 5)}
            defaultPage={Number(params.page) || 1}
            variant="outlined"
            shape="rounded"
            onChange={handleChangePage}
          />
        </div>
      </Paper>
    </div>
  );
}

export default Table;
