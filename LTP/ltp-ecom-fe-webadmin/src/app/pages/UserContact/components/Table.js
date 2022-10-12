import { useState } from "react";
import { useHistory } from "react-router-dom";
import lodash from "lodash";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MTable from "@material-ui/core/Table";
import MTableBody from "@material-ui/core/TableBody";
import MTableCell from "@material-ui/core/TableCell";
import MTableContainer from "@material-ui/core/TableContainer";
import MTableHead from "@material-ui/core/TableHead";
import MTableRow from "@material-ui/core/TableRow";
import { Checkbox, Paper, Menu, MenuItem } from "@material-ui/core";
import Pagination from "app/components/Pagination";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import * as Utils from "app/utils";
import { formatDateTime } from "app/utils/validate";
import { PAGE_SIZE } from "app/utils/constant";

const useStyles = makeStyles(theme => ({
  pagination: {
    margin: "20px 0",
    float: "right"
  },
  ul: {
    "& .MuiPaginationItem-root": {
      color: "black"
    }
  },
  statusDisplay: {
    color: "#00B41D",
    border: "1px solid #9EE2B8",
    backgroundColor: "#ffffff",
    height: "24px"
  },
  statusHide: {
    color: "#A0AEC0",
    border: "1px solid #A0AEC0",
    backgroundColor: "#ffffff",
    height: "24px"
  },
  thumbnail: {
    width: "78px",
    height: "37px",
    marginTop: "7.5px",
    marginBottom: "7.5px"
  },
  tableRow: {
    hover: {
      "&$hover:hover": {
        backgroundColor: "#49bb7b"
      }
    }
  },
  textBlue: {
    color: "#007BFF !important",
    cursor: "pointer"
  },
  txtTitle: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "inline-block",
    width: "10vw"
  },
  txtContent: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "inline-block",
    maxWidth: "22vw"
  }
}));

const StyledTableRow = withStyles({
  root: {
    "&:hover": {
      cursor: "pointer"
    }
  }
})(MTableRow);

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props =>
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
);

export default function Table({
  data,
  columns,
  onSelect,
  total,
  page,
  setPage,
  listCate,
  handleAction,
  setCurrentRow
}) {
  const classes = useStyles();
  const history = useHistory();

  const handleSelectAllClick = () => {
    if (onSelect.selectedRows.length === data.length) {
      onSelect.setSelectedRows([]);
    } else {
      onSelect.setSelectedRows(data);
    }
  };

  const handleSelectRow = row => {
    if (isSelected(row)) {
      const newSelectedRows = onSelect.selectedRows.filter(
        item => item.id !== row.id
      );
      onSelect.setSelectedRows(newSelectedRows);
    } else {
      const newSelectedRows = [...onSelect.selectedRows, row];
      onSelect.setSelectedRows(newSelectedRows);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const isSelected = row => {
    return lodash.find(onSelect.selectedRows, { id: row.id }) !== undefined;
  };

  const handleDoubleClickRow = row => {
    history.push({
      pathname: `/contact/${row.id}`,
      state: row
    });
  };

  return (
    <div>
      <MTableContainer component={Paper}>
        <MTable aria-label="simple table" padding="none">
          <MTableHead>
            <MTableRow>
              <MTableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    onSelect.selectedRows.length > 0 &&
                    onSelect.selectedRows.length < data.length
                  }
                  checked={
                    data.length > 0 &&
                    onSelect.selectedRows.length === data.length
                  }
                  onChange={handleSelectAllClick}
                />
              </MTableCell>
              {columns.map(item =>
                <MTableCell key={item.id} align="center">
                  {item.text}
                </MTableCell>
              )}
            </MTableRow>
          </MTableHead>
          <MTableBody>
            {data.map(row => {
              return (
                <StyledTableRow key={row.id} hover={true}>
                  <MTableCell padding="checkbox" align="center">
                    <Checkbox
                      checked={isSelected(row)}
                      onChange={() => handleSelectRow(row)}
                    />
                  </MTableCell>
                  <MTableCell>
                    <span className={classes.txtTitle}>
                      <span
                        className={classes.textBlue}
                        onClick={() => handleDoubleClickRow(row)}
                      >
                        {row.name}
                      </span>
                    </span>
                  </MTableCell>
                  <MTableCell align="center">
                    {row.phone_number}
                  </MTableCell>
                  <MTableCell align="center">
                    {row.email}
                  </MTableCell>
                  <MTableCell>
                    <span className={classes.txtContent}>
                      {row.content}
                    </span>
                  </MTableCell>
                  <MTableCell align="center">
                    {formatDateTime(row.created_at)}
                  </MTableCell>
                </StyledTableRow>
              );
            })}
          </MTableBody>
        </MTable>
      </MTableContainer>
      <Pagination
        count={Math.ceil(total / PAGE_SIZE)}
        page={page}
        onChange={handleChangePage}
      />
    </div>
  );
}

Table.defaultProps = {
  data: []
};
