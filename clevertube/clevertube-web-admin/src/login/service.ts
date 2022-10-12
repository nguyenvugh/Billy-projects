import { signInWithEmailAndPassword } from "firebase/auth";
import { NavigateFunction } from "react-router-dom";
import { auth } from "../common/configs/firebase";
import { LOGIN } from "../common/constants/urlAPI";
import { execute } from "../common/lib/request";

const loginEmail = (
  email: string,
  password: string,
  navigate: NavigateFunction,
  setIsLoading: any
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user: any = userCredential.user;
      const res = await execute.post(LOGIN, { firIdToken: user.accessToken });
      localStorage.setItem("token", res.data?.firIdToken);
      setIsLoading(false);
      navigate("/");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log({ errorCode, errorMessage });
      setIsLoading(false);
    });
};

export { loginEmail };
