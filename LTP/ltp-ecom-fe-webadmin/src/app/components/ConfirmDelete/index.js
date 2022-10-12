import { IconButton, Modal } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Fragment } from "react";
import DangerButton from "../Button/DangerButton";
import DefaultButton from "../Button/DefaultButton";

const ConfirmDelete = ({
  children,
  open,
  onClose,
  onOK,
  title = "XÁC NHẬN XÓA",
  message = "Bạn có chắn chắn muốn xóa mục này?",
  cancelTitle = "HỦY BỎ",
  okTitle = "XÓA",
}) => {
  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      onClose instanceof Function && onClose();
    }
  };
  const handleOK = () => {
    onOK instanceof Function && onOK();
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="modal-content" style={{ maxWidth: 400 }}>
        <div className="modal-header">
          <div className="modal-title" style={{ color: "#ff2b2b", textAlign: "center" }}>{title}</div>
          <IconButton onClick={handleClose} style={{ padding: 3 }}>
            <Close />
          </IconButton>
        </div>
        {children ? children :
          <Fragment>
            <div className="modal-body">
              <div style={{ textAlign: "center" }}>
                {message}
              </div>
            </div>
            <div className="modal-footer" style={{ textAlign: "center" }}>
              <DefaultButton onClick={handleClose}>{cancelTitle}</DefaultButton>
              <DangerButton onClick={handleOK}>{okTitle}</DangerButton>
            </div>
          </Fragment>
        }
      </div>
    </Modal>
  );
};

export default ConfirmDelete;
