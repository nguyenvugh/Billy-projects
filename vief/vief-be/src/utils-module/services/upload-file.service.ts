import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigGetOptions, ConfigService } from '@nestjs/config';
import {
  DeleteObjectsCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import path from 'path';
import { IGlobalConfig } from '../../common/config/global.config';
import { UuidService } from './uuid.service';

@Injectable()
export class UploadService {
  constructor(
    private configService: ConfigService<IGlobalConfig>,
    private httpService: HttpService,
    private uuidService: UuidService,
  ) {}

  async createPresignUrl(bucket: string, key: string) {
    const s3Client = this.getS3();
    const s3Config = this.getS3Config();

    const data = await createPresignedPost(s3Client, {
      Bucket: bucket,
      Key: key,
      Conditions: [
        ['content-length-range', 0, s3Config.maxSize * 1000000], // content length restrictions: 0-30MB
        // ['starts-with', '$Content-Type', 'image/'], // content type restriction
        // ['eq', '$x-amz-meta-userid', userid], // tag with userid <= the user can see this!
      ],
      Expires: s3Config.timeOutMinute * 60, //Seconds before the presigned post expires. 3600 by default.
    });

    return data;
  }

  async deleteFileS3ByKeys(keys: string[]) {
    const s3Client = this.getS3();
    const s3Config = this.getS3Config();
    const deleteCommandInput = keys.map((key) => ({ Key: key }));
    const cmd = new DeleteObjectsCommand({
      Bucket: s3Config.bucket,
      Delete: { Objects: deleteCommandInput },
    });
    const data = await s3Client.send(cmd);
    return data;
  }

  async getObject(key: string) {
    const s3Config = this.getS3Config();
    const s3Client = this.getS3();
    const cmd = new GetObjectCommand({
      Bucket: s3Config.bucket,
      Key: key,
    });
    const data = await s3Client.send(cmd);

    const streamToString = (stream) =>
      new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      });

    const json = await streamToString(data.Body);
    return json;
  }

  async getSignedUrlS3(key: string) {
    const s3Config = this.getS3Config();
    const s3Client = this.getS3();
    const cmd = new GetObjectCommand({
      Bucket: s3Config.bucket,
      Key: key,
    });

    const url = await getSignedUrl(s3Client, cmd, { expiresIn: 3600 });
    return url;
  }

  private getS3() {
    const s3Config = this.getS3Config();
    return new S3Client({
      credentials: {
        accessKeyId: s3Config.accessKeyId,
        secretAccessKey: s3Config.secretAccessKey,
      },
      region: s3Config.region,
    });
  }

  private getS3Config() {
    const option: ConfigGetOptions = {
      infer: true,
    };
    const maxSize = this.configService.get('s3.awsS3LimitSizeMb', option);
    const timeOutMinute = this.configService.get(
      's3.awsS3PresignTimeOut',
      option,
    );
    const accessKeyId = this.configService.get('s3.awsAccessKeyId', option);
    const secretAccessKey = this.configService.get(
      's3.awsSecretAccessKey',
      option,
    );
    const region = this.configService.get('s3.awsS3Region', option);
    const bucket = this.configService.get('s3.awsS3BucketName', option);
    return {
      maxSize,
      timeOutMinute,
      accessKeyId,
      secretAccessKey,
      region,
      bucket,
    };
  }

  private getExtension(filePath: string) {
    let mimetype = path.extname(filePath);
    mimetype = mimetype.split('/').pop();
    mimetype = mimetype.includes('+') ? mimetype.split('+').shift() : mimetype;
    mimetype = mimetype.includes('?') ? mimetype.split('?').shift() : mimetype;
    return mimetype;
  }
}
