import { AxiosResponse } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { AllCategory } from "../interfaces";
import { getAllCategoryService } from "../services";

function useGetCategory() {
  const queryClient = useQueryClient();

  return {
    ...useQuery<AxiosResponse<AllCategory[]>, Error>([QUERY_KEYS.CATEGORY_LIST], () =>
      getAllCategoryService(),
    ),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.CATEGORY_LIST),
  };
}

export { useGetCategory };
