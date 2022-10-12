import * as Yup from 'yup';
import { LANG } from '../constants';
import { isAllAttributesIsEmpty } from 'src/utils/checkAllAttributesIsEmpty';
import { IFormTranslations,ITranslations } from '../interfaces';

const validationObject: any = {};

export const NewArticleSchema = Yup.object().shape({
  thumbnail: Yup.mixed().required('Thumbnail is required'),
  images: Yup.array().min(1,'Images is required').of(Yup.mixed().required()),
  category: Yup.object().shape({ value: Yup.string().required("Category is required") }),
  author: Yup.string().required('Article author is required'), 
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


const TranslateObjectSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  slug: Yup.string().required('Slug is required'),
  shortDesc: Yup.string().required('Short description is required'),
  content: Yup.string()
    .required('Content is required')
    .test('test empty', 'Content is required', (val) => val !== '<p><br></p>'),
});
export const ArticleEnterpriseSchema = Yup.object().shape({
  thumbnailImg: Yup.mixed()
    .required('Thumbnail image is required')
    .test('test thumbImg', 'Thumbnail image is required', (val) => val.length > 0),
  isFeature: Yup.boolean().required('Choose category is featured or not'),
  categoryId: Yup.mixed()
    .required('please choose article category')
    .test('test category', 'please choose article category', (val) => val !== ''),

  author: Yup.string().required('please enter the article author'),
  images: Yup.mixed()
    .required('please upload article image')
    .test('test images', 'Images is required', (val) => val.length > 0),

  translations: Yup.lazy((value: ITranslations) => {
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

