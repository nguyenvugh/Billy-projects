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
import { formatVND, numberWithCommas } from "app/utils/common";
import { Pagination } from "@material-ui/lab";
import { useHistory, useParams } from "react-router-dom";
import { urlFlashSale } from "app/Layouts/AuthenticatedLayout/Sidebar/url";

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onSelect: PropTypes.object.isRequired,
};

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#ffffff",
  },
  tableContainer: {
    paddingTop: "14px",
    borderColor: "red",
  },
  table: {
    tableLayout: "fixed",
    "& th": {
      color: "#99A6B7",
    },
  },
  row: {
    "& td": {
      padding: "12px 0",
      wordWrap: "break-word",
      borderColor: "#EBEFF2",
    },
    "&:last-child td": {
      border: "none",
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
        paddingBottom: "74px",
      },
    },
  },
  thumbnail: {
    width: "auto",
    height: "90%",
    position: "absolute",
    top: 3.5,
  },
  pagination: {
    display: "flex",
    justifyContent: "flex-end",

    marginTop: "16px",
    marginRight: "12px",
    paddingBottom: "30px",
  },
  emptyList: {
    padding: "0 12px",
  },
}));
function Table({ data, columns, onSelect, onEdit, disable, totalRecords }) {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();

  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    if (disable) setSelectedRows([]);
  }, [disable]);

  const handleSelectAllClick = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
      onSelect.setSelectedRows([]);
    } else {
      setSelectedRows(data);
      onSelect.setSelectedRows(data);
    }
  };

  const handleSelectRow = (row) => {
    if (isSelected(row)) {
      console.log(row);
      const newSelectedRows = selectedRows.filter((item) => item.id !== row.id);
      setSelectedRows(newSelectedRows);
      onSelect.setSelectedRows(newSelectedRows);
    } else {
      const newSelectedRows = [...selectedRows, row];
      setSelectedRows(newSelectedRows);
      onSelect.setSelectedRows(newSelectedRows);
    }
  };

  const isSelected = (row) => {
    return find(selectedRows, { id: row.id }) !== undefined;
  };

  const handleChangePage = (event, page) => {
    history.push(`${urlFlashSale}/${params.id}/page/${page}`);
  };

  const handleEditProduct = (product) => {
    onEdit && onEdit(product);
  };

  return (
    <div>
      <Paper className={classes.container} elevation={0} variant="outlined">
        {data.length > 0 ? (
          <MTableContainer className={classes.tableContainer}>
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
                  {columns.map((item) => (
                    <MTableCell align="center" key={item.id}>
                      {item.text}
                    </MTableCell>
                  ))}
                </MTableRow>
              </MTableHead>

              <MTableBody>
                {data.map((row) => (
                  <MTableRow key={row.id} className={classes.row}>
                    <MTableCell padding="checkbox" align="center">
                      <Checkbox
                        disabled={disable}
                        checked={isSelected(row)}
                        onChange={() => handleSelectRow(row)}
                      />
                    </MTableCell>
                    <MTableCell align="center">
                      <div>
                        <img
                          src={row.product_thumbnail}
                          className={classes.thumbnail}
                        />
                      </div>
                    </MTableCell>
                    <MTableCell align="center">{row.product_name}</MTableCell>
                    <MTableCell align="center">
                      {row.product_quantity}
                    </MTableCell>
                    <MTableCell align="center">
                      {numberWithCommas(+row.product_price.toFixed()) + " VNĐ"}
                    </MTableCell>
                    <MTableCell align="center">
                      {row.product_discount}%
                    </MTableCell>
                    <MTableCell aria-disabled={disable} align="center">
                      {numberWithCommas(
                        (
                          row.product_price -
                          row.product_price * (row.product_discount / 100)
                        ).toFixed()
                      ) + " VNĐ"}
                    </MTableCell>
                    <MTableCell align="center">{row.product_status}</MTableCell>
                    <MTableCell align="center">
                      <IconButton
                        disabled={disable}
                        aria-label="edit"
                        onClick={() => handleEditProduct(row)}
                      >
                        <EditIcon />
                      </IconButton>
                    </MTableCell>
                  </MTableRow>
                ))}
              </MTableBody>
            </MTable>
          </MTableContainer>
        ) : (
          <h5 className={classes.emptyList}>Không có dữ liệu</h5>
        )}
      </Paper>
      <div className={classes.pagination}>
        <Pagination
          count={Math.ceil(totalRecords / 4)}
          defaultPage={Number(params.page) || 1}
          variant="outlined"
          shape="rounded"
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}

export default Table;
