import { CharityStatusConst } from 'src/common/constants/charity.constant';
import { TimestampWithSoftDelete } from 'src/common/schemas/timestamp.schema';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CharityProduct } from './charity-product.schema';
import { CharityTranslate } from './charity-translate.schema';
import { OrderDetails } from '../../orders/schemas/order-details.schema';

@Entity({
  name: 'charities',
})
export class Charity extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'timestamp' })
  end_date: Date;

  @Column({
    type: 'tinyint',
    default: CharityStatusConst.INACTIVATED,
  })
  status: CharityStatusConst;

  @Column({ type: 'bigint' })
  total: number;

  @OneToMany(
    () => CharityTranslate,
    (charityTranslate) => charityTranslate.charity_obj,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  translates: CharityTranslate[];

  @OneToMany(
    () => CharityProduct,
    (charityProduct) => charityProduct.charity_obj,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  products: CharityProduct[];

  @OneToMany(() => OrderDetails, (orderDetail) => orderDetail.charity, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  order_details: OrderDetails[];
}
