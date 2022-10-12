import { TimestampWithSoftDelete } from 'src/common/schemas/timestamp.schema';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  Column,
  JoinColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { Product } from '../../product/schemas/product.schema';
import { ConfigProductAttribute } from './config-product-attribute.schema';
import { ProductAttributeTranslates } from './product-attribute-translate.schema';

@Entity({
  name: 'product_attributes',
})
export class ProductAttribute extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  // @PrimaryColumn()
  // product: number;

  // @PrimaryColumn()
  // attribute: number;

  @OneToMany(
    () => ProductAttributeTranslates,
    (productAttributeTrans) => productAttributeTrans.product_attribute,
    { cascade: ['insert', 'update', 'remove'] },
  )
  translates: ProductAttributeTranslates[];

  @ManyToOne(() => Product, (product) => product.attributes, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'product' })
  product: Product;

  @ManyToOne(
    () => ConfigProductAttribute,
    (configProductAttribute) => configProductAttribute.attributes,
  )
  @JoinColumn({ name: 'attribute' })
  attribute: ConfigProductAttribute;
}
