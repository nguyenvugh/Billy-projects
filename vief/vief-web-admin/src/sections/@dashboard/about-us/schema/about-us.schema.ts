import { LANG } from 'src/common/constants/common.interfaces';
import { isAllAttributesIsEmpty } from 'src/utils/checkAllAttributesIsEmpty';
import * as Yup from 'yup';
import { IFormTranslations } from '../interfaces';

const validationObject: any = {};
const TranslateObjectSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  slug: Yup.string().required('Slug is required'),
  content: Yup.string().required('Content is required'),
});

export const AboutUsSchema = Yup.object().shape({
  thumbnail: Yup.mixed().required('Thumbnail is required'),
  images: Yup.array().min(1, 'Images is required'),
  translations: Yup.lazy((value: IFormTranslations) => {
    Object.values(LANG).forEach((lang) => {
      if (lang === LANG.VI) {
        validationObject[lang] = TranslateObjectSchema;
      } else {
        if (!isAllAttributesIsEmpty(value[lang])) {
          validationObject[lang] = TranslateObjectSchema;
        } else {
          delete validationObject[lang];
        }
      }
    });

    return Yup.object().shape({ ...validationObject });
  }),
});
