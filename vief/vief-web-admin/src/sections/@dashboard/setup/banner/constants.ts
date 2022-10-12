import { Lang } from 'src/common/constants/common.interfaces';
import uuidv4 from 'src/utils/uuidv4';
import { Banner, LangObj, TranslateDefault } from './interfaces';

export const DEFAULT_TRANSLATE: TranslateDefault = {
  en: {
    title: '',
    subTitle: '',
    shortDesc: '',
    lang: 'en',
  },
  vi: {
    title: '',
    subTitle: '',
    shortDesc: '',
    lang: 'vi',
  },
};

export const langs: Record<Lang, LangObj> = {
  en: {
    label: 'English',
    value: 'en',
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
  vi: {
    label: 'Vietnamese',
    value: 'vi',
    icon: '/assets/icons/flags/ic_flag_vn.svg',
  },
};
export const DEFAULT_BANNER = (): Banner => ({
  temporaryId: uuidv4(),
  field: 'WOOD',
  link: '',
  translates: Object.keys(DEFAULT_TRANSLATE).map((it) => DEFAULT_TRANSLATE[it as Lang]),
  image: {
    id: -1,
    key: '',
    type: 'jpeg',
    url: null,
  },
});
