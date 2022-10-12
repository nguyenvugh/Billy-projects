import React, { useState, useEffect } from "react";
import find from "lodash/find";
import PropTypes from "prop-types";
import { Checkbox, IconButton, makeStyles, Paper } from "@material-ui/core";
import { Edit as EditIcon } from "@material-ui/icons";
import MTable from "@material-ui/core/Table";
import MTableBody from "@material-ui/core/TableBody";
import MTableCell from "@material-ui/core/TableCell";
import MTableContainer from "@material-ui/core/TableContainer";
import MTableHead from "@material-ui/core/TableHead";
import MTableRow from "@material-ui/core/TableRow";
import { formatVND } from "app/utils/common";
import Pagination from "app/components/Pagination";
import { useHistory, useParams } from "react-router-dom";
import SwitchUI from "app/components/Switch";
import { formatDateTime } from "app/utils/validate";
import { urlFlashSale } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import { PAGE_SIZE } from "app/utils/constant";

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onSelect: PropTypes.object.isRequired
};

const STATUS = ["Đang diễn ra", "Đã kết thúc", "Sắp diễn ra"];
const STATUS_COLORS = ["#00B41D", "#9A9A9A", "#FFC043"];
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
      borderColor: "#EBEFF2",
      "& > a": {
        color: "#067EFF",
        textDecoration: "none"
      }
    },
    "&:last-child td": {
      border: "none"
    },
    "& td:nth-child(2) ": {
      padding: "12px",
      "& > div": {
        border: ".5px solid #A0AEC0",
        borderRadius: 5,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        position: "relative",
        paddingBottom: "74px"
      }
    }
  },
  thumbnail: {
    width: "auto",
    height: "90%",
    position: "absolute",
    top: 3.5
  },
  pagination: {
    display: "flex",
    justifyContent: "flex-end",

    marginTop: "16px",
    marginRight: "12px",
    paddingBottom: "30px"
  },
  emptyList: {
    padding: "0 12px"
  }
}));
function Table({
  data,
  columns,
  onSelect,
  onEdit,
  disable,
  totalRecords,
  onChangeSwitch,
  unchecked
}) {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const [selectedRows, setSelectedRows] = useState([]);
  useEffect(
    () => {
      if (disable) setSelectedRows([]);
    },
    [disable]
  );

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
      console.log(row);
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

  const handleChangePage = (page) => {
    history.push(`${urlFlashSale}/page/${page}`);
  };

  const handleEditProduct = product => {
    onEdit && onEdit(product);
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

  const handleStatusCanChange = (startDate, endDate) => {
    const current = new Date();
    const start = new Date(startDate),
      end = new Date(endDate);
    let isChange = true;

    if (current >= start && current <= end) {
      isChange = false;
    }

    return isChange;
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
                    <MTableCell padding="checkbox">
                      <Checkbox
                        disabled={disable}
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
                      <MTableCell align={item.align || "left"} key={item.id} padding={`0 0 0 ${item.paddingLeft || 0}`}>
                        {item.text}
                      </MTableCell>
                    )}
                  </MTableRow>
                </MTableHead>

                <MTableBody>
                  {data.map(row =>
                    <MTableRow key={row.id} className={classes.row}>
                      <MTableCell padding="checkbox" align="center">
                        <Checkbox
                          disabled={disable}
                          checked={isSelected(row)}
                          onChange={() => handleSelectRow(row)}
                        />
                      </MTableCell>
                      <MTableCell>
                        <a href={`${urlFlashSale}/${row.id}`}>
                          {row.name}
                        </a>
                      </MTableCell>
                      <MTableCell>
                        {row.createBy}
                      </MTableCell>
                      <MTableCell>
                        <span
                          className={`${classes.promotionStatus} ${!row.promotion_active &&
                            classes.disabled}`}
                          style={{
                            color:
                              STATUS_COLORS[
                                convertStatusTimeToTag(
                                  row.startDate,
                                  row.endDate
                                )
                              ]
                          }}
                        >
                          {formatDateTime(row.startDate)} -{" "}
                          {formatDateTime(row.endDate)}
                        </span>
                      </MTableCell>
                      <MTableCell align="center">
                        <SwitchUI
                          id={row.id}
                          unchecked={unchecked}
                          readOnly={handleStatusCanChange(
                            row.startDate,
                            row.endDate
                          )}
                          checked={row.status}
                          onChange={checked => onChangeSwitch(row, checked)}
                        />
                      </MTableCell>
                    </MTableRow>
                  )}
                </MTableBody>
              </MTable>
            </MTableContainer>
          : <h5 className={classes.emptyList}>Không có dữ liệu</h5>}
      </Paper>
      <Pagination
          count={Math.ceil(totalRecords / PAGE_SIZE)}
          page={Number(params.page) || 1}
          handleChangePage={handleChangePage}
        />
    </div>
  );
}

export default Table;
