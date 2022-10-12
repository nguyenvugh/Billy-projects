import jwt_decode from "jwt-decode";

export default function useAuth() {
  const token = localStorage.getItem("token");
  if (token) {
    const decode: any = jwt_decode(token);
    const { exp } = decode;
    if (exp < (new Date().getTime() + 1) / 1000) {
      return false;
    }
  } else {
    return false;
  }
  return true;
}
