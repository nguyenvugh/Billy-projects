import { Menu, MenuItem, Paper } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MTable from '@material-ui/core/Table';
import MTableBody from '@material-ui/core/TableBody';
import MTableCell from '@material-ui/core/TableCell';
import MTableContainer from '@material-ui/core/TableContainer';
import MTableHead from '@material-ui/core/TableHead';
import MTableRow from '@material-ui/core/TableRow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Pagination from 'app/components/Pagination';
import { urlUserProfile } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import * as Utils from 'app/utils';
import { useState } from 'react';
import { useHistory } from "react-router-dom";

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
}));

const StyledTableRow = withStyles({
  root: {
    "&:hover": {
      cursor: 'pointer'
    }
  }
})(MTableRow);

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

export default function Table({
  data,
  columns,
  onSelect,
  total,
  handleAction,
  setCurrentRow,
  currentRow,
  setCurrentPage,
  currentPage
}) {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleDoubleClickRow = (row) => {
    history.push(`${urlUserProfile}/${row.id}`);
  }

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
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
        <MTable padding="normal">
          <MTableHead>
            <MTableRow>
              {columns.map(item => (
                <MTableCell key={item.id} align={item?.align}>{item.text}</MTableCell>
              ))}
            </MTableRow>
          </MTableHead>
          <MTableBody>
            {data.map((row) => {
              const id = Utils.getSafeValue(row, 'id', 0);
              const username = Utils.getSafeValue(row, 'name', '');
              const email = Utils.getSafeValue(row, 'email', '');
              const phone_number = Utils.getSafeValue(row, 'phone_number', '');
              const status = Utils.getSafeValue(row, 'status', 0);
              const updated_at = Utils.getSafeValue(row, 'updated_at', '');
              const last_loggedin = new Date(updated_at).toLocaleDateString('vi-VI');
              return (
                <MTableRow key={id} hover={true}>
                  <MTableCell>
                    {username}
                  </MTableCell>
                  <MTableCell>
                    <span className={classes.textBlue} onClick={() => handleDoubleClickRow(row)}>
                      {email}
                    </span>
                  </MTableCell>
                  <MTableCell>
                    {phone_number}
                  </MTableCell>
                  <MTableCell>{last_loggedin}</MTableCell>
                  {status === -1 && <MTableCell style={{ color: '#E11B1B' }} align='center' >Khoá</MTableCell>}
                  {status === 1 && <MTableCell style={{ color: '#00B41D' }} align='center'>Mở</MTableCell>}
                  <MTableCell align='center' aria-controls="simple-menu" onClick={(e) => {
                    handleClickAction(e);
                    setCurrentRow(row);
                  }}>
                    <MoreVertIcon />
                  </MTableCell>
                  <StyledMenu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseAction}
                  >
                    <MenuItem disabled={currentRow && currentRow.status === -1} onClick={async (e) => {
                      handleClickAction(e);
                      await handleAction('lock');
                      handleCloseAction();
                    }}>Khoá tài khoản</MenuItem>
                    <MenuItem disabled={currentRow && currentRow.status === 1} onClick={async (e) => {
                      handleClickAction(e);
                      handleAction('open');
                      handleCloseAction();
                    }}>Mở tài khoản</MenuItem>
                    <MenuItem onClick={async (e) => {
                      handleClickAction(e);
                      handleAction('delete');
                      handleCloseAction();
                    }}>Xoá tài khoản</MenuItem>
                  </StyledMenu>
                </MTableRow>
              )
            })}
          </MTableBody>
        </MTable>
      </MTableContainer>
      <Pagination
        // classes={{ul: classes.ul, li: classes.li}}
        count={Math.ceil(total / 10)}
        // hidden={Math.ceil(total / 10) === 1}
        // shape='rounded'
        onChange={handleChangePage}
        page={currentPage}
      // hideNextButton
      // hidePrevButton
      />
    </div>
  );
}

Table.defaultProps = {
  data: []
}