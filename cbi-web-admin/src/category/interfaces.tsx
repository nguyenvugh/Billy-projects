export interface Creator {
  id: string;
  email: string;
  fullName: string;
}

export interface Translates {
  lang: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  translates: Translates[];
  creator: Creator;
}

export interface APICategoryResponse {
  results: Category[];
}

export type CategoryParams = {
  page: number;
  limit: number;
  searchText?: string;
  creatorId?: string;
};

export interface UpdateParams {
  id: string;
  name: string;
}

export interface DeleteParams {
  ids: string[];
}
