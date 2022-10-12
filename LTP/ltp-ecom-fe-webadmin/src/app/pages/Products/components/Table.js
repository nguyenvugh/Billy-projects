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
import { Checkbox, Paper, Chip, Menu, MenuItem } from '@material-ui/core';
import Pagination from 'app/components/Pagination';
import * as Utils from 'app/utils';

const useStyles = makeStyles((theme) => ({
  pagination: {
    margin: '20px 0',
    float: 'right',
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
  textBlue: {
    color: '#007BFF !important',
    cursor: 'pointer'
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

export default function Table({ data, columns, onSelect, total, setCurrentPage, page, handleUpdateStatus, setCurrentRow }) {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleSelectAllClick = () => {
    if (onSelect.selectedRows.length === data.length) {
      onSelect.setSelectedRows([]);
    } else {
      onSelect.setSelectedRows(data);
    }
  }

  const handleSelectRow = (row) => {
    if (isSelected(row)) {
      const newSelectedRows = onSelect.selectedRows.filter(item => item.id !== row.id);
      onSelect.setSelectedRows(newSelectedRows);
    } else {
      const newSelectedRows = [...onSelect.selectedRows, row];
      onSelect.setSelectedRows(newSelectedRows);
    }
  }

  const handleDoubleClickRow = (row) => {
    history.push({
      pathname: `/products/${row.id}`,
      state: {total, page}
    });
  }

  const handleChangePage = (event, newPage) => {
    console.log("handleChangePage", newPage);
    setCurrentPage(newPage);
  }

  const isSelected = row => {
    return lodash.find(onSelect.selectedRows, { id: row.id }) !== undefined
  }

  const handleClickStatus = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseStatus = () => {
    setAnchorEl(null);
  }

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
                <MTableCell key={item.id}>{item.text}</MTableCell>
              ))}
            </MTableRow>
          </MTableHead>
          <MTableBody>
            {data.map((row) => {
              const translates = Utils.getSafeValue(row, "translates", []);
              const name = Utils.getObjByLanguage(translates, 'vi', 'name');
              const code = Utils.getSafeValue(row, "code", "");
              const category_obj = Utils.getSafeValue(row, "category_obj", {});
              const parentTranslate = Utils.getSafeValue(category_obj, "translates", []);
              const parentName = Utils.getField(parentTranslate, 'vi', 'name');
              let remaining_number = 0;
              if (Array.isArray(row?.product_inventory)) {
                remaining_number = row.product_inventory.reduce((value, item) => item?.remaining_number + value, 0)
              }
              const price = Utils.getSafeValue(row, "price", 0);
              const is_feature = Utils.getSafeValue(row, "is_feature", -1);
              const display_status = Utils.getSafeValue(row, "status_display", -1);
              return (
                <MTableRow key={code}>
                  <MTableCell
                    padding="checkbox"
                    onDoubleClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleSelectRow(row)}
                  >
                    <Checkbox
                      checked={isSelected(row)}
                    />
                  </MTableCell>
                  <MTableCell>{code}</MTableCell>
                  <MTableCell>
                    <span
                      className={classes.textBlue}
                      onClick={() => handleDoubleClickRow(row)}
                    >
                      {name}
                    </span>
                  </MTableCell>
                  <MTableCell>{parentName}</MTableCell>
                  <MTableCell>{remaining_number}</MTableCell>
                  <MTableCell>{new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(price)}</MTableCell>
                  <MTableCell>
                    <Checkbox defaultChecked={is_feature === 1 ? true : false} color="primary" disabled />
                  </MTableCell>
                  <MTableCell aria-controls="simple-menu" onClick={(e) => {
                    handleClickStatus(e);
                    setCurrentRow(row);
                  }}
                    onDoubleClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    {display_status === 1 ? <Chip label="Hiện" className={classes.statusDisplay} /> : <Chip label="Ẩn" className={classes.statusHide} />}
                  </MTableCell>
                  <StyledMenu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseStatus}
                  >
                    <MenuItem onClick={async (e) => {
                      handleClickStatus(e);
                      await handleUpdateStatus(row, 1);
                      handleCloseStatus();
                    }}>Hiện</MenuItem>
                    <MenuItem onClick={async (e) => {
                      handleClickStatus(e);
                      await handleUpdateStatus(row, -1);
                      handleCloseStatus();
                    }}>Ẩn</MenuItem>
                  </StyledMenu>
                </MTableRow>
              )
            })}
          </MTableBody>
        </MTable>
      </MTableContainer>
      {Math.ceil(total / 10) > 1 &&
        <Pagination
          count={Math.ceil(total / 10)}
          onChange={handleChangePage}
          page={page}
          hidden={Math.ceil(total / 10) === 1}
        />
      }
    </div>
  );
}

Table.defaultProps = {
  data: []
}