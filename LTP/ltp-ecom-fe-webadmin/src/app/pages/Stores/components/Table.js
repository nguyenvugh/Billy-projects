import { Checkbox, makeStyles, Paper } from '@material-ui/core';
import MTable from '@material-ui/core/Table';
import MTableBody from '@material-ui/core/TableBody';
import MTableCell from '@material-ui/core/TableCell';
import MTableContainer from '@material-ui/core/TableContainer';
import MTableHead from '@material-ui/core/TableHead';
import MTableRow from '@material-ui/core/TableRow';
import { ACTION_TYPE } from 'app/reducers/shop';
import find from 'lodash/find';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
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
  thumbnail: {
    height: '64px'
  },
  storeName: {
    color: '#067EFF',
    cursor: "pointer",
    '&:hover': {
      textDecoration: 'underline'
    }
  },

  text: {
    display: 'flex',
    width: '90%'
  },

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

  const handleClickItem = (shop) => {
    dispatch({
      type: ACTION_TYPE.GET_SHOP_SUCCESS,
      payload: shop,
    })
    history.push(`stores/${shop?.id}`);
  };

  return (
    <Fragment>
      <Paper className={classes.container} elevation={0} variant='outlined'>
        <MTableContainer>
          <MTable>
            <MTableHead>
              <MTableRow>
                <MTableCell style={{ width: '8%' }} align='center'>
                  <Checkbox
                    indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                    checked={data.length > 0 && selectedRows.length === data.length}
                    onChange={handleSelectAllClick}
                  />
                </MTableCell>
                {columns.map(item => (
                  <MTableCell key={item.id} style={{ width: item.width }}>{item.text}</MTableCell>
                ))}
              </MTableRow>
            </MTableHead>

            <MTableBody>
              {data.map((row) => (
                <MTableRow key={row.id}>
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
                  <MTableCell><span className={classes.text}>{row.phone_number}</span></MTableCell>
                  <MTableCell><span className={classes.text}>{row.fax}</span></MTableCell>
                  <MTableCell className="ellipsis"><span>{row.email}</span></MTableCell>
                  <MTableCell><span className={classes.text}>{row.start_working_time} - {row.end_working_time}</span></MTableCell>
                </MTableRow>
              ))}
            </MTableBody>
          </MTable>
        </MTableContainer>
      </Paper>
    </Fragment>
  );
}

export default Table;