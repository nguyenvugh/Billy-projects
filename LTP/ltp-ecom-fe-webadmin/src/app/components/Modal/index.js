import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  handleClose,
  open,
  txtCancel = "Hủy",
  txtOK = "Đồng ý",
  children,
  title,
  bgOk = "#E21818",
  colorOk = "#FFFFFF",
  colorCancel = "#000000",
  borderCancel = "#000000",
  bgCancel = "#ffff"
}) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title" style={{ paddingTop: "24px" }}>
        {title}
      </DialogTitle>
      <DialogContent style={{ paddingTop: "17px" }}>
        {children}
      </DialogContent>
      <DialogActions style={{ padding: "24px 33px 38px 33px" }}>
        <Button
          onClick={handleClose}
          style={{
            background: bgCancel,
            color: colorCancel,
            textTransform: "uppercase",
            padding: "12px 53px",
            fontSize: "14px !important",
            height: "auto",
            lineHeight: "initial",
            border: `1px solid ${borderCancel}`,
            marginRight: 28
          }}
        >
          {txtCancel}
        </Button>
        <Button
          onClick={handleClose}
          style={{
            background: bgOk,
            color: colorOk,
            height: "auto",
            lineHeight: "initial",
            fontSize: "14px !important",
            textTransform: "uppercase",
            padding: "12px 53px"
          }}
        >
          {txtOK}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
