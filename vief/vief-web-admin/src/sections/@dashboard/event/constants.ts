// event table filter definition
export const ROLE_OPTIONS = ['ALL', 'FEATURE', 'NOT_FEATURE', 'WOOD'];

// event table header definition
export const TABLE_HEAD = [
  { id: 'thumbnail', label: 'Image', align: 'left' },
  { id: 'title', label: 'Title', align: 'left' },
  { id: 'field', label: 'Field', align: 'left' },
  { id: 'location', label: 'Location', align: 'left' },
  { id: 'timeStart', label: 'Start Time', align: 'left' },
  { id: 'isFeature', label: 'Feature', align: 'left' },
  { id: 'viewList', label: 'View list register', align: 'left' },
  { id: '' },
];

export const TABLE_HEAD_REGISTER_EVENT = [
  { id: 'fullName', label: 'Full name', align: 'left' },
  { id: 'phone', label: 'Phone', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: '' },
];

export enum LANG {
  VI = 'vi',
  EN = 'en',
}
export const defaultValues = {
  thumbnail: null,
  isFeature: false,
  location: '',
  timeStart: new Date(),
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
