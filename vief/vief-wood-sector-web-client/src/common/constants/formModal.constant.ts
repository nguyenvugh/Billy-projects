import { useViefRouter } from "../hooks/useViefRouter";

const imgSuccess = "/checkDownload.png";
const imgError = "/error-img.svg";
const description = "Bạn sẽ tự động quay về Trang chủ sau 03 giây. Chọn Trang chủ nếu bạn không muốn đợi lâu";

export const formModalLoginSuccess = {
  img: imgSuccess,
  title: "Đăng nhập thành công",
  description: description,
  textButton: "Trang chủ",
};

export const formModalLoginError = {
  img: imgError,
  title: "Đăng nhập thất bại",
  description: "Email hoặc mật khẩu không trùng khớp, vui lòng kiểm tra lại thông tin đăng nhập",
  textButton: "Thử lại",
};

export const formForgotPasswordSuccess = {
  img: imgSuccess,
  title: "Xác nhận email",
  description:
    "Nếu địa chỉ email này được sử dụng để tạo tài khoản, hướng dẫn đặt lại mật khẩu sẽ được gửi cho bạn. Vui lòng kiểm tra email của bạn.",
  textButton: "Đã hiểu",
};

export const formModalResetPasswordSuccess = {
  img: imgSuccess,
  title: "Đổi mật khẩu thành công",
  description: description,
  textButton: "Trang chủ",
};

export const formModalRegisterSuccess = {
  img: imgSuccess,
  title: "Đăng kí thành công",
  description: description,
  textButton: "Trang chủ",
};

export const formModalRegisterError = {
  img: imgError,
  title: "Đăng kí thất bại",
  description: "Xin vui lòng nhập lại",
  textButton: "Thử lại",
};
