export interface Thumbnail {
  key: string;
  bucket: string;
  type: string;
  uploaderId: string;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  id: string;
  size: number;
  verified: number;
  url?: string;
}

export interface PresignHeader {
  url: string;
  fields: {
    acl: string;
    bucket: string;
    "X-Amz-Algorithm": string;
    "X-Amz-Credential": string;
    "X-Amz-Date": string;
    key: string;
    Policy: string;
    "X-Amz-Signature": string;
  };
}

export interface PresignRes {
  image: Thumbnail;
  presign: PresignHeader;
}
