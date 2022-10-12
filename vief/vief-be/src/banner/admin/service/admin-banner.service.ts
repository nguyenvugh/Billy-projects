import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { In, Like, FindManyOptions, Brackets, FindOneOptions } from 'typeorm';
import {
  NotFoundExc,
  BadRequestExc,
} from '../../../common/exceptions/custom.exception';
import {
  LangEnum,
  DEPARTMENT_NAME,
} from '../../../common/constants/global.constant';
import {
  AdminFieldValidateMessages,
  AdminValidateMessage,
} from '../../../common/constants/validate.constant';
import { GroupRequiredDto } from '../../../common/dto/req/field/group-required.dto';
import {
  validateDataCreateBannerTranslate,
  validateDataUpdateBannerTranslate,
} from '../../../common/helpers/banner.helper';
import {
  validateDataCreateImageTranslate,
  validateDataUpdateImageTranslate,
} from '../../../common/helpers/file.helper';
import { validateGroupOfData } from '../../../common/helpers/group-data-table.helper';
import {
  generateMapDataWithKeyFieldPair,
  getPagingParams,
} from '../../../common/utils';
import { AdminGetBannersDto } from '../dto/req/admin-get-banners.dto';
import { AdminGetBannerDto } from '../dto/req/admin-get-banner.dto';
import { AdminCreateBannerDto } from '../dto/req/admin-create-banner.dto';
import { AdminCreateBannersDto } from '../dto/req/admin-create-banners.dto';
import { AdminUpdateBannerDto } from '../dto/req/admin-update-banner.dto';
import { AdminSortingBannersDto } from '../dto/req/admin-sorting-banners.dto';
import { BannerRepository } from '../../repository/banner.repository';
import { BannerTranslationRepository } from '../../repository/banner-translate.repository';
import { FileRepository } from '../../../file/file.repository';
import { ImageTranslationRepository } from '../../../file/repository/image-translation.repository';
import { Banner } from '../../entities/banner.entity';
import { ImageWithDownloadUrl } from '../../../file/entities/file.entity';
import { FileService } from '../../../file/file.service';

@Injectable()
export class AdminBannerService {
  constructor(
    private bannerRepo: BannerRepository,
    private bannerTranslationRepo: BannerTranslationRepository,
    private fileRepo: FileRepository,
    private imageTranslationRepo: ImageTranslationRepository,
    private fileService: FileService,
  ) {}

  async getBanners(req: AdminGetBannersDto) {
    const { page, limit, search, group } = req;
    // Load messages
    const groupInvalidMsg = AdminFieldValidateMessages.group.invalid;
    // Validate group
    if (false == validateGroupOfData(group)) {
      throw new BadRequestExc(`${groupInvalidMsg}`);
    }
    // Load data
    const { take, skip } = getPagingParams(page, limit);
    const query: FindManyOptions<Banner> = {
      join: {
        alias: 'banner',
        leftJoinAndSelect: {
          banner_translate: 'banner.translates',
          banner_image: 'banner.image',
          banner_image_translate: 'banner_image.imageTranslates',
        },
      },
      where: (qb) => {
        qb.where({
          group,
        });
        if (search) {
          qb.andWhere(
            new Brackets((qb) => {
              // TODO: update when migrate to another db driver
              qb.where('banner_translate.head_title ILIKE :headTitleSearch', {
                headTitleSearch: `%${search}%`,
              });
              // TODO: update when migrate to another db driver
              qb.orWhere('banner_translate.sub_title ILIKE :subTitleSearch', {
                subTitleSearch: `%${search}%`,
              });
            }),
          );
        }
      },
      order: {
        sorting: 'ASC',
        createdAt: 'DESC',
      },
      skip: skip,
      take: take,
    };
    const [results, total] = await Promise.all([
      this.bannerRepo.find(query),
      this.bannerRepo.count(query),
    ]);
    const data = await this.getDownloadUrlOfBannerImages(results);

    return {
      data,
      total,
    };
  }

  async getBanner(id: number, req: AdminGetBannerDto) {
    const { group } = req;
    // Load messages
    const groupInvalidMsg = AdminFieldValidateMessages.group.invalid;
    const idNotFoundMsg = AdminFieldValidateMessages.id.not_found;
    // Validate
    if (false == validateGroupOfData(group)) {
      throw new BadRequestExc(`${groupInvalidMsg}`);
    }
    if (!id) {
      throw new NotFoundExc(`${idNotFoundMsg}`);
    }
    // Load data
    const query: FindOneOptions<Banner> = {
      join: {
        alias: 'banner',
        leftJoinAndSelect: {
          banner_translate: 'banner.translates',
          banner_image: 'banner.image',
          banner_image_translate: 'banner_image.imageTranslates',
        },
      },
      where: (qb) => {
        qb.where({
          group,
          id,
        });
      },
    };
    const result = await this.bannerRepo.findOne(query);
    if (!result) {
      throw new NotFoundExc(`${idNotFoundMsg}`);
    }
    const data = await this.getDownloadUrlOfBannerImages([result]);

    return {
      data: data[0],
    };
  }

