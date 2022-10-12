export const ROLE_OPTIONS = ['ALL', 'FEATURE', 'NOT_FEATURE', 'WOOD'];

export const TABLE_HEAD = [
  { id: 'thumbnail', label: 'Image', align: 'left' },
  { id: 'title', label: 'Title', align: 'left' },
  { id: 'field', label: 'Field', align: 'left' },
  { id: 'isFeature', label: 'IsFeature', align: 'left' },
  { id: '' },
];

enum LANG {
  VI = 'vi',
  EN = 'en',
}

const LANG_CONST = {
  VI: 'vi',
  EN: 'en',
} as const;

export const defaultValues = {
  thumbnail: null,
  isFeature: false,
  translations: {
    [LANG.VI]: {
      name: '',
      slug: '',
      shortDesc: '',
      content: '',
    },
    [LANG.EN]: {
      name: '',
      slug: '',
      shortDesc: '',
      content: '',
    },
  },
};

const ROLE = {
  ALL: 'all',
  FEATURE: 'Feature',
  NOT_FEATURE: 'not Feature',
  WOOD: 'Wood',
};

const FEATURE_TYPE = {
  HAS_FEATURE: 1,
  NO_FEATURE: -1,
};

const FIELD = {
  WOOD: 'wood',
};

const FILTER_NOT_FOUND_VALUE = -1;

const FORM_DEFAULT_VALUE = {
  thumbnailId: [],
  isFeature: false,
  translations: {
    [LANG.EN]: {
      name: '',
      content: '',
      shortDesc: '',
      slug: '',
    },
    [LANG.VI]: {
      name: '',
      content: '',
      shortDesc: '',
      slug: '',
    },
  },
};

const MAX_NUM_THUMB_UPLOAD = 1;

const TYPE = {
  ENTERPRISE: 'ENTERPRISE',
  POLICY: 'POLICY',
};

export {
  ROLE,
  FEATURE_TYPE,
  FIELD,
  FILTER_NOT_FOUND_VALUE,
  LANG,
  LANG_CONST,
  FORM_DEFAULT_VALUE,
  MAX_NUM_THUMB_UPLOAD,
  TYPE,
};

// export { ROLE, FEATURE_TYPE, FIELD, FILTER_NOT_FOUND_VALUE }
