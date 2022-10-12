import { LangEnum } from "src/common/constants/common.constant";
import { Params } from "src/common/interfaces/common.interface";
import { Thumbnail } from "src/common/interfaces/files.interface";
import { Updater } from "use-immer";

export type ArticleStatus = "DRAFT" | "PUBLISH";
export type ArticleTranslation = {
  lang: LangEnum;
  title: string;
  content: string;
  slug: string;
};
export interface ArticleCateTranslation {
  lang: LangEnum;
  name: string;
  slug: string;
}
export interface Article {
  id: string;
  createdAt: string;
  thumbnail: Thumbnail;
  translates: ArticleTranslation[];
  status: ArticleStatus;
  description: string;
  isFeature: 0 | 1;
  authorName: string;
  publishAt: string;
  updatedAt: string;
  articleCategory: {
    id: string;
    translates: ArticleCateTranslation[];
  };
}
export interface ArticleCreate {
  id?: string;
  title: string;
  content: string;
  idCategory: string;
  authorName: string;
  thumbnailId: string;
  status: ArticleStatus;
  isFeature: 0 | 1;
  publishAt: string;
  description: string;
}
export interface ArticleParams extends Params {
  searchText?: string;
  idCategory?: string;
  isFeature?: 0 | 1;
}

export interface NewsTableProps {
  articleParams: ArticleParams;
  updateArticleParams: (params: ArticleParams) => void;
  selectIds?: string[];
  updateSelectedIds?: Updater<string[]>;
}

export interface AllCategory {
  id: string;
  name: string;
}

export interface ResIsFullPublished {
  isFullPublished: boolean;
}
