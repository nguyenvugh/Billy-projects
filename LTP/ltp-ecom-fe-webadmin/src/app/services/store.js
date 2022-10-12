export const getStoreList = () => {
  const data = [];
  const createData = (id, store_name, store_thumbnail, store_phoneNumber, store_province, store_district, store_ward, store_email, store_fax, store_address, store_businessHoursFrom, store_businessHoursTo, store_businessDayFrom, store_businessDayTo, store_lat, store_lng) => ({
    id, store_name, store_thumbnail, store_province, store_phoneNumber, store_district, store_ward, store_email,
    store_businessHoursFrom, store_businessHoursTo, store_businessDayFrom, store_businessDayTo, store_fax, store_address, store_lat, store_lng
  });

  for (let idx = 0; idx < 10; idx++) {
    data.push(createData(
      idx,
      `Cửa hàng ${idx}`,
      'http://localhost:3000/imgs/login-bg.svg',
      '0123456789',
      'HCM',
      'Quận 3',
      'Phường 12',
      'store@gmail.com',
      '98765433219',
      '139 Lý Chính Thắng, P. 12, Q. 1, TP HCM',
      '08:00',
      '17:00',
      'Thứ 2',
      'Thứ 7',
      '123',
      '123'

    ));

  }

  return data;
};
