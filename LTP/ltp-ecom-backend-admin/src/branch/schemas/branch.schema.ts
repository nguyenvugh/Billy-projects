import { City } from 'src/city/schemas/city.schema';
import { District } from 'src/district/schemas/district.schema';
import { Ward } from 'src/ward/schemas/ward.schema';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';

@Entity({
  name: 'branches',
})
export class Branch extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, type: 'varchar' })
  @Index()
  name: string;

  @Column({ length: 255, type: 'varchar' })
  @Index()
  phone_number: string;

  @Column({ length: 255, type: 'varchar' })
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
