export const ROLE_OPTIONS = ['ALL', 'FEATURE', 'NOT_FEATURE', 'WOOD'];
export const TABLE_HEAD = [
  { id: 'thumbnail', label: 'Thumbnail', align: 'left' },
  { id: 'title', label: 'Title', align: 'left' },
  { id: 'field', label: 'Field', align: 'left' },
  { id: 'category', label: 'Category', align: 'left' },
  { id: 'categorysub', label: 'Sub Category ', align: 'left' },
  { id: 'isFeature', label: 'IsFeature', align: 'left' },
  { id: '' },
];

export enum LANG {
  VI = 'vi',
  EN = 'en',
}
export const defaultValues = {
  thumbnail: null,
  isFeature: false,
  auhtor: '',
  images:[],
  category:{
    value:0,
    label:'',
  },
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
    },
  },
};


export const BREADCUMBS = {
  DASHBOARD: 'Dashboard',
  LIST_POLICY: 'List Policy ',
};
