import { IconButton, Modal } from "@material-ui/core";
import { Close } from '@material-ui/icons';
import DefaultButton from 'app/components/Button/DefaultButton';
import PrimaryButton from 'app/components/Button/PrimaryButton';

export default function BasicModal({ isOpen, onClose, onSubmit, title, children, isNewsCategory, readyForSave, isLockUser }) {

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
    >
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <IconButton onClick={onClose} style={{ padding: 3 }}>
            <Close />
          </IconButton>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <DefaultButton
            onClick={onClose}
          >
            {isNewsCategory ? 'Huỷ' : 'Đóng'}
          </DefaultButton>
          <PrimaryButton
            onClick={onSubmit}
          >
            {isLockUser ? 'Khoá' : 'Lưu lại'}
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  )
}