  @Transactional()
  async createBanners(req: GroupRequiredDto, body: AdminCreateBannersDto) {
    // Load messages
    const createBannerFailMsg = AdminValidateMessage.banner.create.fail;
    const groupInvalidMsg = AdminFieldValidateMessages.group.invalid;
    const imageIdNotFoundMsg = AdminFieldValidateMessages.id.image.not_found;
    const data = body.items;
    // Validate data create
    if (false == validateGroupOfData(req.group)) {
      throw new BadRequestExc(`${groupInvalidMsg}`);
    }
    this.validateDataCreateBanners(data);
    // Validate image ids
    const imageIds: any[] = [];
    data.forEach((item) => {
      imageIds.push(item.image.id);
    });
    const images = await this.fileRepo.findByIds(imageIds);
    if (!images || imageIds.length != images.length) {
      throw new BadRequestExc(`${imageIdNotFoundMsg}`);
    }
    const mapImageKeysById = generateMapDataWithKeyFieldPair(
      images,
      'id',
      'key',
    );
    // Save data
    const dataUpdateBanners: any[] = [];
    data.forEach((item) => {
      const imageKey = mapImageKeysById[item.image.id];
      dataUpdateBanners.push({
        group: DEPARTMENT_NAME.WOOD,
        image: {
          id: item.image.id,
          // set key in here to can get key of image from data saved
          key: imageKey,
          imageTranslates: item.image.translates,
        },
        translates: item.translates,
      });
    });
    const bannersCreated: Banner[] = await this.bannerRepo.save(
      dataUpdateBanners,
    );
    if (!bannersCreated) {
      throw new BadRequestExc(`${createBannerFailMsg}`);
    }
    // Load download url of images
    const dataWithDownloadUrl = await this.getDownloadUrlOfBannerImages(
      bannersCreated,
    );

    return {
      data: dataWithDownloadUrl,
    };
  }

  @Transactional()
  async updateBanner(
    id: number,
    req: AdminGetBannerDto,
    data: AdminUpdateBannerDto,
  ) {
    // Load messages
    const updateBannerFailMsg = AdminValidateMessage.banner.update.fail;
    const groupInvalidMsg = AdminFieldValidateMessages.group.invalid;
    const imageIdNotFoundMsg = AdminFieldValidateMessages.id.image.not_found;
    const idNotFoundMsg = AdminFieldValidateMessages.id.banner.not_found;
    // Validate data
    if (false == validateGroupOfData(req.group)) {
      throw new BadRequestExc(`${groupInvalidMsg}`);
    }
    if (!id) {
      throw new NotFoundExc(`${idNotFoundMsg}`);
    }
    this.validateDataUpdateBanner(data, id);
    // Validate banner id
    const bannerGet = await this.bannerRepo.findOne({
      where: {
        id,
        group: req.group,
      },
    });
    if (!bannerGet) {
      throw new NotFoundExc(`${idNotFoundMsg}`);
    }
    // Validate image id
    const image = await this.fileRepo.findOne({
      where: {
        id: data.image.id,
      },
    });
    if (!image) {
      throw new BadRequestExc(`${imageIdNotFoundMsg}`);
    }
    // Delete old translate data of lang update
    const imageTransLangsDelete: any[] = [];
    const bannerTransLangsDelete: any[] = [];
    const newBannerTransData = data.translates.map((element) => {
      bannerTransLangsDelete.push(element.lang);

      return {
        ...element,
        bannerId: id,
      };
    });
    const newImageTransData = data.image.translates.map((element) => {
      imageTransLangsDelete.push(element.lang);

      return {
        ...element,
        fileId: data.image.id,
      };
    });
    await Promise.all([
      this.bannerTranslationRepo.delete({
        bannerId: id,
        lang: In(bannerTransLangsDelete),
      }),
      this.imageTranslationRepo.delete({
        fileId: data.image.id,
        lang: In(imageTransLangsDelete),
      }),
    ]);
    // Update with new data
    await Promise.all([
      // Do not use save, use update instead of because sometime save function will insert new record
      this.bannerRepo.update(
        {
          id,
        },
        {
          imageId: data.image.id,
        },
      ),
      this.bannerTranslationRepo.save(newBannerTransData),
      this.imageTranslationRepo.save(newImageTransData),
    ]);

    return await this.getBanner(id, req);
  }

  @Transactional()
  async deleteBanner(id: number, req: AdminGetBannerDto) {
    // Load messages
    const groupInvalidMsg = AdminFieldValidateMessages.group.invalid;
    const idNotFoundMsg = AdminFieldValidateMessages.id.banner.not_found;
    // Validate data
    if (false == validateGroupOfData(req.group)) {
      throw new BadRequestExc(`${groupInvalidMsg}`);
    }
    if (!id) {
      throw new NotFoundExc(`${idNotFoundMsg}`);
    }
    // Validate banner id
    const bannerGet = await this.bannerRepo.findOne({
      where: {
        id,
        group: req.group,
      },
    });
    if (!bannerGet) {
      throw new NotFoundExc(`${idNotFoundMsg}`);
    }
    // Delete
    await this.bannerRepo.softDelete(id);

    return 'ok';
  }

