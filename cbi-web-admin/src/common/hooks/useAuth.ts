// import jwtDecode, { JwtPayload } from "jwt-decode";
import { getToken } from "../utils/authentication.util";

export function useAuth() {
  const token = getToken();
  if (!token) {
    return false;
  }
  return true;
}
