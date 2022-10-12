import { LANG } from 'src/common/constants/common.interfaces';
import { CustomFile } from 'src/components/upload';

export type ITranslations = {
  lang: LANG;
  title: string;
  slug: string;
  content: string;
};

export type IFormAboutUsNew = {
  thumbnailId: number;
  images: number[];
  field: string;
  translations: ITranslations[];
};
export type IFormTranslations = {
  [lang in LANG]: {
    title: string;
    slug: string;
    content: string;
  };
};

export type IFormAboutUsValuesProps = {
  thumbnail: CustomFile | string | null;
  images: (CustomFile | string | null)[];
  translations: IFormTranslations;
};
