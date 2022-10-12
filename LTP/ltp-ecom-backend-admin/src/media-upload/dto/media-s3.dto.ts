// This is interface of s3 file response when upload success
export class MediaS3Dto {
  ETag: string;
  Location: string;
  key: string;
  Key: string;
  Bucket: string;
}
