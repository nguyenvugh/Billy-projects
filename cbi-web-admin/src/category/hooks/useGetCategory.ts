import { AxiosResponse } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { List } from "src/common/interfaces/common.interface";
import { Category, CategoryParams } from "../interfaces";
import { getAllCategoryService } from "../services";

function useGetCategories(params: CategoryParams) {
  const queryClient = useQueryClient();

  return {
    ...useQuery<AxiosResponse<List<Category>>, Error>([QUERY_KEYS.CATEGORY_LIST, { params }], () =>
      getAllCategoryService(params),
    ),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.CATEGORY_LIST),
  };
}

export { useGetCategories };
