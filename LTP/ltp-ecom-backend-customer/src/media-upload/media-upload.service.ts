import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { RpcExc } from '../common/exceptions/custom.exception';
import { MediaS3Dto } from './dto/media-s3.dto';
import { MediaUploadRepository } from './repository/media-upload.repository';
import { MediaUpload } from './schema/media-upload.schema';

@Injectable()
export class MediaUploadService {
  constructor(
    private configService: ConfigService,
    private mediaUploadRepo: MediaUploadRepository,
  ) {}

  async upload(file: Express.Multer.File) {
    const { originalname } = file;
    const bucketS3 = this.configService.get<string>('awsS3.bucketName');

    const fileUploaded = await this.uploadS3(
      file.buffer,
      bucketS3,
      originalname,
    );
    return this.mediaUploadRepo.save(fileUploaded);
  }

  uploadS3(fileBuffer, bucket, name) {
    const s3 = this.getS3();
    const base64data = Buffer.from(fileBuffer, 'binary');
    const randomStr = uuidv4();
    const keyFile = `${randomStr}-${name}`;
    const params = {
      Bucket: bucket,
      Key: keyFile,
      Body: base64data,
    };

    // return s3.putObject(params).promise();
    // return s3.upload(params).promise();
    return new Promise((resolve, reject) => {
      s3.upload(params, async (err, data: MediaS3Dto) => {
        if (err) {
          throw new RpcExc(`internal:Upload not success`);
        } //reject(err.message); // Maybe throw the request error here.

        /**
         * Need to save to database too: Key, location, bucket, ETag, key
         * name = key, url = location in aws s3 response.
         */
        const params = {
          name: data.Key,
          url: data.Location,
        };

        const media = await this.mediaUploadRepo.create(params);
        resolve(media);
      });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: this.configService.get<string>('awsS3.accessKeyId'),
      secretAccessKey: this.configService.get<string>('awsS3.secretAccessKey'),
    });
  }
}
