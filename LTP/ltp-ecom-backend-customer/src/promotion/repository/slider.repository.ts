import { EntityRepository, Repository } from 'typeorm';
import { Slider } from '../schema/slider.schema';

@EntityRepository(Slider)
export class SliderRepository extends Repository<Slider> {}
