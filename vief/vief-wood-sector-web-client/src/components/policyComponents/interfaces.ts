import {
  Article as ArticleCommon,
  Category,
  ListResponse,
} from "@/src/common/interfaces/common.interface";

export interface Article {
  url: string;
  title: string;
  content: string;
  author: string;
  shortDesc: string;
  date: string;
  slug: string;
}

export interface PolicyPageProps {
  categories: Category[];
  articleData: ListResponse<ArticleCommon>;
  latestArticle: ArticleCommon[];
}
