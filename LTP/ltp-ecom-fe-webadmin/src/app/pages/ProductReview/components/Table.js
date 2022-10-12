import { useState } from 'react';
import { useHistory } from "react-router-dom";
import lodash from 'lodash';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MTable from '@material-ui/core/Table';
import MTableBody from '@material-ui/core/TableBody';
import MTableCell from '@material-ui/core/TableCell';
import MTableContainer from '@material-ui/core/TableContainer';
import MTableHead from '@material-ui/core/TableHead';
import MTableRow from '@material-ui/core/TableRow';
import { Checkbox, Paper, Menu, MenuItem } from '@material-ui/core';
import Pagination from "app/components/Pagination";
import MoreVertIcon from '@material-ui/icons/MoreVert';

import * as Utils from 'app/utils';
import { formatDateTime } from 'app/utils/validate';

const useStyles = makeStyles((theme) => ({
  pagination: {
    margin: '20px 0',
    float: 'right',
  },
  ul: {
    "& .MuiPaginationItem-root": {
      color: "black"
    }
  },
  statusDisplay: {
    color: '#00B41D',
    border: '1px solid #9EE2B8',
    backgroundColor: '#ffffff',
    height: '24px',
  },
  statusHide: {
    color: '#A0AEC0',
    border: '1px solid #A0AEC0',
    backgroundColor: '#ffffff',
    height: '24px'
  },
  thumbnail: {
    width: '78px',
    height: '37px',
    marginTop: '7.5px',
    marginBottom: '7.5px'
  },
  tableRow: {
    hover: {
      "&$hover:hover": {
        backgroundColor: '#49bb7b',
      },
    },
  },
  textBlue: {
    color: '#007BFF !important',
    cursor: 'pointer'
  },
  txtContent: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'inline-block',
    width: '12vw'
  },
}));

const StyledTableRow = withStyles({
  root: {
    "&:hover": {
      cursor: 'pointer'
    }
  }
})(MTableRow);

export default function Table({ data, columns, onSelect, total, listCate, handleAction, setCurrentRow }) {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleSelectAllClick = () => {
    if (onSelect.selectedRows.length === data.length) {
      onSelect.setSelectedRows([]);
    } else {
      onSelect.setSelectedRows(data);
    }
  };

  const handleSelectRow = (row) => {
    if (isSelected(row)) {
      const newSelectedRows = onSelect.selectedRows.filter(item => item.id !== row.id);
      onSelect.setSelectedRows(newSelectedRows);
    } else {
      const newSelectedRows = [...onSelect.selectedRows, row];
      onSelect.setSelectedRows(newSelectedRows);
    }
  };

  const handleDoubleClickRow = (row) => {
    history.push({
      pathname: `/product-reviews/${row.id}`,
      state: {
        row,
        listCate
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    console.log("handleChangePage", newPage);
  };

  const isSelected = row => {
    return lodash.find(onSelect.selectedRows, { id: row.id }) !== undefined;
  };

  const handleClickAction = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAction = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <MTableContainer component={Paper}>
        <MTable aria-label="simple table" padding="none">
          <MTableHead>
            <MTableRow>
              <MTableCell padding="checkbox">
                <Checkbox
                  indeterminate={onSelect.selectedRows.length > 0 && onSelect.selectedRows.length < data.length}
                  checked={data.length > 0 && onSelect.selectedRows.length === data.length}
                  onChange={handleSelectAllClick}
                />
              </MTableCell>
              {columns.map(item => (
                <MTableCell key={item.id} align='center'>{item.text}</MTableCell>
              ))}
            </MTableRow>
          </MTableHead>
          <MTableBody>
            {data.map((row) => {
              return (
                <MTableRow key={row.id} hover={true}>
                  <MTableCell padding="checkbox" align="center">
                    <Checkbox
                      checked={isSelected(row)}
                      onChange={() => handleSelectRow(row)}
                    />
                  </MTableCell>
                  <MTableCell align='center'>
                    <span className={classes.textBlue} onClick={() => handleDoubleClickRow(row)}>
                      {row?.customer?.email}
                    </span>
                  </MTableCell>
                  <MTableCell align='center'>
                    <span className={classes.txtContent}>
                      {row?.product?.translates[0].name}
                    </span>
                  </MTableCell>
                  <MTableCell align='center'>
                    {row?.rating}
                  </MTableCell>
                  <MTableCell align='center'>
                    <span className={classes.txtContent}>
                      {row?.content}
                    </span>
                  </MTableCell>
                  <MTableCell align='center'>{formatDateTime(row?.created_at)}</MTableCell>
                  {row?.status === 1 && <MTableCell style={{ color: '#FEBD17' }} align='center'>Chờ duyệt</MTableCell>}
                  {row?.status === 2 && <MTableCell style={{ color: '#00B41D' }} align='center'>Đã duyệt</MTableCell>}
                  {row?.status === 3 && <MTableCell style={{ color: '#E11B1B' }} align='center'>Đã từ chối</MTableCell>}
                </MTableRow>
              );
            })}
          </MTableBody>
        </MTable>
      </MTableContainer>
      <Pagination
        count={Math.ceil(total / 10)}
        onChange={handleChangePage} />
      {/* <div className={classes.pagination}>
        <Pagination
          // classes={{ul: classes.ul, li: classes.li}}
          count={Math.ceil(total / 10)}
          hidden={Math.ceil(total / 10) === 1}
          shape='rounded'
          onChange={handleChangePage}
          hideNextButton
          hidePrevButton
        />
      </div> */}
    </div>
  );
}

Table.defaultProps = {
  data: []
};