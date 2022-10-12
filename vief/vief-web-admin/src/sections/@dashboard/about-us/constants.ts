import { LANG } from 'src/common/constants/common.interfaces';

export const defaultValues = {
  thumbnail: null,
  images: [],
  translations: {
    [LANG.VI]: {
      title: '',
      slug: '',
      content: '',
    },
    [LANG.EN]: {
      title: '',
      slug: '',
      content: '',
    },
  },
};
