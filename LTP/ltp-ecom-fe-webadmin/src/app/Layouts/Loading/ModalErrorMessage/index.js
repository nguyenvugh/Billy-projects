import { IconButton, Modal } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import DefaultButton from "app/components/Button/DefaultButton";
// import { removeToken } from "app/reducers/auth";
import { ACTION_TYPE } from "app/reducers/loading";
import { useDispatch, useSelector } from "react-redux";
import ModalError from "app/assets/modal-error.png";

const ModalErrorMessage = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(
    (store) => store.loading.errorMessage
  );
  const onClose = () => {
    // if (
    //   Array.isArray(errorMessage) &&
    //   errorMessage.find(
    //     (item) => item?.statusCode === 401 || item?.statusCode === 403
    //   )
    // ) {
    //   removeToken();
    //   window.location.href = "/login";
    // }
    dispatch({ type: ACTION_TYPE.SET_ERROR_MESSAGE, payload: [] });
  };

  return (
    <Modal open={errorMessage?.length > 0}>
      <div className="modal-content" style={{ maxWidth: 400 }}>
        <div className="modal-header">
          <h4 className="modal-title"
            style={{ textAlign: "center", color: "#CA5457", fontWeight: 700, fontSize: 28 }}>
            Rất tiếc
          </h4>
          <IconButton
            aria-label="close"
            style={{ padding: 6 }}
            onClick={onClose}
          >
            <Close />
          </IconButton>
        </div>
        <div className="modal-body">
          {errorMessage.map((item, index) => {
            if (typeof item === "object" && item !== null) {
              return (
                <p className="modal-message" key={index}>
                  {item?.message}
                </p>
              );
            } else if (typeof item === "string") {
              return (
                <p className="modal-message" key={index}>
                  {item}
                </p>
              );
            }
            return null;
          })}
          <div style={{ textAlign: "center" }}>
            <img style={{ maxWidth: 180, maxHeight: 180 }} src={ModalError} alt="error" />
          </div>
        </div>
        <div className="modal-footer" style={{ textAlign: "center" }}>
          <DefaultButton style={{ backgroundColor: "#CA5457" }} onClick={onClose}>XÁC NHẬN</DefaultButton>
        </div>
      </div>
    </Modal>
  );
};
export default ModalErrorMessage;
