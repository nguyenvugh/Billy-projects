import { useState, useEffect } from 'react';
import lodash from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import MTable from '@material-ui/core/Table';
import MTableBody from '@material-ui/core/TableBody';
import MTableCell from '@material-ui/core/TableCell';
import MTableContainer from '@material-ui/core/TableContainer';
import MTableHead from '@material-ui/core/TableHead';
import MTableRow from '@material-ui/core/TableRow';
import { Grid, Checkbox, Paper, Chip, Button } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { deleteProductReviews, getProductReviews, patchApproveProductReviews, patchDeclineProductReviews } from "app/services/product-reviews";

import ConfirmModal from 'app/components/ConfirmModal';
import ReviewModal from './ReviewModal';
import { PAGE_SIZE } from 'app/utils/constant';
import { formatDateTime } from 'app/utils/validate';

const columns = [
  {
    id: 1,
    name: 'username',
    text: 'Tên tài khoản',
  },
  {
    id: 2,
    name: 'rate',
    text: 'Số sao',
  },
  {
    id: 3,
    name: 'comment',
    text: 'Nội dung',
  },
  {
    id: 4,
    name: 'created_date',
    text: 'Ngày đăng',
  },
  {
    id: 5,
    name: 'status',
    text: 'Trạng thái',
  }
];

const useStyles = makeStyles((theme) => ({
  main: {
    margin: '20px 0',
  },
  toolbar: {
    margin: '15px 0',
  },
  title: {
    fontSize: '18px',
    margin: 0,
    fontWeight: 600,
    lineHeight: '36px'
  },
  actionBlock: {
    textAlign: 'right'
  },
  deleteButton: {
    backgroundColor: '#D70000',
    textTransform: 'unset',
  },
  table: {
    backgroundColor: '#ffffff',
    paddingBottom: '60px'
  },
  tableHeader: {
    color: '#99A6B7'
  },
  pagination: {
    margin: '20px 0',
    float: 'right',
  },
  statusApproved: {
    color: '#00B41D',
    border: '1px solid #9EE2B8',
    backgroundColor: '#ffffff',
    height: '24px',
  },
  statusPending: {
    color: '#F8B711',
    border: '1px solid #F3C51F',
    backgroundColor: '#ffffff',
    height: '24px'
  },
  statusRejected: {
    color: '#EA403F',
    border: '1px solid #EA403F',
    backgroundColor: '#ffffff',
    height: '24px'
  },
}));

export default function ReviewTable({productId = 202}) {
  const classes = useStyles();
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoadData, setIsLoadData] = useState(false);
  const [total, setTotal] = useState(0);
  const [isOpenDeleteReviewConfirmation, setIsOpenDeleteReviewConfirmation] = useState(false);
  const [isOpenReviewModal, setIsOpenReviewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    getProductReviewList();
  }, [page, isLoadData]);

  const getProductReviewList = async () => {
    try {
      let params = {
        page,
        limit: PAGE_SIZE,
        product_id: productId,
      }
      const request = await getProductReviews(params);
      const response = request.data;
      setData(response.results);
      setTotal(response.totalRecords);
      setIsLoadData(false)
    } catch (error) {

    }
  };
  const handleSelectAllClick = () => {
    if(selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data);
    }
  }

  const handleSelectRow = (row) => {
    if(isSelected(row)) {
      const newSelectedRows = selectedRows.filter(item => item.id !== row.id);
      setSelectedRows(newSelectedRows);
    } else {
      const newSelectedRows = [ ...selectedRows, row ];
      setSelectedRows(newSelectedRows);
    }
  }

  const handleDeleteSelectedRows = async () => {
    try {
      const ids = selectedRows.reduce((arr,cur) => [...arr, cur.id], [])
      const reponse = await deleteProductReviews({ids})
      setIsLoadData(true)
      setIsOpenDeleteReviewConfirmation(false);
    } catch (error) {
      setIsOpenDeleteReviewConfirmation(false);
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleDoubleClickRow = (row) => {
    if(row.status === 1) {
      setSelectedItem(row);
      setIsOpenReviewModal(true);
    }
  }

  const isSelected = row => {
    return lodash.find(selectedRows, { id: row.id }) !== undefined
  }

  const renderStatus = (id) => {
    let name = '';
    let text = '';
    if(id === 1) {
      name = 'Pending';
      text = 'Chờ duyệt';
    } else if(id === 2) {
      name = 'Approved';
      text = 'Duyệt';
    } else if(id === 3) {
      name = 'Rejected';
      text = 'Từ chối';
    }
    return <Chip label={text} className={classes[`status${name}`]} />
  }

  return (
    <Grid className={classes.main}>
      <Grid container className={classes.toolbar}>
        <Grid item xs={6}>
          <h3 className={classes.title}>
            <span className={classes.titleLink}>Review sản phẩm</span>
          </h3>
        </Grid>
        <Grid item xs={6} className={classes.actionBlock}>
          <Button
            disabled={selectedRows.length === 0}
            variant="contained"
            color="primary"
            className={classes.deleteButton}
            onClick={() => setIsOpenDeleteReviewConfirmation(true)}
          >
            Xoá đã chọn
          </Button>
        </Grid>
      </Grid>
      <div className={classes.table}>
        <MTableContainer component={Paper}>
          <MTable aria-label="simple table" padding="none">
            <MTableHead>
              <MTableRow>
                <MTableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                    checked={data.length > 0 && selectedRows.length === data.length}
                    onChange={handleSelectAllClick}
                  />
                </MTableCell>
                {columns.map(item => (
                  <MTableCell key={item.code} className={classes.tableHeader}>{item.text}</MTableCell>
                ))}
              </MTableRow>
            </MTableHead>
            <MTableBody>
              {data.map((row) => (
                <MTableRow key={row.username} onDoubleClick={() => handleDoubleClickRow(row)}>
                  <MTableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected(row)}
                      onChange={() => handleSelectRow(row)}
                    />
                  </MTableCell>
                  <MTableCell>{row?.customer?.name}</MTableCell>
                  <MTableCell>{row.rating}</MTableCell>
                  <MTableCell>{row.content}</MTableCell>
                  <MTableCell>{formatDateTime(row.created_at)}</MTableCell>
                  <MTableCell>{renderStatus(row.status)}</MTableCell>
                </MTableRow>
              ))}
            </MTableBody>
          </MTable>
        </MTableContainer>
        <div className={classes.pagination}>
          {total > 0 ? 
           <Pagination
           count={page}
           onChange={handleChangePage}
           showFirstButton
           showLastButton 
         />: null}
         
        </div>
      </div>
      <ConfirmModal
        isOpen={isOpenDeleteReviewConfirmation}
        type="delete"
        title="Xoá review"
        okText="Xoá"
        onOk={handleDeleteSelectedRows}
        onClose={() => setIsOpenDeleteReviewConfirmation(false)}
      >
        <p>Bạn có chắc muốn xóa những review đã chọn?</p>
      </ConfirmModal>
      <ReviewModal
        isOpen={isOpenReviewModal}
        onClose={() => setIsOpenReviewModal(false)}
        item={selectedItem}
        setIsLoadData={setIsLoadData}
      />
    </Grid>
  )
}