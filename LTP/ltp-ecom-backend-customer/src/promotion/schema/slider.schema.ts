import {
  SliderStatusConst,
  SliderTypeConst,
} from '../../common/constants/slider.constant';
import { MediaUpload } from '../../media-upload/schema/media-upload.schema';
import { Product } from '../../product/schema/product.schema';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { SliderTranslate } from './slider-translate.schema';
import { OrderDetail } from '../../order-detail/schema/order-detail.schema';

@Entity({
  name: 'sliders',
})
export class Slider extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'tinyint',
    name: 'type',
    default: SliderTypeConst.CAMPAIGN,
  })
  type: SliderTypeConst;

  @Column({ type: 'int' })
  thumbnail: number;

  @OneToOne(() => MediaUpload)
  @JoinColumn({
    name: 'thumbnail',
  })
  thumbnail_obj: MediaUpload;

  @Column({ type: 'varchar' })
  link: string;

  @Column({
    name: 'product',
    type: 'int',
  })
  product: number;

  @ManyToOne(() => Product)
  @JoinColumn([
    {
      name: 'product',
      referencedColumnName: 'id',
    },
  ])
  product_obj: Product;

  @Column({
    type: 'int',
  })
  percentage: number;

  @Column({ type: 'varchar' })
  start_date: string;

  @Column({ type: 'varchar' })
  start_time: string;

  @Column({ type: 'varchar' })
  end_date: string;

  @Column({ type: 'varchar' })
  end_time: string;

  @Column({ type: 'varchar' })
  buy_button: string;

  @Column({
    type: 'tinyint',
    unsigned: true,
    default: SliderStatusConst.ON,
  })
  is_active: SliderStatusConst;

  @Column({
    type: 'tinyint',
  })
  deleted: number;

  @Column({
    type: 'timestamp',
  })
  deleted_at: Date;

  @Column({
    type: 'int',
  })
  deleted_by: number;

  @OneToMany(
    () => SliderTranslate,
    (sliderTranslate) => sliderTranslate.slider_obj,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  translates: SliderTranslate[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.promotion, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  order_details: OrderDetail[];
}
