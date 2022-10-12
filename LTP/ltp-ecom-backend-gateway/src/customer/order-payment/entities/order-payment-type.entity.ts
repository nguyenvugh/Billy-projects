export class OrderPaymentTypeEntity {
  id: number;

  name: string;

  description: string;

  constructor(partial: Partial<OrderPaymentTypeEntity>) {
    Object.assign(this, partial);
  }
}
