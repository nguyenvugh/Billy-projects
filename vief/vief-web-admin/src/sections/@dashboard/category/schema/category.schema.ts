import { isAllAttributesIsEmpty } from 'src/utils/checkAllAttributesIsEmpty';
import * as Yup from 'yup';
import { LANG } from '../constants';
import { IFormTranslations } from '../interfaces';

const validationObject: any = {};
const TranslateObjectSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  slug: Yup.string().required('Slug is required'),
  shortDesc: Yup.string().required('Short description is required'),
  content: Yup.string().required('Content is required'),
});

export const CategorySchema = Yup.object().shape({
  thumbnail: Yup.mixed().required('Thumbnail is required'),
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
