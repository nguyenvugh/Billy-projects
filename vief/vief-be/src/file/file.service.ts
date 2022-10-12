import { Injectable } from '@nestjs/common';
import { ConfigGetOptions, ConfigService } from '@nestjs/config';
import { FindConditions, In, IsNull } from 'typeorm';
import { IGlobalConfig } from '../common/config/global.config';
import {
  MapFilePathSupport,
  SupportFileType,
} from '../common/constants/global.constant';
import {
  BadRequestExc,
  ConflictExc,
  NotFoundExc,
} from '../common/exceptions/custom.exception';
import { getNumberArrayValid } from '../common/utils';
import { UploadService } from '../utils-module/services/upload-file.service';
import { UuidService } from '../utils-module/services/uuid.service';
import { CreateFileDto } from './dto/create-file.dto';
import { File } from './entities/file.entity';
import { FileRepository } from './file.repository';

@Injectable()
export class FileService {
  constructor(
    private fileRepository: FileRepository,
    private configService: ConfigService<IGlobalConfig>,
    private uploadService: UploadService,
    private uuidService: UuidService,
  ) {}

  async createPresignUpload(type: SupportFileType, fileName: string) {
    if (!fileName) throw new BadRequestExc('Missing fileName field!');
    const objFolder = MapFilePathSupport.find((obj) => {
      return obj.types.includes(type);
    });
    if (!objFolder) {
      throw new BadRequestExc('file type invalid');
    }

    const s3Config = this.getS3Config();
    const randomStr = this.uuidService.genRandomStr();
    const key = `${objFolder.key}/${randomStr}.${type}`;
    const baseUrl = `https://s3.${s3Config.region}.amazonaws.com/${s3Config.bucket}`;
    // Create file and save to database
    const params: CreateFileDto = {
      key,
      bucket: s3Config.bucket,
      type: type,
      baseUrl,
      fileName,
    };

    const fileInfo = await this.createFile(params);
    const presign = await this.uploadService.createPresignUrl(
      s3Config.bucket,
      key,
    );
    return { fileInfo, presign };
  }

  async deleteMultipleFiles(ids: number[]) {
    const validIds = getNumberArrayValid(ids);
    const files = await this.fileRepository.findByIds(validIds);
    const s3Keys = files.map((file) => file.key);
    await this.uploadService.deleteFileS3ByKeys(s3Keys);
    return await this.fileRepository.softRemove(files);
  }

  async getDownloadFileUrl(key: string) {
    const file = await this.findOneWith({ key });
    if (!file) throw new NotFoundExc('File not found!');
    const url = await this.uploadService.getSignedUrlS3(key);
    return {
      fileName: file.fileName,
      type: file.type,
      url,
    };
  }

  async getDownloadFileUrlFromFile(file: File) {
    const url = await this.uploadService.getSignedUrlS3(file.key);
    return {
      key: file.key,
      url,
    };
  }

  async createFile(createFileDto: CreateFileDto) {
    const { key } = createFileDto;
    const exist = await this.findOneWith({ key });
    if (exist) throw new ConflictExc(`${key}`);

    const newFileAdmin = this.fileRepository.create(createFileDto);
    return await this.fileRepository.save(newFileAdmin);
  }

  async findOneWith(opts: FindConditions<File>) {
    const paramsSearch = {
      ...opts,
      deletedAt: IsNull(),
    } as FindConditions<File>;
    const exist = await this.fileRepository.findOne({
      where: paramsSearch,
    });
    return exist;
  }

  async findOneOrError(id: number) {
    const exist = await this.fileRepository.findOne(id);
    if (!exist) throw new NotFoundExc('File id is not exist!');
    return exist;
  }

  async findManyOrError(ids: number[]) {
    const exist = await this.fileRepository
      .createQueryBuilder()
      .where({
        id: In(ids),
      })
      .getMany();
    if (exist.length <= 0) throw new NotFoundExc();
    return exist;
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
}
