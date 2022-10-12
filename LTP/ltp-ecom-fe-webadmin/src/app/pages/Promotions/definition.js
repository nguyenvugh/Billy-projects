export const PROMOTION_TYPES = ['', 'Campaign', 'Sản phẩm'];
export const PROMOTION_EN_TYPES = ['', 'Campaign', 'Product'];
export const PROMOTION_STATUS_TYPES = ['Đang diễn ra', 'Sắp diễn ra', 'Đã kết thúc'];
export const STATUS_COLORS = ['#00B41D', '#E11B1B', '#FFC043'];

export const promoCommonStructure = {
  promo_type: '',
  promo_name: '',
  promo_button: '',
  promo_startDate: '',
  promo_endDate: '',
  promo_description: '',
  promo_image: '',
  promo_active: true
};

export const promoProductType = {
  ...promoCommonStructure,
  promo_product: '',
  promo_price: '',
  promo_discount: '',
  promo_reducePrice: '',
  promo_reducedPrice: '',
};

export const promoCampaignType = {
  ...promoCommonStructure,
  promo_link: '',
};

export const promotionForms = {
  [PROMOTION_TYPES[1]]: promoCampaignType,
  [PROMOTION_TYPES[2]]: promoProductType
};

export const LABELS_VI = {
  promo_type: {
    label: 'Loại',
    placeholder: ''
  },
  promo_name: {
    label: 'Tên promotion',
    placeholder: 'Nhập tên promotion'
  },
  promo_description: {
    label: 'Mô tả',
    placeholder: 'Nhập mô tả'
  },
  promo_link: {
    label: 'Link',
    placeholder: 'Nhập Link'
  },
  promo_startDate: {
    label: 'Thời gian bắt đầu',
    placeholder: ''
  },
  promo_endDate: {
    label: 'Thời gian kết thúc',
    placeholder: ''
  },
  promo_timing: {
    label: 'Thời gian diễn ra',
    placeholder: ''
  },
  promo_button: {
    label: 'Nút chọn',
    placeholder: 'Nhập nút chọn',
  },
  promo_image: {
    label: 'Ảnh sản phẩm/campaign',
    placeholder: 'Kéo ảnh vào đây hoặc / (Kích thước ảnh: 1440x767)'
  },
  promo_product: {
    label: 'Sản phẩm',
    placeholder: 'Chọn sản phẩm'
  },
  promo_price: {
    label: 'Giá sản phẩm',
    placeholder: 'Tự cập nhật'
  },
  promo_discount: {
    label: 'Phần trăm giảm',
    placeholder: 'Nhập phần trăm giảm'
  },
  promo_reducePrice: {
    label: 'Giá giảm',
    placeholder: 'Tự cập nhật'
  },
  promo_reducedPrice: {
    label: 'Giá sau giảm',
    placeholder: 'Tự cập nhật'
  },
  promo_active: {
    label: 'Tắt / Mở',
    placeholder: ''
  },

};
export const LABELS_EN = {
  promo_type: {
    label: 'Type',
    placeholder: ''
  },
  promo_name: {
    label: 'Promotion name',
    placeholder: 'Enter promotion name'
  },
  promo_description: {
    label: 'Description',
    placeholder: 'Enter description'
  },
  promo_link: {
    label: 'Link',
    placeholder: 'Enter link'
  },
  promo_startDate: {
    label: 'Start time',
    placeholder: ''
  },
  promo_endDate: {
    label: 'End Time',
    placeholder: ''
  },
  promo_timing: {
    label: 'Timing',
    placeholder: ''
  },
  promo_button: {
    label: 'Button',
    placeholder: 'Enter button',
  },
  promo_image: {
    label: 'Image/campaign',
    placeholder: 'Drag the image here or / (Image size: 1440x767)'
  },
  promo_product: {
    label: 'Product',
    placeholder: 'Select product'
  },
  promo_price: {
    label: 'Product price',
    placeholder: 'Auto update'
  },
  promo_discount: {
    label: '% Discount',
    placeholder: 'Enter discount'
  },
  promo_reducePrice: {
    label: 'Reduce price',
    placeholder: 'Auto update'
  },
  promo_reducedPrice: {
    label: 'Price after discount',
    placeholder: 'Auto update'
  },
  promo_active: {
    label: 'Off / On',
    placeholder: ''
  },
};

// export const LABELS_VI = ['Loại', 'Tên promotion', 'Mô tả', 'Link', 'Thời gian bắt đầu', 'Thời gian kết thúc', 'Thời gian diễn ra ', 'Ảnh sản phẩm/campaign', 'Nút chọn', 'Sản phẩm', 'Giá sản phẩm', 'Phần trăm giảm', 'Giá giảm', 'Giá sau giảm', 'Tắt / Mở'];

// export const LABELS_EN = ['Type', 'Promotion name', 'Description', 'Link', 'Start time', 'End Time', 'Timing', 'Image', 'Button', 'Product', 'Product price', '% Discount', 'Reduce price', 'Price after discount', 'Off / On'];

// export const PLACEHOLDER_VI = ['', 'Nhập tên promotion', 'Nhập mô tả', 'Nhập Link', '', '', '', '', 'Nhập nút chọn', 'Chọn sản phẩm', 'Tự cập nhật', 'Tự cập nhật', 'Tự cập nhật', 'Tự cập nhật', 'Kéo ảnh vào đây hoặc', '(Kích thước ảnh: 1920x1080)'];

// export const PLACEHOLDER_EN = ['', 'Enter promotion name', 'Enter description', 'Enter link', '', '', '', '', 'Enter button', 'Select product', 'Auto update', 'Auto update', 'Auto update', 'Auto update', 'Drag the image here or', '(Image size: 1920x1080)'];


export const columns = [
  {
    id: 1,
    name: 'promotion_thumbnail',
    text: 'Hình ảnh',
    width: '10%'
  },
  {
    id: 2,
    name: 'promotion_name',
    text: 'Tên',
    width: '15%'
  },
  {
    id: 3,
    name: 'promotion_type',
    text: 'Loại',
    width: '10%'
  },
  {
    id: 4,
    name: 'promotion_description',
    text: 'Mô tả',
    width: '25%'
  },
  {
    id: 5,
    name: 'promotion_date',
    text: 'Thời gian',
    width: '15.33%'
  },
  {
    id: 6,
    name: 'promotion_createBy',
    text: 'Người tạo',
    width: '11.33%'
  },
  {
    id: 7,
    name: 'promotion_status',
    text: 'Trạng thái',
    width: '11.33%'
  },
];