  @Transactional()
  async sortingBanners(req: AdminGetBannerDto, body: AdminSortingBannersDto) {
    // Load messages
    const groupInvalidMsg = AdminFieldValidateMessages.group.invalid;
    const sortingBannerFailMsg = AdminValidateMessage.banner.sorting.fail;
    const idNotFoundMsg = AdminFieldValidateMessages.id.banner.not_found;
    const ids = body.ids;
    // Validate data
    if (false == validateGroupOfData(req.group)) {
      throw new BadRequestExc(`${groupInvalidMsg}`);
    }
    if (!ids || !ids.length) {
      throw new BadRequestExc(`${sortingBannerFailMsg}`);
    }
    // Validate banner ids
    const bannersGet = await this.bannerRepo.findByIds(body.ids, {
      where: {
        group: req.group,
      },
    });
    if (!bannersGet || bannersGet.length != ids.length) {
      throw new NotFoundExc(`${idNotFoundMsg}`);
    }
    // Update sorting of banners
    let sortingBanner = 1;
    const promisesUpdateBanners: any[] = [];
    ids.forEach((id) => {
      promisesUpdateBanners.push(
        this.bannerRepo.update({ id }, { sorting: sortingBanner++ }),
      );
    });
    // Do not use save, use update instead of because sometime save function will insert new record
    await Promise.all(promisesUpdateBanners);

    return 'ok';
  }

  validateDataCreateBanners(data: AdminCreateBannerDto[]) {
    const createBannerFailMsg = AdminValidateMessage.banner.create.fail;
    if (!data || !data.length) {
      throw new BadRequestExc(`${createBannerFailMsg}`);
    }
    data.forEach((item) => {
      this.validateDataUpdateBanner(item);
    });

    return true;
  }

  validateDataUpdateBanner(
    data: AdminCreateBannerDto | AdminUpdateBannerDto,
    idUpdate = 0,
  ) {
    const translateDataEmptyMsg =
      AdminFieldValidateMessages.translate.not_empty;
    const translateDataInvalidMsg =
      AdminFieldValidateMessages.translate.invalid;
    const createTranslateDataInvalidMsg =
      AdminFieldValidateMessages.translate.create.invalid;
    const updateTranslateDataInvalidMsg =
      AdminFieldValidateMessages.translate.update.invalid;
    if (
      !data.image ||
      !data.image.id ||
      !data.image.translates ||
      !data.image.translates.length ||
      !data.translates ||
      !data.translates.length
    ) {
      throw new BadRequestExc(`${translateDataEmptyMsg}`);
    }
    if (idUpdate) {
      if (
        false == validateDataUpdateImageTranslate(data.image.translates) ||
        false == validateDataUpdateBannerTranslate(data.translates)
      ) {
        throw new BadRequestExc(`${updateTranslateDataInvalidMsg}`);
      }
    } else {
      if (
        false == validateDataCreateImageTranslate(data.image.translates) ||
        false == validateDataCreateBannerTranslate(data.translates)
      ) {
        throw new BadRequestExc(`${createTranslateDataInvalidMsg}`);
      }
    }
    // Validate data translate of image and banner are same lang
    const imageTranslateLang = data.image.translates[0].lang;
    const bannerTranslateLang = data.translates[0].lang;
    if (imageTranslateLang != bannerTranslateLang) {
      throw new BadRequestExc(`${translateDataInvalidMsg}`);
    }
    // TODO: validate data translate of image if are updating banner but create new image

    return true;
  }

  async getDownloadUrlOfBannerImages(data: Banner[]) {
    if (!data || !data.length) {
      return data;
    }
    const promisesGetFileDownloadUrl: any[] = [];
    data.forEach((bannerCreated) => {
      promisesGetFileDownloadUrl.push(
        this.fileService.getDownloadFileUrlFromFile(bannerCreated.image),
      );
    });
    const fileDownloadUrls = await Promise.all(promisesGetFileDownloadUrl);
    const mapFileDownloadUrlsByKey = generateMapDataWithKeyFieldPair(
      fileDownloadUrls,
      'key',
      'url',
    );
    const dataReturn = data.map((bannerCreated) => {
      let fileDownloadUrl = '';
      if (mapFileDownloadUrlsByKey.hasOwnProperty(bannerCreated.image.key)) {
        fileDownloadUrl = mapFileDownloadUrlsByKey[bannerCreated.image.key];
      }
      const fileWithDownloadUrl: ImageWithDownloadUrl = {
        ...bannerCreated.image,
        url: fileDownloadUrl,
      };

      return {
        ...bannerCreated,
        image: fileWithDownloadUrl,
      };
    });

    return dataReturn;
  }
}
