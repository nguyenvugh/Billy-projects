import { ProductFieldsTranslate } from '../constants/product-translate.constant';
import { InventoryProduct } from '../../inventory/schemas/inventory-product.schema';

export const processProductTranslateData = (translateData: any[]) => {
  const processedData: any = {};
  if (!translateData || !translateData.length) {
    return processedData;
  }
  translateData.forEach((data) => {
    if (data.hasOwnProperty('language_code')) {
      const code = data['language_code'];
      if (!processedData.hasOwnProperty(code)) {
        processedData[code] = {};
      }
      ProductFieldsTranslate.forEach((field) => {
        if (data.hasOwnProperty(field)) {
          processedData[code][field] = data[field];
        }
      });
    }
  });

  return processedData;
};

export const reCalculateNumberRemainProductInInventories = (
  data: InventoryProduct[],
) => {
  if (!data || !data.length) {
    return data;
  }
  data = data.map((item) => {
    if (!item.inventory) {
      item.remaining_number = 0;
    }
    return item;
  });

  return data;
};
