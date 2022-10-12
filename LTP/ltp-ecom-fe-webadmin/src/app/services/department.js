export const getDepartmentList = () => {
  const data = [];
  const createData = (id, dpt_name, dpt_province, dpt_district, dpt_ward, dpt_address, dpt_hotline, dpt_fax, dpt_lng, dpt_lat) => ({
    id, dpt_name, dpt_province, dpt_district, dpt_ward, dpt_address, dpt_hotline, dpt_fax, dpt_lng, dpt_lat
  });

  for (let idx = 0; idx < 10; idx++) {
    data.push(createData(
      idx,
      `Văn phòng ${idx}`,
      'HCM',
      'Quận 3',
      'Phường 12',
      '139 Lý Chính Thắng, P. 12, Q. 1, TP HCM',
      '0123456789',
      '98765433219',
      '106.6409201',
      '10.7597335',

    ));

  }

  return data;
};
