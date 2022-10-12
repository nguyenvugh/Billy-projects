import { ResIsFullPublished } from "./../interfaces";
import { AxiosResponse } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { checkIsFullPublishService } from "../services";

function useCheckIsFullPublish() {
  const queryClient = useQueryClient();

  return {
    ...useQuery<AxiosResponse<ResIsFullPublished>, Error>(
      [QUERY_KEYS.ARTICLE_CHECK_FULL_PUBLISHED],
      checkIsFullPublishService,
    ),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.ARTICLE_CHECK_FULL_PUBLISHED),
  };
}

export { useCheckIsFullPublish };
