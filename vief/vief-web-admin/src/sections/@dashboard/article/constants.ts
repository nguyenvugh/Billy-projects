export const ROLE_OPTIONS = ['ALL', 'FEATURE', 'NOT_FEATURE', 'WOOD'];

export const TABLE_HEAD = [
  { id: 'thumbnail', label: 'ThumbnailImage', align: 'left' },
  { id: 'title', label: 'Title', align: 'left' },
  { id: 'field', label: 'Field', align: 'left' },
  { id: 'category', label: 'Category', align: 'left' },
  { id: 'isFeature', label: 'IsFeature', align: 'left' },
  { id: '' },
];

export enum LANG {
  VI = 'vi',
  EN = 'en',
}

export const ROLE = {
  ALL: 'all',
  FEATURE: 'Feature',
  NOT_FEATURE: 'not_Feature',
  WOOD: 'Wood',
}

export const defaultValues = {
  thumbnail: null,
  categoryId:{
    value:0,
    label:'',
  },
  isFeature: false,
  images: [],
  author: '',
  translations: {
    [LANG.VI]: {
      title: '',
      slug: '',
      shortDesc: '',
      content: '',
    },
    [LANG.EN]: {
      title: '',
      slug: '',
      shortDesc: '',
      content: '',
    }
  }
}

export const MAX_NUM_THUMB_UPLOAD = 1;

export const FORM_DEFAULT_VALUE = {
  thumbnailImg: [],
  images: [],
  author: '',
  isFeature: false,
  categoryId: '',
  translations: {
    [LANG.EN]: {
      title: '',
      content: '',
      shortDesc: '',
      slug: '',
    },
    [LANG.VI]: {
      title: '',
      content: '',
      shortDesc: '',
      slug: '',
    },
  },
};

export const FIELD = {
  WOOD: 'WOOD',
};
export const TYPE = {
  ENTERPRISE: 'ENTERPRISE',
};
