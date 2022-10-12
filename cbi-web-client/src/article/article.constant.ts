import { Article } from "@cbi/services/article/article.interface";
import { LangEnum, List } from "src/common/interfaces/common.interface";

export const ARTICLE_DEFAULT: Article = {
  id: "",
  description: "",
  articleCategory: {
    id: "",
    translates: [{ lang: LangEnum.vi, name: "", slug: "" }],
  },
  authorName: "",
  createdAt: "",
  isFeature: 0,
  publishAt: "",
  status: "DRAFT",
  thumbnail: {
    bucket: "",
    createdAt: "",
    id: "",
    key: "",
    size: 0,
    type: "",
    updatedAt: "",
    uploaderId: "",
    verified: 0,
    version: 0,
    deletedAt: "",
  },
  translates: [
    { content: "", description: "", lang: LangEnum.vi, slug: "", title: "" },
  ],
  updatedAt: "",
};
