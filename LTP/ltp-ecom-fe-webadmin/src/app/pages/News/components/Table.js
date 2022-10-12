import { Checkbox, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MTable from '@material-ui/core/Table';
import MTableBody from '@material-ui/core/TableBody';
import MTableCell from '@material-ui/core/TableCell';
import MTableContainer from '@material-ui/core/TableContainer';
import MTableHead from '@material-ui/core/TableHead';
import MTableRow from '@material-ui/core/TableRow';
import Pagination from "app/components/Pagination";
import { urlNews } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import * as Utils from 'app/utils';
import parse from 'html-react-parser';
import lodash from 'lodash';
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
  ellipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'inline-block',
    width: '20vw',
    whiteSpace: 'nowrap',
  },
  textBlue: {
    color: '#007BFF !important',
    cursor: 'pointer',
  },
  txtTitle: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'inline-block',
    width: '12vw'
  },
  txtCate: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'inline-block',
    width: '8vw'
  }
}));

export default function Table({ data, columns, onSelect, total, listCate, setCurrentPage }) {
  const classes = useStyles();
  const history = useHistory();


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
      pathname: `${urlNews}/${row.id}`,
      state: {
        row,
        listCate
      }
    });
  }

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  }

  const isSelected = row => {
    return lodash.find(onSelect.selectedRows, { id: row.id }) !== undefined
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
              {columns.map(item => {
                if (item.id === 5)
                  return (
                    <MTableCell key={item.id} align='center' >{item.text}</MTableCell>
                  )
                return (
                  <MTableCell key={item.id} align='center'>{item.text}</MTableCell>
                )
              })}
            </MTableRow>
          </MTableHead>
          <MTableBody>
            {data.map((row) => {
              const id = Utils.getSafeValue(row, 'id', 0);
              const thumbnailObj = Utils.getSafeValue(row, 'thumbnail_obj', {});
              const url = Utils.getSafeValue(thumbnailObj, 'url', '');
              const categoryObj = Utils.getSafeValue(row, 'category_obj', {});
              const translatesCate = Utils.getSafeValue(categoryObj, 'translates', []);
              const category = Utils.getField(translatesCate, 'vi', 'name');
              const translates = Utils.getSafeValue(row, 'translates', []);
              const name = Utils.getField(translates, 'vi', 'name');
              const content = Utils.getField(translates, 'vi', 'content');
              const status = Utils.getSafeValue(row, 'status', 0);
              const feature = Utils.getSafeValue(row, 'features', 1);
              const scheduled_at = Utils.getSafeValue(row, 'scheduled_at', '');
              const time = new Date(scheduled_at).toLocaleDateString('vi-VI');
              return (
                <MTableRow key={id}>
                  <MTableCell padding="checkbox" align="center">
                    <Checkbox
                      checked={isSelected(row)}
                      onChange={() => handleSelectRow(row)}
                    />
                  </MTableCell>
                  <MTableCell align='center'>
                    <img src={url} className={classes.thumbnail} alt="Thumnail" />
                  </MTableCell>
                  <MTableCell align='center'>
                    <Checkbox defaultChecked={feature === 2 || feature === 4} color="primary" disabled />
                  </MTableCell>
                  <MTableCell align='center'>
                    <Checkbox defaultChecked={feature === 3 || feature === 4} color="primary" disabled />
                  </MTableCell>
                  <MTableCell align='center'>
                    <span
                      className={classes.txtTitle}
                    >
                      <span className={classes.textBlue}
                        onClick={() => handleDoubleClickRow(row)}>{name}</span>
                    </span>
                  </MTableCell>
                  <MTableCell align='center' style={{ width: '20%' }}>
                    <span className={classes.ellipsis}>
                      {parse(Utils.removeTags(content))}
                    </span>
                  </MTableCell>
                  <MTableCell align='center'>
                    <span className={classes.txtCate}>
                      {category}
                    </span>
                  </MTableCell>
                  <MTableCell align='center'>{time}</MTableCell>
                  {status === 2 && <MTableCell style={{ color: '#00B41D' }} align='center'>Xuất bản</MTableCell>}
                  {status === 3 && <MTableCell style={{ color: '#276EF1' }} align='center'>Chờ xuất bản</MTableCell>}
                  {status === 1 && <MTableCell style={{ color: '##858585' }} align='center'>Bản nháp</MTableCell>}
                </MTableRow>
              )
            })}
          </MTableBody>
        </MTable>
      </MTableContainer>
      <Pagination
        count={Math.ceil(total / 10)}
        onChange={handleChangePage} />
    </div>
  );
}

Table.defaultProps = {
  data: []
}