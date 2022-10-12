import { Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import Breadcrumbs from "app/components/Breadcrumbs";
import DangerButton from 'app/components/Button/DangerButton';
import DefaultButton from "app/components/Button/DefaultButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import ConfirmModal from 'app/components/ConfirmModal';
import { NEWS_SCREEN_EDIT_MODE } from 'app/constants/news';
import { urlNews } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function Toolbar({ onSubmit, onSendMail, mode, isSendEmail, setIsSendEmail, detail }) {
  const history = useHistory();
  const [isOpenMailPopup, setIsOpenMailPopup] = useState(false);

  const handleCancel = () => {
    history.goBack();
  };

  const handleSendMail = () => {
    onSendMail && onSendMail();
    setIsOpenMailPopup(false);
  };

  return (
    <div className="page-header">
      <div className="page-title">
        <Breadcrumbs>
          <Link to={urlNews}>
            Danh sách tin tức
          </Link>
          <Typography>
            {mode === NEWS_SCREEN_EDIT_MODE ? 'Chỉnh sửa' : 'Thêm mới'}
          </Typography>
        </Breadcrumbs>
      </div>
      {detail?.status === 2 &&
        (mode === NEWS_SCREEN_EDIT_MODE ?
          <DefaultButton
            style={{ borderColor: "#D70000", color: "#D70000" }}
            onClick={() => setIsOpenMailPopup(true)}
          >
            Gửi email
          </DefaultButton> :
          <FormControlLabel control={<Checkbox checked={isSendEmail} onChange={(e) => setIsSendEmail(e.target.checked)} />} label="Gửi email" />
        )
      }
      <DangerButton
        onClick={() => handleCancel()}
      >
        Huỷ
      </DangerButton>
      <PrimaryButton
        onClick={onSubmit}
      >
        Lưu lại
      </PrimaryButton>
      <ConfirmModal
        isOpen={isOpenMailPopup}
        onClose={() => setIsOpenMailPopup(false)}
        onOk={handleSendMail}
        type='save'
        okText='Gửi'
        title='Gửi mail'
        children='Hãy kiểm tra lại nội dung bài viết, khi đã gửi không thể thu hồi. Bạn có chắc chắn gửi?' />
    </div>
  );
}