import { useCallback, useState } from "react";
import { UseQueryResult } from "react-query";

interface UseLazyQuery<T extends (...args: any[]) => UseQueryResult> {
  query: T;
  options?: Parameters<T>[1];
}

export function useLazyQuery<T extends(...args: any[]) => UseQueryResult>(
  queryOrConfig: UseLazyQuery<T> | T
) {
  const [debounceVariables, setDebounceVariables] = useState<Parameters<T>[0]>();
  const query = typeof queryOrConfig === "function" ? queryOrConfig : queryOrConfig.query;
  const options = typeof queryOrConfig === "function" ? undefined : queryOrConfig.options;

  const result = query(debounceVariables, { enabled: !!debounceVariables, ...options });
  const execute = useCallback(
    (variables: Parameters<T>[0]) => setDebounceVariables(variables),
    []
  );
  return { ...result, execute };
}
