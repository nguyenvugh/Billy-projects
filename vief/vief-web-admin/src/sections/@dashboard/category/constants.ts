export const ROLE_OPTIONS = ['ALL', 'FEATURE', 'NOT_FEATURE', 'WOOD'];
export const TABLE_HEAD = [
  { id: 'thumbnail', label: 'Image', align: 'left' },
  { id: 'name', label: 'Title', align: 'left' },
  { id: 'field', label: 'Field', align: 'left' },
  { id: 'isFeature', label: 'IsFeature', align: 'left' },
  { id: '' },
];

export enum LANG {
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

