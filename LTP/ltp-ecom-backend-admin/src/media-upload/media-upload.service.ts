import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { S3 } from 'aws-sdk';
import {
  InternalServerErrorExc,
  NotFoundExc,
  RpcErrorExc,
} from 'src/common/exceptions/custom.exception';
import { v4 as uuidv4 } from 'uuid';
import { MediaS3Dto } from './dto/media-s3.dto';
import { MediaUploadRepository } from './repositories/media-upload.repository';
import { MediaUpload } from './schemas/media-upload.schema';

@Injectable()
export class MediaUploadService {
  constructor(
    private configService: ConfigService,
    private mediaUploadRepo: MediaUploadRepository,
  ) {}

  async deleteFile(id: number) {
    const fileUploaded = await this.mediaUploadRepo.findOne(id);
    if (!fileUploaded) throw new NotFoundExc('File not exist!');

    // Delete file.
    const bucketS3 = this.configService.get<string>('awsS3.bucketName');
    const keyFileS3 = fileUploaded.name;
    return this.deleteS3(bucketS3, keyFileS3, fileUploaded.id);
  }

  async deleteS3(bucketS3: string, keyFileS3: string, idFile: number) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucketS3,
      Key: keyFileS3,
    };

    return new Promise((resolve, reject) => {
      s3.deleteObject(params, async (err, data) => {
        if (err) throw new InternalServerErrorExc('Delete not success');

        await this.mediaUploadRepo.removeOne(idFile);
        resolve('delete success');
      });
    });
  }

  async upload(file: Express.Multer.File) {
    const { originalname } = file;
    const bucketS3 = this.configService.get<string>('awsS3.bucketName');

    return this.uploadS3(file.buffer, bucketS3, originalname);
  }

  async uploadMulti(files: Array<Express.Multer.File>) {
    const uploadFilesPromise = files.map((file) => {
      return this.upload(file);
    });

    const data = await Promise.all(uploadFilesPromise);
    return data;
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
        if (err) throw new InternalServerErrorExc('Upload not success'); //reject(err.message); // Maybe throw the request error here.

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

  async findOne(id: number) {
    return await this.mediaUploadRepo.findOne(id);
  }

  async findTest(id: number) {
    return await this.mediaUploadRepo.findOne(id);
  }
}
