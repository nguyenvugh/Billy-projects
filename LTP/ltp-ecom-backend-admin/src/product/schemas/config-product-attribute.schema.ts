import { TimestampWithSoftDelete } from 'src/common/schemas/timestamp.schema';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  Column,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Product } from '../../product/schemas/product.schema';
import { ProductAttribute } from './product-attribute.schema';

@Entity({
  name: 'config_product_attributes',
})
export class ConfigProductAttribute extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, type: 'varchar' })
  name: string; // Color, Size

  @Column({ length: 20, type: 'varchar', unique: true })
  identity: string; //color, size

  @OneToMany(
    () => ProductAttribute,
    (productAttribute) => productAttribute.attribute,
  )
  attributes: ProductAttribute[];
}
