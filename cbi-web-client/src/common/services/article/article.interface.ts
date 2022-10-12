import {
  LangEnum,
  List,
  PageParams,
} from "src/common/interfaces/common.interface";

export interface Thumbnail {
  key: string;
  bucket: string;
  type: string;
  uploaderId: string;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  id: string;
  size: number;
  verified: number;
}
export type ArticleStatus = "DRAFT" | "PUBLISH";
export type ArticleTranslation = {
  lang: LangEnum;
  title: string;
  content: string;
  slug: string;
  description: string;
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
  description: string;
  translates: ArticleTranslation[];
  status: ArticleStatus;
  isFeature: 0 | 1;
  authorName: string;
  publishAt: string;
  updatedAt: string;
  articleCategory: {
    id: string;
    translates: ArticleCateTranslation[];
  };
}
export interface ArticleCategory {
  id: string;
  name: string;
}
export interface ArticleByCategory extends ArticleCategory {
  articles: Article[];
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
export interface ArticleParams extends PageParams {
  searchText?: string;
  idCategory?: string;
  isFeature?: 0 | 1;
  status?: ArticleStatus;
}

export interface ArticleProps {
  slideArticle: Article[];
  hotnewArticle: Article[];
  articleByCate: ArticleByCategory[];
}

export interface PostDetailProps {
  hotnewArticle: Article[];
  detailArticle: Article;
}
export interface CategoryPageProps {
  hotnewArticle: Article[];
  articlesByCateId: List<Article>;
}
