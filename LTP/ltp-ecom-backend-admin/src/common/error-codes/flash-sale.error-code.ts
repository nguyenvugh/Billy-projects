const prefix = 'flashSale::';
export const FlashSaleErrorCodes = {
  [`${prefix}001`]: 'Can not create flash sale',
  [`${prefix}002`]: 'Flash sale not found',
  [`${prefix}003`]: 'status field is required',
  [`${prefix}004`]: 'status not found',
  [`${prefix}005`]: 'product_id field is required',
  [`${prefix}006`]: 'product not found',
  [`${prefix}007`]: 'quantity field is required',
  [`${prefix}008`]: 'percentage field is required',
  [`${prefix}009`]: 'percentage can not be less than 0 or greater than 100',
  [`${prefix}010`]: 'Can not create/edit/delete when flash sale setting is off',
  [`${prefix}011`]: 'This product already in current flash sale',
  [`${prefix}012`]: 'Quantity can not greater than product remaining quantity',
  [`${prefix}013`]: 'start date time can not greater than end date time',
  [`${prefix}014`]: 'Can not change status when program is happening',
};
