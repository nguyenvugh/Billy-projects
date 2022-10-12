import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { LangEnum } from '../common/constants/global.constant';
import { NotFoundExc } from '../common/exceptions/custom.exception';
import { getPagingParams, validateDuplicateByField } from '../common/utils';
import { FileService } from '../file/file.service';
import { CreateBannerDto } from './dto/req/create-banner.dto';
import { GetAllBannerDto } from './dto/req/get-all-banner.dto';
import { BannerTranslationRepository } from './repository/banner-translate.repository';
import { BannerRepository } from './repository/banner.repository';

@Injectable()
export class BannerService {
  constructor(
    private bannerRepository: BannerRepository,
    private bannerTranslationRepository: BannerTranslationRepository,
    private fileService: FileService,
  ) {}

  @Transactional()
  async createBanner(banner: CreateBannerDto) {
    const { imageId, translations } = banner;
    validateDuplicateByField('lang', translations);

    const image = await this.fileService.findOneOrError(imageId);
    const newBanner = this.bannerRepository.create(banner);
    newBanner.image = image;

    const trans = translations.map((item) => {
      return this.bannerTranslationRepository.create(item);
    });
    const createdBannerTrans = await this.bannerTranslationRepository.save(
      trans,
    );
    newBanner.translates = createdBannerTrans;
    return await this.bannerRepository.save(newBanner);
  }

  async getAllBannerByAdmin(bannerQuery: GetAllBannerDto) {
    const { page, size, title, ...rest } = bannerQuery;
    const { take, skip } = getPagingParams(page, size);

    const [data, total] = await this.bannerRepository
      .createQueryBuilder('banner')
      .leftJoinAndSelect('banner.translates', 'translates')
      .leftJoinAndSelect('banner.image', 'thumbnail')
      .where((qb) => {
        qb.where({
          ...rest,
        }).andWhere('banner.deletedAt isnull');
        if (title) {
          qb.where('translates.title LIKE :title', {
            title: `%${title}%`,
          }).andWhere('banner.deletedAt isnull');
        }
      })
      .orderBy('banner.id', 'DESC')
      .take(take)
      .skip(skip)
      .getManyAndCount();
    return {
      data,
      total,
    };
  }

  // async getBannerById(id: number) {
  //   const res = await this.bannerRepository.findOne({
  //     where: {
  //       id: id,
  //       deletedAt: IsNull(),
  //     },
  //     relations: ['translates', 'image'],
  //   });
  //   if (!res) throw new NotFoundExc('Banner not exist!');
  //   return res;
  // }

  async deleteBanners(id) {
    const result = await this.bannerRepository.delete({
      id: In(id),
    });
    return result;
  }

  async getAllBannerClient(bannerDto: GetAllBannerDto, lang: LangEnum) {
    const { page, size, title, ...rest } = bannerDto;
    const { take, skip } = getPagingParams(page, size);
    const language = lang ? lang : LangEnum.Vi;

    const [data, total] = await this.bannerRepository
      .createQueryBuilder('banner')
      .leftJoinAndSelect('banner.translates', 'translates')
      .leftJoinAndSelect('banner.image', 'image')
      .where((qb) => {
        qb.where({
          ...rest,
        }).andWhere('translates.lang = :lang', { lang: language });
        if (title) {
          qb.where('translates.title LIKE :title', {
            title: `%${title}%`,
          }).andWhere('translates.lang = :lang', { lang: language });
        }
      })
      .take(take)
      .skip(skip)
      .orderBy('banner.id', 'DESC')
      .getManyAndCount();

    const res = data.map((item) => {
      return {
        ...item,
        //name: item.translates[0].title,
      };
    });

    return {
      data: res,
      total,
    };
  }

  @Transactional()
  async editBanner(editBanner: CreateBannerDto, id: number) {
    const { translations, imageId } = editBanner;
    validateDuplicateByField('lang', translations);

    const image = await this.fileService.findOneOrError(imageId);
    let banner = await this.bannerRepository.findOne({
      relations: ['translates'],
      where: {
        id,
      },
    });
    if (!banner) throw new NotFoundExc();
    banner = {
      ...banner,
      ...editBanner,
      image,
    };
    const trans = await this.bannerTranslationRepository.create(translations);
    banner.translates = trans;
    await this.bannerTranslationRepository.delete({
      banner,
    });
    const res = await this.bannerRepository.save(banner);
    return res;
  }
}
