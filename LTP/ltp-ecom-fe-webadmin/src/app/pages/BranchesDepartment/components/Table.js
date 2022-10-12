import { Checkbox, makeStyles, Paper } from '@material-ui/core';
import MTable from '@material-ui/core/Table';
import MTableBody from '@material-ui/core/TableBody';
import MTableCell from '@material-ui/core/TableCell';
import MTableContainer from '@material-ui/core/TableContainer';
import MTableHead from '@material-ui/core/TableHead';
import MTableRow from '@material-ui/core/TableRow';
import { ACTION_TYPE } from 'app/reducers/branch';
import find from 'lodash/find';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onSelect: PropTypes.object.isRequired
};

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: '#ffffff',

  },
  table: {
    tableLayout: 'fixed',
    '& th': {
      color: '#99A6B7',
    },
  },
  row: {
    '& td': {
      padding: '6px 0',
      wordWrap: 'break-word',
      borderColor: '#EBEFF2'
    },
    '&:last-child td': {
      border: 'none'
    },
    '&:hover': {
      cursor: 'pointer'
    }
  },
  thumbnail: {
    height: '64px'
  },
  pagination: {

    display: 'flex',
    justifyContent: 'flex-end',

    marginTop: '16px',
    marginRight: '12px',
    paddingBottom: '30px'
  },

  storeName: {
    color: '#067EFF',
    '&:hover': {
      textDecoration: 'underline'
    }
  },

  text: {
    display: 'flex',
    width: '90%'
  }
}));
function Table({ data, columns, onSelect, onEdit, onClickItem, totalRecords }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [selectedRows, setSelectedRows] = useState([]);

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

  const handleEditProduct = (product) => {
    console.log(product);
    onEdit && onEdit(product);
  };

  const handleClickItem = (branch) => {
    dispatch({
      type: ACTION_TYPE.GET_BRANCH_SUCCESS,
      payload: branch,
    })
    history.push(`branches-department/${branch?.id}`);
  };

  return (
    <Paper className={classes.container} elevation={0} variant='outlined'>
      <MTableContainer>
        <MTable padding='none' className={classes.table}>
          <MTableHead>
            <MTableRow>
              <MTableCell style={{ width: '8%' }} align='center'>
                <Checkbox
                  indeterminate={selectedRows?.length > 0 && selectedRows?.length < data?.length}
                  checked={data?.length > 0 && selectedRows?.length === data?.length}
                  onChange={handleSelectAllClick}
                />
              </MTableCell>
              {columns.map(item => (
                <MTableCell key={item.id} style={{ width: item.width }}>{item.text}</MTableCell>
              ))}
            </MTableRow>
          </MTableHead>

          <MTableBody>
            {Array.isArray(data) && data.map((row) => (
              <MTableRow key={row?.id} className={classes.row} onDoubleClick={() => handleClickItem(row)} hover >
                <MTableCell align='center' >
                  <Checkbox
                    checked={isSelected(row)}
                    onChange={() => handleSelectRow(row)}
                  />
                </MTableCell>
                <MTableCell><span onClick={() => handleClickItem(row)} className={classes.storeName}>{row.name}</span></MTableCell>
                <MTableCell>
                  <span className={classes.text}>
                    {row?.address}{", "}
                    {row?.ward?.name}{", "}
                    {row?.district?.name}{", "}
                    {row?.city?.name}
                  </span>
                </MTableCell>
                <MTableCell><span className={classes.text}>{row?.phone_number}</span></MTableCell>
                <MTableCell><span className={classes.text}>{row?.fax}</span></MTableCell>
              </MTableRow>
            ))}
          </MTableBody>
        </MTable>
      </MTableContainer>
    </Paper>
  );
}

export default Table;