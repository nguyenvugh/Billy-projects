import { City } from 'src/city/schemas/city.schema';
import { ShopWorkingDateConst } from 'src/common/constants/shop.constant';
import { District } from 'src/district/schemas/district.schema';
import { MediaUpload } from 'src/media-upload/schemas/media-upload.schema';
import { Ward } from 'src/ward/schemas/ward.schema';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';

@Entity({
  name: 'shops',
})
export class Shop extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  thumbnail: number;

  @OneToOne(() => MediaUpload)
  @JoinColumn({
    name: 'thumbnail',
  })
  thumbnail_obj: MediaUpload;

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
  cityId: number;

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
  districtId: number;

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
  wardId: number;

  @ManyToOne(() => Ward)
  @JoinColumn({
    name: 'ward',
  })
  ward: Ward;
}
