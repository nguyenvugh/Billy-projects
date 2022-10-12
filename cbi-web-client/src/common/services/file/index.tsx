import { TypePresignI } from "src/ClimateAccount/interface";
import { postApi } from "../api";
import { URL_PRESIGN_FILE } from "../urlAPI";
import { FileResponseI } from "./interface";

export const PresignFile = async (param: TypePresignI) => {
  const url = URL_PRESIGN_FILE;
  return await postApi(url, param);
};
