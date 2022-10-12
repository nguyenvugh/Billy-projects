import { ProductFieldsTranslate } from '../constants/product-translate.constant';
import { roundNumber } from './util.helper';
import { InformationProductWeight } from '../../order-shipping/driver/base.driver';
import { InventoryProduct } from '../../inventory-product/schema/inventory-product.schema';

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

// TODO: tạm để trong helper, sau này sẽ chuyển vào driver ship
/**
 * Calculate product weight by input value by admin and calculated value from dimension
 *
 * @param product
 * @returns product weight (gram)
 */
export const calculateProductWeight = (product: InformationProductWeight) => {
  if (!product) {
    return 0;
  }

  const productWeightInputByAdmin = product.weight;
  // Calculate weight by Gram
  const productWeightCalculateFromDimension = roundNumber(
    (product.height * product.width * product.length * 1000) / 6000,
    0,
  );

  return productWeightInputByAdmin < productWeightCalculateFromDimension
    ? productWeightCalculateFromDimension
    : productWeightInputByAdmin;
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
