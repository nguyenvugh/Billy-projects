/* eslint-disable no-param-reassign */
export function passwordValidation(password) {
  const lowerCaseLetters = /[a-z]/g;
  if (!password.match(lowerCaseLetters)) {
    return false;
  }
  const upperCaseLetters = /[A-Z]/g;
  if (!password.match(upperCaseLetters)) {
    return false;
  }
  if (password.length < 8 || password.length > 16) {
    return false;
  }
  return true;
}
export function emailValidation(email) {
  return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
}

export const errorPassword =
  "Mật khẩu phải từ 8-16 ký tự, bao gồm ít nhất 1 chữ hoa và 1 chữ thường.";
export function isPassword(value) {
  return /^(?=.{8,16})(?=.*[a-z])(?=.*[A-Z]).*$/.test(value);
}

export function isPhone(value) {
  const B = /^(08|09)[0-9]{8}$/;
  const L = /^(03[2-9]|07[06-9]|08[1-5]|05[2689])[0-9]{7}$/;
  const F = /^(02)[0-9]{9}$/;
  return B.test(value) || L.test(value) || F.test(value);
}

export function formatPrice(price) {
  return price
    ?.toString()
    .replace(/[^0-9]/g, "")
    .replace(/^0+/, "")
    .replace(/\d(?=(\d{3})+$)/g, "$&.");
}

export function formatPriceReturnZero(price) {
  if (!price) return 0;
  const formatter = price
    ?.toString()
    .replace(/[^0-9]/g, "")
    .replace(/^0+/, "")
    .replace(/\d(?=(\d{3})+$)/g, "$&.");
  if (String(formatter).length > 0) return formatter;
  return 0;
}

export const isEmpty = (string) => {
  if (typeof string === "string") {
    return string.trim() === "";
  }
  return true;
};

export const convertTranslates = (object) => {
  if (Array.isArray(object?.translates)) {
    object.translates.forEach((item) => {
      object[item?.language_code] = item;
    });
  }
  return object;
};

export const convertTranslatesList = (object) => {
  if (Array.isArray(object?.translates)) {
    object.translates.forEach((item) => {
      object[`${item?.language_code}.${item?.language_field}`] = item?.language_value;
    });
  }
  return object;
};

export const msToTime = (duration) => {
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / 60000) % 60);
  let hours = Math.floor(duration / 3600000);
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${hours}:${minutes}:${seconds}`;
};

export const isCombo = (combo) => !!combo?.details;

export const orderValidateData = (datacart) => {
  const data = [];
  if (Array.isArray(datacart)) {
    datacart.forEach((item) => {
      if (isCombo(item)) {
        if (Array.isArray(item?.details)) {
          item.details.forEach((detail) => {
            data.push({
              productId: detail.product.id,
              number: item.quantity * detail.quantity,
              comboId: item.idProduct || item.id,
              product: {
                status: detail.product?.status_display,
                dimension: {
                  length: detail.product?.length,
                  width: detail.product.width,
                  height: detail.product.height,
                },
                weight: detail.product.weight,
                allow_cod: detail.product.allow_cod,
                contact_nlt: detail.product.contact_nlt,
                price: detail.product.price,
              },
              product_combo: {
                status: item.status,
                number_products: item.number_products,
                total_price: item.total_price,
                detail: {
                  quantity: detail.quantity,
                  percentage: detail.percentage,
                },
              },
            });
          });
        }
      } else {
        const indexProductExist = data.findIndex(
          (el) => +el.productId === (+item.idProduct || +item.id),
        );
        if (indexProductExist != -1) {
          const numberIndex = data[indexProductExist].number;
          data[indexProductExist].number = numberIndex + item.quantity;
        } else {
          const params = {
            productId: item.idProduct || item.id,
            number: item.quantity,
            product: {
              status: item.status_display,
              dimension: {
                length: item.length,
                width: item.width,
                height: item.height,
              },
              weight: item.weight,
              allow_cod: item.allow_cod,
              contact_nlt: item.contact_nlt,
              price: item.price,
            },
          };
          if (item?.flash_sale?.id) {
            params.product.flash_sale = {
              id: item?.flash_sale?.flash_sale_id,
              percentage: item?.flash_sale?.percentage,
              quantity: item?.flash_sale?.quantity,
              end_date: item?.flash_sale?.end_date,
            };
          }
          if (item?.promotion?.id) {
            params.product.promotion = {
              id: item?.promotion?.id,
              percentage: item?.promotion?.percentage,
              quantity: item?.promotion?.quantity,
              end_date: item?.promotion?.end_date,
            };
          }
          data.push(params);
        }
      }
    });
  }
  return data;
};

export const productsOrderParams = (datacart = []) => {
  const cartLength = datacart.length;
  let cartIndex = 0;

  const productList = [];
  const comboIdList = [];
  for (; cartIndex < cartLength; ++cartIndex) {
    const cartItem = datacart[cartIndex];

    if (cartItem?.comboId) {
      cartItem.details.forEach((detail) => {
        const detailParams = {
          comboId: cartItem.comboId,
          productId: detail.product.id,
          number: cartItem.quantity * detail.quantity,
          product: {
            status: detail.product?.status_display,
            dimension: {
              length: detail.product?.length,
              width: detail.product?.width,
              height: detail.product?.height,
            },
            weight: detail.product?.weight,
            allow_cod: detail.product?.allow_cod,
            contact_nlt: detail.product?.contact_nlt,
            price: detail.product?.price,
          },
          product_combo: {
            status: cartItem.status,
            number_products: cartItem.number_products,
            total_price: cartItem.total_price,
            detail: {
              quantity: detail.quantity,
              percentage: detail.percentage,
            },
          },
        };
        productList.push(detailParams);
        comboIdList.push(cartItem.comboId);
      });
    } else {
      const indexProductExist = productList.findIndex(
        (el) => el.productId == (cartItem.idProduct || cartItem.id),
      );
      if (indexProductExist != -1) {
        const numberIndex = productList[indexProductExist].number;
        productList[indexProductExist].number = numberIndex + cartItem.quantity;
      } else {
        const params = {
          productId: cartItem.idProduct,
          number: cartItem.quantity,
          product: {
            status: cartItem?.status_display,
            dimension: {
              length: cartItem.length,
              width: cartItem.width,
              height: cartItem.height,
            },
            weight: cartItem.weight,
            allow_cod: cartItem.allow_cod,
            contact_nlt: cartItem.contact_nlt,
            price: cartItem.price,
          },
        };
        if (cartItem?.flash_sale?.id) {
          params.product.flash_sale = {
            id: cartItem?.flash_sale?.flash_sale_id,
            percentage: cartItem?.flash_sale?.percentage,
            quantity: cartItem?.flash_sale?.quantity,
            end_date: cartItem?.flash_sale?.end_date,
          };
        }
        if (cartItem?.promotion?.id) {
          params.product.promotion = {
            id: cartItem?.promotion?.id,
            percentage: cartItem?.promotion?.percentage,
            quantity: cartItem?.promotion?.quantity,
            end_date: cartItem?.promotion?.end_date,
          };
        }
        productList.push(params);
      }
    }
  }

  return productList;
};
