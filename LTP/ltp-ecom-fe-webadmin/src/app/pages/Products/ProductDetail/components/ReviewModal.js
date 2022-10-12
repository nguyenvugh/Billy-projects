import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Modal, Chip, Snackbar } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { formatDateTime } from 'app/utils/validate';
import { patchApproveProductReviews } from 'app/services/product-reviews';
import MuiAlert from "@material-ui/lab/Alert";
import { useState } from 'react';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: '600px',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff',
    borderRadius: '6px'
  },
  header: {
    padding: '20px',
    borderBottom: '1px solid #858585',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  title: {
    fontWeight: 600,
    fontSize: '18px',
    color: '#2154FF'
  },
  body: {
    padding: '10px 20px',
    fontSize: '16px',
    textAlign: 'center'
  },
  label: {
    color: '#737373',
    fontSize: '12px'
  },
  comment: {
    backgroundColor: '#F8F8F8',
    padding: '20px'
  },
  status: {
    color: '#F8B711',
    border: '1px solid #F3C51F',
    backgroundColor: '#ffffff',
    height: '24px'
  },
  footer: {
    padding: '20px'
  },
  submitBtn: {
    backgroundColor: '#2154FF',
    color: '#ffffff',
    borderRadius: '6px',
    padding: '10px 25px',
    margin: 'auto'
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

export default function ReviewModal({ isOpen, onClose, onSave, item, setIsLoadData }) {
  const classes = useStyles();
  const [openToastError, setopenToastError] = useState(false)
  const [messageToastError, setmessageToastError] = useState("")
  const handleSubmit = async () => {
    try {
      const request = await patchApproveProductReviews({ ids: [item.id], status: 2 });
      setIsLoadData(true)
      onClose()
    } catch (error) {
      setopenToastError(true)
      // setIsOpenApproveAccountConfirmation(false);
      setmessageToastError("xác nhận không thành công")
    }
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
  const handleCloseToast = () => {
    setopenToastError(false)
  }
  return (
    <div>
      <Snackbar
        open={openToastError}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseToast} severity="error">
          {messageToastError}
        </Alert>
      </Snackbar>
      <Modal
        open={isOpen}
        onClose={onClose}
      >
        <div className={classes.modal}>
          <div className={classes.header}>
            <span className={classes.title}>Review sản phẩm</span>
          </div>
          <div className={classes.body}>
            <Grid container>
              <Grid item xs={3}>
                <p className={classes.label}>Tên tài khoản</p>
                <p>{item?.customer?.name}</p>
              </Grid>
              <Grid item xs={3}>
                <p className={classes.label}>Số sao đánh giá</p>
                <p>
                  <Rating name="read-only" value={+item.rating} readOnly />
                </p>
              </Grid>
              <Grid item xs={3}>
                <p className={classes.label}>Ngày đăng</p>
                <p>{formatDateTime(item.created_at)}</p>
              </Grid>
              <Grid item xs={3}>
                <p className={classes.label}>Trạng thái</p>
                <p>
                  {renderStatus(item.status)}
                </p>
              </Grid>
            </Grid>
            <Grid container>
              <Grid xs={12} className={classes.comment}>
                <p>{item.content}</p>
              </Grid>
            </Grid>
            <Grid container className={classes.footer}>
              <Button onClick={handleSubmit} className={classes.submitBtn}>Xác nhận</Button>
            </Grid>
          </div>
        </div>
      </Modal>
    </div>
    
  )
}