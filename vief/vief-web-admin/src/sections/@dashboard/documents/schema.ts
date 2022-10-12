import { LANG } from 'src/common/constants/common.constants';
import { isAllAttributesIsEmpty } from 'src/utils/checkAllAttributesIsEmpty';
import * as Yup from 'yup';
import { IFormDocumentTranslate } from './interface';

const validationObject: any = {};
const TranslateObjectSchema = Yup.object().shape({
  shortDesc: Yup.string().required('Mô tả được yêu cầu!'),
});

export const documentSchema = Yup.object().shape({
  field: Yup.string().required('Lĩnh vực được yêu cầu!'),
  fileId: Yup.mixed().required('Xin hãy chọn ảnh file!'),
  translations: Yup.lazy((value: IFormDocumentTranslate) => {
    Object.values(LANG).forEach((lang) => {
      if (lang === LANG.vi) {
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
