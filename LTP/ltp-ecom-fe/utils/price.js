import { convertToDate } from "./date";

export function formatPrice(price, unit) {
  return (price && `${new Intl.NumberFormat("vi-VN").format(price)}${unit || "đ"}`) || `${0}đ`;
}

export const pricingProduct = (product) => {
  let flash_sale = parseFloat(product?.flash_sale?.percentage);
  let promotion = parseFloat(product?.promotion?.percentage);
  let percentage = 1;
  if (flash_sale) {
    const endFlashSale = convertToDate(product?.flash_sale?.end_date);
    let isFlashSale = product?.flash_sale?.id && product?.flash_sale?.quantity > 0;
    if (endFlashSale) {
      isFlashSale = product?.flash_sale?.id && product?.flash_sale?.quantity > 0;
    }
    if (isFlashSale) {
      percentage = 100;
    } else {
      flash_sale = undefined;
    }
  } else if (promotion) {
    const isPromotion = product?.promotion?.id;
    if (isPromotion) {
      percentage = 100;
    } else {
      promotion = undefined;
    }
  }
  return (product?.price / percentage) * (100 - flash_sale || 1) * (100 - promotion || 1);
};
