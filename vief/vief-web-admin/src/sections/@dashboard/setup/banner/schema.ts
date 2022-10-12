import * as Yup from 'yup';

export const BannerSchema = Yup.object().shape({
  title: Yup.string().required('Xin hãy nhập tiêu!').max(255, 'Tiêu đề quá dài!'),
  subTitle: Yup.string().required('Xin hãy nhập tiêu con!').max(255, 'Tiêu đề con quá dài!'),
  shortDesc: Yup.string()
    .min(10, 'Mô tả phải ít nhất 10 kí tự!')
    .max(5000, 'Mô tả phải nhỏ hơn 5000 kí tự!'),
  link: Yup.string().required('Xin hãy nhập liên kết!').max(255, 'Liên kêt quá dài!'),
  image: Yup.mixed().required('Xin hãy chọn ảnh đại diện!'),
});
