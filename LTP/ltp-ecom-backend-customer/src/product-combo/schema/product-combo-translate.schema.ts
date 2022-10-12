import { TimestampWithSoftDelete } from 'src/common/schemas/timestamp.schema';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  Column,
  JoinColumn,
} from 'typeorm';
import { ProductCombo } from './product-combo.schema';

@Entity({
  name: 'product_combo_translates',
})
@Index(['product_combo', 'language_code'], { unique: true })
export class ProductComboTranslate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    name: 'product_combo',
  })
  @Index()
  product_combo_id: number;

  @ManyToOne(() => ProductCombo, (productCombo) => productCombo.translates)
  @JoinColumn({
    name: 'product_combo',
  })
  product_combo: ProductCombo;

  @Column({ length: 10, type: 'varchar' })
  language_code: string;

  @Column({ length: 255, type: 'varchar' })
  name: string;

  @Column({ type: 'text' })
  short_desc: string;

  @Column({ type: 'mediumtext' })
  description: string;
}
