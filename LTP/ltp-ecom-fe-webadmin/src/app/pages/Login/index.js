import { Box, Button, CardMedia, Grid } from "@material-ui/core";
import { fetchLogin } from "app/reducers/auth";
import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import AlertModal from "@ltp/components/AlertModal";
import AlertModal from "../../components/AlertModal";
import TextFields from "app/components/TextFields";
import "./index.css";
import "./style.scss";

const message = {
  invalid: "Bạn đã nhập sai tên tài khoản hoặc mật khẩu. Vui lòng thử lại !",
  expiredToken: "Phiên của bạn đã hết hạn. Vui lòng đăng nhập lại !",
};
function Login(props) {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const expiredToken = localStorage.getItem("expiredToken");
  const [form, _setForm] = useState({
    username: "",
    password: "",
  });
  const setForm = (data = {}) => {
    _setForm((state) => {
      return { ...state, ...data };
    });
  };
  const [error, setError] = useState({
    username: "",
    password: "",
  });

  const [isOpenModal, setIsOpenModal] = useState(false);
  useEffect(() => {
    console.log(JSON.parse(expiredToken));
    if (expiredToken && !!JSON.parse(expiredToken)) {
      setIsOpenModal(true);
    }
  }, [expiredToken]);
  const handleChange = (evt) => {
    setForm({
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = () => {
    let errorMessages = {
      username: "",
      password: "",
    };
    let errorsCount = 0;
    if (!form.username) {
      errorMessages.username = "Username được yêu cầu";
      errorsCount = errorsCount + 1;
    }
    if (!form.password) {
      errorMessages.password = "Password được yêu cầu";
      errorsCount = errorsCount + 1;
    }
    if (errorsCount > 0) {
      setError(errorMessages);
      return;
    }
    dispatch(fetchLogin(form)).then((s) => {
      if (s?.code === 200 || s?.data?.code === 200) {
        history.push("/");
      } else {
        setIsOpenModal(true);
        return;
      }
    });
  };
  return (
    <Grid container className="login">
      <Grid
        item
        xs={4}
        className="login__welcome"
        component={CardMedia}
        image={`${process.env.PUBLIC_URL}/imgs/login-bg.svg`}
      >
        <div className="login__welcome__container">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            flexGrow={1}
          >
            <img
              className="login__welcome__container__logo"
              src="/imgs/white-logo.svg"
              alt="LTP"
            />
            <h4 className="login__welcome__container__title">
              Chào mừng đến với LTP
            </h4>
          </Box>
          <p className="login__welcome__container__sologan">
            Chất lượng - Nhanh chóng - hiệu quả
          </p>
        </div>
      </Grid>
      <Grid item xs={8} className="login__submit-form">
        <div className="login__submit-form__container">
          <h3 className="login__submit-form__container__title">
            Đăng nhập vào Long Thanh Plastic
          </h3>
          <div>
            <TextFields
              label="Tài khoản"
              placeholder="Nhập tài khoản của bạn"
              name="username"
              value={form.username}
              onChange={(evt) => handleChange(evt)}
              error={error.username !== ""}
              helperText={error.username}
            />
          </div>
          <div>
            <TextFields
              type="password"
              label="Mật khẩu"
              placeholder="Nhập mật khẩu của bạn"
              name="password"
              value={form.password}
              onChange={(evt) => handleChange(evt)}
              error={error.password !== ""}
              helperText={error.password}
            />
          </div>
          <Box textAlign="center">
            <Button
              className="login__submit-form__container__submit-btn"
              onClick={handleSubmit}
            >
              Đăng nhập
            </Button>
          </Box>
        </div>
      </Grid>
      <AlertModal
        isOpen={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
          localStorage.setItem("expiredToken", JSON.stringify(false));
        }}
        type="danger"
        title="Lỗi đăng nhập"
      >
        <p>
          {expiredToken && JSON.parse(expiredToken)
            ? message.expiredToken
            : message.invalid}
        </p>
      </AlertModal>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth.auth,
});

const mapDispatchToProps = (dispatch) => ({
  //   onLogin: value => dispatch(timerActions.increment(value)),
  //   onDecrement: value => dispatch(timerActions.decrement(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
// export default Login;
