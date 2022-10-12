import { Injectable } from '@nestjs/common';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { ConfigService } from '@nestjs/config';
import { IGlobalConfig } from '../../common/config/global.config';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class UploadService {
  constructor(
    private configService: ConfigService<IGlobalConfig>,
    private httpService: HttpService,
  ) {}

  async createPresignUrl(bucket: string, key: string) {
    const s3Client = this.getS3();
    const maxSize = this.configService.get('s3.awsS3LimitSizeMb', {
      infer: true,
    });
    const timeOutMinute = this.configService.get('s3.awsS3PresignTimeOut', {
      infer: true,
    });

    const fieldsPresign = {
      acl: 'public-read',
      // success_action_status: '201',
      // success_action_redirect: 'http://localhost:5000/v1/admin', //WORK
    };

    const data = await createPresignedPost(s3Client, {
      Bucket: bucket,
      Key: key,
      Conditions: [
        ['content-length-range', 0, maxSize * 1000000], // content length restrictions: 0-3MB
        // ['starts-with', '$Content-Type', ''], // content type restriction
      ],
      Fields: fieldsPresign,
      Expires: timeOutMinute * 60, //Seconds before the presigned post expires. 3600 by default.
    });

    return data;
  }

  async getObject() {
    // const s3Client = this.getS3();
    // const cmd = new GetObjectCommand({
    //   Bucket: 'my-bucket',
    //   Key: '/readme.txt',
    // });
    // const data = await s3Client.send(cmd);
  }

  /**
   * User this function to upload image from url crawl.
   */
  async uploadFromUrl(url: string) {
    // return this.httpService
    //   .get('https://fakestoreapi.com/products/1')
    //   .pipe(map((res) => res.data));
    const s3Client = this.getS3();

    return this.httpService
      .get(encodeURI(url), {
        responseType: 'arraybuffer',
      })
      .pipe(
        map(async (res) => {
          const bucket = this.configService.get('s3.awsS3BucketName', {
            infer: true,
          });

          const target = {
            ACL: 'public-read',
            Bucket: bucket,
            Key: 'sample-key-6.jpeg',
            Body: res.data,
          };

          try {
            const parallelUploads3 = new Upload({
              client: s3Client,
              params: target,
            });

            parallelUploads3.on('httpUploadProgress', (progress) => {
              console.log('progress', progress);
              return 'success';
            });

            await parallelUploads3.done();
          } catch (e) {
            console.log(e);
          }
        }),
      );
  }

  private getS3() {
    return new S3Client({
      credentials: {
        accessKeyId: this.configService.get('s3.awsAccessKeyId', {
          infer: true,
        }),
        secretAccessKey: this.configService.get('s3.awsSecretAccessKey', {
          infer: true,
        }),
      },
      region: this.configService.get('s3.awsS3Region', { infer: true }),
    });
  }
}
