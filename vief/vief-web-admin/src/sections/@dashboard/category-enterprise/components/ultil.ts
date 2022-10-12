import { LANG_CONST, LANG } from '../constants';
import { ICreateCategory, IResCategoryById, ITranslationEle } from '../interfaces';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { BooleanEnum } from 'src/common/constants/common.constants';

export function getFormDefaultValues(data: IResCategoryById) {
  const empty = {
    name: '',
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
  let enLang = data?.translates.find((item: ITranslationEle) => item.lang === LANG.EN);
  let viLang = data?.translates.find((item: ITranslationEle) => item.lang === LANG.VI);

  return {
    thumbnailId: defaultThumb,
    isFeature: data?.isFeature === BooleanEnum.TRUE ? true : false,
    translations: {
      vi: viLang ? viLang : empty,
      en: enLang ? enLang : empty,
    },
  };
}

export function postTranslations(data: ICreateCategory) {
  let translation: ITranslationEle[];
  let statusEn = Object.values(data?.translations?.[LANG.EN])?.every((item: string) => item);
  let statusVi = Object.values(data?.translations?.[LANG.VI])?.every((item: string) => item);

  if (!statusEn) {
    translation = [
      {
        lang: LANG.VI,
        name: data.translations?.vi?.name,
        slug: data.translations?.vi?.slug,
        shortDesc: data.translations?.vi?.shortDesc,
        content: data.translations?.vi?.content,
      },
    ];
  } else if (!statusVi) {
    translation = [
      {
        lang: LANG.EN,
        name: data.translations?.en?.name,
        slug: data.translations?.en?.slug,
        shortDesc: data.translations?.en?.shortDesc,
        content: data.translations?.en?.content,
      },
    ];
  } else {
    translation = [
      {
        lang: LANG.VI,
        name: data.translations?.vi?.name,
        slug: data.translations?.vi?.slug,
        shortDesc: data.translations?.vi?.shortDesc,
        content: data.translations?.vi?.content,
      },
      {
        lang: LANG.EN,
        name: data.translations?.en?.name,
        slug: data.translations?.en?.slug,
        shortDesc: data.translations?.en?.shortDesc,
        content: data.translations?.en?.content,
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
