import axios from "@ltp/services/axios";
import {
  urlCategoryOtherLang,
  urlProduct,
  urlProductOtherLang,
  urlProductsCategory,
} from "@ltp/services/urlAPI";

export async function getCategoriesOtherLang(params) {
  try {
    const rs = await axios.get(urlCategoryOtherLang, {
      params,
    });
    return rs?.data || params?.slug;
  } catch (error) {
    return params?.slug;
  }
}

export async function getProductOtherLang(params) {
  try {
    const rs = await axios.get(urlProductOtherLang, {
      params,
    });
    return rs?.data || params?.slug;
  } catch (error) {
    return params?.slug;
  }
}

export async function getCategoriesByParent(params, lang) {
  const rs = await axios.get(urlProductsCategory, { params, headers: { lang } });
  return rs;
}

export async function getProductByCategory(params, lang) {
  const rs = await axios.get(urlProduct, { params, headers: { lang } });
  return rs?.data;
}
