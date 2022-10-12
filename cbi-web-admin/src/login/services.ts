import { execute } from "src/common/lib/request";
import { LOGIN } from "src/common/services/urlAPI";
import { Login } from "./interfaces";

export async function login(credentials: Login) {
  return execute.post(LOGIN, credentials);
}
