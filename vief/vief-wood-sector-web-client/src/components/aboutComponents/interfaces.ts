import { BaseEntities } from "@/src/common/interfaces/common.interface";
export interface UnsplashImageResponse {
  raw: string;
  full: string;
  regular: string;
  small: string;
  medium: string;
  large: string;
}
interface UserRespone {
  name: string;
  username: string;
  profile_image: UnsplashImageResponse;
  bio: string;
}

export interface ListImgProps {
  listImg: UnsplashImg[];
  listImgThumb: UnsplashImg[];
}

export interface UnsplashImg extends BaseEntities {
  description: string;
  urls: UnsplashImageResponse;
  categories: string;
  likes: string;
  view: string;
  download: string;
  user: UserRespone;
}

export type PictureItemProp = {
  itemImg: UnsplashImg;
  listImgThumb: UnsplashImg[];
};

export type ItemImgMaster = {
  itemImg: UnsplashImg;
};

export type ThumbnailItemProp = {
  listImgThumb: UnsplashImg[];
};
