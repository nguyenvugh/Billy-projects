import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: '400px',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff',
    borderRadius: '6px'
  },
  header: {
    padding: '20px',
    borderBottom: '1px solid #EEEEEE',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  title: {
    fontWeight: 600,
    fontSize: '18px',
    '&.delete': {
      color: '#FF2B2B'
    },
    '&.save': {
      color: '#1A43CC'
    }
  },
  body: {
    padding: '10px 20px',
    fontSize: '16px',
    textAlign: 'center'
  },
  footer: {
    padding: '10px 20px',
    textAlign: 'center'
  },
  cancelBtn: {
    textTransform: 'uppercase',
    fontSize: '14px',
    padding: '5px 30px',
    marginRight: '15px'
  },
  okBtn: {
    color: '#ffffff',
    textTransform: 'uppercase',
    fontSize: '14px',
    padding: '5px 30px'
  },
  deleteText: {
    color: '#FF2B2B'
  },
  saveText: {
    color: '#1A43CC'
  },
  deleteBg: {
    backgroundColor: '#FF2B2B',
  },
  saveBg: { 
    backgroundColor: '#1A43CC',
  }
}));

export default function ConfirmModal({ 
  isOpen,
  onClose,
  onOk,
  title,
  children,
  type,
  okText,
  cancelText
}) {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={isOpen}
      onClose={onClose}
    >
      <div className={classes.modal}>
        <div className={classes.header}>
          <span className={`${classes.title} ${classes[`${type}Text`]}`}>{title}</span>
        </div>
        <div className={classes.body}>
          {children}
        </div>
        <div className={classes.footer}>
            <Button
              variant="outlined"
              onClick={onClose}
              className={classes.cancelBtn}
            >
							{cancelText}
						</Button>
            <Button
              variant="outlined"
              onClick={onOk}
              className={`${classes.okBtn} ${classes[`${type}Bg`]}`}
            >
							{okText}
						</Button>
        </div>
      </div>
    </Modal>
  )
}

ConfirmModal.defaultProps = {
  cancelText: 'Huỷ bỏ'
}