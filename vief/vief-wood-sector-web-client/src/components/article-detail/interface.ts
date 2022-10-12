import {
  Article,
  ArticleDetail,
  ListResponse,
} from "@/src/common/interfaces/common.interface";
import { ReactNode } from "react";

export interface ArticleDetailProps {
  articleDetail: ArticleDetail;
  relateNews: Article[];
  extraNews: ListResponse<Article>;
  breadcrumb?: ReactNode;
}
