import { isAllAttributesIsEmpty } from 'src/utils/checkAllAttributesIsEmpty';
import * as Yup from 'yup';
import { LANG } from '../constants';
import { IFormTranslations } from '../interface';

const validationObject: any = {};
const TranslateObjectSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  slug: Yup.string().required('Slug is required'),
  shortDesc: Yup.string().required('Short description is required'),
  content: Yup.string().required('Content is required'),
});

export const NewPolicySchema = Yup.object().shape({
  thumbnail: Yup.mixed().required('Thumbnail is required'),
  author: Yup.string().required('author is required'),
  category: Yup.object().shape({ value: Yup.number().min(1,'category is required').required() }),
  images: Yup.array().min(1,'Images is required').of(Yup.mixed().required()),
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
