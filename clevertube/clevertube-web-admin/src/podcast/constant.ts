export const COLUMNS = [
  {
    Header: "id",
    accessor: "id",
  },
  {
    Header: "ID",
    accessor: "idAudio",
  },
  {
    Header: "Code",
    accessor: "code",
  },
  {
    Header: "Title",
    accessor: "nameAudio",
  },
  {
    Header: "Level",
    accessor: "nameLevel",
  },
  {
    Header: "Topic",
    accessor: "nameTopic",
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
  audioCode: "",
  audioTypeKey: "",
  title: "",
  desc: "",
  fileId: 0,
  audioThumbnailId: 0,
  topicKeys: [],
  levelKey: "",
};

export const INITIAL_ERROR = {
  fileId: "",
  audioThumbnailId: "",
};
