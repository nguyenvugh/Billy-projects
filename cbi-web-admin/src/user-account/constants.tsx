import { PAGE_SIZE, Status } from "src/common/constants/common.constant";
import { GetUserAccountParams } from "./interfaces";

export const ACCOUNT_STATUS_OPTIONS = [
  {
    label: "Tất cả tài khoản",
    value: "",
  },
  {
    label: "Tài khoản khoá",
    value: Status.INACTIVE,
  },
  {
    label: "Tài khoản mở",
    value: Status.ACTIVE,
  },
  {
    label: "Tài chờ duyệt",
    value: Status.PENDING,
  },
];

export const DEFAULT_PARAMS_GET_USER_ACC: GetUserAccountParams = {
  limit: PAGE_SIZE,
  page: 1,
};

export const STATUS = {
  ACTIVE: {
    label: "Mở khoá",
    color: "#00B41D",
  },
  INACTIVE: {
    label: "Khoá",
    color: "#E11B1B",
  },
  PENDING: {
    label: "Chờ duyệt",
    color: "#F6781D",
  },
};
