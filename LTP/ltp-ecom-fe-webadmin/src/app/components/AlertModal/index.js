import { Modal, Button } from "@material-ui/core";

import './style.scss';

export default function Alert({ isOpen, onClose, type, title, children }) {
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={isOpen}
      onClose={onClose}
    >
      <div className="basic-modal">
        <div className="basic-modal__header">
          <span className={`basic-modal__header__title ${type}`} >{title}</span>
        </div>
        <div className="basic-modal__body">
          {children}
        </div>
        <div className="basic-modal__footer">
            <Button
              variant="outlined"
              onClick={onClose}
              className="basic-modal__footer__close-btn"
            >
							Đóng
						</Button>
        </div>
      </div>
    </Modal>
  )
}