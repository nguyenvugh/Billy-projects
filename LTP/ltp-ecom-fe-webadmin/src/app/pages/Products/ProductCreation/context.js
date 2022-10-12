import React from "react";

export const ProductCreationContext = React.createContext();

export const initialState = {
  detail: {
    product_code: "",
    product_name: "",
    product_price: 0,
    product_feature: -1,
    product_contact_nlt: -1,
    product_category: "",
    product_parent_category: "",
    product_status: false,
    product_quantity: 0,
    product_specifications: "",
    product_thumbnail: "",
    product_description: "",
    short_desc: "",
    width: null,
    height: null,
    length: null,
    weight: null,
    allow_cod: false,
    product_name_en: "",
    product_description_en: "",
    short_desc_en: "",
    title_seo: "",
    title_seo_en: "",
    description_seo: "",
    description_seo_en: "",
  },
  photos: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "updateDetail":
      return {
        ...state,
        detail: action.payload,
      };
    case "updateDetailInput":
      return {
        ...state,
        detail: {
          ...state.detail,
          [action.payload.key]: action.payload.value,
        },
      };
    case "updatePhotos":
      return {
        ...state,
        photos: action.payload,
      };
    case "addPhoto":
      return {
        ...state,
        photos: [
          ...state.photos,
          {
            ...action.payload,
          },
        ],
      };
    case "deletePhoto":
      const photos = state.photos;
      photos.splice(action.payload.index, 1);
      return {
        ...state,
        photos,
      };
    case "updateMetaPhoto":
      const photosCopy = (state.photos || []).map((it, index) => {
        if (action.payload.index === index) {
          return action.payload.updatedPhoto;
        }
        return it;
      });
      return {
        ...state,
        photos: photosCopy,
      };
    default:
      return state;
  }
};
