import { AxiosResponse } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/querykeys.constants";
import { List, Params } from "src/common/interfaces/common.interface";
import { toTotalPage } from "src/common/lib/common.lib";
import { CbiResponse } from "../interfaces";
import { getCbiService } from "../services";

function useGetCbis(params: Params) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<AxiosResponse<List<CbiResponse>>, Error>(
    [QUERY_KEYS.CBIS_LIST, { params }],
    () => getCbiService(params),
  );
  const cbis = data?.data.results || [];
  const hasCbis = cbis.length > 0;
  const totalPage = toTotalPage(data?.data.total);
  const allCurrentId = cbis.map((cbi) => cbi.id);

  return {
    cbis,
    hasCbis,
    totalPage,
    allCurrentId,
    isLoading,
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.CBIS_LIST),
  };
}

export { useGetCbis };
