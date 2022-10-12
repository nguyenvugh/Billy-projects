export type PostsType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
export interface initialState {
  hello: string;
}
export interface PostEditedType {
  id: string;
  namePost: string;
  updatedAt: string;
  content: string;
}
