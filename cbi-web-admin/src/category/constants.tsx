export const PRODUCTS_QUERY_KEY = "products";
export const productQueryKeys = {
  all: () => [PRODUCTS_QUERY_KEY] as const, // ['products']
  lists: () => [...productQueryKeys.all(), "list"] as const, // ['products', 'list']
  list: (filters: string) => [...productQueryKeys.lists(), { filters }] as const, // ['products', 'list', {filters: 'done'}]
  details: () => [...productQueryKeys.all(), "detail"] as const, // ['products', 'detail']
  detail: (id: number) => [...productQueryKeys.details(), id] as const, // ['products', 'detail', 1]
};
