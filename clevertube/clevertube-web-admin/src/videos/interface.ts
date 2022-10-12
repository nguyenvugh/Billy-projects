// VideoList
export interface MenuArr {
  id: number;
  value: string;
}
export interface FilterType {
  search: string;
  filter: {
    level: string[];
    topic: string[];
  };
}

interface ImageThumnail {
  url: string;
  width: number;
  height: number;
}
export interface ItemsType {
  link: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  version: number;
  id: number;
  videoCode: string;
  name: string;
  desc: string;
  length: number;
  isFeature: boolean;
  thumbnails: {
    high: ImageThumnail;
    maxres: ImageThumnail;
    medium: ImageThumnail;
    default: ImageThumnail;
    standard: ImageThumnail;
  };
  videoTypesKey: string;
  levelKey: string;
  videosType: {
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    version: number;
    key: string;
    desc: string;
  };
  level: string | null;
  videosToTopics: VideoToTopic[];
}

interface Topic {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  version: number;
  key: string;
  slug: string;
  description: string;
  translates: [
    {
      createdAt: string;
      updatedAt: string;
      deletedAt: string | null;
      version: number;
      id: number;
      name: string;
      lang: string;
      topicKey: string;
    }
  ];
}
export interface VideoToTopic {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  version: number;
  id: number;
  topicKey: string;
  videosId: number;
  topic: Topic | null;
}

// interface Links {
//   first: string;
//   previous: string;
//   next: string;
//   last: string;
// }
// interface Meta {
//   totalItems: number;
//   itemCount: number;
//   itemsPerPage: number;
//   totalPages: number;
//   currentPage: number;
// }
export interface InitialStateVideoType {
  checkedItem: boolean;
  search: string;
}
// AddEditVideo
export interface VideotranscriptInputType {
  start: string;
  end: string;
  transcript: string;
}

export interface TranscriptVideoType {
  duration: number;
  offset: number;
  text: string;
  highlightWords: string[];
}

export interface InitialStateAddVideoType {
  videoUrl: string;
  name: string;
  desc: string;
  length: number;
  levelId: number;
  topicIds: number[];
  transcripts: TranscriptVideoType[];
}

export interface InitialStateEditVideoType {
  id: string;
  videoUrl: string;
  name: string;
  desc: string;
  length: number;
  levelId: number;
  topicIds: number[];
  transcripts: TranscriptVideoType[];
}

export interface GetVideosParams {
  search?: string;
  page?: number;
  limit?: number;
}
export interface GetTranscriptParams {
  url: string;
  videoType: string;
}
export interface UpdateTranscript {
  text: string;
  duration: number;
  offset: number;
  transcriptId: number;
}

export interface UpdateAttributes {
  levelKey: string;
  name: string;
  desc: string;
  videoId: number;
  isFeature: boolean;
  highlightWords: string[];
  topicKeys: string[];
}

export interface IVideoTranscript {
  content: string;
  createdAt: string;
  deletedAt: string | null;
  updatedAt: string;
  duration: number;
  id: number;
  startTime: number;
  version: number;
  videosId: number;
}
export interface IVideoHighlightWord {
  id: number;
  videoId: number;
  video: string;
  evDictId: number;
  evDict: {
    idx: number;
    word: string;
    detail: string;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  version: number;
}
export interface IVideo extends ItemsType {
  videoHighlightWords: IVideoHighlightWord[];
  videoTranscripts: IVideoTranscript[];
}

export interface TranscriptType {
  videoUrl: string;
  transcripts: ITranscriptEdit[];
}

export interface ITranscriptEdit {
  id: number;
  text: string;
  deletedAt: string | null;
  createdAt: string;
  offset: number;
  duration: number;
  version: number;
  videosId: number;
  updatedAt: string;
}

export interface AttributeTypeEdit {
  name: string;
  desc: string;
  topicKeys: string[];
  levelKey: string;
  isFeature: boolean;
}
export interface AttributeType {
  name: string;
  desc: string;
  topicKeys: string[];
  levelKey: string;
  videoUrl: string;
  highlightWords: string[];
  isFeature: boolean;
  transcripts: ITranscript[];
}
export interface ITranscript {
  text: string;
  duration: number;
  offset: number;
}
