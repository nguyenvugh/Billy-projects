import { Link, useHistory } from "react-router-dom";
import lodash from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import MTable from "@material-ui/core/Table";
import MTableBody from "@material-ui/core/TableBody";
import MTableCell from "@material-ui/core/TableCell";
import MTableContainer from "@material-ui/core/TableContainer";
import MTableHead from "@material-ui/core/TableHead";
import MTableRow from "@material-ui/core/TableRow";
import {
  Paper,
  useTheme,
} from "@material-ui/core";
import Checkbox from "../../../components/Checkbox";
import Pagination from "@material-ui/lab/Pagination";
import * as Utils from "../../../utils";

const useStyles = makeStyles((theme) => ({
  pagination: {
    margin: "20px 0",
    float: "right",
  },
  textBlue: {
    color: "#007BFF !important",
    cursor: "pointer",
  },
  img: {
    height: "58px",
    width: "58px",
    borderRadius: "100px",
    marginTop: "3px",
  },
  statusLocked: {
    color: "#EA403F",
    border: "1px solid #EA403F",
    backgroundColor: "#ffffff",
    height: "24px",
    width: "135px",
    cursor: "pointer",
  },
  statusActivated: {
    color: "#00B41D",
    border: "1px solid #9EE2B8",
    backgroundColor: "#ffffff",
    height: "24px",
    width: "135px",
    cursor: "pointer",
  },
  menuFloat: {
    fontSize: "14px",
  },
  iconActivate: {
    height: "10px",
    width: "10px",
    color: "#00c537",
    marginRight: "10px",
  },
  iconLock: {
    height: "10px",
    width: "10px",
    color: "#ea403f",
    marginRight: "10px",
  },
}));

export default function Table({
  data,
  columns,
  onSelect,
  onEdit,
  total,
  setCurrentPage,
  setCurrentRow,
  handleAction,
}) {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();

  const paginationNum = Math.ceil(total / 10);

  const handleSelectAllClick = () => {
    if (onSelect.selectedRows.length === data.length) {
      onSelect.setSelectedRows([]);
    } else {
      onSelect.setSelectedRows(data);
    }
  };

  const handleSelectRow = (row) => {
    if (isSelected(row)) {
      const newSelectedRows = onSelect.selectedRows.filter(
        (item) => item.id !== row.id
      );
      onSelect.setSelectedRows(newSelectedRows);
    } else {
      const newSelectedRows = [...onSelect.selectedRows, row];
      onSelect.setSelectedRows(newSelectedRows);
    }
  };

  const handleDoubleClickRow = (row) => {
    history.push(`/${row.id}`);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const isSelected = (row) => {
    return lodash.find(onSelect.selectedRows, { id: row.id }) !== undefined;
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
              {columns.map((item) => (
                <MTableCell key={item.name}>
                  {item.text}
                </MTableCell>
              ))}
            </MTableRow>
          </MTableHead>
          <MTableBody>
            {data.map((row) => {
              const id = Utils.getSafeValue(row, "id", 0);
              const name = Utils.getSafeValue(row, "name", "");
              const quantity = Utils.getSafeValue(row, "count", 0);
              const description = Utils.getSafeValue(row, "description", "");
              const createdAt = Utils.getSafeValue(row, "created_at", "");
              const time = new Date(createdAt).toLocaleDateString("vi-VI");
              return (
                <MTableRow
                  key={id}
                  onDoubleClick={() => handleDoubleClickRow(row)}
                >
                  <MTableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected(row)}
                      onChange={() => handleSelectRow(row)}
                    />
                  </MTableCell>
                  <MTableCell>
                    <Link
                      className="listing-link"
                      style={{
                        textDecoration: "none",
                        textColor: theme.palette.blue.main,
                      }}
                      to={`/${id}`}
                    >
                      <span className={classes.textBlue}>{name}</span>
                    </Link>
                  </MTableCell>
                  <MTableCell>{quantity}</MTableCell>
                  <MTableCell>{description}</MTableCell>
                  <MTableCell>{time}</MTableCell>
                </MTableRow>
              );
            })}
          </MTableBody>
        </MTable>
      </MTableContainer>
      <div className={classes.pagination}>
        <Pagination
          count={paginationNum}
          onChange={handleChangePage}
          hidden={paginationNum === 1}
          showFirstButton={true}
          showLastButton={true}
        />
      </div>
    </div>
  );
}

Table.defaultProps = {
  data: [],
};
