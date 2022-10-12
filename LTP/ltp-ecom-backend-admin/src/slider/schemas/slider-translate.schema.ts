import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Index,
  JoinColumn,
} from 'typeorm';
import { Slider } from './slider.schema';

@Entity({
  name: 'sliders_translates',
})
export class SliderTranslate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'slider', type: 'int' })
  slider: number;

  @ManyToOne(() => Slider, (slider) => slider.translates)
  @Index()
  @JoinColumn([
    {
      name: 'slider',
      referencedColumnName: 'id',
    },
  ])
  slider_obj: Slider;

  @Column({ length: 10, type: 'varchar' })
  language_code: string;

  @Column({ length: 255, type: 'varchar' })
  language_field: string;

  @Column({ type: 'mediumtext' })
  language_value: string;
}
