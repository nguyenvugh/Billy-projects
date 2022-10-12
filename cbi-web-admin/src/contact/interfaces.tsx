export interface ContactI {
  createdAt: string,
  updatedAt: string,
  version: number,
  id: string,
  name: string,
  phone: string,
  email: string,
  content: string
}
export interface ListContactI extends Array<ContactI> {}

export interface APIListContactResponse {
  results: ListContactI;
  total: number;
};

export interface ContactParamsI {
  page: number,
  limit: number,
  searchText?: string,
};

export interface DeleteParamsI extends Array<string> {}
