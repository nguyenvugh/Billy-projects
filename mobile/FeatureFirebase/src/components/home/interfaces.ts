export type TimeUnit = 'day' | 'hours' | 'minutes';
export type Emotion =
  | 'like'
  | 'love'
  | 'cute'
  | 'haha'
  | 'wow'
  | 'sad'
  | 'angry';

export type IconEmotion = Record<Emotion, string>;

export interface Article {
  avatarUrl: string;
  name: string;
  time: number;
  timeUnit: TimeUnit;
  content: string;
  image: string;
  emotions: Emotion[];
  interactNumber: number;
  commentNumber: number;
  sharingNumber: number;
  feeling: string;
}
