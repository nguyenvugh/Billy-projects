export const COLUMNS = [
  {
    Header: "id",
    accessor: "id",
  },
  {
    Header: "ID",
    accessor: "idVideo",
  },
  {
    Header: "Code",
    accessor: "code",
  },
  {
    Header: "Thumbnail",
    accessor: "nameThumbnail",
  },
  {
    Header: "Title",
    accessor: "nameTitle",
  },
  {
    Header: "Link",
    accessor: "nameLink",
  },
  {
    Header: "Level",
    accessor: "nameLevel",
  },
  {
    Header: "Topic",
    accessor: "nameTopic",
  },
  {
    Header: "Length",
    accessor: "nameLength",
  },
];

export const INITIAL_STATE = {
  name: "",
  desc: "",
  topicKeys: [],
  levelKey: "",
  videoUrl: "",
  highlightWords: [],
  isFeature: false,
  transcripts: [],
};

export const INITIAL_STATE_TRANSCRIPT = {
  highlightWords: [],
  videoUrl: "",
  transcripts: [],
};

export const INITIAL_STATE_ATTRIBUTES = {
  name: "",
  desc: "",
  topicKeys: [],
  levelKey: "",
  isFeature: false,
};
