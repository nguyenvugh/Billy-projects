import { Injectable } from '@nestjs/common';
import {
  SliderStatusConst,
  SliderTypeConst,
} from '../common/constants/slider.constant';
import { processTranslateData } from '../common/helpers/translate.helper';
import { GetPromotionsSliderHomePageDto } from './dto/get-promotions-slider-home-page.dto';
import { SliderRepository } from './repository/slider.repository';

@Injectable()
export class PromotionService {
  constructor(private sliderRepository: SliderRepository) {}

  async getPromotionsSliderHomePage(reqData: GetPromotionsSliderHomePageDto) {
    const data = await this.getActivatingPromotionQuery()
      .leftJoinAndSelect('slider.thumbnail_obj', 'slider_thumbnail_obj')
      .leftJoinAndSelect('slider.product_obj', 'slider_product_obj')
      .innerJoinAndSelect(
        'slider.translates',
        'slider_translates',
        'language_code= :lang',
        {
          lang: reqData.lang,
        },
      )
      .orderBy({
        promotion_start_at: 'ASC',
      })
      .getMany();
    const results = data.map((item) => {
      const processedTranslate = processTranslateData(item['translates']);
      delete item['translates'];
      return {
        ...item,
        ...processedTranslate[reqData.lang],
      };
    });
    return { results };
  }

  getActivatingPromotionQuery() {
    return (
      this.sliderRepository
        .createQueryBuilder('slider')
        // TODO: make sure condition compatible with RDBMS drivers
        .addSelect(
          'CONVERT_TZ(CAST(CONCAT(start_date, " ", start_time) AS DATETIME), "+00:00", "+07:00") AS promotion_start_at',
        )
        .addSelect(
          'CONVERT_TZ(CAST(CONCAT(end_date, " ", end_time) AS DATETIME), "+00:00", "+07:00") AS promotion_end_at',
        )
        // TODO: check why need using CONVERT_TZ with NOW, server MySQL set timezone already
        .addSelect('CONVERT_TZ(NOW(), "+00:00", "+07:00") AS now')
        .where('slider.is_active = :is_active', {
          is_active: SliderStatusConst.ON,
        })
        // TODO: make sure condition compatible with RDBMS drivers
        .having('promotion_start_at <= now AND now <= promotion_end_at')
    );
  }
}
