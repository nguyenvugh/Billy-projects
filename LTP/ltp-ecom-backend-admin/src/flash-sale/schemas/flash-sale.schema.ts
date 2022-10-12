import { Admin } from 'src/admin/schemas/admin.schema';
import { FlashSaleStatusConst } from 'src/common/constants/flash-sale.constant';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { FlashSaleProduct } from './flash-sale-product.schema';

@Entity({
  name: 'flash_sale',
})
export class FlashSale extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: Date;

  @Column({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'timestamp' })
  end_date: Date;

  @Column({
    type: 'tinyint',
    name: 'status',
    default: FlashSaleStatusConst.ON,
  })
  status: FlashSaleStatusConst;

  @Column({ type: 'int' })
  admin: number;

  @ManyToOne(() => Admin)
  @JoinColumn({
    name: 'admin',
  })
  admin_obj: Admin;

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
    () => FlashSaleProduct,
    (flashSaleProduct) => flashSaleProduct.flash_sale_obj,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  products: FlashSaleProduct[];
}
