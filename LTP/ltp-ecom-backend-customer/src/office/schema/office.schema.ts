import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { City } from '../../city/schema/city.schema';
import { District } from '../../district/schema/district.schema';
import { Ward } from '../../ward/schema/ward.schema';

@Entity({
  name: 'branches',
})
export class Office extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, type: 'varchar' })
  @Index()
  name: string;

  @Column({ length: 20, type: 'varchar' })
  @Index()
  phone_number: string;

  @Column({ length: 20, type: 'varchar' })
  fax: string;

  @Column({ length: 30, type: 'varchar' })
  lat: string;

  @Column({ length: 30, type: 'varchar' })
  long: string;

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
