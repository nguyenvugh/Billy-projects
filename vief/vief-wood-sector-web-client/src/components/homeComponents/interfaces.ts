import { Fields, Lang, ImageResponse, Article, BaseEntities } from "@/src/common/interfaces/common.interface";
import { DocumentItem } from "../libraryComponents/interfaces";
import { Event } from "../section-event/interface";

export interface BannerTranslate extends BaseEntities {
  lang: Lang;
  title: string;
  subTitle: string;
  shortDesc: string;
}

export interface Banner extends BaseEntities {
  field: Fields;
  link: string;
  translates: BannerTranslate[];
  image: ImageResponse;
  name: string;
}

export interface HomePageProps {
  banners: Banner[];
  policy: Article[];
  events: Event[];
  enterprise: Article[];
  documents: DocumentItem[];
}
