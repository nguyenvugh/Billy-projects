import { TimestampWithSoftDelete } from 'src/common/schemas/timestamp.schema';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  Column,
  JoinColumn,
} from 'typeorm';
import { Product } from '../../product/schemas/product.schema';
import { ProductAttribute } from './product-attribute.schema';

@Entity({
  name: 'product_attribute_translates',
})
export class ProductAttributeTranslates {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ProductAttribute,
    (productAttribute) => productAttribute.translates,
  )
  @Index()
  @JoinColumn({
    name: 'product_attribute',
  })
  product_attribute: ProductAttribute;

  @Column({ length: 10, type: 'varchar' })
  language_code: string;

  @Column({ length: 255, type: 'varchar' })
  language_field: string;

  @Column({ type: 'mediumtext' })
  language_value: string;
}
