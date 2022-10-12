import * as Yup from 'yup';
import { LANG_CONST } from './constants';
import { ITranslation } from './interfaces';
const validationObject: any = {};
const TranslateObjectSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  slug: Yup.string().required('Slug is required'),
  shortDesc: Yup.string().required('Short description is required'),
  content: Yup.string()
    .required('Content is required')
    .test('test empty', 'Content is required', (val) => val !== '<p><br></p>'),
});
export const NewCategorySchema = Yup.object().shape({
  thumbnailId: Yup.mixed()
    .required('Thumbnail is required')
    .test('test thumbImg', 'Thumbnail image is required', (val) => val.length > 0),
  isFeature: Yup.boolean().required('Choose category is featured or not'),

  translations: Yup.lazy((value: ITranslation) => {
    Object.values(LANG_CONST).forEach((lang) => {
      if (lang === LANG_CONST.VI) {
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

export const isAllAttributesIsEmpty = (object: any) =>
  !object.name &&
  !object.slug &&
  !object.shortDesc &&
  (!object.content || object.content === '<p><br></p>');
