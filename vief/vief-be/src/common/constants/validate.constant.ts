export const AdminFieldValidateMessages = {
  email: {
    not_empty: 'Email không được bỏ trống',
    min_length: 'Email tối thiểu 8 ký tự',
    invalid: 'Email không hợp lệ',
    existed: 'Email đã tồn tại',
  },
  page: {
    min: 'Số trang phải lớn hơn 0',
    invalid: 'Số trang không hợp lệ',
  },
  limit: {
    min: 'Số lượng hiển thị phải lớn hơn 0',
    invalid: 'Số lượng hiển thị không hợp lệ',
  },
  id: {
    invalid: 'ID không hợp lệ',
    not_found: 'ID không tồn tại',
    admin: {
      not_found: 'ID tài khoản không tồn tại',
    },
    image: {
      not_found: 'ID ảnh không tồn tại',
      not_empty: 'ID ảnh không được bỏ trống',
    },
    banner: {
      not_found: 'ID banner không tồn tại',
      not_empty: 'ID banner không được bỏ trống',
    },
  },
  password: {
    not_empty: 'Mật khẩu không được bỏ trống',
    min_length: 'Mật khẩu tối thiểu 8 ký tự',
    max_length: 'Mật khẩu tối đa 15 ký tự',
    invalid: 'Mật khẩu không hợp lệ',
  },
  user_type: {
    not_empty: 'Kiểu người dùng không được bỏ trống',
    invalid: 'Kiểu người dùng không hợp lệ',
  },
  translate: {
    not_empty: 'Dữ liệu dịch không được bỏ trống',
    invalid: 'Dữ liệu dịch không hợp lệ',
    create: {
      invalid:
        'Dữ liệu dịch không hợp lệ. Chỉ cho phép nhập dữ liệu dịch của tiếng Việt',
    },
    update: {
      invalid:
        'Dữ liệu dịch không hợp lệ. Chỉ cho phép cập nhật dữ liệu dịch của 1 ngôn ngữ',
    },
  },
  group: {
    not_empty: 'Phải xác định nhóm ngành',
    invalid: 'Nhóm ngành không hợp lệ',
  },
  sorting: {
    not_empty: 'Phải xác định giá trị sắp xếp',
    invalid: 'Giá trị sắp xếp không hợp lệ',
  },
  url: {
    banner: {
      not_empty: 'Liên kết không được bỏ trống',
      min_length: 'Liên kết tối thiểu 2 ký tự',
      max_length: 'Liên kết tối đa 100 ký tự',
    },
  },
  headTitle: {
    not_empty: 'Tiêu đề to không được bỏ trống',
    min_length: 'Tiêu đề to tối thiểu 2 ký tự',
    max_length: 'Tiêu đề to tối đa 100 ký tự',
  },
  subTitle: {
    not_empty: 'Tiêu đề con không được bỏ trống',
    min_length: 'Tiêu đề con tối thiểu 2 ký tự',
    max_length: 'Tiêu đề con tối đa 100 ký tự',
  },
  description: {
    not_empty: 'Mô tả không được bỏ trống',
    banner: {
      min_length: 'Mô tả tối thiểu 2 ký tự',
      max_length: 'Mô tả tối đa 300 ký tự',
    },
  },
  alt: {
    image: {
      not_empty: 'Alt ảnh không được bỏ trống',
      min_length: 'Alt ảnh tối thiểu 2 ký tự',
      max_length: 'Alt ảnh tối đa 255 ký tự',
    },
  },
  title: {
    image: {
      not_empty: 'Tiêu đề ảnh không được bỏ trống',
      min_length: 'Tiêu đề ảnh tối thiểu 2 ký tự',
      max_length: 'Tiêu đề ảnh tối đa 255 ký tự',
    },
  },
  lang: {
    not_empty: 'Ngôn ngữ không được bỏ trống',
    invalid: 'Ngôn ngữ không hợp lệ',
  },
};

export const AdminValidateMessage = {
  admin: {
    create: {
      fail: 'Tạo tài khoản không thành công',
    },
    update: {
      fail: 'Cập nhật tài khoản không thành công',
    },
    delete: {
      fail: 'Xóa tài khoản không thành công',
    },
  },
  banner: {
    create: {
      fail: 'Tạo banner không thành công',
    },
    update: {
      fail: 'Cập nhật banner không thành công',
    },
    delete: {
      fail: 'Xóa banner không thành công',
    },
    sorting: {
      fail: 'Sắp xếp banners không thành công',
    },
  },
};

export const ValidateRegex = {
  password: '^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])([a-zA-Z0-9]+)$',
};
