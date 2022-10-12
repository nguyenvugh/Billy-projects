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
import { Checkbox, IconButton, Paper, Chip, Menu, MenuItem } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { urlAdmin } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import { Create as CreateIcon } from '@material-ui/icons';
import * as Utils from '../../../utils';

const useStyles = makeStyles((theme) => ({
  pagination: {
    margin: '20px 0',
    float: 'right',
  },
  textBlue: {
    color: '#007BFF !important',
    cursor: 'pointer'
  },
  img: {
    height: '58px',
    width: '58px',
    borderRadius: '100px',
    marginTop: '3px'
  },
  statusLocked: {
    color: '#EA403F',
    border: '1px solid #EA403F',
    backgroundColor: '#ffffff',
    height: '24px',
    width: '135px',
    cursor: 'pointer'
  },
  statusActivated: {
    color: '#00B41D',
    border: '1px solid #9EE2B8',
    backgroundColor: '#ffffff',
    height: '24px',
    width: '135px',
    cursor: 'pointer'
  },
  menuFloat: {
    fontSize: "14px",
  },
  iconActivate: {
    height: "10px",
    width: "10px",
    color: '#00c537',
    marginRight: "10px",
  },
  iconLock: {
    height: "10px",
    width: "10px",
    color: '#ea403f',
    marginRight: "10px",
  },
  cell: {
    width: "30%"
  }
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

export default function Table({ data, columns, onSelect, groups, total, setCurrentPage, setCurrentRow, handleAction }) {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  const paginationNum = Math.ceil(total / 10);

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
    console.log("handleDoubleClickRow", row);
    history.push(`${urlAdmin}/${row.id}`);
  }

  const handleChangePage = (event, newPage) => {
    console.log("handleChangePage", newPage);
    setCurrentPage(newPage);
  }

  const isSelected = row => {
    return lodash.find(onSelect.selectedRows, { id: row.id }) !== undefined
  }

  const renderStatus = (id) => {
    let name = '';
    let text = '';
    if (id === 1) {
      name = 'Activated';
      text = 'Kích hoạt';
    } else if (id === 2) {
      name = 'Locked';
      text = 'Khoá';
    }
    return <Chip label={text} className={classes[`status${name}`]} />
  }

  const handleClickAction = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAction = () => {
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
                <MTableCell key={item.name}>{item.text}</MTableCell>
              ))}
            </MTableRow>
          </MTableHead>
          <MTableBody>
            {data.map((row) => {
              const id = Utils.getSafeValue(row, "id", 0);
              const username = Utils.getSafeValue(row, "username", '');
              const group = Utils.getSafeValue(row, "group", 0);
              const groupObj = lodash.find(groups, { id: group });
              const groupName = Utils.getSafeValue(groupObj, "name", '');
              const status = Utils.getSafeValue(row, "status", 0);
              const created_at = Utils.getSafeValue(row, "created_at", '');
              const time = new Date(created_at).toLocaleDateString('vi-VI');
              return (<MTableRow key={id}>
                <MTableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected(row)}
                    onChange={() => handleSelectRow(row)}
                  />
                </MTableCell>
                <MTableCell className={classes.cell}>
                  <span className={classes.textBlue} onClick={() => handleDoubleClickRow(row)}>
                    {username}
                  </span>
                </MTableCell>
                <MTableCell className={classes.cell}>{groupName}</MTableCell>
                <MTableCell className={classes.cell}>
                  <span
                    aria-controls="simple-menu"
                    onClick={(e) => {
                      handleClickAction(e);
                      setCurrentRow(row);
                    }}
                  >
                    {renderStatus(status)}
                  </span>
                  <StyledMenu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseAction}
                  >
                    <MenuItem onClick={async (e) => {
                      handleClickAction(e);
                      await handleAction('activate');
                      handleCloseAction();
                    }} className={classes.menuFloat}>
                      <FiberManualRecordIcon className={classes.iconActivate} />
                      Kích hoạt
                    </MenuItem>
                    <MenuItem onClick={async (e) => {
                      handleClickAction(e);
                      await handleAction('lock');
                      handleCloseAction();
                    }} className={classes.menuFloat}>
                      <FiberManualRecordIcon className={classes.iconLock} />
                      Khoá
                    </MenuItem>
                  </StyledMenu>
                </MTableCell>
                <MTableCell className={classes.cell} styles={{ width: '30%' }}>{time}</MTableCell>
              </MTableRow>
              )
            })}
          </MTableBody>
        </MTable>
      </MTableContainer>
      <div className={classes.pagination}>
        <Pagination
          count={paginationNum}
          onChange={handleChangePage}
          hidden={paginationNum === 1}
        // showFirstButton
        // showLastButton 
        />
      </div>
    </div>
  );
}

Table.defaultProps = {
  data: []
}