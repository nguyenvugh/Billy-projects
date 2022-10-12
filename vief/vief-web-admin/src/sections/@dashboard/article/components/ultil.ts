import { LANG } from '../constants';
// import { ICreateCategory, IResCategoryById, ITranslationEle } from '../interfaces';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { BooleanEnum } from 'src/common/constants/common.constants';
import { IArticle, IFileThumb, IFormType, ITranslation } from '../interfaces';

export function getFormDefaultValues(data: IArticle) {
  const empty = {
    title: '',
    content: '',
    shortDesc: '',
    slug: '',
  };
  let defaultThumb = [
    {
      name: data?.thumbnail?.id,
      preview: data?.thumbnail?.url,
    },
  ];
  let defaultImages = data?.images.map((item: IFileThumb) => {
    return {
      name: item.id,
      preview: item.url,
    };
  });
  let enLang = data?.translates.find((item: ITranslation) => item.lang === LANG.EN);
  let viLang = data?.translates.find((item: ITranslation) => item.lang === LANG.VI);

  return {
    thumbnailImg: defaultThumb,
    images: defaultImages,
    author: data?.author,
    categoryId: data?.category.id,
    isFeature: data?.isFeature === BooleanEnum.TRUE ? true : false,
    translations: {
      [LANG.VI]: viLang ? viLang : empty,
      [LANG.EN]: enLang ? enLang : empty,
    },
  };
}

export function postTranslations(data: IFormType) {
  let translation: ITranslation[];
  let statusEn = Object.values(data?.translations?.[LANG.EN])?.every((item: string) => item);
  let statusVi = Object.values(data?.translations?.[LANG.VI])?.every((item: string) => item);

  if (!statusEn) {
    translation = [
      {
        lang: LANG.VI,
        title: data.translations?.[LANG.VI]?.title,
        slug: data.translations?.[LANG.VI]?.slug,
        shortDesc: data.translations?.[LANG.VI]?.shortDesc,
        content: data.translations?.[LANG.VI]?.content,
      },
    ];
  } else if (!statusVi) {
    translation = [
      {
        lang: LANG.EN,
        title: data.translations?.[LANG.EN]?.title,
        slug: data.translations?.[LANG.EN]?.slug,
        shortDesc: data.translations?.[LANG.EN]?.shortDesc,
        content: data.translations?.[LANG.EN]?.content,
      },
    ];
  } else {
    translation = [
      {
        lang: LANG.VI,
        title: data.translations?.[LANG.VI]?.title,
        slug: data.translations?.[LANG.VI]?.slug,
        shortDesc: data.translations?.[LANG.VI]?.shortDesc,
        content: data.translations?.[LANG.VI]?.content,
      },
      {
        lang: LANG.EN,
        title: data.translations?.[LANG.EN]?.title,
        slug: data.translations?.[LANG.EN]?.slug,
        shortDesc: data.translations?.[LANG.EN]?.shortDesc,
        content: data.translations?.[LANG.EN]?.content,
      },
    ];
  }
  return translation;
}

export const LabelStyle: any = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export const getImagesID = (data: (IFileThumb | File)[]) => {
  const defaultID = data
    .filter((item: IFileThumb | File) => {
      return !Object.keys(item).includes('path');
    })
    ?.map((item: IFileThumb | File) => item.name);
  const newImgID = data.filter((item: IFileThumb | File) => {
    return Object.keys(item).includes('path');
  });

  return {
    default: defaultID,
    newID: newImgID,
  };
};
