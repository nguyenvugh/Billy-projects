export const COLUMNS = [
  {
    Header: "Image",
    accessor: "image",
  },
  {
    Header: "Topic ID",
    accessor: "topicKey",
  },
  {
    Header: "Topic Name",
    accessor: "name",
  },
];

export const LIMITS = [
  {
    id: 0,
    value: 10,
  },
  {
    id: 1,
    value: 15,
  },
  {
    id: 2,
    value: 20,
  },
  {
    id: 3,
    value: 25,
  },
  {
    id: 4,
    value: 30,
  },
];

export const INITIAL_STATE = {
  key: "",
  name: "",
  description: "",
  imageId: 0,
  lang: "",
};

export const INITIAL_LENGTH = {
  name: 0,
  description: 0,
};

export const INITIAL_ERROR = {
  imageId: "",
};

export const LANG_OPTIONS: any = [
  { value: "en", label: "English" },
  { value: "vi", label: "Vietnamese" },
];
