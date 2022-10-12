import { EntityRepository, Repository } from 'typeorm';
import { Slider } from '../schemas/slider.schema';

@EntityRepository(Slider)
export class SliderRepository extends Repository<Slider> { }
