import { UuidService } from './../../utils-module/service/uuid.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IGlobalConfig } from '../../common/config/global.config';
import { CreateFileAdminDto } from '../dto/create-file-admin.dto';
import { CreatePresignUrlDto } from '../dto/create-presign-url.dto';
import { UpdateFileDto } from '../dto/update-file-admin.dto';
import { UploadService } from './upload.service';
import {
  ConflictExc,
  ForbiddenExc,
  InternalServerErrorExc,
  NotFoundExc,
} from '../../common/exceptions/custom.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { FileAdmin } from '../entities/file-admin.entity';
import { FindConditions, Repository } from 'typeorm';
import { AdminJwtDto } from '../../auth/dto/admin-jwt.dto';
import { FindFileAdminDto } from '../dto/find-file-admin.dto';
import { MapFilePathSupport } from '../../common/constants/global.constant';
import { UserJwtDto } from 'src/auth/dto/req/user-jwt.dto';

@Injectable()
export class FileAdminService {
  constructor(
    private configService: ConfigService<IGlobalConfig>,
    private uploadService: UploadService,
    private uuidService: UuidService,
    @InjectRepository(FileAdmin)
    private fileAdminRepo: Repository<FileAdmin>,
  ) {}

  async createPresignUpload(
    createPresignUrlDto: CreatePresignUrlDto,
    user: UserJwtDto,
  ) {
    const { type } = createPresignUrlDto;
    // define key path and bucket here.
    const bucket = this.configService.get('s3.awsS3BucketName', {
      infer: true,
    });
    const region = this.configService.get('s3.awsS3Region', { infer: true });
    const randomStr = this.uuidService.genRandomStr();

    // Check if type is in name folder, We need to check type, to detect file from image/video/pdf
    const objFolder = MapFilePathSupport.find((obj) => {
      return obj.types.includes(type);
    });
    if (!objFolder) {
      throw new InternalServerErrorExc();
    }

    const key = `${objFolder.key}/${user.userTypeKey.toLowerCase()}/${
      user.id
    }/${randomStr}.${type}`;
    const baseUrl = `https://s3.${region}.amazonaws.com/${bucket}`;
    // Create file and save to database
    const params: CreateFileAdminDto = {
      key,
      bucket,
      uploaderId: user.id,
      type: objFolder.key,
      baseUrl,
    };

    const image = await this.create(params);
    const presign = await this.uploadService.createPresignUrl(bucket, key);
    return { image, presign };
  }

  async create(createFileDto: CreateFileAdminDto) {
    const { key } = createFileDto;
    const exist = await this.findOneWith({ key });
    if (exist) throw new ConflictExc(`${key}`);

    const newFileAdmin = this.fileAdminRepo.create(createFileDto);
    return await this.fileAdminRepo.save(newFileAdmin);
  }

  async findAll(params: FindFileAdminDto) {
    const { limit: take, page } = params;
    const skip = (page - 1) * take;
    const [results, total] = await this.fileAdminRepo.findAndCount({
      skip,
      take,
    });

    return { results, total };
  }

  async findOne(id: number) {
    return await this.fileAdminRepo.findOne(id);
  }

  async updateWith(updateFileDto: UpdateFileDto) {
    const { size, verified, key, awsLambdaSecret } = updateFileDto;
    const awsLambdaSecretEnv = this.configService.get(
      'lambda.awsLambdaSecret',
      {
        infer: true,
      },
    );
    if (awsLambdaSecret !== awsLambdaSecretEnv) throw new ForbiddenExc();

    const file = await this.findOneWith({ key });
    if (!file) throw new NotFoundExc(key);

    await this.fileAdminRepo.save({
      id: file.id,
      size,
      verified,
    });

    // return exist and new data?
    // {...exist, size, verified}

    return this.findOneWith({ key });
  }

  async remove(id: string) {
    const exist = await this.findOneOrError(id);
    const data = await this.fileAdminRepo.softRemove(exist);
    return data;
  }

  async findOneOrError(id: string) {
    const exist = await this.fileAdminRepo.findOne(id);
    if (!exist) throw new NotFoundExc('file');
    return exist;
  }

  async findOneWith(opts: FindConditions<FileAdmin>) {
    const exist = await this.fileAdminRepo.findOne({
      where: opts,
    });
    return exist;
  }

  async uploadFromUrl(url: string) {
    return this.uploadService.uploadFromUrl(url);
  }
}
