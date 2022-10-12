import { EntityRepository, Repository } from 'typeorm';
import { SliderTranslate } from '../schema/slider-translate.schema';

@EntityRepository(SliderTranslate)
export class SliderTranslateRepository extends Repository<SliderTranslate> {}
