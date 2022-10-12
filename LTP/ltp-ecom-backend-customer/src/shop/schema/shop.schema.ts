import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ShopWorkingDateConst } from '../../common/constants/shop.constant';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { City } from '../../city/schema/city.schema';
import { District } from '../../district/schema/district.schema';
import { MediaUpload } from '../../media-upload/schema/media-upload.schema';
import { Ward } from '../../ward/schema/ward.schema';

@Entity({
  name: 'shops',
})
export class Shop extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    name: 'thumbnail',
  })
  thumbnail_id: number;

  @OneToOne(() => MediaUpload)
  @JoinColumn({
    name: 'thumbnail',
  })
  thumbnail: MediaUpload;

  @Column({ length: 255, type: 'varchar' })
  @Index()
  name: string;

  @Column({ length: 255, type: 'varchar' })
  @Index()
  phone_number: string;

  @Column({ length: 255, type: 'varchar' })
  email: string;

  @Column({ length: 255, type: 'varchar' })
  fax: string;

  @Column({ length: 30, type: 'varchar' })
  lat: string;

  @Column({ length: 30, type: 'varchar' })
  long: string;

  @Column({ length: 5, type: 'varchar' })
  start_working_time: string;

  @Column({ length: 5, type: 'varchar' })
  end_working_time: string;

  @Column({ type: 'tinyint', default: ShopWorkingDateConst.MONDAY })
  start_working_date: ShopWorkingDateConst;

  @Column({ type: 'tinyint', default: ShopWorkingDateConst.MONDAY })
  end_working_date: ShopWorkingDateConst;

  @Column({ length: 255, type: 'varchar' })
  address: string;

  @Column({
    type: 'int',
    name: 'city',
  })
  @Index()
  city_id: number;

  @ManyToOne(() => City)
  @JoinColumn({
    name: 'city',
  })
  city: City;

  @Column({
    type: 'int',
    name: 'district',
  })
  @Index()
  district_id: number;

  @ManyToOne(() => District)
  @JoinColumn({
    name: 'district',
  })
  district: District;

  @Column({
    type: 'int',
    name: 'ward',
  })
  @Index()
  ward_id: number;

  @ManyToOne(() => Ward)
  @JoinColumn({
    name: 'ward',
  })
  ward: Ward;
}
