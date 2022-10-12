const prefix = 'charity::';
export const CharityErrorCodes = {
  [`${prefix}001`]: 'Can not create charity',
  [`${prefix}002`]: 'charity not found',
  [`${prefix}003`]: 'status field is required',
  [`${prefix}004`]: 'status not found',
  [`${prefix}005`]: 'start date time can not greater than end date time',
  [`${prefix}006`]: 'product does not exist',
  [`${prefix}007`]: 'charity product does not exist',
  [`${prefix}008`]: 'charity product already exist',
  [`${prefix}009`]: 'Only can update with happening program',
  [`${prefix}010`]: 'Can not add more than remaining product quantity',
  [`${prefix}011`]: 'Can not change status when program is happening',
};
