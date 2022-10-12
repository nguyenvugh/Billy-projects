import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "src/common/redux/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
