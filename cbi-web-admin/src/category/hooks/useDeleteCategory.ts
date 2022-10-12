import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { useToast } from "src/common/hooks/useToast";
import { deleteCategoryService, deleteSingleCategoryService } from "../services";

function useDeleteCategory() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return {
    ...useMutation(QUERY_KEYS.CATEGORY_DELETE, deleteCategoryService, {
      onError(error: AxiosResponse) {
        toast({ title: error?.data?.message, status: "error" });
      },
    }),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.CATEGORY_LIST),
  };
}

function useDeleteSingleCategory() {
  const queryClient = useQueryClient();

  return {
    ...useMutation(QUERY_KEYS.CATEGORY_DELETE_SINGLE, deleteSingleCategoryService),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.CATEGORY_LIST),
  };
}

export { useDeleteCategory, useDeleteSingleCategory };
