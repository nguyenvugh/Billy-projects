const prefix = 'slider::';
export const SliderErrorCodes = {
  [`${prefix}001`]: 'Can not create slider',
  [`${prefix}002`]: 'Slider not found',
  [`${prefix}003`]: 'type field is required',
  [`${prefix}004`]: 'type not found',
  [`${prefix}005`]: 'product_id field is required',
  [`${prefix}006`]: 'product not found',
  [`${prefix}007`]: 'link field is required',
  [`${prefix}008`]: 'percentage field is required',
  [`${prefix}009`]: 'percentage can not be less than 0 or greater than 100',
  [`${prefix}010`]: 'start date time can not greater than end date time',
  [`${prefix}011`]: 'Product already linked with other promotion',
};
