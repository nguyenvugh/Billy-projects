import { useDispatch } from "react-redux";
import { AppDispatch } from "src/common/redux/store";

export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}
